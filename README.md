# Omni Video Watermark Remover

A lightweight browser-based tool for removing the Omni video watermark completely on your own device.

The entire application runs locally in your browser using modern Web APIs. No video files are uploaded or processed remotely.

> **Privacy First:** Your videos never leave your device.

---

## Features

* ⚡ Fast client-side processing
* 🔒 Completely offline after the page loads
* 🎥 MP4 video support
* 🎯 Automatic Omni watermark removal
* 💻 No installation required
* 📱 Simple drag-and-drop interface
* 🚫 No accounts or sign-ups

---

## How It Works

The application processes your video directly inside your browser.

```text
Open Video
      │
      ▼
Decode Frames
      │
      ▼
Remove Watermark
      │
      ▼
Re-encode Video
      │
      ▼
Download Clean Video
```

No files are uploaded during processing.

---

## Built With

* HTML5
* CSS3 (Space Grotesk Font)
* JavaScript (ES6)
* WebCodecs API (VideoDecoder & VideoEncoder)
* HTML Canvas API
* MP4Box.js (Demuxing)
* mp4-muxer (Muxing)

---

## Browser Requirements

This project requires browsers with **WebCodecs** support.

Recommended browsers:

* Google Chrome
* Microsoft Edge
* Brave
* Opera

---

## Privacy

* No video uploads
* No cloud processing
* No user accounts
* No data collection
* All processing happens locally in your browser

---

## Usage

1. Open `index.html` in a supported browser.
2. Select or drag your MP4 video.
3. Wait a few seconds while processing completes.
4. Download the cleaned video.

---

## Project Structure

```text
/
├── index.html
├── privacy.html
├── terms.html
├── disclaimer.html
├── README.md
├── css/
│   ├── styles.css
│   └── legal.css
├── js/
│   └── app.js
├── fonts/
│   ├── space-grotesk.css
│   ├── sg-latin.woff2
│   └── sg-latin-ext.woff2
└── vendor/
    ├── mp4box.all.min.js
    └── mp4-muxer.min.js
```

---

## Disclaimer

This project is provided as a technical utility.

You are responsible for ensuring you have the legal right to modify any content you process. Only use this tool with videos you own or have permission to edit.

---

## Trademark Notice

**Omni** is a trademark of **Google LLC**.

This project is independent and is **not affiliated with, endorsed by, sponsored by, or associated with Google LLC**.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgements

This project uses the following open-source libraries:

* MP4Box.js
* mp4-muxer

Special thanks to the developers and contributors of these projects.
