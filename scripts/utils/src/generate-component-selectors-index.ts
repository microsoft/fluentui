const fs = require('fs');
const path = require('path');

const COMPONENTS_SELECTORS_DIR =
  '../../../packages/react-components/react-components/stories/ComponentSelector/components-definitions/';

const configFolder = path.join(__dirname, COMPONENTS_SELECTORS_DIR);
const outputFile = path.join(configFolder, 'index.ts');

// Read all files in the config folder
const files = fs.readdirSync(configFolder);

// Create export statements for all .json files
const exportLines = files
  .filter(file => path.extname(file).toLowerCase() === '.json')
  .map(file => {
    const baseName = path.basename(file, '.json');
    return `export { default as ${baseName}Def } from './${file}';`;
  });

// Write the generated export lines to index.ts
fs.writeFileSync(outputFile, exportLines.join('\n') + '\n');

console.log('index.ts has been generated successfully!');
