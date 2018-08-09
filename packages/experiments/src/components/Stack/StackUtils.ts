/**
 * Functions to convert Vertical/Horizontal Stack alignment names (top, bottom, left, right)
 * to Stack alignment names (start, end)
 */

import { Alignment } from './Stack.types';

const verticalAlignmentMap: { [key: string]: string } = {
  top: 'start',
  bottom: 'end'
};

const horizontalAlignmentMap: { [key: string]: string } = {
  left: 'start',
  right: 'end'
};

export const getVerticalAlignment = (alignment: string | undefined) => {
  return (verticalAlignmentMap[alignment!] || alignment) as Alignment;
};

export const getHorizontalAlignment = (alignment: string | undefined) => {
  return (horizontalAlignmentMap[alignment!] || alignment) as Alignment;
};
