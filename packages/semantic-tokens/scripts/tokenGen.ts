/*
 * Token generation script
 * Takes in a Figma token export file and generates token raw strings and CSS Var files
 */
import tokensJSONRaw from './tokens.json';
import fs from 'fs';

const tokensJSON: Record<string, any> = tokensJSONRaw;

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
function exportImportHeaders() {
  const esLintDisable = '// eslint-disable-next-line no-restricted-imports\n';
  const importFluent = "import { tokens } from '@fluentui/tokens';\n\n";
  return esLintDisable + importFluent;
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

  const newtokenName = originalTokenName.replace('-', '/');

  return newtokenName;
}

function generateTokenRawStrings() {
  let optionalRawTokens = '';
  let controlRawTokens = '';
  let nullableRawTokens = '';
  const componentTokens: ComponentTokenMap = {};
  for (const token in tokensJSON) {
    const tokenData: Token = tokensJSON[token];
    const tokenName = '--smtc-' + tokenData.name.split('/').join('-').toLowerCase();
    const tokenRawString = `export const ${token}Raw = '${tokenName}';\n`;

    if (tokenData.name.startsWith('CTRL/')) {
      // We have a component level control token
      const component = tokenData.name.split('/')[1];
      if (!componentTokens[component]) {
        componentTokens[component] = '';
      }
      componentTokens[component] += tokenRawString;
    } else {
      if (tokenData.optional) {
        optionalRawTokens += tokenRawString;
      } else if (tokenData.nullable) {
        nullableRawTokens += tokenRawString;
      } else {
        controlRawTokens += tokenRawString;
      }
    }
  }

  fs.writeFileSync('./src/optional/variables.ts', optionalRawTokens);
  fs.writeFileSync('./src/control/variables.ts', controlRawTokens);
  fs.writeFileSync('./src/nullable/variables.ts', nullableRawTokens);

  for (const component in componentTokens) {
    var dir = `./src/components/${component}/`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(`./src/components/${component}/tokens.ts`, componentTokens[component]);
  }
}

function toCamelCase(str: string) {
  return str
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
  let optionalTokens = exportImportHeaders();
  let controlTokens = exportImportHeaders();
  let nullableTokens = exportImportHeaders();
  const componentTokens: ComponentTokenMap = {};
  for (const token in tokensJSON) {
    const tokenData: Token = tokensJSON[token];
    const tokenNameRaw = token + 'Raw';

    let tokenFallback: null | string = null;
    let tokenSemanticRef: null | string = null;

    if (tokenData.fst_reference.length > 0) {
      tokenSemanticRef = toCamelCase(cleanFSTTokenName(tokenData.fst_reference)) + 'Raw';
    }

    // Token fallback may be a fluent 2 token or new FST, let's check known fluent 2 tokens
    if (tokenData.fallback.length > 0) {
      if (tokenData.fallback.startsWith('Line-height')) {
        const tokenFallbackArr = tokenData.fallback.split('/');
        const tokenFallbackVal = tokenFallbackArr[tokenFallbackArr.length - 1];
        tokenFallback = `tokens.lineHeightBase${tokenFallbackVal}`;
      } else if (tokenData.fallback.startsWith('Font-size')) {
        const tokenFallbackArr = tokenData.fallback.split('/');
        const tokenFallbackVal = tokenFallbackArr[tokenFallbackArr.length - 1];
        tokenFallback = `tokens.fontSizeBase${tokenFallbackVal}`;
      } else {
        // handle base case
        tokenFallback = toCamelCase(tokenData.fallback) + 'Raw';
      }
    }

    let resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)})`;
    // TODO: Check if a token has a FST reference that falls back to another FST/fluent fallback?
    if (tokenFallback && tokenSemanticRef) {
      // Token has both a FST fallback and a Fluent fallback
      resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, var(${escapeInlineToken(
        tokenSemanticRef,
      )}, ${escapeInlineToken(tokenFallback)}))`;
    } else if (tokenSemanticRef) {
      // Token just has a FST reference fallback
      resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, ${escapeInlineToken(tokenSemanticRef)})`;
    } else if (tokenFallback) {
      // Just in case a token falls back directly to a Fluent fallback
      resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, ${escapeInlineToken(tokenFallback)})`;
    }

    if (tokenData.name.startsWith('CTRL/')) {
      // We have a component level control token
      const component = tokenData.name.split('/')[1];
      if (!componentTokens[component]) {
        componentTokens[component] = "import { tokens } from '@fluentui/tokens';\n\n";
      }
      componentTokens[component] += `export const ${token} = '${resolvedTokenFallback}';\n`;
    } else {
      // We have a global token
      if (tokenData.optional) {
        optionalTokens += `export const ${token} = '${resolvedTokenFallback}';\n`;
      } else if (tokenData.nullable) {
        nullableTokens += `export const ${token} = '${resolvedTokenFallback}';\n`;
      } else {
        controlTokens += `export const ${token} = '${resolvedTokenFallback}';\n`;
      }
    }
  }

  fs.writeFileSync('./src/optional/tokens.ts', optionalTokens);
  fs.writeFileSync('./src/control/tokens.ts', controlTokens);
  fs.writeFileSync('./src/nullable/tokens.ts', nullableTokens);

  for (const component in componentTokens) {
    var dir = `./src/components/${component}/`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(`./src/components/${component}/tokens.ts`, componentTokens[component]);
  }
}

// Run script
generateTokens();
