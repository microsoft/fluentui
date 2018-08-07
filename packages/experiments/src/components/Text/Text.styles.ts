import { IStyle, IPalette, ISemanticColors } from '../../Styling';
import { IThemedProps } from '../../Foundation';
import { ITextProps, ITextStyles } from './Text.types';

export const TextStyles = (props: IThemedProps<ITextProps>): ITextStyles => {
  const { className, inline, theme, wrap, variant, family, weight, size, color, hoverColor } = props;
  const { palette, semanticColors, typography } = theme;

  return {
    root: [
      typography.variants[variant!] as IStyle,
      {
        display: inline ? 'inline' : 'block'
      },
      family && {
        // TODO: How are language specific font families configured?
        fontFamily: typography.families[family]
      },
      size && {
        fontSize: typography.sizes[size]
      },
      weight && {
        fontWeight: typography.weights[weight]
      },
      color && {
        color: semanticColors[color as keyof ISemanticColors] || palette[color as keyof IPalette] || color
      },
      hoverColor && {
        selectors: {
          ':hover': {
            color: semanticColors[color as keyof ISemanticColors] || palette[color as keyof IPalette] || color
          }
        }
      },
      !wrap && {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      // TODO: this needs to be evaluated.
      //     mozOsxFontSmoothing: mozOsxFontSmoothing,
      //     webkitFontSmoothing: webkitFontSmoothing,
      className
    ]
  };
};
