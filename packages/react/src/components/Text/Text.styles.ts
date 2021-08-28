import type { ITextComponent, ITextStyles, ITextStylesReturnType, ITextProps } from './Text.types';
import type { ITheme } from '../../Styling';

export const TextStyles: ITextComponent['styles'] = (props: ITextProps, theme: ITheme): ITextStylesReturnType => {
  const { as, className, block, nowrap, variant } = props;
  const { fonts, semanticColors } = theme;
  const variantObject = fonts[variant || 'medium'];

  return {
    root: [
      variantObject,
      {
        color: variantObject.color || semanticColors.bodyText,
        display: block ? (as === 'td' ? 'table-cell' : 'block') : 'inline',
        mozOsxFontSmoothing: variantObject.MozOsxFontSmoothing,
        webkitFontSmoothing: variantObject.WebkitFontSmoothing,
      },
      nowrap && {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      className,
    ],
  } as ITextStyles;
};
