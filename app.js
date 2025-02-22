const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Allow parsing JSON bodies (for setDirectory endpoint)
app.use(express.json());

// Set your initial target directory (make sure this folder exists)
let targetDir = path.join(__dirname, 'videos');

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));
// Serve videos so they can be opened if needed
app.use('/videos', express.static(targetDir));

// API endpoint: update the target directory
app.post('/api/setDirectory', (req, res) => {
  const newDir = req.body.directory;
  if (!newDir) {
    return res.status(400).json({ error: 'Directory path is required' });
  }
  // Check if the directory exists on the server
  if (!fs.existsSync(newDir)) {
    return res.status(400).json({ error: 'Directory does not exist' });
  }
  targetDir = newDir;
  // Also update the static serving for videos
  app.use('/videos', express.static(targetDir));
  res.json({ success: true, directory: targetDir });
});

// API endpoint: list video files (filtering by search if provided)
app.get('/api/videos', (req, res) => {
  const searchQuery = req.query.search ? req.query.search.toLowerCase() : '';
  fs.readdir(targetDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read directory' });
    }
    // Allowed video file extensions
    const allowedExt = ['.mp4', '.mkv', '.webm'];
    const videoFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return allowedExt.includes(ext) && file.toLowerCase().includes(searchQuery);
    });
    res.json(videoFiles);
  });
});

// API endpoint: get description text for a given video file
app.get('/api/description', (req, res) => {
  const videoFile = req.query.filename;
  if (!videoFile) {
    return res.status(400).json({ error: 'Filename is required' });
  }
  // Look for the .description file (instead of .txt)
  const descFile = path.join(targetDir, path.parse(videoFile).name + '.description');
  fs.readFile(descFile, 'utf8', (err, data) => {
    if (err) {
      // If not found or error, return the default message
      return res.json({ description: 'No Description Available' });
    }
    res.json({ description: data });
  });
});

// API endpoint: delete a video and its corresponding description file
app.delete('/api/file', (req, res) => {
  const videoFile = req.query.filename;
  if (!videoFile) {
    return res.status(400).json({ error: 'Filename is required' });
  }
  const videoPath = path.join(targetDir, videoFile);
  const descPath = path.join(targetDir, path.parse(videoFile).name + '.description');

  // Delete video file
  fs.unlink(videoPath, (err) => {
    if (err) {
      console.error('Error deleting video:', err);
      return res.status(500).json({ error: 'Error deleting video file' });
    }
    // Delete description file if it exists (ignore error if it does not)
    fs.unlink(descPath, (err2) => {
      if (err2 && err2.code !== 'ENOENT') {
        console.error('Error deleting description file:', err2);
        return res.status(500).json({ error: 'Error deleting description file' });
      }
      res.json({ success: true });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
