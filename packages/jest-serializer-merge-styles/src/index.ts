import { Stylesheet } from '@uifabric/merge-styles';
import './version';

export function print(val: string, serialize: () => string, indent: (val: string) => string): string {
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

  return [``, `${classNames.map((cn: string) => indent(cn)).join('\n')}`, `${rules.join('\n')}`].join('\n');
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
  const stylesheet = Stylesheet.getInstance();

  for (let i = 0; i < rules.length; i += 2) {
    const selector = rules[i];
    const insertedRules = rules[i + 1];

    if (insertedRules) {
      ruleStrings.push(indent((i === 0 ? '' : selector + ' ') + `{`));

      insertedRules
        .split(';')
        .sort()
        .forEach((rule: string) => {
          if (rule) {
            const [name, value] = rule.split(':');
            let delimiter: string | RegExp = ' ';

            if (name === 'animation-name') {
              delimiter = /[ ,]+/;
            }

            const valueParts = value.split(delimiter);
            let result: string[] = [];

            for (const part of valueParts) {
              const ruleSet = stylesheet.insertedRulesFromClassName(part);

              if (ruleSet) {
                result = result.concat(ruleSet);
              } else {
                result.push(part);
              }
            }

            ruleStrings.push(indent(`  ${name}: ${result.join(' ')};`));
          }
        });

      ruleStrings.push(indent('}'));
    }
  }

  return ruleStrings.join('\n');
}
