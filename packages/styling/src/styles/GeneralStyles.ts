// This file mimics styles and mixins from _General.Mixins.scss

import { IRawStyle } from '@uifabric/merge-styles/lib/index';
import { IRawFontStyle, IRawStyleBase } from '../../../merge-styles/lib/IRawStyleBase';

export const normalize: IRawStyle = {
  boxShadow: 'none',
  margin: 0,
  padding: 0,
  boxSizing: 'border-box'
};

export const userSelect = (value: string): IRawStyleBase => {
  return {
    WebkitTouchCallout: value,
    WebkitUserSelect: value,
    KhtmlUserSelect: value,
    MozUserSelect: value,
    MsUserSelect: value,
    UserSelect: value,
  };
};