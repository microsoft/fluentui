import { generateControlTokens, generateGenericTokens, generateGroupTokens } from './generateTokens';
import fs from 'fs';
import path from 'node:path';
import { groupFallbacks } from './definitions/groupFallbacks';
import { genericFallbacks } from './definitions/fallbacks/genericFallbacks';
import { controlFallbacks } from './definitions/controlFallbacks';
import { extensionGroups, groups } from './definitions/groups';

function dotToCamelCase(str: string): string {
  return str
    .split('.') // Split the string by dots
    .map(
      (word, index) =>
        index === 0
          ? word // Keep the first word lowercase
          : word.charAt(0).toUpperCase() + word.slice(1), // Capitalize the first letter of subsequent words
    )
    .join(''); // Join the words back together
}

function dotToCSSVarName(str: string): string {
  return (
    '--smtc-' +
    str
      .split('.') // Split the string by dots
      .join('-') // Join the words back together
  );
}

function makeTokenFallback(tokenList: string[], defaultFallback?: string | null): string {
  // Make a CSSVar fallback string, with the default fallback at the end
  let fallbackString = defaultFallback;
  for (let i = tokenList.length - 1; i >= 0; i--) {
    const tokenName = tokenList[i];
    fallbackString = `var(${tokenName}${fallbackString ? `, ${fallbackString}` : ''})`;
  }

  return fallbackString ?? '';
}

function splitCamelCase(name: string) {
  return (
    name
      // Handle acronym-to-word boundaries: "CSSButton" -> "CSS-Button"
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
      // Insert dash between lowercase/number and uppercase: "btnPrimary2D" -> "btn-Primary2-D"
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      // Insert dash between letter and number: "Token2XL" -> "Token-2XL"
      .replace(/([A-Za-z])([0-9])/g, '$1-$2')
      // Insert dash between number and letter: "H2OLevel" -> "H-2-OLevel"
      .replace(/([0-9])([A-Za-z])/g, '$1-$2')
      .toLowerCase()
  );
}

function generateLibraryOutput() {
  let genericTokens = generateGenericTokens();
  let groupTokens = generateGroupTokens(groups);
  let extensionGroupTokens = generateGroupTokens(extensionGroups);
  let controlTokens = generateControlTokens();

  // Generic tokens
  let genericTokenList = '';
  let genericIndexExport = 'export {\n';
  for (const token of genericTokens) {
    const tokenName = dotToCamelCase(token.name);
    const cssVarName = dotToCSSVarName(token.name);
    const fluentFallback = genericFallbacks[tokenName]?.fluent;
    const primitiveFallbackName = genericFallbacks[tokenName]?.primitive;
    const primitiveFallback = primitiveFallbackName ? '--smtc-' + splitCamelCase(primitiveFallbackName) : undefined;
    const fallbackChain = [cssVarName, primitiveFallback].filter((v): v is string => typeof v === 'string');
    const tokenString = makeTokenFallback(fallbackChain, fluentFallback);
    const exportToken = `export const ${tokenName} = '${tokenString}';`;

    genericTokenList += `${exportToken}\n`;
    genericIndexExport += `${tokenName},\n`;
  }
  genericIndexExport += `} from './generics/tokens';\n`;

  const genericListPath = path.resolve(__dirname, `../src/generics/tokens.ts`);
  // Write the JSON string to a file
  fs.writeFile(genericListPath, genericTokenList, err => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('JSON data successfully written to tokens.json');
    }
  });

  // Group tokens
  const groupTokenList: { [key: string]: string } = {};
  const groupExportList: { [key: string]: string } = {};
  for (const token of groupTokens) {
    const tokenGroup = token.group || 'ungrouped';
    const groupName = tokenGroup.split('.')[0];
    if (!groupTokenList[groupName]) {
      groupTokenList[groupName] = '';
    }

    if (!groupExportList[groupName]) {
      groupExportList[groupName] = 'export {\n';
    }

    const tokenName = dotToCamelCase(token.name);
    const cssVarName = dotToCSSVarName(token.name);
    const fluentFallback = groupFallbacks[tokenGroup][tokenName]?.fluent;
    const genericFallbackName = groupFallbacks[tokenGroup][tokenName]?.generic;
    const genericFallback = genericFallbackName ? '--smtc-' + splitCamelCase(genericFallbackName) : undefined;
    const primitiveFallbackName = genericFallbackName ? genericFallbacks[genericFallbackName]?.primitive : undefined;
    const primitiveFallback = primitiveFallbackName ? '--smtc-' + splitCamelCase(primitiveFallbackName) : undefined;
    const fallbackChain = [cssVarName, genericFallback, primitiveFallback].filter(
      (v): v is string => typeof v === 'string',
    );
    const tokenString = makeTokenFallback(fallbackChain, fluentFallback);
    const exportToken = `export const ${tokenName} = '${tokenString}';`;

    groupTokenList[groupName] += `${exportToken}\n`;
    groupExportList[groupName] += `${tokenName},\n`;
  }

  for (const groupName of Object.keys(groupTokenList)) {
    const tokens = groupTokenList[groupName];
    const groupListPath = path.resolve(__dirname, `../src/groups/${groupName}/tokens.ts`);
    groupExportList[groupName] += `} from './groups/${groupName}/tokens';\n`;
    //Create directory if it doesn't exist
    const dir = path.dirname(groupListPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the JSON string to a file
    fs.writeFile(groupListPath, tokens, err => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('JSON data successfully written to tokens.json');
      }
    });
  }

  // Group tokens
  const extensionGroupTokenList: { [key: string]: string } = {};
  const extensionGroupExportList: { [key: string]: string } = {};
  for (const token of extensionGroupTokens) {
    const tokenGroup = token.group || 'ungrouped';
    const groupName = tokenGroup.split('.')[0];
    if (!extensionGroupTokenList[groupName]) {
      extensionGroupTokenList[groupName] = '';
    }

    if (!extensionGroupExportList[groupName]) {
      extensionGroupExportList[groupName] = 'export {\n';
    }

    const tokenName = dotToCamelCase(token.name);
    const cssVarName = dotToCSSVarName(token.name);
    const fluentFallback = groupFallbacks[tokenGroup][tokenName]?.fluent;
    const genericFallbackName = groupFallbacks[tokenGroup][tokenName]?.generic;
    const genericFallback = genericFallbackName ? '--smtc-' + splitCamelCase(genericFallbackName) : undefined;
    const primitiveFallbackName = genericFallbackName ? genericFallbacks[genericFallbackName]?.primitive : undefined;
    const primitiveFallback = primitiveFallbackName ? '--smtc-' + splitCamelCase(primitiveFallbackName) : undefined;
    const fallbackChain = [cssVarName, genericFallback, primitiveFallback].filter(
      (v): v is string => typeof v === 'string',
    );
    const tokenString = makeTokenFallback(fallbackChain, fluentFallback);
    const exportToken = `export const ${tokenName} = '${tokenString}';`;

    extensionGroupTokenList[groupName] += `${exportToken}\n`;
    extensionGroupExportList[groupName] += `${tokenName},\n`;
  }

  for (const groupName of Object.keys(extensionGroupTokenList)) {
    const tokens = extensionGroupTokenList[groupName];
    const groupListPath = path.resolve(__dirname, `../src/groups/extension/${groupName}/tokens.ts`);
    extensionGroupExportList[groupName] += `} from './groups/extension/${groupName}/tokens';\n`;
    //Create directory if it doesn't exist
    const dir = path.dirname(groupListPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the JSON string to a file
    fs.writeFile(groupListPath, tokens, err => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('JSON data successfully written to tokens.json');
      }
    });
  }

  // Control tokens
  const controlTokenList: { [key: string]: string } = {};
  const controlExportList: { [key: string]: string } = {};
  for (const token of controlTokens) {
    const tokenGroup = token.group || 'ungrouped';
    const groupName = tokenGroup.split('.')[0];
    if (!controlTokenList[groupName]) {
      controlTokenList[groupName] = '';
    }

    if (!controlExportList[groupName]) {
      controlExportList[groupName] = 'export {\n';
    }

    const tokenName = dotToCamelCase(token.name);
    const cssVarName = dotToCSSVarName(token.name);
    const fluentFallback = controlFallbacks[tokenGroup]?.[tokenName]?.fluent;
    let exportToken = `export const ${tokenName} = 'var(${cssVarName})';`;
    if (fluentFallback) {
      exportToken = `export const ${tokenName} = 'var(${cssVarName}, ${fluentFallback})';`;
    }

    controlTokenList[groupName] += `${exportToken}\n`;
    controlExportList[groupName] += `${tokenName},\n`;
  }

  for (const groupName of Object.keys(controlTokenList)) {
    const tokens = controlTokenList[groupName];
    const controlListPath = path.resolve(__dirname, `../src/controls/${groupName}/tokens.ts`);
    controlExportList[groupName] += `} from './controls/${groupName}/tokens';\n`;
    //Create directory if it doesn't exist
    const dir = path.dirname(controlListPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the JSON string to a file
    fs.writeFile(controlListPath, tokens, err => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('JSON data successfully written to tokens.json');
      }
    });
  }

  // Add algo tokens to export (manually created per design system)
  const algoTokenExports = path.resolve(__dirname, `../src/fluent/index.ts`);
  fs.readFile(algoTokenExports, 'utf8', (err, algoTokensData) => {
    if (err) {
      console.error('Error reading algo tokens file:', err);
      return;
    }

    algoTokensData = algoTokensData.replace('./algo/index', './fluent/algo/index');

    // Write the JSON string to a file
    const indexPath = path.resolve(__dirname, `../src/index.ts`);
    const allExports =
      genericIndexExport +
      Object.values(groupExportList).join('\n') +
      Object.values(extensionGroupExportList).join('\n') +
      Object.values(controlExportList).join('\n') +
      algoTokensData;

    fs.writeFile(indexPath, allExports, err => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('JSON data successfully written to tokens.json');
      }
    });
  });
}

generateLibraryOutput();
