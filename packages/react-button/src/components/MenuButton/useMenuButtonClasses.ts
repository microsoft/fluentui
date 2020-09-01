import { makeClasses } from '@fluentui/react-theme-provider';

const GlobalClassNames = {
  root: 'ms-Button-root',
  menuIcon: 'ms-Button-menuIcon',
  _disabled: 'ms-Button--disabled',
  _ghost: 'ms-Button--ghost',
  _expanded: 'ms-Button--expanded',
};

export const useMenuButtonClasses = makeClasses({
  root: [
    GlobalClassNames.root,
    {
      // This seems like a bad selector.
      '& > .ms-Button-menuIcon + *': {
        marginLeft: 0,
      },

      [`&:hover .${GlobalClassNames.menuIcon}`]: {
        color: 'var(--button-hovered-menuIconColor, var(--button-menuIconColor))',
      },

      [`&:active .${GlobalClassNames.menuIcon}`]: {
        color: 'var(--button-hovered-menuIconColor, var(--button-menuIconColor))',
      },
    },
  ],

  menuIcon: [
    GlobalClassNames.menuIcon,
    {
      color: 'var(--button-menuIconColor)',

      [`.${GlobalClassNames._disabled} &`]: {
        color: 'var(--button-disabled-menuIconColor)',
      },
    },
  ],

  _disabled: [GlobalClassNames._disabled],

  _ghost: [
    GlobalClassNames._ghost,
    {
      '--button-menuIconColor': 'var(--body-menuIconColor)',
    },
  ],

  _expanded: [
    GlobalClassNames._expanded,
    {
      [`.${GlobalClassNames}&`]: {
        '--button-contentColor': 'var(--ghost-expanded-contentColor)',
      },
    },
  ],
});
