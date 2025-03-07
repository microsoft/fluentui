/*
 * Token generation script
 * Takes in a Figma token export file and generates token raw strings and CSS Var files
 */
import tokensJSONRaw from './tokens.json';
import fluentFallbacksRaw from './fluentOverrides.json';
import fs from 'fs';
import { Project } from 'ts-morph';
import prettier from 'prettier';

const project = new Project({
  tsConfigFilePath: './tsconfig.json',
});

const tokensJSON: Record<string, any> = tokensJSONRaw;
const fluentFallbacks: Record<string, string> = fluentFallbacksRaw;
// Store exports so we can add them to index.ts at the end
const exportList: Record<string, any> = {};

interface Token {
  no: number;
  name: string;
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

// ToDo, make this dynamic to handle all needed variables imported after/during files generation
function generateImportHeaders() {
  const importFluent = "import { tokens } from '@fluentui/tokens';\n";
  return importFluent;
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

function cleanFSTTokenName(originalTokenName: string) {
  // Handle any name housekeeping or small token name fixes

  let newtokenName = originalTokenName.replace('-', '/');
  // Ignore space
  newtokenName = newtokenName.replace(' ', '');
  // Ignore brackets (w/ leading slash)
  newtokenName = newtokenName.replace('/(', '/');
  // Ignore brackets
  newtokenName = newtokenName.replace('(', '/').replace(')', '');

  // Remove random basket emoji
  newtokenName = newtokenName.replace('🗑️/', '');

  return newtokenName;
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

  for (const token in tokensJSON) {
    const tokenData: Token = tokensJSON[token];
    const tokenName = tokenData.cssName;
    const tokenRawString = `export const ${token}Raw = '${tokenName}';\n`;

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

  fs.writeFileSync(optionalVarFile, optionalRawTokens);
  fs.writeFileSync(controlVarFile, controlRawTokens);
  fs.writeFileSync(nullableVarFile, nullableRawTokens);
  project.addSourceFileAtPathIfExists(optionalVarFile);
  project.addSourceFileAtPathIfExists(controlVarFile);
  project.addSourceFileAtPathIfExists(nullableVarFile);

  for (const component in componentTokens) {
    var dir = `./src/components/${component}/`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const variablePath = getComponentFile(component);
    fs.writeFileSync(variablePath, componentTokens[component]);
    project.addSourceFileAtPathIfExists(variablePath);
  }
}

function toCamelCase(str: string) {
  let formattedString = cleanFSTTokenName(str);

  return formattedString
    .split('/')
    .map(function (word: string, index: number) {
      // If it is the first word make sure to lowercase all the chars.
      if (index == 0) {
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
  let optionalTokens = generateImportHeaders();
  let controlTokens = generateImportHeaders();
  let nullableTokens = generateImportHeaders();
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

    // Our default token value if no fallbacks found.
    let resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)})`;

    const fallbacksFallback = tokenSemanticName ? tokensJSON[tokenSemanticName] : null;

    if (tokenSemanticRef && fallbacksFallback && fallbacksFallback.fst_reference.length > 0) {
      // TODO: Check if we even want this level of fallback complexity?
      // Maximum two fallbacks, no need for recursion.
      const fallbackSemanticName = toCamelCase(cleanFSTTokenName(fallbacksFallback.fst_reference));
      const fallbackSemanticRef = fallbackSemanticName + 'Raw';

      // Our FST Fallback has one more additional layer of fallback
      if (fluentFallbacks[token]) {
        // Token has a FST fallback and a fluent override fallback
        resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, var(${escapeInlineToken(
          tokenSemanticRef,
        )}, var(${escapeInlineToken(fallbackSemanticRef)}, ${escapeInlineToken(fluentFallbacks[token])})))`;
      } else {
        // Fallback has a FST reference fallback, also check if it has it's own fluent fallback
        if (fluentFallbacks[fallbackSemanticName]) {
          resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, var(${escapeInlineToken(
            tokenSemanticRef,
          )}, var(${escapeInlineToken(fallbackSemanticRef)}, ${escapeInlineToken(
            fluentFallbacks[fallbackSemanticName],
          )})))`;
        } else {
          resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, var(${escapeInlineToken(
            tokenSemanticRef,
          )}, ${escapeInlineToken(fallbackSemanticRef)}))`;
        }
      }
    } else if (tokenSemanticRef && fluentFallbacks[token]) {
      // Token has a FST fallback and a fluent override fallback
      resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, var(${escapeInlineToken(
        tokenSemanticRef,
      )}, ${escapeInlineToken(fluentFallbacks[token])}))`;
    } else if (fluentFallbacks[token]) {
      // Token has a fluent override fallback only
      resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, ${escapeInlineToken(fluentFallbacks[token])})`;
    } else if (tokenSemanticRef) {
      // Token has a FST reference fallback only
      resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, ${escapeInlineToken(tokenSemanticRef)})`;
    }

    if (tokenData.name.startsWith('CTRL/')) {
      // We have a component level control token
      const component = tokenData.name.split('/')[1];
      if (!componentTokens[component]) {
        componentTokens[component] = generateImportHeaders();
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
  project.addSourceFileAtPath('./src/optional/tokens.ts');
  project.addSourceFileAtPath('./src/control/tokens.ts');
  project.addSourceFileAtPath('./src/nullable/tokens.ts');

  for (const component in componentTokens) {
    var dir = `./src/components/${component}/`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const componentTokensPath = `./src/components/${component}/tokens.ts`;
    fs.writeFileSync(componentTokensPath, componentTokens[component]);
    // Add component source files for import statements
    project.addSourceFileAtPath(componentTokensPath);
  }

  // Add import statements
  project.getSourceFiles().forEach(sourceFile => {
    console.log('Fix missing imports from:', sourceFile.getFilePath());
    sourceFile.fixMissingImports().organizeImports().fixUnusedIdentifiers().formatText();

    // Format our text to match prettier rules
    const rawText = sourceFile.getText();
    let formattedText = prettier.format(rawText, {
      parser: 'typescript',
      singleQuote: true,
      printWidth: 120,
    });

    // TODO: Can we just fix/ignore this ESLint rule in this repo so this isn't needed?
    // We have to manually inject eslint disable after formatting, because it deletes it.
    if (formattedText.startsWith('import { tokens }')) {
      const esLintDisable = '// eslint-disable-next-line no-restricted-imports\n';
      formattedText = esLintDisable + formattedText;
    }

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
    // Specifier should be relative and not include .ts
    const importFilePath = file.replace('./src/', './').replace('.ts', '');
    indexSourceFile.addExportDeclaration({
      namedExports: exportList[file],
      moduleSpecifier: importFilePath,
    });
  }

  const rawText = indexSourceFile.getText();
  const formattedText = prettier.format(rawText, {
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
