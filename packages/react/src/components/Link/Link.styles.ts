import { getGlobalClassNames, HighContrastSelector } from '@fluentui/style-utilities';
import type { ILinkStyleProps, ILinkStyles } from './Link.types';
import { IsFocusVisibleClassName } from '@fluentui/utilities';

export const GlobalClassNames = {
  root: 'ms-Link',
};

export const getStyles = (props: ILinkStyleProps): ILinkStyles => {
  const { className, isButton, isDisabled, isUnderlined, theme } = props;
  const { semanticColors } = theme;

  // Tokens
  const linkColor = semanticColors.link;
  const linkInteractedColor = semanticColors.linkHovered;
  const linkDisabledColor = semanticColors.disabledText;
  const focusBorderColor = semanticColors.focusBorder;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        color: linkColor,
        outline: 'none',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        textDecoration: isUnderlined ? 'underline' : 'none',

        selectors: {
          [`.${IsFocusVisibleClassName} &:focus, :host(.${IsFocusVisibleClassName}) &:focus`]: {
            // Can't use getFocusStyle because it doesn't support wrapping links
            // https://github.com/microsoft/fluentui/issues/4883#issuecomment-406743543
            // Using box-shadow and outline allows the focus rect to wrap links that span multiple lines
            // and helps the focus rect avoid getting clipped.
            boxShadow: `0 0 0 1px ${focusBorderColor} inset`,
            outline: `1px auto ${focusBorderColor}`,
            selectors: {
              [HighContrastSelector]: {
                outline: '1px solid WindowText',
              },
            },
          },
          [HighContrastSelector]: {
            // For IE high contrast mode
            borderBottom: 'none',
          },
        },
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
          [HighContrastSelector]: {
            color: 'LinkText',
            forcedColorAdjust: 'none',
          },
        },
      },
      !isButton && {
        selectors: {
          [HighContrastSelector]: {
            // This is mainly for MessageBar, which sets MsHighContrastAdjust: none by default
            MsHighContrastAdjust: 'auto',
            forcedColorAdjust: 'auto',
          },
        },
      },

      isDisabled && [
        'is-disabled',
        {
          color: linkDisabledColor,
          cursor: 'default',
        },
        {
          selectors: {
            '&:link, &:visited': {
              pointerEvents: 'none',
            },

            [HighContrastSelector]: {
              // We need to specify the color in High Contrast because of the case of Links rendering as buttons.
              color: 'GrayText',
            },
          },
        },
      ],
      !isDisabled && {
        selectors: {
          '&:active, &:hover, &:active:hover': {
            color: linkInteractedColor,
            textDecoration: 'underline',

            selectors: {
              [HighContrastSelector]: {
                color: 'LinkText',
              },
            },
          },
          '&:focus': {
            color: linkColor,

            selectors: {
              [HighContrastSelector]: {
                color: 'LinkText',
              },
            },
          },
        },
      },
      classNames.root,
      className,
    ],
  };
};
