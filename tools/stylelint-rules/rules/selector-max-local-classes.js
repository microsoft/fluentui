import stylelint from 'stylelint';
import { hasAtRuleAncestor, parentRule, parseSelector, ruleName, ruleUrl } from '../utils.js';

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const name = ruleName('selector-max-local-classes');

const messages = ruleMessages(name, {
  rejected: (/** @type {string} */ selector, /** @type {number} */ count, /** @type {number} */ max) =>
    `Expected "${selector}" to have at most ${max} local class${
      max === 1 ? '' : 'es'
    } outside :where(), but found ${count}. ` +
    'Wrap state qualifiers in :where() so the selector keeps the specificity of the Griffel rule it replaces.',
});

/** Pseudo-classes whose specificity is the most specific of their arguments. */
const MAX_OF_ARGUMENTS = new Set([':is', ':not', ':has', ':matches', ':-webkit-any', ':-moz-any', ':local']);

/**
 * Counts local classes contributing to specificity. `:where()` contributes nothing and `:global()` classes are the
 * public `fui-*` slot class names Griffel selectors also use.
 *
 * @param {import('postcss-selector-parser').Container} container
 * @param {number} nestingCount
 * @returns {number}
 */
function countLocalClasses(container, nestingCount) {
  let count = 0;
  let global = false;
  for (const node of container.nodes) {
    if (node.type === 'combinator') {
      continue;
    }
    if (node.type === 'nesting') {
      count += nestingCount;
    } else if (node.type === 'class' && !global) {
      count += 1;
    } else if (node.type === 'pseudo') {
      const pseudo = node.value.toLowerCase();
      if (pseudo === ':global' || pseudo === ':local') {
        if (node.nodes.length === 0) {
          global = pseudo === ':global';
          continue;
        }
      }
      if (MAX_OF_ARGUMENTS.has(pseudo) && node.nodes.length > 0) {
        count += Math.max(...node.nodes.map(selector => countLocalClasses(selector, nestingCount)));
      }
    } else if (node.type === 'selector') {
      count += countLocalClasses(node, nestingCount);
    }
  }
  return count;
}

/** @type {WeakMap<import('postcss').Rule, Array<{ selector: string; count: number; parentCount: number }>>} */
const cache = new WeakMap();

/**
 * Resolves nested rules the way native CSS nesting does: `&` (and the implicit parent of a relative nested
 * selector) carries the specificity of the most specific parent selector.
 *
 * @param {import('postcss').Rule} rule
 */
function selectorCounts(rule) {
  const cached = cache.get(rule);
  if (cached) {
    return cached;
  }
  const parent = parentRule(rule);
  const parentCount = parent ? Math.max(0, ...selectorCounts(parent).map(entry => entry.count)) : 0;
  const ast = parseSelector(rule.selector);
  /** @type {Array<{ selector: string; count: number; parentCount: number }>} */
  const counts = [];
  for (const selector of ast?.nodes ?? []) {
    let hasNesting = false;
    selector.walkNesting(() => {
      hasNesting = true;
    });
    const count = countLocalClasses(selector, parentCount) + (parent && !hasNesting ? parentCount : 0);
    counts.push({ selector: selector.toString().trim(), count, parentCount });
  }
  cache.set(rule, counts);
  return counts;
}

/** @type {import('stylelint').Rule<number>} */
const rule = primary => (root, result) => {
  const valid = validateOptions(result, name, {
    actual: primary,
    possible: [value => Number.isInteger(value) && /** @type {number} */ (value) >= 0],
  });
  if (!valid) {
    return;
  }
  root.walkRules(node => {
    if (hasAtRuleAncestor(node, 'keyframes')) {
      return;
    }
    for (const { selector, count, parentCount } of selectorCounts(node)) {
      // A nested selector adding no classes is already reported on its parent.
      if (count > primary && count > parentCount) {
        report({ message: messages.rejected(selector, count, primary), node, result, ruleName: name });
      }
    }
  });
};

rule.ruleName = name;
rule.messages = messages;
rule.meta = { url: ruleUrl('selector-max-local-classes') };

export default createPlugin(name, rule);
