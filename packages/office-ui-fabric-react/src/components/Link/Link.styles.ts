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
        selectors: {
          '.ms-Fabric--isFocusVisible &:focus': {
            // Can't use getFocusStyle because it doesn't support wrapping links
            // https://github.com/OfficeDev/office-ui-fabric-react/issues/4883#issuecomment-406743543
            outline: `1px solid ${theme.palette.neutralSecondary}`
          }
        }
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
          [HighContrastSelectorBlack]: {
            color: '#FFFF00'
          },
          [HighContrastSelectorWhite]: {
            color: '#00009F'
          },
          '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
            // For IE high contrast mode
            borderBottom: 'none'
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
