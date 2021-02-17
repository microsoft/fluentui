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
      color: tokens.global.palette.brand.primary,
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
        borderBottomColor: tokens.global.palette.brand.primary,
      },

      ':active': {
        borderBottomColor: tokens.global.palette.brand.primary,
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

  // Overrides when the Link is rendered inline within text.
  [
    s => s.inline,
    tokens => ({
      borderBottomColor: tokens.global.palette.brand.primary,
    }),
  ],

  // Overrides when the Link is disabled.
  [
    s => s['aria-disabled'] as boolean | undefined,
    tokens => ({
      borderBottomColor: 'transparent',
      color: tokens.global.palette.grey[74],
      cursor: 'not-allowed',

      ':hover': {
        borderBottomColor: 'transparent',
      },

      ':active': {
        borderBottomColor: 'transparent',
      },
    }),
  ],
]);

export const useLinkStyles = (state: LinkState): LinkState => {
  state.className = ax(useStyles(state), state.className);

  return state;
};
