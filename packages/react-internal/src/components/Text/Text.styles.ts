import { ITextComponent, ITextStyles, ITextStylesReturnType, ITextProps } from './Text.types';

import { ITheme } from '../../Styling';

export const TextStyles: ITextComponent['styles'] = (props: ITextProps, theme: ITheme): ITextStylesReturnType => {
  const { as, className, block, nowrap, variant } = props;
  const { fonts } = theme;
  const variantObject = fonts[variant || 'medium'];

  return {
    root: [
      variantObject,
      {
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
