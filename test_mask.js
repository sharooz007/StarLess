const fs = require('fs');
const appJs = fs.readFileSync('/Users/sharooz007/Documents/Agentic coding/Watermark Remove/js/app.js', 'utf8');

const mask1080b64 = appJs.match(/const MASK_1080 = "(.*?)";/)[1];
console.log("MASK_1080 length:", mask1080b64.length);
