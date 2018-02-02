// This file mimics styles and mixins from _General.Mixins.scss

import { IRawStyle } from '@uifabric/merge-styles/lib/index';

export const normalize: IRawStyle = {
  boxShadow: 'none',
  margin: 0,
  padding: 0,
  boxSizing: 'border-box'
};

/**
 * Prevents user selection of text elements.
 * @param value The value of userSelect
 */
export const setUserSelect = (value: 'initial' | 'inherit' | 'unset' |
  'none' | 'auto' | 'text' | 'all' | 'contain' | undefined): IRawStyle => {
  return {
    userSelect: value
  };
};