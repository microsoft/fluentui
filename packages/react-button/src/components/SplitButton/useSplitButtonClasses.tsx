import { makeVariantClasses, Theme } from '@fluentui/react-theme-provider';
import { EdgeChromiumHighContrastSelector } from '@uifabric/styling';
import { ButtonSizeVariants } from '../Button/index';
import { SplitButtonState, SplitButtonVariants } from './SplitButton.types';

const GlobalClassNames = {
  root: 'ms-SplitButton',
  button: 'ms-SplitButton-button',
  menuButton: 'ms-SplitButton-menuButton',
};

const menuButtonWidth = '32px';

export const useSplitButtonClasses = makeVariantClasses<SplitButtonState, SplitButtonVariants>({
  name: 'SplitButton',
  prefix: '--button',

  styles: {
    root: [
      GlobalClassNames.root,
      {
        display: 'inline-flex',
        justifyContent: 'stretch',
        position: 'relative',

        // Forward the menuIconSize to a variable which can be consumed by the child menu button.
        '--button-splitMenuIconSize': 'var(--button-menuIconSize)',
      },
    ],

    button: [
      GlobalClassNames.button,
      {
        '--button-borderRightWidth': 0,
        '--button-borderTopRightRadius': 0,
        '--button-borderBottomRightRadius': 0,
      },
    ],

    menuButton: [
      GlobalClassNames.menuButton,
      {
        // Scope the override to a child component, increase specificity.
        [`.${GlobalClassNames.root} &`]: {
          width: menuButtonWidth,
          minWidth: menuButtonWidth,
          '--button-borderLeftWidth': 0,
          '--button-borderTopLeftRadius': 0,
          '--button-borderBottomLeftRadius': 0,
          '--button-iconColor': 'var(--button-menuIconColor)',
          '--button-iconSize': 'var(--button-splitMenuIconSize)',
        },
      },
    ],

    divider: {
      width: 'var(--button-dividerThickness)',
      backgroundColor: 'var(--button-dividerColor)',
      position: 'absolute',
      right: menuButtonWidth,
      top: 'calc(100% - var(--button-dividerLength, 100% + 8px))',
      bottom: 'calc(100% - var(--button-dividerLength, 100% + 8px))',

      // eslint-disable-next-line deprecation/deprecation
      [EdgeChromiumHighContrastSelector]: {
        backgroundColor: 'var(--button-highContrast-dividerColor)',
      },

      [`.${GlobalClassNames.root}[aria-disabled="true"] &`]: {
        backgroundColor: 'var(--button-disabled-dividerColor)',

        // eslint-disable-next-line deprecation/deprecation
        [EdgeChromiumHighContrastSelector]: {
          backgroundColor: 'var(--button-highContrast-disabled-dividerColor, var(--button-highContrast-dividerColor))',
        },
      },
    },

    _block: {
      width: '100%',
      maxWidth: '100%',

      [`.${GlobalClassNames.button}`]: {
        flexGrow: 1,
        maxWidth: '100%',
      },

      [`.${GlobalClassNames.menuButton}`]: {
        width: menuButtonWidth,
      },
    },
  },
  variants: (theme: Theme): SplitButtonVariants => {
    const { palette, semanticColors } = theme;

    return {
      root: {
        size: {
          smallest: '24px',
          smaller: '24px',
          small: '24px',
          regular: '32px',
          large: '40px',
          larger: '48px',
          largest: '64px',
        },
        dividerThickness: '1px',
        dividerColor: palette?.neutralTertiaryAlt,
        disabled: {
          dividerColor: semanticColors.disabledText,
        },
        menuIconColor: 'var(--body-menuIconColor)',
        menuIconSize: '12px',

        highContrast: {
          dividerColor: 'WindowText',

          disabled: {
            dividerColor: 'GrayText',
          },
        },
      },

      primary: {
        dividerColor: palette.white,

        disabled: {
          dividerColor: semanticColors.disabledText,
        },

        highContrast: {
          dividerColor: 'Window',

          disabled: {
            dividerColor: 'GrayText',
          },
        },
      },

      transparent: {
        menuIconColor: palette.neutralSecondary,
      },

      ...ButtonSizeVariants,
    };
  },
});
