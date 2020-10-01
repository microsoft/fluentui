import { makeVariantClasses, Theme } from '@fluentui/react-theme-provider';
import { ButtonSizeVariants } from '../Button/index';

const GlobalClassNames = {
  button: 'ms-SplitButton-button',
  menuButton: 'ms-SplitButton-menuButton',
};

const menuButtonWidth = '32px';

export const useSplitButtonClasses = makeVariantClasses({
  name: 'SplitButton',
  prefix: '--button',
  styles: {
    root: {
      display: 'inline-flex',
      justifyContent: 'stretch',
      position: 'relative',

      [`.${GlobalClassNames.menuButton}`]: {
        '--button-width': menuButtonWidth,
      },
    },

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
        '--button-borderLeftWidth': 0,
        '--button-borderTopLeftRadius': 0,
        '--button-borderBottomLeftRadius': 0,
        '--button-iconSize': 'var(--button-menuIconSize)',
      },
    ],

    divider: {
      width: 'var(--button-dividerThickness)',
      backgroundColor: 'var(--button-dividerColor)',
      position: 'absolute',
      right: 'var(--button-height, 32px)',
      top: 'calc(100% - var(--button-dividerLength, 100% + 8px))',
      bottom: 'calc(100% - var(--button-dividerLength, 100% + 8px))',
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
    const { palette } = theme;

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
      },

      primary: {
        dividerColor: palette.white,
      },
      ...ButtonSizeVariants,
    };
  },
});
