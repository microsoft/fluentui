import {
  getFocusStyle,
  HighContrastSelector
} from '../../Styling';
import {
  ILinkStyleProps,
  ILinkStyles
} from './Link.types';

export const getStyles = (props: ILinkStyleProps): ILinkStyles => {
  const { disabled, theme } = props;
  const { semanticColors } = theme;

  return {
    root: [
      'ms-Link',
      getFocusStyle(theme),
      {
        color: semanticColors.link,
        selectors: {
          'button&': {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'inline',
            fontSize: 'inherit',
            margin: 0,
            overflow: 'inherit',
            padding: 0,
            textAlign: 'left',
            textOverflow: 'inherit',
            selectors: {
              [HighContrastSelector]: {
                color: 'Highlight'
              }
            }
          },
          'a&': {
            textDecoration: 'none'
          }
        }
      },
      disabled && [
        'is-disabled',
        {
          color: semanticColors.disabledText,
          cursor: 'default',
          pointerEvents: 'none'
        }
      ],
      !disabled && {
        selectors: {
          '&:active, &:hover, &:active:hover': {
            color: semanticColors.linkHovered
          },
          '&:focus': {
            color: semanticColors.link
          }
        }
      }
    ]
  };
};