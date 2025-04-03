/*
 * Token generation script
 * Takes in a Figma token export file and generates token raw strings and CSS Var files
 */
import tokensJSONRaw from './tokens.json';
import { fluentOverrides as fluentFallbacksRaw, FluentOverrideValue, type FluentOverrides } from './fluentOverrides';
import fs from 'fs';
import { Project } from 'ts-morph';
import { format } from 'prettier';

const project = new Project({
  tsConfigFilePath: './tsconfig.json',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tokensJSON: Record<string, any> = tokensJSONRaw;
const fluentFallbacks: FluentOverrides = fluentFallbacksRaw;
// Store exports so we can add them to index.ts at the end
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const exportList: Record<string, any> = {};

interface Token {
  no: number;
  name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fst_reference: string;
  optional: boolean;
  nullable: boolean;
  description: string;
  components: string[];
  contrast: string;
  fallback: string;
  exceptions: string[];
  cssName: string;
}

interface ComponentTokenMap {
  [component: string]: string;
}

function generateTokens() {
  console.log('Generating tokens...');
  // Simple for now, just generate the raw strings and variables
  generateTokenRawStrings();
  generateTokenVariables();
}

function escapeInlineToken(token: string) {
  return `\$\{${token}\}`;
}

function escapeMixedInlineToken(token: FluentOverrideValue) {
  // The FluentOverrideValue type has two mutually exclusive properties: f2Token and rawValue
  // We need to check which one is defined and use that value
  if (token.f2Token !== undefined) {
    return `\$\{${token.f2Token}\}`;
  } else {
    // we only have a raw value so we should print it directly.
    return `${token.rawValue}`;
  }
}

function cleanFSTTokenName(originalTokenName: string) {
  // Handle any name housekeeping or small token name fixes

  let newTokenName = originalTokenName.replace('-', '/');
  // Ignore space
  newTokenName = newTokenName.replace(' ', '');
  // Ignore brackets (w/ leading slash)
  newTokenName = newTokenName.replace('/(', '/');
  // Ignore brackets
  newTokenName = newTokenName.replace('(', '/').replace(')', '');

  return newTokenName;
}

function chopLastCamelCasePart(str: string) {
  const parts = str.split(/(?=[A-Z])/);
  parts.pop();
  return parts.join('');
}

function chopLastCSSVarPart(str: string) {
  const parts = str.split('-');
  parts.pop();
  return parts.join('');
}

function generateTokenRawStrings() {
  let optionalRawTokens = '';
  let controlRawTokens = '';
  let nullableRawTokens = '';
  const componentTokens: ComponentTokenMap = {};
  const optionalVarFile = './src/optional/variables.ts';
  exportList[optionalVarFile] = [];
  const controlVarFile = './src/control/variables.ts';
  exportList[controlVarFile] = [];
  const nullableVarFile = './src/nullable/variables.ts';
  exportList[nullableVarFile] = [];
  const getComponentFile = (component: string) => `./src/components/${component}/variables.ts`;

  const processedShadows: string[] = [];

  for (const token in tokensJSON) {
    if (tokensJSON.hasOwnProperty(token)) {
      const tokenData: Token = tokensJSON[token];
      let tokenName = tokenData.cssName;
      let tokenRawString = `export const ${token}Raw = '${tokenName}';\n`;

      if (tokenData.name.toLowerCase().includes('shadow/')) {
        // Handle shadow tokens
        const shadowToken = chopLastCamelCasePart(token);
        const shadowCSSName = chopLastCamelCasePart(tokenData.cssName);

        if (processedShadows.includes(shadowToken)) {
          // We've already processed this shadow token, skip it
          continue;
        }
        tokenName = shadowCSSName;
        tokenRawString = `export const ${shadowToken}Raw = '${tokenName}';\n`;
        processedShadows.push(shadowToken);
      }

      if (tokenData.name.startsWith('CTRL/')) {
        // We have a component level control token
        const component = tokenData.name.split('/')[1];
        if (!componentTokens[component]) {
          componentTokens[component] = '';
        }
        componentTokens[component] += tokenRawString;

        if (!exportList[getComponentFile(component)]) {
          const fileLoc = getComponentFile(component);
          exportList[fileLoc] = [];
        }
        exportList[getComponentFile(component)].push(`${token}Raw`);
      } else {
        if (tokenData.optional) {
          optionalRawTokens += tokenRawString;
          exportList[optionalVarFile].push(`${token}Raw`);
        } else if (tokenData.nullable) {
          nullableRawTokens += tokenRawString;
          exportList[nullableVarFile].push(`${token}Raw`);
        } else {
          controlRawTokens += tokenRawString;
          exportList[controlVarFile].push(`${token}Raw`);
        }
      }
    }
  }

  fs.writeFileSync(optionalVarFile, optionalRawTokens);
  fs.writeFileSync(controlVarFile, controlRawTokens);
  fs.writeFileSync(nullableVarFile, nullableRawTokens);
  project.addSourceFileAtPathIfExists(optionalVarFile);
  project.addSourceFileAtPathIfExists(controlVarFile);
  project.addSourceFileAtPathIfExists(nullableVarFile);

  for (const component in componentTokens) {
    if (componentTokens.hasOwnProperty(component)) {
      const dir = `./src/components/${component}/`;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const variablePath = getComponentFile(component);
      fs.writeFileSync(variablePath, componentTokens[component]);
      project.addSourceFileAtPathIfExists(variablePath);
    }
  }
}

function toCamelCase(str: string) {
  const formattedString = cleanFSTTokenName(str);

  return formattedString
    .split('/')
    .map((word: string, index: number) => {
      // If it is the first word make sure to lowercase all the chars.
      if (index === 0) {
        return word.toLowerCase();
      }
      // If it is not the first word only upper case the first char and lowercase the rest.
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

function generateTokenVariables() {
  // Default our files to token imports
  // TODO: Add raw token imports
  let optionalTokens = '';
  let controlTokens = '';
  let nullableTokens = '';
  const componentTokens: ComponentTokenMap = {};

  const optionalVarFile = './src/optional/tokens.ts';
  exportList[optionalVarFile] = [];
  const controlVarFile = './src/control/tokens.ts';
  exportList[controlVarFile] = [];
  const nullableVarFile = './src/nullable/tokens.ts';
  exportList[nullableVarFile] = [];
  const getComponentFile = (component: string) => `./src/components/${component}/tokens.ts`;

  for (const token in tokensJSON) {
    if (token.includes('(figma only)')) {
      // Superfluous tokens - SKIP
      continue;
    }

    const tokenData: Token = tokensJSON[token];
    const tokenNameRaw = token + 'Raw';

    let tokenSemanticRef: null | string = null;
    let tokenSemanticName: null | string = null;

    if (tokenData.fst_reference.length > 0) {
      tokenSemanticName = toCamelCase(cleanFSTTokenName(tokenData.fst_reference));
      tokenSemanticRef = tokenSemanticName + 'Raw';
    }

    /**
     * TODO, we need to account for the fact that the fallbacks can be nullable tokens and as such we need to ensure
     * that they are not wrapped in the var() css function. This is because `unset` is not a variable and a statement.
     * We also need to ensure legacy F2 tokens are not wrapped in the var() css function because they have the var() css function
     * already in the token value. Any other values should probably include the var() css function.
     */

    // Our default token value if no fallbacks found.
    let resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)})`;

    if (tokenSemanticRef && fluentFallbacks[token]) {
      // Token has a FST fallback and a fluent override fallback
      resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, var(${escapeInlineToken(
        tokenSemanticRef,
      )}, ${escapeMixedInlineToken(fluentFallbacks[token])}))`;
    } else if (fluentFallbacks[token]) {
      // Token has a fluent override fallback only
      resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, ${escapeMixedInlineToken(
        fluentFallbacks[token],
      )})`;
    } else if (tokenData.nullable && tokenSemanticRef) {
      // nullable tokens should always resolve to unset
      resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, unset)`;
    } else if (tokenSemanticRef) {
      // Token has a FST reference fallback only
      resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, var(${escapeInlineToken(tokenSemanticRef)}))`;
    }

    if (tokenData.name.startsWith('CTRL/')) {
      // We have a component level control token
      const component = tokenData.name.split('/')[1];
      if (!componentTokens[component]) {
        componentTokens[component] = '';
      }
      componentTokens[component] += `export const ${token} = \`${resolvedTokenFallback}\`;\n`;

      if (!exportList[getComponentFile(component)]) {
        const fileLoc = getComponentFile(component);
        exportList[fileLoc] = [];
      }
      // Add to our list of exports for later
      exportList[getComponentFile(component)].push(token);
    } else {
      // We have a global token
      if (tokenData.optional) {
        optionalTokens += `export const ${token} = \`${resolvedTokenFallback}\`;\n`;
        // Add to our list of exports for later
        exportList[optionalVarFile].push(token);
      } else if (tokenData.nullable) {
        nullableTokens += `export const ${token} = \`${resolvedTokenFallback}\`;\n`;
        // Add to our list of exports for later
        exportList[nullableVarFile].push(token);
      } else {
        controlTokens += `export const ${token} = \`${resolvedTokenFallback}\`;\n`;
        // Add to our list of exports for later
        exportList[controlVarFile].push(token);
      }
    }
  }

  // Write files
  fs.writeFileSync('./src/optional/tokens.ts', optionalTokens);
  fs.writeFileSync('./src/control/tokens.ts', controlTokens);
  fs.writeFileSync('./src/nullable/tokens.ts', nullableTokens);

  // Add source files for import statements
  project.addSourceFileAtPath('./src/legacy/tokens.ts');
  project.addSourceFileAtPath('./src/optional/tokens.ts');
  project.addSourceFileAtPath('./src/control/tokens.ts');
  project.addSourceFileAtPath('./src/nullable/tokens.ts');

  for (const component in componentTokens) {
    if (componentTokens.hasOwnProperty(component)) {
      const dir = `./src/components/${component}/`;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const componentTokensPath = `./src/components/${component}/tokens.ts`;
      fs.writeFileSync(componentTokensPath, componentTokens[component]);
      // Add component source files for import statements
      project.addSourceFileAtPath(componentTokensPath);
    }
  }

  // Add import statements
  project.getSourceFiles().forEach(sourceFile => {
    console.log('Fix missing imports from:', sourceFile.getFilePath());
    sourceFile.fixMissingImports().organizeImports().fixUnusedIdentifiers().formatText();

    // Format our text to match prettier rules
    const rawText = sourceFile.getText();
    const formattedText = format(rawText, {
      parser: 'typescript',
      singleQuote: true,
      printWidth: 120,
    });

    // Format our text to match prettier rules
    sourceFile.replaceWithText(formattedText);
  });

  // Save changes so far
  project.saveSync();
  console.log('Added import statements');

  // Add export statements in index.ts
  const indexFilePath = './src/index.ts';
  // Clear index file and rewrite exports
  fs.truncateSync(indexFilePath, 0);
  // Add source file after we've cleaned it
  const indexSourceFile = project.addSourceFileAtPath(indexFilePath);
  for (const file in exportList) {
    if (exportList.hasOwnProperty(file)) {
      // Specifier should be relative and not include .ts
      const importFilePath = file.replace('./src/', './').replace('.ts', '');
      indexSourceFile.addExportDeclaration({
        namedExports: exportList[file],
        moduleSpecifier: importFilePath,
      });
    }
  }

  const rawText = indexSourceFile.getText();
  const formattedText = format(rawText, {
    parser: 'typescript',
    singleQuote: true,
    printWidth: 120,
  });

  // Format our text to match prettier rules
  indexSourceFile.replaceWithText(formattedText);

  // Save exports
  project.saveSync();
  console.log('Added export statements');
}

// Run script
generateTokens();
