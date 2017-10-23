import { Stylesheet } from '@uifabric/merge-styles';

export function print(
  val: string,
  serialize: () => string,
  indent: (val: string) => string
): string {
  const classNames = [];
  const rules = [];
  const parts = val.split(' ');

  for (const part of parts) {
    const ruleSet = Stylesheet.getInstance().insertedRulesFromClassName(part);

    if (ruleSet) {
      rules.push(_serializeRules(ruleSet, indent));
    } else {
      classNames.push(part);
    }
  }

  return (
    [
      ``,
      `${classNames.map((cn: string) => indent(cn)).join('\n')}`,
      `${rules.join('\n')}`
    ].join('\n')
  );
}

export function test(val: string): boolean {
  if (typeof val === 'string') {
    const parts = val.split(' ');

    return parts.some((part: string): boolean => !!Stylesheet.getInstance().insertedRulesFromClassName(part));
  }

  return false;
}

function _serializeRules(rules: string[], indent: (val: string) => string): string {
  const ruleStrings: string[] = [];

  for (let i = 0; i < rules.length; i += 2) {
    const selector = rules[i];
    const insertedRules = rules[i + 1];

    if (insertedRules) {
      ruleStrings.push(indent((i === 0 ? '' : selector + ' ') + `{`));

      insertedRules.split(';').sort().forEach((rule: string) => {
        if (rule) {
          ruleStrings.push(indent('  ' + rule.replace(':', ': ') + ';'));
        }
      });

      ruleStrings.push(indent('}'));
    }
  }

  return ruleStrings.join('\n');
}