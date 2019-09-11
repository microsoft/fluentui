function makeKebabMap(): { [key: string]: string } {
  const kebabMap: { [key: string]: string } = {};
  const elementStyles = document.createElement('div').style;
  let key: string;
  for (key in elementStyles) {
    kebabMap[key] = key.replace(/([A-Z])/g, '-$1').toLowerCase();
  }
  return kebabMap;
}

const rules: { [key: string]: string } = makeKebabMap();

export function kebabRules(rulePairs: (string | number)[], index: number): void {
  const rule: string = rulePairs[index] as string;

  rulePairs[index] = rules[rule] = rules[rule] || rule.replace(/([A-Z])/g, '-$1').toLowerCase();
}
