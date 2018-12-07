import { ITextComponent } from './Text.types';

export const TextStyles: ITextComponent['styles'] = props => {
  const { as, className, inline, theme, wrap, variant } = props;
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
  };
};
