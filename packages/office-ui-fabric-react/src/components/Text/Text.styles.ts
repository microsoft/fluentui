import { ITextComponent, ITextStyles, ITextStylesReturnType, ITextProps } from './Text.types';

import { ITheme } from '@uifabric/styling';

export const TextStyles: ITextComponent['styles'] = (props: ITextProps, theme: ITheme): ITextStylesReturnType => {
  const { as, className, inline, wrap, variant } = props;
  const { fonts } = theme;
  const variantObject = variant && fonts[variant] ? fonts[variant] : fonts.medium;

  return {
    root: [
      theme.fonts.medium,
      {
        display: inline ? 'inline' : as === 'td' ? 'table-cell' : 'block',
        fontFamily: (variantObject && variantObject.fontFamily) || 'inherit',
        fontSize: (variantObject && variantObject.fontSize) || 'inherit',
        fontWeight: (variantObject && variantObject.fontWeight) || 'inherit',
        color: (variantObject && variantObject.color) || 'inherit',
        mozOsxFontSmoothing: variantObject && variantObject.MozOsxFontSmoothing,
        webkitFontSmoothing: variantObject && variantObject.WebkitFontSmoothing
      },
      !wrap && {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      className
    ]
  } as ITextStyles;
};
