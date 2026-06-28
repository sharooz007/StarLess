const fs = require('fs');
const appJs = fs.readFileSync('/Users/sharooz007/Documents/Agentic coding/Watermark Remove/js/app.js', 'utf8');

const mask1080b64 = appJs.match(/const MASK_1080 = "(.*?)";/)[1];
const b64Data = mask1080b64.replace(/^data:image\/\w+;base64,/, "");
const buffer = Buffer.from(b64Data, 'base64');

// We don't have canvas in node, but we can just see if we can find the png header
console.log("Header:", buffer.slice(0, 16).toString('hex'));

// Since we can't easily parse PNG in raw node without a library, let's just write it to a file.
fs.writeFileSync('mask1080.png', buffer);
console.log("Saved to mask1080.png");
