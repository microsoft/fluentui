import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { LinkState } from './Link.types';

const useStyles = makeStyles({
  focusIndicator: createCustomFocusIndicatorStyle({
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
  }),
  // Common styles.
  root: theme => ({
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: 'solid transparent',
    borderBottomWidth: theme.strokeWidthThin,
    boxSizing: 'border-box',
    color: theme.colorBrandForegroundLink,
    cursor: 'pointer',
    display: 'inline',
    fontFamily: theme.fontFamilyBase,
    fontSize: theme.fontSizeBase300,
    fontWeight: theme.fontWeightRegular,
    margin: 0,
    overflow: 'inherit',
    padding: 0,
    textAlign: 'left',
    textDecoration: 'none',
    textOverflow: 'inherit',
    userSelect: 'text',

    ':hover': {
      borderBottomColor: theme.colorBrandForegroundLinkHover,
      color: theme.colorBrandForegroundLinkHover,
    },

    ':active': {
      borderBottomColor: theme.colorBrandForegroundLinkPressed,
      color: theme.colorBrandForegroundLinkPressed,
    },
  }),
  // Overrides when an href is present so the Link renders as an anchor.
  href: {
    fontSize: 'inherit',
  },
  // Overrides when the Link appears subtle.
  subtle: theme => ({
    color: theme.colorNeutralForeground2,

    ':hover': {
      borderBottomColor: theme.colorNeutralForeground2Hover,
      color: theme.colorNeutralForeground2Hover,
    },

    ':active': {
      borderBottomColor: theme.colorNeutralForeground2Pressed,
      color: theme.colorNeutralForeground2Pressed,
    },
  }),
  // Overrides when the Link is rendered inline within text.
  inline: theme => ({
    borderBottomColor: theme.colorBrandForegroundLink,
  }),
  // Overrides when the Link is rendered inline within text and appears subtle.
  inlineSubtle: theme => ({
    borderBottomColor: theme.colorNeutralForeground2,
  }),
  // Overrides when the Link is disabled.
  disabled: theme => ({
    borderBottomColor: 'transparent',
    color: theme.colorNeutralForegroundDisabled,
    cursor: 'not-allowed',

    ':hover': {
      borderBottomColor: 'transparent',
      color: theme.colorNeutralForegroundDisabled,
    },

    ':active': {
      borderBottomColor: 'transparent',
      color: theme.colorNeutralForegroundDisabled,
    },
  }),
});

export const useLinkStyles = (state: LinkState): LinkState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    styles.root,
    styles.focusIndicator,
    state.root.as === 'a' && state.root.href && styles.href,
    state.appearance === 'subtle' && styles.subtle,
    state.inline && styles.inline,
    state.appearance === 'subtle' && state.inline && styles.inlineSubtle,
    state.root['aria-disabled'] && styles.disabled,
    state.root.className,
  );

  return state;
};
