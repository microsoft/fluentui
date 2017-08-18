const _nameReplacements: { [key: string]: string } = {
  'left': 'right',
  'right': 'left'
};

const _valueReplacements: { [key: string]: string } = {
  'w-resize': 'e-resize',
  'sw-resize': 'se-resize',
  'nw-resize': 'ne-resize'
};

const NO_FLIP = 'noflip';

let _rtl = getRTL();

export function setRTL(isRTL: boolean): void {
  _rtl = isRTL;
}
export function getRTL(): boolean {
  if (_rtl === undefined) {
    _rtl = (
      typeof document !== undefined &&
      !!document.documentElement &&
      document.documentElement.getAttribute('dir') === 'rtl'
    );
  }
  return _rtl;
}

export function rtlifyRules(rulePairs: string[]): string[] {
  if (getRTL()) {
    for (let nameIndex = 0, valueIndex = 1; nameIndex < rulePairs.length; nameIndex += 2, valueIndex += 2) {
      let name = rulePairs[nameIndex];
      let value = rulePairs[valueIndex];

      if (value.indexOf(NO_FLIP) >= 0) {
        continue;
      } else if (name.indexOf('Left') >= 0) {
        rulePairs[nameIndex] = name.replace('Left', 'Right');
      } else if (name.indexOf('Right') >= 0) {
        rulePairs[nameIndex] = name.replace('Right', 'Left');
      } else if (String(value).indexOf('left') >= 0) {
        rulePairs[valueIndex] = value.replace('left', 'right');
      } else if (String(value).indexOf('right') >= 0) {
        rulePairs[valueIndex] = value.replace('right', 'left');
      } else if (_nameReplacements[name]) {
        rulePairs[nameIndex] = _nameReplacements[name];
      } else if (_valueReplacements[value]) {
        rulePairs[valueIndex] = _valueReplacements[value];
      } else {
        switch (name) {
          case 'margin':
          case 'padding':
            rulePairs[valueIndex] = flipQuad(value);
            break;
          case 'boxShadow':
            rulePairs[valueIndex] = negateNum(value, 0);
            break;
        }
      }
    }
  }

  return rulePairs;
}

function negateNum(value: string, partIndex: number): string {
  let parts = value.split(' ');
  let numberVal = parseInt(parts[partIndex], 10);

  parts[0] = parts[0].replace(String(numberVal), String(numberVal * -1));

  return parts.join(' ');
}

function flipQuad(value: string): string {
  if (typeof value === 'string') {
    let parts = value.split(' ');

    if (parts.length === 4) {
      return `${parts[0]} ${parts[3]} ${parts[2]} ${parts[1]}`;
    }
  }

  return value;
}