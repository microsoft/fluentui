import type { UserAuthoredStyles as StyleXStyle } from '@stylexjs/stylex/lib/StyleXTypes';
import { css } from 'react-strict-dom';

const classNameMap: Record<string, StyleXStyle> = {};
let uniqueId = 1;

export const getUniqueClassName = (slotName: string) => {
  return `${slotName}-${uniqueId++}`;
};

export const registerStyles = (styles: Record<string, StyleXStyle>) => {
  Object.assign(classNameMap, css.create(styles));
};

export const getStylesFromClassName = (className: string): StyleXStyle[] => {
  return className.split(' ').map(c => classNameMap[c]);
};
