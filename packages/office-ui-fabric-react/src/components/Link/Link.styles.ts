import {
  getFocusStyle,
  getEdgeChromiumNoHighContrastAdjustSelector,
  HighContrastSelector,
} from '../../Styling';
import {
  ILinkStyleProps,
  ILinkStyles
} from './Link.types';

export const getStyles = (props: ILinkStyleProps): ILinkStyles => {
  const { className, isButton, isDisabled, theme } = props;
  const { semanticColors } = theme;

  return {
    root: [
      'ms-Link',
      className,
      getFocusStyle(theme),
      {
        color: semanticColors.link,
      },
      isButton && {
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
        userSelect: 'text',
        borderBottom: '1px solid transparent', // For Firefox high contrast mode

        selectors: {
          [HighContrastSelector]: {
            color: 'LinkText',
          },
          ...getEdgeChromiumNoHighContrastAdjustSelector(),
        }
      },
      !isButton && {
        textDecoration: 'none'
      },
      isDisabled && [
        'is-disabled',
        {
          color: semanticColors.disabledText,
          cursor: 'default'
        },
        {
          selectors: {
            '&:link, &:visited': {
              pointerEvents: 'none'
            }
          }
        }
      ],
      !isDisabled && {
        selectors: {
          '&:active, &:hover, &:active:hover': {
            color: semanticColors.linkHovered,
            selectors: {
              [HighContrastSelector]: {
                color: 'LinkText'
              },
            },
          },
          '&:focus': {
            color: semanticColors.link,
            selectors: {
              [HighContrastSelector]: {
                color: 'LinkText'
              },
            },
          }
        }
      }
    ]
  };
};