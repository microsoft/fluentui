import {
  Stylesheet,
  mergeCssSets,
  fontFace as mergeFontFace,
  keyframes as mergeKeyframes,
} from '@fluentui/merge-styles';
import type { StyleRenderer } from './types';

let _seed = 0;

export const mergeStylesRenderer: StyleRenderer = {
  reset: () => {
    // If the stylesheet reset call is made, invalidate the cache keys.
    Stylesheet.getInstance().onReset(() => _seed++);
  },

  getId: () => _seed,

  renderStyles: (styleSet, options) => {
    return mergeCssSets((Array.isArray(styleSet) ? styleSet : [styleSet]) as any, options) as any;
  },

  renderFontFace: (fontFace, options) => {
    return mergeFontFace(fontFace);
  },

  renderKeyframes: keyframes => {
    return mergeKeyframes(keyframes as any);
  },
};
