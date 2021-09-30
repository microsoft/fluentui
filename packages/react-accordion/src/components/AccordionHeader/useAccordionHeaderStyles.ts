import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
import type { AccordionHeaderState } from './AccordionHeader.types';

const useStyles = makeStyles({
  // TODO: this should be extracted to another package
  resetButton: {
    boxSizing: 'content-box',
    background: 'none',
    color: 'inherit',
    font: 'inherit',
    lineHeight: 'normal',
    overflow: 'visible',
    padding: '0',
    WebkitAppearance: 'button',
    userSelect: 'none',
    textAlign: 'unset',
  },
  focusIndicator: createFocusIndicatorStyleRule(theme => ({
    border: `1px solid ${theme.colorNeutralForeground1}`,
    borderRadius: '2px',
  })),
  root: theme => ({
    color: theme.colorNeutralForeground1,
    backgroundColor: theme.colorNeutralBackground1,
    borderRadius: '2px',
  }),
  rootDisabled: theme => ({
    backgroundColor: 'none',
    color: theme.colorNeutralForegroundDisabled,
  }),
  rootInline: {
    display: 'inline-block',
  },
  button: {
    width: 'calc(100% - 22px)',
    border: '1px solid transparent',
    paddingRight: '10px',
    paddingLeft: '10px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  buttonSmall: {
    height: '32px',
  },
  buttonInline: {
    display: 'inline-flex',
  },
  expandIcon: {
    lineHeight: '0',
  },
  expandIconStart: {
    paddingRight: '8px',
  },
  expandIconEnd: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: '8px',
  },
  icon: {
    marginRight: '8px',
    marginLeft: '8px',
  },
  iconExpandIconEnd: {
    marginLeft: '10px',
  },
  children: theme => ({
    fontSize: theme.fontSizeBase300,
    fontFamily: theme.fontFamilyBase,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }),
  childrenSmall: theme => ({
    fontSize: theme.fontSizeBase200,
  }),
  childrenLarge: theme => ({
    fontSize: theme.fontSizeBase400,
  }),
  childrenExtraLarge: theme => ({
    fontSize: theme.fontSizeBase500,
  }),
});

/** Applies style classnames to slots */
export const useAccordionHeaderStyles = (state: AccordionHeaderState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    styles.root,
    state.inline && styles.rootInline,
    state.disabled && styles.rootDisabled,
    state.root.className,
  );

  state.button.className = mergeClasses(
    styles.resetButton,
    styles.button,
    styles.focusIndicator,
    state.inline && styles.buttonInline,
    state.size === 'small' && styles.buttonSmall,
    state.button.className,
  );

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      styles.expandIcon,
      state.expandIconPosition === 'start' && styles.expandIconStart,
      state.expandIconPosition === 'end' && styles.expandIconEnd,
      state.expandIcon.className,
    );
  }
  if (state.children) {
    state.children.className = mergeClasses(
      styles.children,
      state.size === 'small' && styles.childrenSmall,
      state.size === 'large' && styles.childrenLarge,
      state.size === 'extra-large' && styles.childrenExtraLarge,
      state.children.className,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      styles.icon,
      state.expandIconPosition === 'end' && styles.iconExpandIconEnd,
      state.icon.className,
    );
  }
  return state;
};
