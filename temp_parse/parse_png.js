const fs = require('fs');
const PNG = require('pngjs').PNG;
const appJs = fs.readFileSync('/Users/sharooz007/Documents/Agentic coding/Watermark Remove/js/app.js', 'utf8');
const mask1080b64 = appJs.match(/const MASK_1080 = "(.*?)";/)[1];
const b64Data = mask1080b64.replace(/^data:image\/\w+;base64,/, "");
const buffer = Buffer.from(b64Data, 'base64');

new PNG().parse(buffer, function(error, data) {
    if (error) throw error;
    console.log(`Width: ${data.width}, Height: ${data.height}`);
    
    // Check center pixel (42, 42)
    let idx = (42 * data.width + 42) * 4;
    console.log(`Center Pixel: R=${data.data[idx]}, G=${data.data[idx+1]}, B=${data.data[idx+2]}, A=${data.data[idx+3]}`);
    
    // Check corner pixel (0, 0)
    idx = 0;
    console.log(`Corner Pixel: R=${data.data[idx]}, G=${data.data[idx+1]}, B=${data.data[idx+2]}, A=${data.data[idx+3]}`);
    
    // Count how many pixels have alpha > 0, and how many are pure white (255,255,255)
    let alphaCount = 0;
    let whiteCount = 0;
    let rgbMaxSum = 0;
    for (let i = 0; i < data.data.length; i += 4) {
        if (data.data[i+3] > 0) alphaCount++;
        if (data.data[i] === 255 && data.data[i+1] === 255 && data.data[i+2] === 255) whiteCount++;
        rgbMaxSum += Math.max(data.data[i], data.data[i+1], data.data[i+2]);
    }
    console.log(`Alpha > 0 pixels: ${alphaCount}`);
    console.log(`Pure white pixels: ${whiteCount}`);
    console.log(`Average RGB Max: ${rgbMaxSum / (data.width * data.height)}`);
});
