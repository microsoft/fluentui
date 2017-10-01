const _nameReplacements: { [key: string]: string } = {
  left: 'right',
  right: 'left'
};

const _valueReplacements: { [key: string]: string } = {
  'w-resize': 'e-resize',
  'sw-resize': 'se-resize',
  'nw-resize': 'ne-resize'
};

const NO_FLIP = '@noflip';

let _rtl = getRTL();

export function setRTL(isRTL: boolean): void {
  _rtl = isRTL;
}
export function getRTL(): boolean {
  if (_rtl === undefined) {
    _rtl =
      typeof document !== 'undefined' &&
      !!document.documentElement &&
      document.documentElement.getAttribute('dir') === 'rtl';
  }
  return _rtl;
}

export function rtlifyRules(rulePairs: (string | number)[], index: number): void {
  if (getRTL()) {
    const name = rulePairs[index] as string;
    const value = rulePairs[index + 1] as string;

    if (value.indexOf(NO_FLIP) >= 0) {
      rulePairs[index + 1] = value.replace(/\s*(?:\/\*\s*)?\@noflip\b(?:\s*\*\/)?\s*?/g, '');
    } else if (name.indexOf('left') >= 0) {
      rulePairs[index] = name.replace('left', 'right');
    } else if (name.indexOf('right') >= 0) {
      rulePairs[index] = name.replace('right', 'left');
    } else if (String(value).indexOf('left') >= 0) {
      rulePairs[index + 1] = value.replace('left', 'right');
    } else if (String(value).indexOf('right') >= 0) {
      rulePairs[index + 1] = value.replace('right', 'left');
    } else if (_nameReplacements[name]) {
      rulePairs[index] = _nameReplacements[name];
    } else if (_valueReplacements[value]) {
      rulePairs[index + 1] = _valueReplacements[value];
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

function negateNum(value: string, partIndex: number): string {
  const parts = value.split(' ');
  const numberVal = parseInt(parts[partIndex], 10);

  parts[0] = parts[0].replace(String(numberVal), String(numberVal * -1));

  return parts.join(' ');
}

function flipQuad(value: string): string {
  if (typeof value === 'string') {
    const parts = value.split(' ');

    if (parts.length === 4) {
      return `${parts[0]} ${parts[3]} ${parts[2]} ${parts[1]}`;
    }
  }

  return value;
}
