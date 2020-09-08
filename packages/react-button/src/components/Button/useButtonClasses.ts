import { makeClasses } from '@fluentui/react-theme-provider';
import { ButtonState } from './Button.types';

const GlobalClassNames = {
  root: 'ms-Button',
  icon: 'ms-Button-icon',
};

export const useButtonClasses = makeClasses<ButtonState>({
  root: [
    GlobalClassNames.root,
    {
      cursor: 'pointer',
      alignItems: 'center',
      borderStyle: 'solid',
      display: 'inline-flex',
      justifyContent: 'center',
      outline: 'none',
      position: 'relative',
      userSelect: 'none',
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      textDecoration: 'none',
      background: 'var(--button-background, white)',
      color: 'var(--button-contentColor)',
      borderColor: 'var(--button-borderColor)',

      borderTopLeftRadius: 'var(--button-borderTopLeftRadius, var(--button-borderRadius))',
      borderTopRightRadius: 'var(--button-borderTopRightRadius, var(--button-borderRadius))',
      borderBottomLeftRadius: 'var(--button-borderBottomLeftRadius, var(--button-borderRadius))',
      borderBottomRightRadius: 'var(--button-borderBottomRightRadius, var(--button-borderRadius))',
      borderLeftWidth: 'var(--button-borderLeftWidth, var(--button-borderWidth))',
      borderRightWidth: 'var(--button-borderRightWidth, var(--button-borderWidth))',
      borderTopWidth: 'var(--button-borderTopWidth, var(--button-borderWidth))',
      borderBottomWidth: 'var(--button-borderBottomWidth, var(--button-borderWidth))',
      boxShadow: 'var(--button-boxShadow)',

      width: 'var(--button-width)',
      minWidth: 'var(--button-minWidth, 80)',
      height: 'var(--button-height)',
      minHeight: 'var(--button-minHeight)',

      paddingLeft: 'var(--button-paddingLeft)',
      paddingRight: 'var(--button-paddingRight)',
      paddingTop: 'var(--button-paddingTop)',
      paddingBottom: 'var(--button-paddingBottom)',

      transition: 'var(--button-transition)',
      whiteSpace: 'var(--button-whiteSpace, nowrap)',

      fontFamily: 'var(--button-fontFamily)',
      fontSize: 'var(--button-fontSize)',

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fontWeight: 'var(--button-fontWeight)' as any,

      ':global(.ms-Fabric--isFocusVisible) &:focus::after': {
        //'&::after': {
        content: '""',
        position: 'absolute',
        left: -1,
        right: -1,
        top: -1,
        bottom: -1,
        borderWidth: 'var(--button-focusWidth, 1.6px)',
        borderStyle: 'solid',
        borderColor: 'var(--button-focusColor, black)',
        borderTopLeftRadius: 'var(--button-borderTopLeftRadius, var(--button-borderRadius))',
        borderTopRightRadius: 'var(--button-borderTopRightRadius, var(--button-borderRadius))',
        borderBottomLeftRadius: 'var(--button-borderBottomLeftRadius, var(--button-borderRadius))',
        borderBottomRightRadius: 'var(--button-borderBottomRightRadius, var(--button-borderRadius))',
        boxShadow: '0 0 0 var(--button-focusInnerWidth, 1px) var(--button-focusInnerColor, white) inset',
      },

      ['& > *:not(:first-child)']: {
        marginLeft: 'var(--button-contentGap)',
      },

      '&:hover': {
        background: 'var(--button-hovered-background, var(--button-background))',
        color: 'var(--button-hovered-contentColor, var(--button-contentColor))',
        borderColor: 'var(--button-hovered-borderColor, var(--button-borderColor))',
        boxShadow: 'var(--button-hovered-boxShadow, var(--button-boxShadow))',

        '.ms-Button-icon': {
          color: 'var(--button-hovered-iconColor, var(--button-iconColor))',
        },
      },

      '&:active': {
        background: 'var(--button-pressed-background, var(--button-hovered-background))',
        color: 'var(--button-pressed-contentColor, var(--button-hovered-contentColor, var(--button-contentColor)))',
        borderColor: 'var(--button-pressed-borderColor, var(--button-hovered-borderColor, var(--button-borderColor)))',
        boxShadow: 'var(--button-pressed-boxShadow, var(--button-hovered-boxShadow, var(--button-boxShadow)))',

        transform: 'var(--button-pressed-transform)',
        transition: 'var(--button-pressed-transition)',

        '.ms-Button-icon': {
          color: 'var(--button-pressed-iconColor, var(--button-iconColor))',
        },
      },

      '&[aria-disabled=true]': {
        pointerEvents: 'none',
        opacity: 'var(--button-disabled-opacity)',
        backgroundColor: 'var(--button-disabled-background)',
        color: 'var(--button-disabled-contentColor)',
        borderColor: 'var(--button-disabled-borderColor)',
        boxShadow: 'var(--button-disabled-boxShadow)',

        '.ms-Button-icon': {
          color: 'var(--button-disabled-iconColor)',
        },
      },
    },
  ],

  icon: [
    GlobalClassNames.icon,
    {
      color: 'var(--button-iconColor)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'var(--button-iconSize)',
      height: 'var(--button-iconSize)',
      fontSize: 'var(--button-iconSize, inherit)',
      fontWeight: 'normal',
      lineHeight: '1',
    },
  ],

  content: {
    lineHeight: '1',
  },

  _primary: {
    '--button-background': 'var(--accent-background)',
    '--button-borderColor': 'var(--accent-borderColor)',
    '--button-contentColor': 'var(--accent-contentColor)',
    '--button-iconColor': 'var(--accent-iconColor)',

    '--button-hovered-background': 'var(--accent-hovered-background)',
    '--button-hovered-borderColor': 'var(--accent-hovered-borderColor)',
    '--button-hovered-contentColor': 'var(--accent-hovered-contentColor)',
    '--button-hovered-iconColor': 'var(--accent-hovered-iconColor)',

    '--button-focused-background': 'var(--accent-focused-background)',
    '--button-focused-borderColor': 'var(--accent-focused-borderColor)',
    '--button-focused-contentColor': 'var(--accent-focused-contentColor)',
    '--button-focused-iconColor': 'var(--accent-focused-iconColor)',

    '--button-pressed-background': 'var(--accent-pressed-background)',
    '--button-pressed-borderColor': 'var(--accent-pressed-borderColor)',
    '--button-pressed-contentColor': 'var(--accent-pressed-contentColor)',
    '--button-pressed-iconColor': 'var(--accent-pressed-iconColor)',

    '--button-disabled-background': 'var(--accent-disabled-background)',
    '--button-disabled-borderColor': 'var(--accent-disabled-borderColor)',
    '--button-disabled-contentColor': 'var(--accent-disabled-contentColor)',
    '--button-disabled-iconColor': 'var(--accent-disabled-iconColor)',
  },

  _ghost: {
    '--button-background': 'var(--ghost-background)',
    '--button-borderColor': 'var(--ghost-borderColor)',
    '--button-contentColor': 'var(--ghost-contentColor)',
    '--button-iconColor': 'var(--ghost-iconColor)',

    '--button-disabled-background': 'var(--ghost-disabled-background)',
    '--button-disabled-borderColor': 'var(--ghost-disabled-borderColor)',
    '--button-disabled-contentColor': 'var(--ghost-disabled-contentColor)',
    '--button-disabled-iconColor': 'var(--ghost-disabled-iconColor)',

    '--button-focused-background': 'var(--ghost-focused-background)',
    '--button-focused-borderColor': 'var(--ghost-focused-borderColor)',
    '--button-focused-contentColor': 'var(--ghost-focused-contentColor)',
    '--button-focused-iconColor': 'var(--ghost-focused-iconColor)',

    '--button-hovered-background': 'var(--ghost-hovered-background)',
    '--button-hovered-borderColor': 'var(--ghost-hovered-borderColor)',
    '--button-hovered-contentColor': 'var(--ghost-hovered-contentColor)',
    '--button-hovered-iconColor': 'var(--ghost-hovered-iconColor)',

    '--button-pressed-background': 'var(--ghost-pressed-background)',
    '--button-pressed-borderColor': 'var(--ghost-pressed-borderColor)',
    '--button-pressed-contentColor': 'var(--ghost-pressed-contentColor)',
    '--button-pressed-iconColor': 'var(--ghost-pressed-iconColor',
  },

  _iconOnly: {
    '--button-width': 'var(--button-height, var(--button-minHeight))',
    '--button-paddingTop': 0,
    '--button-paddingLeft': 0,
    '--button-paddingBottom': 0,
    '--button-paddingRight': 0,
  },

  _circular: {
    '--button-borderRadius': 50000,
  },

  _fluid: {
    '--button-width': '100%',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_smallest: {
    '--button-minHeight': 'var(--button-size-smallest)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_smaller: {
    '--button-minHeight': 'var(--button-size-smaller)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_small: {
    '--button-minHeight': 'var(--button-size-small)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_large: {
    '--button-minHeight': 'var(--button-size-large)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_larger: {
    '--button-minHeight': 'var(--button-size-larger)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_largest: {
    '--button-minHeight': 'var(--button-size-largest)',
  },
});
