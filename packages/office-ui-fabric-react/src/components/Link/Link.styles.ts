import {
  getFocusStyle,
  getGlobalClassNames
} from '../../Styling';
import { HighContrastSelector } from '../../utilities/styling/index';
import {
  ILinkStyleProps,
  ILinkStyles
} from './Link.types';

const GlobalClassNames = {
  root: 'ms-Link'
};

export const getStyles = (props: ILinkStyleProps): ILinkStyles => {
  const { className, isButton, isDisabled, theme } = props;
  const { semanticColors } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      getFocusStyle(theme),
      {
        color: semanticColors.link,
      },
      isButton && {
        background: 'none',
        backgroundColor: 'transparent',
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
            forcedColorAdjust: 'none'
          }
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
        },
      ],
      !isDisabled && {
        selectors: {
          '&:active, &:hover, &:active:hover': {
            color: semanticColors.linkHovered,
            selectors: {
              [HighContrastSelector]: {
                textDecoration: 'underline',
                color: 'LinkText'
              }
            }
          },
          '&:focus': {
            color: semanticColors.link,
            selectors: {
              [HighContrastSelector]: {
                color: 'LinkText'
              }
            }
          }
        }
      },
      classNames.root,
      className
    ]
  };
};