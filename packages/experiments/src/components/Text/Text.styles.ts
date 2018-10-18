import { ISemanticTextColors } from '../../Styling';
import { ITextComponent } from './Text.types';
import { resolveFontChoice } from 'office-ui-fabric-react';

export const TextStyles: ITextComponent['styles'] = props => {
  const { as, className, inline, theme, wrap, variant, family, weight, size, color, hoverColor } = props;
  const { semanticColors, typography } = theme;

  return {
    root: [
      resolveFontChoice({ fontVariant: variant, fontSize: size, fontFamily: family, fontWeight: weight }, typography),
      {
        display: inline ? 'inline' : as === 'td' ? 'table-cell' : 'block'
      },
      color && {
        color: semanticColors[color as keyof ISemanticTextColors]
      },
      hoverColor && {
        selectors: {
          ':hover': {
            color: semanticColors[hoverColor as keyof ISemanticTextColors]
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
