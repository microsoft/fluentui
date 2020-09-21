/* eslint-disable @typescript-eslint/naming-convention */
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
      background: 'var(--button-background)',
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
      maxWidth: 'var(--button-maxWidth)',
      minWidth: 'var(--button-minWidth)',
      height: 'var(--button-height)',
      minHeight: 'var(--button-minHeight)',

      paddingLeft: 'var(--button-paddingLeft)',
      paddingRight: 'var(--button-paddingRight)',
      paddingTop: 'var(--button-paddingTop)',
      paddingBottom: 'var(--button-paddingBottom)',

      transition: 'var(--button-transition)',
      whiteSpace: 'var(--button-whiteSpace)',

      fontFamily: 'var(--button-fontFamily)',
      fontSize: 'var(--button-fontSize)',
      fontWeight: 'var(--button-fontWeight)',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',

      ':global(.ms-Fabric--isFocusVisible) &:focus::after': {
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
        zIndex: 1,
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

  _size_smallest: {
    '--button-height': 'var(--button-size-smallest)',
    '--button-minHeight': 'var(--button-size-smallest)',
  },

  _size_smaller: {
    '--button-height': 'var(--button-size-smaller)',
    '--button-minHeight': 'var(--button-size-smaller)',
  },

  _size_small: {
    '--button-height': 'var(--button-size-small)',
    '--button-minHeight': 'var(--button-size-small)',
  },

  _size_large: {
    '--button-height': 'var(--button-size-large)',
    '--button-minHeight': 'var(--button-size-large)',
  },

  _size_larger: {
    '--button-height': 'var(--button-size-larger)',
    '--button-minHeight': 'var(--button-size-larger)',
  },

  _size_largest: {
    '--button-height': 'var(--button-size-largest)',
    '--button-minHeight': 'var(--button-size-largest)',
  },
});
