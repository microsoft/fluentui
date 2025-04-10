/*
 * Token generation script
 * Takes in a Figma token export file and generates token raw strings and CSS Var files
 */
import tokensJSONRaw from './tokens.json';
import { fluentOverrides as fluentFallbacksRaw } from './fluentOverrides';
import type { FluentOverrideValue, FluentOverrides } from './fluentOverrides';
import fs from 'node:fs';
import { Project } from 'ts-morph';
import { format } from 'prettier';
import type { ComponentTokenMap, Token } from './token.types';
import path from 'node:path';
import { removeLastDelimiter, escapeInlineToken, toCamelCase, dedupeShadowTokens, cleanFstTokenName } from '../utils';

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
});

const tokensJSON = dedupeShadowTokens(tokensJSONRaw);
const fluentFallbacks: FluentOverrides = fluentFallbacksRaw;
// Store exports so we can add them to index.ts at the end
const exportList: Record<string, string[]> = {};

const generateTokens = () => {
  console.log('Generating tokens...');
  // Simple for now, just generate the raw strings and variables
  generateTokenRawStrings();
  generateTokenVariables();
};

const escapeMixedInlineToken = (token: FluentOverrideValue) => {
  // The FluentOverrideValue type has two mutually exclusive properties: f2Token and rawValue
  // We need to check which one is defined and use that value
  if (token.f2Token !== undefined) {
    return `\$\{tokens.${token.f2Token}\}`;
  } else {
    // we only have a raw value so we should print it directly.
    return `${token.rawValue}`;
  }
};

const writeDirectoryFile = (filePath: string, data: string) => {
  const dirPath = removeLastDelimiter(filePath, path.sep);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(filePath, data);
  project.addSourceFileAtPathIfExists(filePath);
};

const addOptionalTokenImport = (data: string) => {
  if (data.includes('tokens.')) {
    const esLintIgnore = `// eslint-disable-next-line no-restricted-imports\n`;
    const tokenImport = `import { tokens } from '@fluentui/tokens';\n`;
    return esLintIgnore + tokenImport + data;
  }
  return data;
};

const generateTokenRawStrings = () => {
  let optionalRawTokens = '';
  let controlRawTokens = '';
  let nullableRawTokens = '';
  const componentTokens: ComponentTokenMap = {};
  const optionalVarFile = path.join(__dirname, '../src/optional/variables.ts');
  exportList[optionalVarFile] = [];
  const controlVarFile = path.join(__dirname, '../src/control/variables.ts');
  exportList[controlVarFile] = [];
  const nullableVarFile = path.join(__dirname, '../src/nullable/variables.ts');
  exportList[nullableVarFile] = [];
  const getComponentFile = (component: string) => path.join(__dirname, `../src/components/${component}/variables.ts`);

  for (const token in tokensJSON) {
    if (tokensJSON.hasOwnProperty(token)) {
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
  }

  writeDirectoryFile(optionalVarFile, optionalRawTokens);
  writeDirectoryFile(controlVarFile, controlRawTokens);
  writeDirectoryFile(nullableVarFile, nullableRawTokens);

  for (const component of Object.keys(componentTokens)) {
    const variablePath = getComponentFile(component);
    writeDirectoryFile(variablePath, componentTokens[component]);
  }
};

const tokenExport = (token: string, resolvedTokenFallback: string) => {
  return `export const ${token} = \`${resolvedTokenFallback}\`;\n`;
};

const getResolvedToken = (token: string, tokenData: Token, tokenNameRaw: string) => {
  const tokenSemanticRef =
    tokenData.fst_reference.length > 0 ? toCamelCase(cleanFstTokenName(tokenData.fst_reference)) + 'Raw' : null;

  const fluentFallback = fluentFallbacks[token];

  if (tokenSemanticRef && fluentFallback) {
    return `var(${escapeInlineToken(tokenNameRaw)}, var(${escapeInlineToken(
      tokenSemanticRef,
    )}, ${escapeMixedInlineToken(fluentFallback)}))`;
  }

  if (fluentFallback) {
    return `var(${escapeInlineToken(tokenNameRaw)}, ${escapeMixedInlineToken(fluentFallback)})`;
  }

  if (tokenData.nullable) {
    return `var(${escapeInlineToken(tokenNameRaw)}, unset)`;
  }

  if (tokenSemanticRef) {
    return `var(${escapeInlineToken(tokenNameRaw)}, var(${escapeInlineToken(tokenSemanticRef)}))`;
  }

  return `var(${escapeInlineToken(tokenNameRaw)})`;
};

const generateTokenVariables = () => {
  // Default our files to token imports
  // TODO: Add raw token imports
  let optionalTokens = '';
  let controlTokens = '';
  let nullableTokens = '';
  const componentTokens: ComponentTokenMap = {};

  const optionalVarFile = path.join(__dirname, '../src/optional/tokens.ts');
  exportList[optionalVarFile] = [];
  const controlVarFile = path.join(__dirname, '../src/control/tokens.ts');
  exportList[controlVarFile] = [];
  const nullableVarFile = path.join(__dirname, '../src/nullable/tokens.ts');
  exportList[nullableVarFile] = [];
  const getComponentFile = (component: string) => path.join(__dirname, `../src/components/${component}/tokens.ts`);

  for (const token in tokensJSON) {
    if (token.includes('(figma only)')) {
      // Superfluous tokens - SKIP
      continue;
    }

    const tokenData: Token = tokensJSON[token];
    const tokenNameRaw = token + 'Raw';
    /**
     * TODO, we need to account for the fact that the fallbacks can be nullable tokens and as such we need to ensure
     * that they are not wrapped in the var() css function. This is because `unset` is not a variable and a statement.
     * We also need to ensure legacy F2 tokens are not wrapped in the var() css function because they have the var() css function
     * already in the token value. Any other values should probably include the var() css function.
     */

    // Our default token value if no fallbacks found.
    const resolvedTokenFallback = getResolvedToken(token, tokenData, tokenNameRaw);

    if (tokenData.name.startsWith('CTRL/')) {
      // We have a component level control token
      const component = tokenData.name.split('/')[1];
      if (!componentTokens[component]) {
        componentTokens[component] = '';
      }
      componentTokens[component] += tokenExport(token, resolvedTokenFallback);

      if (!exportList[getComponentFile(component)]) {
        const fileLoc = getComponentFile(component);
        exportList[fileLoc] = [];
      }
      // Add to our list of exports for later
      exportList[getComponentFile(component)].push(token);
    } else {
      // We have a global token
      if (tokenData.optional) {
        optionalTokens += tokenExport(token, resolvedTokenFallback);
        // Add to our list of exports for later
        exportList[optionalVarFile].push(token);
      } else if (tokenData.nullable) {
        nullableTokens += tokenExport(token, resolvedTokenFallback);
        // Add to our list of exports for later
        exportList[nullableVarFile].push(token);
      } else {
        controlTokens += tokenExport(token, resolvedTokenFallback);
        // Add to our list of exports for later
        exportList[controlVarFile].push(token);
      }
    }
  }

  // Add all generated token files
  const tokens = {
    optional: optionalTokens,
    control: controlTokens,
    nullable: nullableTokens,
  };
  for (const [tokensCategory, _tokens] of Object.entries(tokens)) {
    const filePath = path.join(__dirname, `../src/${tokensCategory}/tokens.ts`);
    writeDirectoryFile(filePath, addOptionalTokenImport(_tokens));
  }

  for (const [component, _tokens] of Object.entries(componentTokens)) {
    const componentTokensPath = path.join(__dirname, `../src/components/${component}/tokens.ts`);
    writeDirectoryFile(componentTokensPath, addOptionalTokenImport(_tokens));
  }

  // Add import statements
  project.getSourceFiles().forEach(sourceFile => {
    console.log('Fix missing imports from:', sourceFile.getFilePath());
    sourceFile.fixMissingImports();

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
  const sourcePath = path.join(__dirname, '../src');
  const indexFilePath = path.join(sourcePath, 'index.ts');
  // Clear index file and rewrite exports
  fs.truncateSync(indexFilePath, 0);
  // Add source file after we've cleaned it
  const indexSourceFile = project.addSourceFileAtPath(indexFilePath);
  for (const [file, namedExports] of Object.entries(exportList)) {
    // Find relative path to index.ts, ensure forward slash directory separator, remove .ts extension
    const importFilePath = './' + path.relative(sourcePath, file).split(path.sep).join('/').replace(/\.ts$/, '');

    indexSourceFile.addExportDeclaration({
      namedExports,
      moduleSpecifier: importFilePath,
    });
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
};

// Run script
generateTokens();
