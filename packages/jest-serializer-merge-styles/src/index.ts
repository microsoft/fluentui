import { Stylesheet } from '@fluentui/merge-styles';

/**
 * Jest serialize function which takes in a given (className) value, a serialize function, and
 * an indent level and returns a string. See more information here:
 *
 * https://jestjs.io/docs/en/configuration.html#snapshotserializers-array-string
 */
export function print(val: string, serialize: () => string, indent: (val: string) => string): string {
  const classNames = [];
  const rules = [];
  const parts = val.split(' ');

  // Iterate through all class names in the value, and for each, determine if merge-styles
  // has a ruleset registered for the class. If so, serialize it to an expanded string. If not
  // add it to the static classNames array, as it's likely a global class name.
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

/**
 * Jest test function to determine if this serializer will handle the given value.
 * In our test function we test if the value is a className, which has classes that
 * merge-styles can recognize. If so, we return true, which instructs jest to use
 * our print function to translate the class input into expanded rules.
 */
export function test(val: string): boolean {
  if (typeof val === 'string') {
    const parts = val.split(' ');

    return parts.some((part: string): boolean => !!Stylesheet.getInstance().insertedRulesFromClassName(part));
  }

  return false;
}

/**
 * Given a ruleSet (an array of doubles (selector and insertedRules string)), and an indent,
 * produce a serialized version of the rules.
 */
function _serializeRules(rules: string[], indent: (val: string) => string): string {
  const ruleStrings: string[] = [];
  const stylesheet = Stylesheet.getInstance();

  for (let i = 0; i < rules.length; i += 2) {
    const selector = rules[i];
    const insertedRules = rules[i + 1];

    if (insertedRules) {
      // Keyframes should not be parsed like other selector/rule mappings.
      if (selector !== 'keyframes') {
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

              let result: string[] = [];

              if (value) {
                const valueParts = value.split(delimiter);

                for (const part of valueParts) {
                  const ruleSet = stylesheet.insertedRulesFromClassName(part);

                  if (ruleSet) {
                    result = result.concat(ruleSet);
                  } else {
                    result.push(part);
                  }
                }
              }

              ruleStrings.push(indent(`  ${name}: ${result.join(' ')};`));
            }
          });

        ruleStrings.push(indent('}'));
      }
    }
  }

  return ruleStrings.join('\n');
}
