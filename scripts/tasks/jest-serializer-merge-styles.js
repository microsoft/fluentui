let { Stylesheet } = require('@uifabric/merge-styles');

module.exports = {
  print(val, serialize, indent) {
    let classNames = [];
    let rules = [];
    let parts = val.split(' ');

    for (let part of parts) {
      let ruleSet = Stylesheet.getInstance().insertedRulesFromClassName(part);

      if (ruleSet) {
        rules.push(serializeRules(ruleSet, indent));
      } else {
        classNames.push(part);
      }
    }

    return (
      [
        ``,
        `${classNames.map(cn => indent(cn)).join('\n')}`,
        `${rules.join('\n')}`
      ].join('\n')
    );
  },

  test(val) {
    if (typeof val === 'string') {
      let parts = val.split(' ');

      return parts.some(part => Stylesheet.getInstance().insertedRulesFromClassName(part));
    }

    return false;
  }
};

function serializeRules(rules, indent) {
  let ruleStrings = [];

  for (let i = 0; i < rules.length; i += 2) {
    const selector = rules[i];
    const insertedRules = rules[i + 1];

    if (insertedRules) {
      ruleStrings.push(indent((i === 0 ? '' : selector + ' ') + `{`));

      insertedRules.split(';').sort().forEach(rule => {
        if (rule) {
          ruleStrings.push(indent('  ' + rule.replace(':', ': ') + ';'));
        }
      });

      ruleStrings.push(indent('}'));
    }
  }

  return ruleStrings.join('\n');
}