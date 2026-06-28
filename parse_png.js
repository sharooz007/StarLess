const fs = require('fs');

// A super simple script to parse PNG IHDR and IDAT using standard node crypto/zlib if possible, or just raw buffer
// Actually, it's easier to just use HTML canvas via a quick headless script if we had puppeteer, but we can just use a python script!

