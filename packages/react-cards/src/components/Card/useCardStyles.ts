import { ax, makeStylesCompat } from '@fluentui/react-make-styles';
import { CardState } from './Card.types';

const useRootStyles = makeStylesCompat<CardState>([
  [
    null,
    {
      ':global(:root)': {
        '--card-background': '#ffffff',
        '--card-borderColor': 'transparent',
        '--card-borderWidth': '1px',
        '--card-boxShadow': '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.1)',
        '--card-minHeight': '32px',
        '--card-minWidth': '100px',

        '--card-borderRadius': 'var(--card-size-medium-borderRadius)',
        '--card-height': 'var(--card-size-medium-height)',
        '--card-margin': 'var(--card-size-medium-margin)',
        '--card-padding': 'var(--card-size-medium-padding)',
        '--card-width': 'var(--card-size-medium-width)',

        '--card-size-smallest-borderRadius': '4px',
        '--card-size-smallest-height': 'auto',
        '--card-size-smallest-margin': '0',
        '--card-size-smallest-padding': '8px',
        '--card-size-smallest-width': 'auto',

        '--card-size-smaller-borderRadius': '4px',
        '--card-size-smaller-height': 'auto',
        '--card-size-smaller-margin': '0',
        '--card-size-smaller-padding': '8px',
        '--card-size-smaller-width': 'auto',

        '--card-size-small-borderRadius': '4px',
        '--card-size-small-height': 'auto',
        '--card-size-small-margin': '0',
        '--card-size-small-padding': '8px',
        '--card-size-small-width': 'auto',

        '--card-size-medium-borderRadius': '4px',
        '--card-size-medium-height': 'auto',
        '--card-size-medium-margin': '0',
        '--card-size-medium-padding': '16px',
        '--card-size-medium-width': 'auto',

        '--card-size-large-borderRadius': '6px',
        '--card-size-large-height': 'auto',
        '--card-size-large-margin': '0',
        '--card-size-large-padding': '16px',
        '--card-size-large-width': 'auto',

        '--card-size-larger-borderRadius': '6px',
        '--card-size-larger-height': 'auto',
        '--card-size-larger-margin': '0',
        '--card-size-larger-padding': '16px',
        '--card-size-larger-width': 'auto',

        '--card-size-largest-borderRadius': '6px',
        '--card-size-largest-height': 'auto',
        '--card-size-largest-margin': '0',
        '--card-size-largest-padding': '16px',
        '--card-size-largest-width': 'auto',

        '--card-hovered-background': 'var(--card-background)',
        '--card-hovered-borderColor': 'var(--card-borderColor)',
        '--card-hovered-borderWidth': 'var(--card-borderWidth)',
        '--card-hovered-boxShadow': 'var(--card-boxShadow)',

        '--card-pressed-background': 'var(--card-background)',
        '--card-pressed-borderColor': 'var(--card-borderColor)',
        '--card-pressed-borderWidth': 'var(--card-borderWidth)',
        '--card-pressed-boxShadow': 'var(--card-boxShadow)',

        '--card-selected-background': '#fafafa',
        '--card-selected-borderColor': 'var(--card-borderColor)',
        '--card-selected-borderWidth': 'var(--card-borderWidth)',
        '--card-selected-boxShadow': 'var(--card-boxShadow)',

        '--card-disabled-background': '#f0f0f0',
        '--card-disabled-borderColor': 'var(--card-borderColor)',
        '--card-disabled-borderWidth': 'var(--card-borderWidth)',
        '--card-disabled-boxShadow': '0 0.8px 1.8px 0 rgba(0, 0, 0, 0.1)',
        '--card-disabled-cursor': 'not-allowed',
      },

      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',

      background: 'var(--card-background)',
      borderColor: 'var(--card-borderColor)',
      borderRadius: 'var(--card-borderRadius)',
      borderStyle: 'var(--card-borderStyle)',
      borderWidth: 'var(--card-borderWidth)',
      boxShadow: 'var(--card-boxShadow)',
      color: 'var(--card-contentColor)',
      cursor: 'var(--card-cursor)',
      height: 'var(--card-height)',
      margin: 'var(--card-margin)',
      minHeight: 'var(--card-minHeight)',
      minWidth: 'var(--card-minWidth)',
      padding: 'var(--card-padding)',
      width: 'var(--card-width)',

      ':global(.ms-Fabric--isFocusVisible) &': {
        ':focus::after': {
          content: '""',
          position: 'absolute',
          left: 1,
          right: 1,
          top: 1,
          bottom: 1,
          borderWidth: 'var(--card-focusWidth, 1px)',
          borderStyle: 'solid',
          borderColor: 'var(--card-focusBorderColor, white)',
          outlineWidth: 'var(--card-focusWidth, 1px)',
          outlineStyle: 'solid',
          outlineColor: 'var(--card-focusOutlineColor, #605e5c)',
        },
      },

      '&:hover': {
        background: 'var(--card-hovered-background, var(--card-background))',
        borderColor: 'var(--card-hovered-borderColor, var(--card-borderColor))',
        borderWidth: 'var(--card-hovered-borderWidth, var(--card-borderWidth))',
        boxShadow: 'var(--card-hovered-boxShadow, var(--card-boxShadow))',
        color: 'var(--card-hovered-contentColor, var(--card-contentColor))',
      },

      '&:active': {
        background: 'var(--card-pressed-background, var(--card-background))',
        borderColor: 'var(--card-pressed-borderColor, var(--card-borderColor))',
        borderWidth: 'var(--card-pressed-borderWidth, var(--card-borderWidth))',
        boxShadow: 'var(--card-pressed-boxShadow, var(--card-boxShadow))',
        color: 'var(--card-pressed-contentColor, var(--card-contentColor))',
      },

      '&[aria-disabled=true]': {
        background: 'var(--card-disabled-background)',
        borderColor: 'var(--card-disabled-borderColor)',
        borderWidth: 'var(--card-disabled-borderWidth)',
        boxShadow: 'var(--card-disabled-boxShadow)',
        color: 'var(--card-disabled-contentColor)',
        cursor: 'var(--card-disabled-cursor)',
      },
    },
  ],

  [
    s => s.selected,
    {
      background: 'var(--card-selected-background)',
      borderColor: 'var(--card-selected-borderColor)',
      borderWidth: 'var(--card-selected-borderWidth)',
      boxShadow: 'var(--card-selected-boxShadow)',
      color: 'var(--card-selected-contentColor)',
    },
  ],

  [
    s => s.compact,
    {
      padding: '0',
    },
  ],

  [
    s => s.block,
    {
      height: '100%',
      width: '100%',
    },
  ],

  [
    s => !!s.onClick,
    {
      background: '#ffffff',
      borderColor: 'transparent',
      borderWidth: '1px',
      boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',

      '--card-hovered-background': '#fafafa',
      '--card-hovered-borderColor': 'var(--card-clickable-borderColor)',
      '--card-hovered-borderWidth': 'var(--card-clickable-borderWidth)',
      '--card-hovered-boxShadow': '0 3.2px 7.2px 0 rgba(0, 0, 0, 0.1)',

      '--card-background': '#f5f5f5',
      '--card-borderColor': 'var(--card-clickable-borderColor)',
      '--card-borderWidth': '2px',
      '--card-boxShadow': 'var(--card-clickable-boxShadow)',
    },
  ],

  [
    s => s.size === 'smallest',
    {
      borderRadius: 'var(--card-size-smallest-borderRadius)',
      height: 'var(--card-size-smallest-height)',
      margin: 'var(--card-size-smallest-margin)',
      padding: 'var(--card-size-smallest-padding)',
      width: 'var(--card-size-smallest-width)',
    },
  ],

  [
    s => s.size === 'smaller',
    {
      borderRadius: 'var(--card-size-smaller-borderRadius)',
      height: 'var(--card-size-smaller-height)',
      margin: 'var(--card-size-smaller-margin)',
      padding: 'var(--card-size-smaller-padding)',
      width: 'var(--card-size-smaller-width)',
    },
  ],

  [
    s => s.size === 'small',
    {
      borderRadius: 'var(--card-size-small-borderRadius)',
      height: 'var(--card-size-small-height)',
      margin: 'var(--card-size-small-margin)',
      padding: 'var(--card-size-small-padding)',
      width: 'var(--card-size-small-width)',
    },
  ],

  [
    s => s.size === 'large',
    {
      borderRadius: 'var(--card-size-large-borderRadius)',
      height: 'var(--card-size-large-height)',
      margin: 'var(--card-size-large-margin)',
      padding: 'var(--card-size-large-padding)',
      width: 'var(--card-size-large-width)',
    },
  ],

  [
    s => s.size === 'larger',
    {
      borderRadius: 'var(--card-size-larger-borderRadius)',
      height: 'var(--card-size-larger-height)',
      margin: 'var(--card-size-larger-margin)',
      padding: 'var(--card-size-larger-padding)',
      width: 'var(--card-size-larger-width)',
    },
  ],

  [
    s => s.size === 'largest',
    {
      borderRadius: 'var(--card-size-largest-borderRadius)',
      height: 'var(--card-size-largest-height)',
      margin: 'var(--card-size-largest-margin)',
      padding: 'var(--card-size-largest-padding)',
      width: 'var(--card-size-largest-width)',
    },
  ],
]);

export function useCardStyles(state: CardState): CardState {
  state.className = ax('ms-Card', useRootStyles(state), state.className);

  return state;
}
