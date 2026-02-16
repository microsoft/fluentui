import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = path.resolve('packages/charts/react-charts/stories/screenshots/vega_data');
const OUTPUT_DIR = path.resolve('packages/charts/react-charts/stories/screenshots/contact_sheets');

const COLS = 5;
const ROWS = 5;
const PER_SHEET = COLS * ROWS;
const THUMB_W = 256;
const THUMB_H = 192;
const LABEL_H = 20;
const CELL_H = THUMB_H + LABEL_H;
const SHEET_W = COLS * THUMB_W;
const SHEET_H = ROWS * CELL_H;

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const files = fs.readdirSync(SCREENSHOTS_DIR)
  .filter(f => f.endsWith('.png'))
  .sort();

console.log(`Total screenshots: ${files.length}`);
console.log(`Contact sheets: ${Math.ceil(files.length / PER_SHEET)}`);

for (let sheetIdx = 0; sheetIdx < Math.ceil(files.length / PER_SHEET); sheetIdx++) {
  const batch = files.slice(sheetIdx * PER_SHEET, (sheetIdx + 1) * PER_SHEET);
  const composites = [];

  for (let i = 0; i < batch.length; i++) {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = col * THUMB_W;
    const y = row * CELL_H;

    // Resize screenshot to thumbnail
    const thumb = await sharp(path.join(SCREENSHOTS_DIR, batch[i]))
      .resize(THUMB_W, THUMB_H, { fit: 'fill' })
      .toBuffer();

    composites.push({ input: thumb, left: x, top: y });

    // Create label with schema name
    const label = batch[i].replace('_vega.png', '').replace('data_', '');
    const svgLabel = Buffer.from(`<svg width="${THUMB_W}" height="${LABEL_H}">
      <rect width="${THUMB_W}" height="${LABEL_H}" fill="#222"/>
      <text x="${THUMB_W/2}" y="14" font-family="Arial" font-size="11" fill="white" text-anchor="middle">${label}</text>
    </svg>`);
    const labelBuf = await sharp(svgLabel).png().toBuffer();
    composites.push({ input: labelBuf, left: x, top: y + THUMB_H });
  }

  const sheet = await sharp({
    create: { width: SHEET_W, height: SHEET_H, channels: 4, background: { r: 34, g: 34, b: 34, alpha: 1 } }
  })
    .composite(composites)
    .png()
    .toBuffer();

  const outPath = path.join(OUTPUT_DIR, `sheet_${String(sheetIdx + 1).padStart(2, '0')}.png`);
  fs.writeFileSync(outPath, sheet);

  const startNum = sheetIdx * PER_SHEET + 1;
  const endNum = Math.min((sheetIdx + 1) * PER_SHEET, files.length);
  console.log(`Created ${outPath} (schemas ${startNum}-${endNum})`);
}

console.log('Done!');
