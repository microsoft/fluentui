import { ITextComponent, ITextStyles, ITextStylesReturnType, ITextProps } from './Text.types';

import { ITheme } from '../../Styling';

export const TextStyles: ITextComponent['styles'] = (props: ITextProps, theme: ITheme): ITextStylesReturnType => {
  const { as, className, block, nowrap, variant } = props;
  const { fonts } = theme;
  const variantObject = fonts[variant || 'medium'];

  return {
    root: [
      theme.fonts.medium,
      {
        display: block ? (as === 'td' ? 'table-cell' : 'block') : 'inline',
        fontFamily: variantObject.fontFamily,
        fontSize: variantObject.fontSize,
        fontWeight: variantObject.fontWeight,
        // bodyText semantic slot is set to neutralPrimary which is standard for foreground color
        // if variantObject.color is undefined, it will default to the theme's color
        color: variantObject.color || theme.semanticColors.bodyText,
        mozOsxFontSmoothing: variantObject.MozOsxFontSmoothing,
        webkitFontSmoothing: variantObject.WebkitFontSmoothing
      },
      nowrap && {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      className
    ]
  } as ITextStyles;
};
