import { ax, makeStyles } from '@fluentui/react-make-styles';
import { LinkState } from './Link.types';

const useStyles = makeStyles<LinkState>([
  // Common styles.
  [
    null,
    tokens => ({
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: 'solid transparent',
      borderBottomWidth: tokens.global.strokeWidth.thin,
      boxSizing: 'border-box',
      color: tokens.alias.color.neutral.brandForeground,
      cursor: 'pointer',
      display: 'inline',
      fontFamily: tokens.global.type.fontFamilies.base,
      fontSize: tokens.global.type.fontSizes.base[300],
      fontWeight: tokens.global.type.fontWeights.regular,
      margin: 0,
      overflow: 'inherit',
      padding: 0,
      textAlign: tokens.global.type.alignment.start,
      textDecoration: 'none',
      textOverflow: 'inherit',
      userSelect: 'text',

      ':hover': {
        borderBottomColor: tokens.alias.color.neutral.brandForegroundHover,
        color: tokens.alias.color.neutral.brandForegroundHover,
      },

      ':active': {
        borderBottomColor: tokens.alias.color.neutral.brandForegroundPressed,
        color: tokens.alias.color.neutral.brandForegroundPressed,
      },
    }),
  ],

  // Overrides when an href is present so the Link renders as an anchor.
  [
    s => !!s.href,
    {
      fontSize: 'inherit',
    },
  ],

  // Overrides when the Link is emphasized to represent a secondary action.
  [
    s => s.secondary,
    tokens => ({
      color: tokens.alias.color.neutral.neutralForeground2,

      ':hover': {
        borderBottomColor: tokens.alias.color.neutral.neutralForeground2Hover,
        color: tokens.alias.color.neutral.neutralForeground2Hover,
      },

      ':active': {
        borderBottomColor: tokens.alias.color.neutral.neutralForeground2Pressed,
        color: tokens.alias.color.neutral.neutralForeground2Pressed,
      },
    }),
  ],

  // Overrides when the Link is rendered inline within text.
  [
    s => s.inline,
    tokens => ({
      borderBottomColor: tokens.alias.color.neutral.brandForeground,
    }),
  ],

  // Overrides when the Link is rendered inline within text and is emphasized to represent a secondary action.
  [
    s => s.inline && s.secondary,
    tokens => ({
      borderBottomColor: tokens.alias.color.neutral.neutralForeground2,
    }),
  ],

  // Overrides when the Link is disabled.
  [
    s => s['aria-disabled'] as boolean | undefined,
    tokens => ({
      borderBottomColor: 'transparent',
      color: tokens.alias.color.neutral.neutralForegroundDisabled,
      cursor: 'not-allowed',

      ':hover': {
        borderBottomColor: 'transparent',
        color: tokens.alias.color.neutral.neutralForegroundDisabled,
      },

      ':active': {
        borderBottomColor: 'transparent',
        color: tokens.alias.color.neutral.neutralForegroundDisabled,
      },
    }),
  ],
]);

export const useLinkStyles = (state: LinkState): LinkState => {
  state.className = ax(useStyles(state), state.className);

  return state;
};
