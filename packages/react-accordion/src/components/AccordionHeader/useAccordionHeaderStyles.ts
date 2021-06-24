import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { AccordionHeaderState } from './AccordionHeader.types';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';

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
    border: `1px solid ${theme.alias.color.neutral.neutralForeground1}`,
    borderRadius: '2px',
  })),
  root: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    borderRadius: '2px',
  }),
  rootDisabled: theme => ({
    backgroundColor: 'none',
    color: theme.alias.color.neutral.neutralForegroundDisabled,
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
    fontSize: theme.global.type.fontSizes.base[300],
    fontFamily: theme.global.type.fontFamilies.base,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }),
  childrenSmall: theme => ({
    fontSize: theme.global.type.fontSizes.base[200],
  }),
  childrenLarge: theme => ({
    fontSize: theme.global.type.fontSizes.base[400],
  }),
  childrenExtraLarge: theme => ({
    fontSize: theme.global.type.fontSizes.base[500],
  }),
});

/** Applies style classnames to slots */
export const useAccordionHeaderStyles = (state: AccordionHeaderState) => {
  const styles = useStyles();
  state.className = mergeClasses(
    styles.root,
    state.inline && styles.rootInline,
    state.context.disabled && styles.rootDisabled,
    state.className,
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
