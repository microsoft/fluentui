import { HighContrastSelector } from '../../Styling';
import { ILabelStyleProps, ILabelStyles } from './Label.types';

export const getStyles = (props: ILabelStyleProps): ILabelStyles => {
  const { theme, className, disabled, required } = props;

  return {
    root: [
      'ms-Label',
      theme.fonts.medium,
      {
        color: theme.semanticColors.bodyText,
        boxSizing: 'border-box',
        boxShadow: 'none',
        margin: 0,
        display: 'block',
        padding: '5px 0',
        wordWrap: 'break-word',
        overflowWrap: 'break-word'
      },
      disabled && {
        color: theme.semanticColors.disabledBodyText,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText'
          }
        }
      },
      required && {
        selectors: {
          '::after': {
            content: `' *'`,
            color: theme.semanticColors.errorText,
            paddingRight: 12
          }
        }
      },
      className
    ]
  };
};
