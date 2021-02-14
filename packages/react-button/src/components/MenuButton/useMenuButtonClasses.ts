import { makeVariantClasses, Theme } from '@fluentui/react-theme-provider/lib/compat/index';
import { useButtonClasses } from '../Button/useButtonClasses';
import { MenuButtonState, MenuButtonVariants } from './MenuButton.types';

const GlobalClassNames = {
  root: 'ms-Button-root',
  menuIcon: 'ms-Button-menuIcon',
  _disabled: 'ms-Button--disabled',
  _iconOnly: 'ms-Button--iconOnly',
  _ghost: 'ms-Button--ghost',
  _expanded: 'ms-Button--expanded',
};

const useMenuButtonBaseClasses = makeVariantClasses<MenuButtonState, MenuButtonVariants>({
  name: 'MenuButton',
  prefix: '--button',

  styles: {
    root: [
      GlobalClassNames.root,
      {
        // This seems like a bad selector.
        '& > .ms-Button-menuIcon + *': {
          marginLeft: 0,
        },

        '& .ms-layer': {
          position: 'absolute',
        },

        [`&:hover .${GlobalClassNames.menuIcon}`]: {
          color: 'var(--button-hovered-menuIconColor, var(--button-menuIconColor))',
        },

        [`&:active .${GlobalClassNames.menuIcon}`]: {
          color:
            'var(--button-pressed-menuIconColor, var(--button-hovered-menuIconColor, var(--button-menuIconColor)))',
        },
      },
    ],

    menuIcon: [
      GlobalClassNames.menuIcon,
      {
        color: 'var(--button-menuIconColor)',
        fontSize: 'var(--button-menuIconSize)',

        [`.${GlobalClassNames._disabled} &`]: {
          color: 'var(--button-disabled-menuIconColor)',
        },
      },
    ],

    _disabled: [GlobalClassNames._disabled],

    _iconOnly: [
      GlobalClassNames._iconOnly,
      {
        '& > .ms-Button-icon + *': {
          marginLeft: 0,
        },
      },
    ],
  },

  variants: (theme: Theme): MenuButtonVariants => {
    const { palette, tokens } = theme;
    const body = tokens?.color?.body;

    return {
      root: {
        menuIconSize: '12px',
        menuIconColor: body?.menuIconColor,
      },

      ghost: {
        menuIconColor: palette?.neutralSecondary,
        hovered: {
          menuIconColor: palette?.themePrimary,
        },
        pressed: {
          menuIconColor: palette?.black,
        },
      },

      transparent: {
        menuIconColor: palette?.neutralSecondary,
      },
    };
  },
});

export const useMenuButtonClasses = (state: MenuButtonState) => {
  useButtonClasses(state);
  useMenuButtonBaseClasses(state);
};
