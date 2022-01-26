/* eslint-disable @typescript-eslint/naming-convention */
import type { IFontFace, IKeyframes } from '@fluentui/merge-styles';

type StyleRendererOptions = {
  rtl?: boolean;
  targetWindow: Window | undefined;
};

export interface StyleRenderer {
  /**
   * Expected to initialize or re-initialize the renderer. Primarily for testing purposes.
   */
  reset: () => void;

  /**
   * Returns a unique id for the renderer; used as part of the cache key when determining if new
   * styles need to be rendered.
   */
  getId: () => number;

  /**
   * Renders a stylesheet and returns the map of key to class name.
   */
  renderStyles: <TRuleSet>(ruleSet: TRuleSet, options: StyleRendererOptions) => { [key in keyof TRuleSet]: string };

  /**
   * Renders keyframes and returns the keyframe name.
   */
  renderKeyframes: (keyframes: IKeyframes, options: StyleRendererOptions) => string;

  /**
   * Renders fontfaces.
   */
  renderFontFace: (fontFace: IFontFace, options: StyleRendererOptions) => void;
}
