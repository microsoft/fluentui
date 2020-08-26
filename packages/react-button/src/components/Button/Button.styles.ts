import { makeStyles } from '@fluentui/react-theme-provider';

export const useButtonStyles = makeStyles({
  displayName: 'Button',
  root: [
    'ms-Button',
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

      background: 'var(--button-background, white)',
      color: 'var(--button-contentColor)',

      borderColor: 'var(--button-borderColor)',
      borderRadius: 'var(--button-borderRadius)',
      borderWidth: 'var(--button-borderWidth)',
      boxShadow: 'var(--button-boxShadow)',

      width: 'var(--button-width)',
      height: 'var(--button-height)',
      minHeight: 'var(--button-minHeight)',

      paddingLeft: 16, // 'var(--button-padding)',
      paddingRight: 16, // 'var(--button-padding)',
      paddingTop: 0, // 'var(--button-padding)',
      paddingBottom: 0, // 'var(--button-padding)',

      transition: 'var(--button-transition)',
      whiteSpace: 'var(--button-whiteSpace, nowrap)',

      fontFamily: 'var(--button-fontFamily)',
      fontSize: 'var(--button-fontSize)',

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fontWeight: 'var(--button-fontWeight)' as any,

      // @include focus-border(
      //   $padding: '-1px',
      //   $color: 'var(--button-focusColor)',
      //   $thickness: 'var(--button-focusWidth, 2px)',
      //   $radius: 'var(--button-borderRadius',
      // );
      // @includeFocusBoxShadowHOffset_0VOffset_0Blur_0Thickness_1pxColor: 'var(--button-focusInnerColor))',

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
    },
  ],

  icon: [
    'ms-Button-icon',
    {
      color: 'var(--button-iconColor)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'var(--button-iconSize)',
      height: 'var(--button-iconSize)',
      fontSize: 'var(--button-iconSize, inherit)',
      fontWeight: 'normal',
    },
  ],

  _primary: {
    '--button-background': 'var(--accent-background)',
    '--button-borderColor': 'var(--accent-borderColor)',
    '--button-contentColor': 'var(--accent-contentColor)',
    '--button-icon-color': 'var(--accent-iconColor)',

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
    '--button-disabled-border-color': 'var(--accent-disabled-borderColor)',
    '--button-disabled-content-color': 'var(--accent-disabled-contentColor)',
    '--button-disabled-icon-color': 'var(--accent-disabled-iconColor)',
  },

  _iconOnly: {
    '--button-width': 'var(--button-height, var(--button-minHeight))',
    '--button-padding': 0,
  },

  _circular: {
    '--button-border-radius': 50000,
  },

  _fluid: {
    width: '100%',
    maxWidth: '100%',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_smallest: {
    '--button-min-height': 'var(--button-size-smallest)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_smaller: {
    '--button-min-height': 'var(--button-size-smaller)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_small: {
    '--button-min-height': 'var(--button-size-small)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_large: {
    '--button-min-height': 'var(--button-size-large)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_larger: {
    '--button-min-height': 'var(--button-size-larger)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_largest: {
    '--button-min-height': 'var(--button-size-largest)',
  },

  _disabled: {
    pointerEvents: 'none',
    opacity: 'var(--button-disabled-opacity)',
    backgroundColor: 'var(--button-disabled-background)',
    contentColor: 'var(--button-disabled-contentColor)',
    borderColor: 'var(--button-disabled-borderColor)',
    boxShadow: 'var(--button-disabled-boxShadow)',

    '.ms-Button-icon': {
      color: 'var(--button-disabled-iconColor)',
    },
  },
});
