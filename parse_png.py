import base64
import struct
import zlib
import re

with open('/Users/sharooz007/Documents/Agentic coding/Watermark Remove/js/app.js', 'r') as f:
    app_js = f.read()

m = re.search(r'const MASK_1080 = "(.*?)";', app_js)
b64 = m.group(1).split(',')[1]
data = base64.b64decode(b64)

def parse_png(data):
    if data[:8] != b'\x89PNG\r\n\x1a\n':
        return
    idx = 8
    idat_data = b''
    while idx < len(data):
        length = struct.unpack('!I', data[idx:idx+4])[0]
        chunk_type = data[idx+4:idx+8]
        chunk_data = data[idx+8:idx+8+length]
        if chunk_type == b'IHDR':
            width, height, bitdepth, colortype, comp, filterm, interlace = struct.unpack('!IIBBBBB', chunk_data)
            print(f"IHDR: {width}x{height}, bitdepth={bitdepth}, colortype={colortype}")
        elif chunk_type == b'IDAT':
            idat_data += chunk_data
        idx += 12 + length
    
    decompressed = zlib.decompress(idat_data)
    # Just print the first few pixels of the first row
    # bytes per pixel: RGBA = 4, RGB = 3
    bpp = 4 if colortype == 6 else 3
    row_bytes = width * bpp + 1
    
    print("First row filter byte:", decompressed[0])
    for i in range(5):
        offset = 1 + i*bpp
        pix = decompressed[offset:offset+bpp]
        print(f"Pixel {i}: {list(pix)}")

parse_png(data)
