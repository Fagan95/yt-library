document.addEventListener("DOMContentLoaded", () => {
    const fileListEl = document.getElementById("fileList");
    const descriptionEl = document.getElementById("description");
    const searchInput = document.getElementById("searchInput");
    const chooseDirButton = document.getElementById("chooseDirButton");
    const breadcrumbEl = document.getElementById("breadcrumb");
  
    let selectedFile = null;
  
    // Function to load video files from the server
    function loadFiles(search = "") {
      fetch(`/api/videos?search=${encodeURIComponent(search)}`)
        .then(response => response.json())
        .then(files => {
          fileListEl.innerHTML = "";
          files.forEach(file => {
            const li = document.createElement("li");
            li.textContent = file;
            li.className = "list-group-item file-item";
            li.addEventListener("click", () => {
              selectFile(li, file);
            });
            fileListEl.appendChild(li);
          });
        })
        .catch(err => console.error(err));
    }
  
    // Function to handle file selection and display its description
    function selectFile(element, file) {
      document.querySelectorAll(".file-item").forEach(item => item.classList.remove("selected"));
      element.classList.add("selected");
      selectedFile = file;
      fetch(`/api/description?filename=${encodeURIComponent(file)}`)
        .then(response => response.json())
        .then(data => {
          descriptionEl.textContent = data.description;
        })
        .catch(err => console.error(err));
    }
  
    // Update file list based on search input
    searchInput.addEventListener("input", () => {
      loadFiles(searchInput.value);
    });
  
    // "Choose Directory" button: prompt for a new directory and update via API
    chooseDirButton.addEventListener("click", () => {
      const newDir = prompt("Enter the full path to the directory you want to use:");
      if (newDir) {
        fetch('/api/setDirectory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ directory: newDir })
        })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            alert(`Directory updated to: ${result.directory}`);
            breadcrumbEl.innerHTML = `<li class="breadcrumb-item active" aria-current="page">${result.directory}</li>`;
            selectedFile = null;
            descriptionEl.textContent = "Select a video to see its description.";
            loadFiles(searchInput.value);
          } else {
            alert("Error: " + result.error);
          }
        })
        .catch(err => console.error(err));
      }
    });
  
    // Initial load of files
    loadFiles();
  });
  