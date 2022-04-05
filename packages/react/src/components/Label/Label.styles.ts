import { HighContrastSelector, FontWeights, getHighContrastNoAdjustStyle } from '../../Styling';
import type { ILabelStyleProps, ILabelStyles } from './Label.types';

export const getStyles = (props: ILabelStyleProps): ILabelStyles => {
  const { theme, className, disabled, required } = props;
  const { semanticColors } = theme;

  // Tokens
  const labelFontWeight = FontWeights.semibold;
  const labelColor = semanticColors.bodyText;
  const labelDisabledColor = semanticColors.disabledBodyText;
  const labelRequiredStarColor = semanticColors.errorText;

  return {
    root: [
      'ms-Label',
      theme.fonts.medium,
      {
        fontWeight: labelFontWeight,
        color: labelColor,
        boxSizing: 'border-box',
        boxShadow: 'none',
        margin: 0,
        display: 'block',
        padding: '5px 0',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
      },
      disabled && {
        color: labelDisabledColor,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },
      required && {
        selectors: {
          '::after': {
            content: `' *'`,
            color: labelRequiredStarColor,
            paddingRight: 12,
          },
        },
      },
      className,
    ],
  };
};
