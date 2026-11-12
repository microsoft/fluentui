import selectorParser from 'postcss-selector-parser';

export const NAMESPACE = 'fluentui';

/** @param {string} name */
export const ruleName = name => `${NAMESPACE}/${name}`;

/** @param {string} name */
export const ruleUrl = name =>
  `https://github.com/microsoft/fluentui/blob/master/tools/stylelint-rules/README.md#${NAMESPACE}${name}`;

/**
 * @param {import('postcss').Node | undefined} node
 * @returns {import('postcss').Rule | undefined}
 */
export function parentRule(node) {
  let current = node?.parent;
  while (current && current.type !== 'root') {
    if (current.type === 'rule') {
      return /** @type {import('postcss').Rule} */ (current);
    }
    current = current.parent;
  }
  return undefined;
}

/**
 * @param {import('postcss').Node} node
 * @param {string} name
 */
export function hasAtRuleAncestor(node, name) {
  let current = node.parent;
  while (current && current.type !== 'root') {
    if (current.type === 'atrule' && /** @type {import('postcss').AtRule} */ (current).name.endsWith(name)) {
      return true;
    }
    current = current.parent;
  }
  return false;
}

/**
 * Parses a selector list; returns undefined for selectors postcss-selector-parser cannot handle.
 *
 * @param {string} selector
 */
export function parseSelector(selector) {
  try {
    return selectorParser().astSync(selector);
  } catch {
    return undefined;
  }
}
