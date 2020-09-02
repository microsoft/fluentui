import { IStyleOptions } from '../IStyleOptions';

const LEFT = 'left';
const RIGHT = 'right';
const NO_FLIP = '@noflip';
const NAME_REPLACEMENTS: { [key: string]: string } = {
  [LEFT]: RIGHT,
  [RIGHT]: LEFT,
};
const VALUE_REPLACEMENTS: { [key: string]: string } = {
  'w-resize': 'e-resize',
  'sw-resize': 'se-resize',
  'nw-resize': 'ne-resize',
};

/**
 * RTLifies the rulePair in the array at the current index. This mutates the array for performance
 * reasons.
 */
export function rtlifyRules(options: IStyleOptions, rulePairs: (string | number)[], index: number): void {
  if (options.rtl) {
    const name = rulePairs[index] as string;

    if (!name) {
      return;
    }

    const value = rulePairs[index + 1] as string;

    if (typeof value === 'string' && value.indexOf(NO_FLIP) >= 0) {
      rulePairs[index + 1] = value.replace(/\s*(?:\/\*\s*)?\@noflip\b(?:\s*\*\/)?\s*?/g, '');
    } else if (name.indexOf(LEFT) >= 0) {
      rulePairs[index] = name.replace(LEFT, RIGHT);
    } else if (name.indexOf(RIGHT) >= 0) {
      rulePairs[index] = name.replace(RIGHT, LEFT);
    } else if (String(value).indexOf(LEFT) >= 0) {
      rulePairs[index + 1] = value.replace(LEFT, RIGHT);
    } else if (String(value).indexOf(RIGHT) >= 0) {
      rulePairs[index + 1] = value.replace(RIGHT, LEFT);
    } else if (NAME_REPLACEMENTS[name]) {
      rulePairs[index] = NAME_REPLACEMENTS[name];
    } else if (VALUE_REPLACEMENTS[value]) {
      rulePairs[index + 1] = VALUE_REPLACEMENTS[value];
    } else {
      switch (name) {
        case 'margin':
        case 'padding':
          rulePairs[index + 1] = flipQuad(value);
          break;
        case 'box-shadow':
          rulePairs[index + 1] = negateNum(value, 0);
          break;
      }
    }
  }
}

/**
 * Given a string value in a space delimited format (e.g. "1 2 3 4"), negates a particular value.
 */
function negateNum(value: string, partIndex: number): string {
  const parts = value.split(' ');
  const numberVal = parseInt(parts[partIndex], 10);

  parts[0] = parts[0].replace(String(numberVal), String(numberVal * -1));

  return parts.join(' ');
}

/**
 * Given a string quad, flips the left and right values.
 */
function flipQuad(value: string): string {
  if (typeof value === 'string') {
    const parts = value.split(' ');

    if (parts.length === 4) {
      return `${parts[0]} ${parts[3]} ${parts[2]} ${parts[1]}`;
    }
  }

  return value;
}
