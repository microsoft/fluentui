import type { IRawStyle } from '@fluentui/merge-styles';

// This file mimics styles and mixins from _General.Mixins.scss
export const normalize: IRawStyle = {
  boxShadow: 'none',
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
};

export const noWrap: IRawStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};
