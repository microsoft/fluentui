import { generateGenericTokens, generateGroupTokens, generateControlTokens } from './generateTokens';
import fs from 'fs';
import path from 'node:path';

import { groups } from './definitions/groups';

// Function to generate tokens and write to a JSON file
export function generateTokenJSON() {
  let genericTokens = generateGenericTokens();
  let groupTokens = generateGroupTokens(groups);
  let controlTokens = generateControlTokens();

  const results = {
    generics: genericTokens,
    components: groupTokens,
    controls: controlTokens,
  };

  // Convert the JSON object to a string
  const jsonData = JSON.stringify(results, null, 2); // Pretty print with 2 spaces

  const dirPath = path.resolve(__dirname, `./tokens.json`);
  // Write the JSON string to a file
  fs.writeFile(dirPath, jsonData, err => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('JSON data successfully written to tokens.json');
    }
  });
}

generateTokenJSON();
