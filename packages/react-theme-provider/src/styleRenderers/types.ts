export type RuleSet = {};
export type KeyFrames = {};
export type FontFace = {};

export type StyleRendererOptions = {
  rtl: boolean;
  targetWindow: Window;
};

export interface StyleRenderer {
  renderStyles: <TRuleSet extends RuleSet>(
    ruleSet: TRuleSet,
    options: StyleRendererOptions,
  ) => { [key in keyof TRuleSet]: string };

  renderKeyframes: (keyframes: KeyFrames, options: StyleRendererOptions) => void;

  renderFontFace: (fontFace: FontFace, options: StyleRendererOptions) => void;
}
