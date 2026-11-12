import { readFileSync } from 'node:fs';
import stylelint from 'stylelint';
import valueParser from 'postcss-value-parser';
import { ruleName, ruleUrl } from '../utils.js';

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const name = ruleName('no-unknown-tokens');

const messages = ruleMessages(name, {
  rejected: (/** @type {string} */ property) =>
    `Unexpected unknown custom property "${property}". Use a theme token from @fluentui/tokens, ` +
    'a component variable with an allowed prefix, or a property declared in this file.',
});

const DEFAULT_TOKENS_FILE = new URL('../../../packages/tokens/src/tokens.ts', import.meta.url);
const DEFAULT_ALLOWED_PREFIXES = ['--fui-', '--fluent-'];

/** @type {Map<string, Set<string>>} */
const tokenCache = new Map();

/** @param {string | URL} file */
function readTokens(file) {
  const key = file.toString();
  let tokens = tokenCache.get(key);
  if (!tokens) {
    const source = readFileSync(file, 'utf8');
    tokens = new Set(Array.from(source.matchAll(/var\((--[A-Za-z0-9]+)[,)]/g), match => match[1]));
    tokenCache.set(key, tokens);
  }
  return tokens;
}

/**
 * @typedef {{ tokensFile?: string; allowedPrefixes?: string[] }} Options
 * @type {import('stylelint').Rule<boolean, Options>}
 */
const rule = (primary, secondary) => (root, result) => {
  const valid = validateOptions(
    result,
    name,
    { actual: primary, possible: [true] },
    {
      actual: secondary,
      possible: {
        tokensFile: [value => typeof value === 'string'],
        allowedPrefixes: [value => typeof value === 'string'],
      },
      optional: true,
    },
  );
  if (!valid) {
    return;
  }
  const tokens = readTokens(secondary?.tokensFile ?? DEFAULT_TOKENS_FILE);
  const allowedPrefixes = secondary?.allowedPrefixes ?? DEFAULT_ALLOWED_PREFIXES;
  /** @type {Set<string>} */
  const declared = new Set();
  root.walkDecls(decl => {
    if (decl.prop.startsWith('--')) {
      declared.add(decl.prop);
    }
  });

  root.walkDecls(decl => {
    valueParser(decl.value).walk(node => {
      if (node.type !== 'function' || node.value.toLowerCase() !== 'var') {
        return;
      }
      const property = node.nodes.find(child => child.type === 'word')?.value;
      if (
        !property?.startsWith('--') ||
        tokens.has(property) ||
        declared.has(property) ||
        allowedPrefixes.some(prefix => property.startsWith(prefix))
      ) {
        return;
      }
      report({ message: messages.rejected(property), node: decl, word: property, result, ruleName: name });
    });
  });
};

rule.ruleName = name;
rule.messages = messages;
rule.meta = { url: ruleUrl('no-unknown-tokens') };

export default createPlugin(name, rule);
