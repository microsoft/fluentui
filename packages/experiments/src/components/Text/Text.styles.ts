import { ISemanticTextColors } from '../../Styling';
import { ITextComponent } from './Text.types';

export const TextStyles: ITextComponent['styles'] = props => {
  const { as, className, inline, theme, wrap, variant } = props;
  const { semanticColors, fonts } = theme;
  const variantObject = fonts[variant!] || fonts.medium; // TODO: add default to fonts

  return {
    root: [
      theme.fonts.medium,
      {
        display: inline ? 'inline' : as === 'td' ? 'table-cell' : 'block',
        fontFamily: variantObject.fontFamily || 'inherit',
        fontSize: variantObject.fontSize || 'inherit',
        // tslint:disable-next-line:no-any
        fontWeight: (variantObject.fontWeight as any) || 'inherit',
        color: variantObject.color || 'inherit',
        mozOsxFontSmoothing: variantObject.MozOsxFontSmoothing,
        webkitFontSmoothing: variantObject.WebkitFontSmoothing
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
