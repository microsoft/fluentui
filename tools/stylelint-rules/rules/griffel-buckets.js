import postcss from 'postcss';
import stylelint from 'stylelint';
import { DIRECTIVE, deriveFromGriffelSource, formatDirective, parseDirective } from '../griffel-buckets.js';
import { parseSelector, ruleName, ruleUrl } from '../utils.js';

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const name = ruleName('griffel-buckets');

const messages = ruleMessages(name, {
  missing: (/** @type {string} */ expected) =>
    `Expected "/* ${expected} */" at the top of the stylesheet, derived from its Griffel styles.`,
  mismatch: (/** @type {string} */ actual, /** @type {string} */ expected) =>
    `Expected "${expected}" instead of "${actual}", derived from the Griffel styles.`,
  unexpected: () =>
    `Unexpected ${DIRECTIVE} directive: its Griffel styles have no reset classes or logical properties.`,
  invalid: (/** @type {string} */ reason) => `Invalid ${DIRECTIVE} directive: ${reason}.`,
  duplicate: () => `Unexpected second ${DIRECTIVE} directive.`,
  position: () => `Expected the ${DIRECTIVE} directive before the first rule.`,
  unknownClass: (/** @type {string} */ className) => `Unexpected reset class ".${className}": no rule uses it.`,
  unknownProperty: (/** @type {string} */ property) =>
    `Unexpected logical property "${property}": no declaration uses it.`,
});

/**
 * Local classes used by the stylesheet's selectors (classes inside `:global()` excluded).
 *
 * @param {import('postcss').Root} root
 */
function getLocalClassNames(root) {
  const classNames = new Set();
  root.walkRules(rule => {
    parseSelector(rule.selector)?.walkClasses(node => {
      let parent = node.parent?.parent;
      while (parent && !(parent.type === 'pseudo' && parent.value === ':global')) {
        parent = parent.parent?.parent;
      }
      if (!parent) {
        classNames.add(node.value);
      }
    });
  });
  return classNames;
}

/** @param {import('postcss').Root} root */
function getDeclaredProperties(root) {
  /** @type {string[]} */
  const properties = [];
  root.walkDecls(decl => {
    const property = decl.prop.toLowerCase();
    if (!properties.includes(property)) {
      properties.push(property);
    }
  });
  return properties;
}

/** @param {string[]} a @param {string[]} b */
const sameMembers = (a, b) => a.length === b.length && a.every(value => b.includes(value));

/** @type {import('stylelint').Rule<boolean>} */
const rule = primary => (root, result) => {
  if (!validateOptions(result, name, { actual: primary, possible: [true] })) {
    return;
  }

  /** @type {import('postcss').Comment | undefined} */
  let directive;
  let seenRule = false;
  for (const node of root.nodes) {
    if (node.type !== 'comment') {
      seenRule = true;
      continue;
    }
    if (parseDirective(node.text) === undefined) {
      continue;
    }
    if (directive) {
      report({ message: messages.duplicate(), node, result, ruleName: name });
      continue;
    }
    directive = node;
    if (seenRule) {
      report({ message: messages.position(), node, result, ruleName: name });
    }
  }
  root.walkComments(comment => {
    if (comment.parent !== root && parseDirective(comment.text) !== undefined) {
      report({ message: messages.position(), node: comment, result, ruleName: name });
    }
  });

  const parsed = directive ? parseDirective(directive.text) : undefined;
  if (parsed instanceof Error) {
    report({
      message: messages.invalid(parsed.message),
      node: /** @type {import('postcss').Comment} */ (directive),
      result,
      ruleName: name,
    });
    return;
  }

  const declaredProperties = getDeclaredProperties(root);
  if (parsed && directive) {
    const classNames = getLocalClassNames(root);
    for (const className of parsed.resetClassNames.filter(value => !classNames.has(value))) {
      report({
        message: messages.unknownClass(className),
        node: directive,
        word: `.${className}`,
        result,
        ruleName: name,
      });
    }
    for (const property of parsed.logicalProperties.filter(value => !declaredProperties.includes(value))) {
      report({ message: messages.unknownProperty(property), node: directive, word: property, result, ruleName: name });
    }
  }

  const file = root.source?.input.file;
  const derived = file ? deriveFromGriffelSource(file) : undefined;
  if (!derived) {
    return;
  }
  // Only logical properties the stylesheet declares matter, in the order it declares them.
  const expected = {
    resetClassNames: derived.resetClassNames,
    logicalProperties: declaredProperties.filter(property => derived.logicalProperties.includes(property)),
  };
  const isEmpty = expected.resetClassNames.length === 0 && expected.logicalProperties.length === 0;
  const expectedText = formatDirective(expected);

  if (!directive) {
    if (!isEmpty) {
      report({
        message: messages.missing(expectedText),
        node: root,
        index: 0,
        endIndex: 0,
        result,
        ruleName: name,
        fix: () => {
          root.prepend(postcss.comment({ text: expectedText }));
          // Keeps the directive on its own line above the first rule.
          if (root.nodes[1]) {
            root.nodes[1].raws.before = '\n';
          }
        },
      });
    }
    return;
  }

  if (isEmpty) {
    report({ message: messages.unexpected(), node: directive, result, ruleName: name, fix: () => directive.remove() });
    return;
  }
  const actual = /** @type {import('../griffel-buckets.js').GriffelBuckets} */ (parsed);
  if (
    !sameMembers(actual.resetClassNames, expected.resetClassNames) ||
    !sameMembers(actual.logicalProperties, expected.logicalProperties)
  ) {
    report({
      message: messages.mismatch(directive.text.trim(), expectedText),
      node: directive,
      result,
      ruleName: name,
      fix: () => {
        directive.text = expectedText;
      },
    });
  }
};

rule.ruleName = name;
rule.messages = messages;
rule.meta = { url: ruleUrl('griffel-buckets'), fixable: true };

export default createPlugin(name, rule);
