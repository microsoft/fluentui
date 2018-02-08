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
  const { palette, semanticColors } = theme;

  return {
    root: [
      'ms-Link',
      {
        color: semanticColors.linkText,
        margin: 0,
        overflow: 'inherit',
        padding: 0,
        textOverflow: 'inherit',
        selectors: {
          'button&': [
            getFocusStyle(theme),
            {
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'inline',
              fontSize: 'inherit',
              textAlign: 'left',
              selectors: {
                [HighContrastSelector]: {
                  color: 'Highlight'
                }
              }
            }
          ],
          'a&': [
            getFocusStyle(theme),
            {
              textDecoration: 'none'
            }
          ]
        }
      },
      disabled && [
        'is-disabled',
        {
          color: semanticColors.linkTextDisabled,
          cursor: 'default',
          pointerEvents: 'none'
        }
      ],
      !disabled && {
        selectors: {
          '&:active, &:hover, &:active:hover': {
            color: semanticColors.linkTextHovered
          },
          '&:focus': {
            color: semanticColors.linkTextFocused
          }
        }
      }
    ]
  };
};