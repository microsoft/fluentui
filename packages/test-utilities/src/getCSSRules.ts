export function getCSSRules(style: HTMLStyleElement): string[] | undefined {
  const rules = (style.sheet as CSSStyleSheet)?.cssRules;
  if (!rules) {
    return undefined;
  }

  const ruleText = [];

  // eslint-disable-next-line guard-for-in
  for (const r in rules) {
    const rule = rules[r];
    ruleText.push(rule.cssText);
  }

  return ruleText;
}
