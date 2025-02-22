# YT-LIBRARY
A helper tool for yt-dlp.

## Overview
yt-library is a lightweight web application designed to simplify the process of browsing video files along with their associated description files. The app features a clean, responsive interface that displays video files in a scrollable list and automatically shows the corresponding description (if available) in a sticky panel. It supports multiple video formats and allows you to switch directories on the fly. This application and much of this readme file were created with generative AI.

## Who It's For
This application is perfect for:
- Video Enthusiasts & Content Managers: Quickly view the detailed descriptions (if available) of the corresponding YouTube videos downloaded with yt-dlp.
- Media Archivists: Efficiently organize and navigate large collections of video content.
- Personal Use: Anyone who wants a streamlined, browser-based solution to manage and review video files stored on their computer.

## Features
- Multi-Format Support: Browse video files in .mp4, .mkv, and .webm formats.
- Custom Description Files: Automatically loads corresponding .description files for each video. If a description file isn't available, the app displays "No Description Available".
- Responsive Layout: The interface uses a vertical split view with a scrollable file list and a sticky text display panel.
- Dynamic Directory Selection: Easily change the target directory using the "Choose Directory" button.
- Search Functionality: Filter your video files in real-time using the built-in search bar.
- Bootstrap Integration: Enjoy a modern, responsive design with Bootstrap styling.

## Getting Started

### Prerequisites
- Node.js (v12 or higher recommended)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/fagantron/yt-library.git
   cd yt-library
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Prepare your files:
   - Place your video files (.mp4, .mkv, or .webm) in the initial target directory (default is the videos folder in the project root).
   - Ensure the corresponding text files for the video description have the same name as the video files and use the .description extension.
     *For example, "Dave's Cat Video.mkv" should have a description file titled "Dave's Cat Video.description".*

## Running the App
Start the server with:
```
npm start
```
Then, open your web browser and navigate to http://localhost:3000 to use the app.

## Customization
- **Directory** Selection: Click the "Choose Directory" button to set a new target directory for your video and description files.
- **Styling:** Modify the CSS within index.html or add your own styles to further customize the look and feel of the app.
- **Backend API:** The Express server in app.js can be extended with additional functionality as needed.

## License
This project is open source and available under the MIT License.
