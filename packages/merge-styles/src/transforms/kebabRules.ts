const rules: { [key: string]: string } = {};

export function kebabRules(rulePairs: (string | number)[], index: number): void {
  const rule: string = rulePairs[index] as string;

  if (rule.charAt(0) !== '-') {
    rulePairs[index] = rules[rule] = rules[rule] || rule.replace(/([A-Z])/g, '-$1').toLowerCase();
  }
}
