import { DEFINITION_LOOKUP_TABLE, RULE_CLASSNAME_INDEX, RTL_PREFIX } from '@fluentui/make-styles';

export function print(val: string) {
  const undesiredParts: string[] = [];
  const lookupRegex = new RegExp(`${Object.keys(DEFINITION_LOOKUP_TABLE).join('|')}`, 'g');
  let result: RegExpExecArray | null = null;
  while ((result = lookupRegex.exec(val))) {
    const [name] = result;
    const [definitions] = DEFINITION_LOOKUP_TABLE[name];
    const rules = Object.keys(definitions).map(key => `${RTL_PREFIX}?${definitions[key][RULE_CLASSNAME_INDEX]}`);
    undesiredParts.push(name, ...rules);
  }
  return JSON.stringify(val.replace(new RegExp(`${undesiredParts.join('|')}`, 'g'), '').trim());
}

export function test(val: unknown) {
  if (typeof val === 'string') {
    const lookupRegex = new RegExp(`${Object.keys(DEFINITION_LOOKUP_TABLE).join('|')}`);
    return lookupRegex.test(val);
  }
  return false;
}
