import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { LinkState } from './Link.types';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';

const useStyles = makeStyles({
  focusIndicator: createFocusIndicatorStyleRule({
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
  }),
  // Common styles.
  root: tokens => ({
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: 'solid transparent',
    borderBottomWidth: tokens.global.strokeWidth.thin,
    boxSizing: 'border-box',
    color: tokens.alias.color.neutral.brandForegroundLink,
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
      borderBottomColor: tokens.alias.color.neutral.brandForegroundLinkHover,
      color: tokens.alias.color.neutral.brandForegroundLinkHover,
    },

    ':active': {
      borderBottomColor: tokens.alias.color.neutral.brandForegroundLinkPressed,
      color: tokens.alias.color.neutral.brandForegroundLinkPressed,
    },
  }),
  // Overrides when an href is present so the Link renders as an anchor.
  href: {
    fontSize: 'inherit',
  },
  // Overrides when the Link is emphasized to represent a secondary action.
  secondary: tokens => ({
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
  // Overrides when the Link is rendered inline within text.
  inline: tokens => ({
    borderBottomColor: tokens.alias.color.neutral.brandForegroundLink,
  }),
  // Overrides when the Link is rendered inline within text and is emphasized to represent a secondary action.
  inlineSecondary: tokens => ({
    borderBottomColor: tokens.alias.color.neutral.neutralForeground2,
  }),
  // Overrides when the Link is disabled.
  disabled: tokens => ({
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
});

export const useLinkStyles = (state: LinkState): LinkState => {
  const styles = useStyles();
  state.className = mergeClasses(
    styles.root,
    styles.focusIndicator,
    state.href && styles.href,
    state.secondary && styles.secondary,
    state.inline && styles.inline,
    state.secondary && state.inline && styles.inlineSecondary,
    state['aria-disabled'] && styles.disabled,
    state.className,
  );

  return state;
};
