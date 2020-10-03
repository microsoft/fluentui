import { makeVariantClasses, Theme } from '@fluentui/react-theme-provider';
import { ButtonSizeVariants } from '../Button/index';

const GlobalClassNames = {
  root: 'ms-SplitButton',
  button: 'ms-SplitButton-button',
  menuButton: 'ms-SplitButton-menuButton',
};

const menuButtonWidth = '32px';

export const useSplitButtonClasses = makeVariantClasses({
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
        width: menuButtonWidth,
        minWidth: menuButtonWidth,
        '--button-borderLeftWidth': 0,
        '--button-borderTopLeftRadius': 0,
        '--button-borderBottomLeftRadius': 0,

        // Scope the override to a child component, increase specificity.
        [`.${GlobalClassNames.root} &`]: {
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

      [`.${GlobalClassNames.root}[aria-disabled="true"] &`]: {
        backgroundColor: 'var(--button-disabled-dividerColor)',
      },
    },

    _fluid: {
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
  variants: (theme: Theme) => {
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
        menuIconSize: '12px',
      },

      primary: {
        dividerColor: palette.white,

        disabled: {
          dividerColor: semanticColors.disabledText,
        },
      },
      ...ButtonSizeVariants,
    };
  },
});
