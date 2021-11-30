import { MakeStaticStylesStyle, MakeStylesStyle } from '../../types';
import { hyphenateProperty } from './hyphenateProperty';

export function cssifyObject(style: MakeStylesStyle | MakeStaticStylesStyle) {
  let css = '';

  // eslint-disable-next-line guard-for-in
  for (const property in style) {
    const value = style[property as keyof MakeStylesStyle];

    if (typeof value !== 'string' && typeof value !== 'number') {
      continue;
    }

    css += hyphenateProperty(property) + ':' + value + ';';
  }

  return css;
}
