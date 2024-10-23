export type TagPickerInputTokens = {
  width: string;
};

export const tagPickerInputCSSRules: { [Key in keyof TagPickerInputTokens]: `--fluent-TagPickerInput__${Key}` } = {
  width: '--fluent-TagPickerInput__width',
};

export const tagPickerInputTokens: Record<keyof TagPickerInputTokens, string> = {
  width: `var(${tagPickerInputCSSRules.width}, 0)`,
};
