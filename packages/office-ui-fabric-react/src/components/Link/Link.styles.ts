import { getGlobalClassNames, HighContrastSelector, HighContrastSelectorWhite, HighContrastSelectorBlack } from '../../Styling';
import { ILinkStyleProps, ILinkStyles } from './Link.types';

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
      theme.fonts.medium,
      {
        color: semanticColors.link,
        outline: 'none',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        selectors: {
          '.ms-Fabric--isFocusVisible &:focus': {
            // Can't use getFocusStyle because it doesn't support wrapping links
            // https://github.com/OfficeDev/office-ui-fabric-react/issues/4883#issuecomment-406743543
            // A box-shadow allows the focus rect to wrap links that span multiple lines
            // and helps the focus rect avoid getting clipped.
            boxShadow: `0 0 0 1px ${theme.palette.neutralSecondary} inset`,
            selectors: {
              '@media screen and (-ms-high-contrast: active)': {
                outline: '1px solid WindowText'
              }
            }
          },
          '@media screen and (-ms-high-contrast: active)': {
            // For IE high contrast mode
            borderBottom: 'none'
          }
        }
      },
      isButton && {
        background: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'inline',
        margin: 0,
        overflow: 'inherit',
        padding: 0,
        textAlign: 'left',
        textOverflow: 'inherit',
        userSelect: 'text',
        borderBottom: '1px solid transparent', // For Firefox high contrast mode
        selectors: {
          [HighContrastSelectorBlack]: {
            color: '#FFFF00'
          },
          [HighContrastSelectorWhite]: {
            color: '#00009F'
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
        }
      ],
      !isDisabled && {
        selectors: {
          '&:active, &:hover, &:active:hover': {
            color: semanticColors.linkHovered,
            selectors: {
              [HighContrastSelector]: {
                textDecoration: 'underline'
              }
            }
          },
          '&:focus': {
            color: semanticColors.link
          }
        }
      },
      classNames.root,
      className
    ]
  };
};
