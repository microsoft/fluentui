import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { AccordionHeaderState } from './AccordionHeader.types';

export const accordionHeaderClassName = 'fui-AccordionHeader';

const useStyles = makeStyles({
  // TODO: this should be extracted to another package
  resetButton: {
    boxSizing: 'content-box',
    backgroundColor: 'inherit',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'normal',
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0),
    WebkitAppearance: 'button',
    userSelect: 'none',
    textAlign: 'unset',
  },
  focusIndicator: createFocusOutlineStyle(),
  root: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.margin(0),
    ...shorthands.borderRadius('2px'),
  },
  rootDisabled: {
    backgroundImage: 'none',
    color: tokens.colorNeutralForegroundDisabled,
  },
  rootInline: {
    display: 'inline-block',
  },
  button: {
    position: 'relative',
    width: 'calc(100% - 22px)',
    ...shorthands.border('1px', 'solid', 'transparent'),
    paddingRight: '10px',
    paddingLeft: '10px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: tokens.fontSizeBase300,
    fontFamily: tokens.fontFamilyBase,
  },
  buttonSmall: {
    height: '32px',
    fontSize: tokens.fontSizeBase200,
  },
  buttonLarge: {
    fontSize: tokens.fontSizeBase400,
  },
  buttonExtraLarge: {
    fontSize: tokens.fontSizeBase500,
  },
  buttonInline: {
    display: 'inline-flex',
  },
  expandIcon: {
    lineHeight: '0',
    fontSize: '20px',
  },
  expandIconStart: {
    paddingRight: '8px',
  },
  expandIconEnd: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: '8px',
  },
  icon: {
    marginRight: '8px',
    fontSize: '20px',
  },
  iconExpandIconEnd: {
    marginLeft: '10px',
  },
});

/** Applies style classnames to slots */
export const useAccordionHeaderStyles_unstable = (state: AccordionHeaderState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    accordionHeaderClassName,
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
    state.size === 'large' && styles.buttonLarge,
    state.size === 'extra-large' && styles.buttonExtraLarge,
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
  if (state.icon) {
    state.icon.className = mergeClasses(
      styles.icon,
      state.expandIconPosition === 'end' && styles.iconExpandIconEnd,
      state.icon.className,
    );
  }
  return state;
};
