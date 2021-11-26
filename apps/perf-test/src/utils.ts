export const RULE_COUNT = 10000;

const lookup = 'forced-colors';
export const forcedColorsFilter = (cssRule: string) => {
  if (cssRule[0] !== '@') {
    return true;
  }

  if (cssRule.substring(1, 6) !== 'media') {
    return true;
  }

  let i = 0;
  let cur = 0;
  while (cssRule[i] !== '{' && cur < lookup.length) {
    if (cssRule[i] === lookup[cur]) {
      cur++;
    } else {
      cur = 0;
    }

    i++;
  }

  if (cur !== lookup.length) {
    return true;
  }

  return false;
};
