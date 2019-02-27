import { ITextComponent, ITextStyles, ITextStylesReturnType, ITextProps } from './Text.types';

import { ITheme } from '../../Styling';

export const TextStyles: ITextComponent['styles'] = (props: ITextProps, theme: ITheme): ITextStylesReturnType => {
  const { as, className, block, nowrap, variant } = props;
  const { fonts } = theme;
  const variantObject = variant && fonts[variant] ? fonts[variant] : undefined;

  return {
    root: [
      theme.fonts.medium,
      {
        display: block ? (as === 'td' ? 'table-cell' : 'block') : 'inline',
        fontFamily: (variantObject && variantObject.fontFamily) || 'inherit',
        fontSize: (variantObject && variantObject.fontSize) || 'inherit',
        fontWeight: (variantObject && variantObject.fontWeight) || 'inherit',
        color: (variantObject && variantObject.color) || 'inherit',
        mozOsxFontSmoothing: variantObject && variantObject.MozOsxFontSmoothing,
        webkitFontSmoothing: variantObject && variantObject.WebkitFontSmoothing
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
