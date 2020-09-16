import * as React from 'react';
import { StyleRenderer } from './types';
import { StyleRendererContext } from './useStyleRenderer';
import {
  Stylesheet,
  mergeCssSets,
  fontFace as mergeFontFace,
  keyframes as mergeKeyframes,
} from '@uifabric/merge-styles';

let _seed = 0;

export const mergeStylesRenderer: StyleRenderer = {
  reset: () => {
    // If the stylesheet reset call is made, invalidate the cache keys.
    Stylesheet.getInstance().onReset(() => _seed++);
  },

  getId: () => _seed,

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

export const MergeStylesProvider = ({ children }: React.PropsWithChildren<{}>) => (
  <StyleRendererContext.Provider value={mergeStylesRenderer}>{children}</StyleRendererContext.Provider>
);
