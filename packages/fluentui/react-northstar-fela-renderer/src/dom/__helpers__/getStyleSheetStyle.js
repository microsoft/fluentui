/* eslint-disable */
import { RULE_TYPE } from '../../../../fela-utils/src/styleTypes';

function getRules(cssRules, rules = {}) {
  for (let i = 0; i < cssRules.length; ++i) {
    const rule = cssRules[i];
    const { selectorText, conditionText, style } = rule;

    if (conditionText) {
      rules[conditionText] = getRules(rule.cssRules);
      continue;
    }

    const key = cssRules.indexOf(rule) + '_' + selectorText;
    rules[key] = {};

    for (let j = 0; j < style.length; ++j) {
      const property = style[j];
      rules[key][property] = style[property];
    }
  }

  return rules;
}

export default function getStyleSheetStyle(node) {
  const { media, sheet, textContent } = node;

  const type = node.getAttribute('data-fela-type');
  const support = node.getAttribute('data-fela-support') || false;

  if (type !== RULE_TYPE) {
    return { _type: type, style: textContent };
  }

  const rules = getRules(sheet.cssRules);

  return { _type: type, _media: media, _support: support, style: rules };
}
