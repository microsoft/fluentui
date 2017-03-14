export function applyRTLFlip(ltrStyles: any, isRTL: boolean) {
  let convertedStyles = {};

  for (let name in ltrStyles) {
    if (ltrStyles.hasOwnProperty(name)) {
      let value = ltrStyles[name];
      if (typeof value === 'object') {
        convertedStyles[name] = makeRTLSafe(value, isRTL);
      } else if (isRTL) {
        switch (name) {
          case 'left':
            convertedStyles['right'] = value;
            break;
          case 'right':
            convertedStyles['left'] = value;
            break;
          case 'margin-left':
            convertedStyles['margin-right'] = value;
            break;
          case 'margin-right':
            convertedStyles['margin-left'] = value;
            break;
          case 'padding-left':
            convertedStyles['padding-right'] = value;
            break;
          case 'padding-right':
            convertedStyles['padding-left'] = value;
            break;
          case 'border-left':
            convertedStyles['border-right'] = value;
            break;
          case 'border-right':
            convertedStyles['border-left'] = value;
            break;
          case 'float':
            convertedStyles['float'] = value === 'left' ? 'right' : value === 'right' ? 'left' : value;
            break;
          case 'padding':
            convertedStyles['padding'] = makeSpacingRTLSafe(value);
            break;
          case 'margin':
            convertedStyles['margin'] = makeSpacingRTLSafe(value);
            break;
          default:
            convertedStyles[name] = value;
        }
      } else {
        convertedStyles[name] = value;
      }
    }
  }
}

function makeSpacingRTLSafe(spacing: string): string {
  let parts = spacing.split(' ');

  if (parts.length === 4) {
    return [
      parts[0],
      parts[3],
      parts[2],
      parts[1]
    ].join(' ');
  }

  return spacing;
}
