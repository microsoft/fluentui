import { StyleRenderer } from './types';
import { mergeCssSets, fontFace as mergeFontFace, keyframes as mergeKeyframes } from '@uifabric/merge-styles';

export const mergeStylesRenderer: StyleRenderer = {
  renderStyles: (styleSet, options) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mergeCssSets([styleSet as any], options) as any;
  },

  renderFontFace: (fontFace, options) => {
    return mergeFontFace(fontFace);
  },

  renderKeyframes: keyframes => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mergeKeyframes(keyframes as any);
  },
};
