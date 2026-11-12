import stylelint from 'stylelint';
import valueParser from 'postcss-value-parser';
import { parentRule, ruleName, ruleUrl } from '../utils.js';

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const name = ruleName('use-logical-properties');

const messages = ruleMessages(name, {
  property: (/** @type {string} */ physical, /** @type {string} */ logical) =>
    `Expected "${logical}" instead of "${physical}". Griffel flips physical properties in RTL; plain CSS does not.`,
  value: (/** @type {string} */ property, /** @type {string} */ physical, /** @type {string} */ logical) =>
    `Expected "${property}: ${logical}" instead of "${property}: ${physical}". Griffel flips physical values in RTL; plain CSS does not.`,
  shorthand: (/** @type {string} */ property) =>
    `Unexpected asymmetric "${property}" shorthand. Griffel flips its left and right values in RTL; use logical longhands.`,
});

/** @type {Record<string, string>} */
const PROPERTIES = {
  left: 'inset-inline-start',
  right: 'inset-inline-end',
  'margin-left': 'margin-inline-start',
  'margin-right': 'margin-inline-end',
  'padding-left': 'padding-inline-start',
  'padding-right': 'padding-inline-end',
  'scroll-margin-left': 'scroll-margin-inline-start',
  'scroll-margin-right': 'scroll-margin-inline-end',
  'scroll-padding-left': 'scroll-padding-inline-start',
  'scroll-padding-right': 'scroll-padding-inline-end',
  'border-left': 'border-inline-start',
  'border-right': 'border-inline-end',
  'border-left-width': 'border-inline-start-width',
  'border-right-width': 'border-inline-end-width',
  'border-left-style': 'border-inline-start-style',
  'border-right-style': 'border-inline-end-style',
  'border-left-color': 'border-inline-start-color',
  'border-right-color': 'border-inline-end-color',
  'border-top-left-radius': 'border-start-start-radius',
  'border-top-right-radius': 'border-start-end-radius',
  'border-bottom-left-radius': 'border-end-start-radius',
  'border-bottom-right-radius': 'border-end-end-radius',
};

/** @type {Record<string, Record<string, string>>} */
const VALUES = {
  float: { left: 'inline-start', right: 'inline-end' },
  clear: { left: 'inline-start', right: 'inline-end' },
  'text-align': { left: 'start', right: 'end' },
};

/** Box shorthands whose second and fourth values are the right and left sides. */
const BOX_SHORTHANDS = new Set([
  'margin',
  'padding',
  'inset',
  'scroll-margin',
  'scroll-padding',
  'border-width',
  'border-style',
  'border-color',
]);

/** @param {string} value */
function topLevelValues(value) {
  return valueParser(value)
    .nodes.filter(node => node.type !== 'space' && node.type !== 'comment')
    .map(node => valueParser.stringify(node));
}

/** @param {string[]} values top-left, top-right, bottom-right, bottom-left */
function isAsymmetricRadius(values) {
  const [topLeft, topRight = topLeft, bottomRight = topLeft, bottomLeft = topRight] = values;
  return topLeft !== topRight || bottomRight !== bottomLeft;
}

/** @param {import('postcss').Declaration} decl */
function isAsymmetricShorthand(decl) {
  const property = decl.prop.toLowerCase();
  const values = topLevelValues(decl.value);
  if (BOX_SHORTHANDS.has(property)) {
    return values.length === 4 && values[1] !== values[3];
  }
  if (property === 'border-radius') {
    const slash = values.indexOf('/');
    return slash === -1
      ? isAsymmetricRadius(values)
      : isAsymmetricRadius(values.slice(0, slash)) || isAsymmetricRadius(values.slice(slash + 1));
  }
  return false;
}

/**
 * Rules scoped to a direction already handle RTL explicitly, so their physical properties are intentional.
 *
 * @param {import('postcss').Declaration} decl
 */
function isDirectionScoped(decl) {
  for (let rule = parentRule(decl); rule; rule = parentRule(rule)) {
    if (/\[\s*dir\b|:dir\(|\.(?:rtl|ltr)\b/i.test(rule.selector)) {
      return true;
    }
  }
  return false;
}

/** @type {import('stylelint').Rule<boolean>} */
const rule = primary => (root, result) => {
  if (!validateOptions(result, name, { actual: primary, possible: [true] })) {
    return;
  }
  root.walkDecls(decl => {
    if (decl.prop.startsWith('--') || isDirectionScoped(decl)) {
      return;
    }
    const property = decl.prop.toLowerCase();
    const logicalProperty = PROPERTIES[property];
    if (logicalProperty) {
      report({
        message: messages.property(decl.prop, logicalProperty),
        node: decl,
        word: decl.prop,
        result,
        ruleName: name,
        fix: () => {
          decl.prop = logicalProperty;
        },
      });
      return;
    }
    const logicalValue = VALUES[property]?.[decl.value.trim().toLowerCase()];
    if (logicalValue) {
      report({
        message: messages.value(decl.prop, decl.value.trim(), logicalValue),
        node: decl,
        word: decl.value,
        result,
        ruleName: name,
        fix: () => {
          decl.value = logicalValue;
        },
      });
      return;
    }
    if (isAsymmetricShorthand(decl)) {
      report({ message: messages.shorthand(decl.prop), node: decl, word: decl.prop, result, ruleName: name });
    }
  });
};

rule.ruleName = name;
rule.messages = messages;
rule.meta = { url: ruleUrl('use-logical-properties'), fixable: true };

export default createPlugin(name, rule);
