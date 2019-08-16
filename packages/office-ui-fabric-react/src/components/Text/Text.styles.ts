import { ITextComponent, ITextProps, ITextStyles, ITextStylesReturnType, ITextTokens, ITextTokenReturnType } from './Text.types';

import { ITheme } from '../../Styling';

const baseTokens: ITextComponent['tokens'] = (props, theme): ITextTokenReturnType => {
  const { as, block, variant } = props;
  const { fonts } = theme;
  const variantObject = fonts[variant || 'medium'];

  return {
    display: block ? (as === 'td' ? 'table-cell' : 'block') : 'inline',
    fontFamily: (variantObject && variantObject.fontFamily) || 'inherit',
    fontSize: (variantObject && variantObject.fontSize) || 'inherit',
    fontWeight: (variantObject && variantObject.fontWeight) || 'inherit',
    color: (variantObject && variantObject.color) || 'inherit',
    mozOsxFontSmoothing: variantObject && variantObject.MozOsxFontSmoothing,
    webkitFontSmoothing: variantObject && variantObject.WebkitFontSmoothing
  };
};

const nowrapTokens: ITextComponent['tokens'] = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};

export const TextTokens: ITextComponent['tokens'] = (props, theme): ITextTokenReturnType => [baseTokens, props.nowrap && nowrapTokens];

export const TextStyles: ITextComponent['styles'] = (props: ITextProps, theme: ITheme, tokens: ITextTokens): ITextStylesReturnType => {
  const { className } = props;

  return {
    root: [
      theme.fonts.medium,
      {
        color: tokens.color,
        display: tokens.display,
        fontFamily: tokens.fontFamily,
        fontSize: tokens.fontSize,
        fontWeight: tokens.fontWeight,
        mozOsxFontSmoothing: tokens.mozOsxFontSmoothing,
        webkitFontSmoothing: tokens.webkitFontSmoothing,
        overflow: tokens.overflow,
        textOverflow: tokens.textOverflow,
        whiteSpace: tokens.whiteSpace
      },
      className
    ]
  } as ITextStyles;
};
