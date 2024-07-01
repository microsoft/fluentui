import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { AccordionHeaderSlots, AccordionHeaderState } from './AccordionHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const accordionHeaderClassNames: SlotClassNames<AccordionHeaderSlots> = {
  root: 'fui-AccordionHeader',
  button: 'fui-AccordionHeader__button',
  expandIcon: 'fui-AccordionHeader__expandIcon',
  icon: 'fui-AccordionHeader__icon',
};

const useStyles = makeStyles({
  // TODO: this should be extracted to another package
  resetButton: {
    boxSizing: 'content-box',
    backgroundColor: 'inherit',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'normal',
    overflow: 'visible',
    padding: '0',
    WebkitAppearance: 'button',
    textAlign: 'unset',
  },
  focusIndicator: createFocusOutlineStyle(),
  root: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorTransparentBackground,
    margin: '0',
    borderRadius: tokens.borderRadiusMedium,
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
    width: '100%',
    ...shorthands.borderWidth('0'),
    padding: `0 ${tokens.spacingHorizontalM} 0 ${tokens.spacingHorizontalMNudge}`,
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    ...typographyStyles.body1,
    boxSizing: 'border-box',
  },
  buttonSmall: {
    minHeight: '32px',
    fontSize: tokens.fontSizeBase200,
  },
  buttonLarge: {
    lineHeight: tokens.lineHeightBase400,
    fontSize: tokens.fontSizeBase400,
  },
  buttonExtraLarge: {
    lineHeight: tokens.lineHeightBase500,
    fontSize: tokens.fontSizeBase500,
  },
  buttonInline: {
    display: 'inline-flex',
  },
  buttonExpandIconEndNoIcon: {
    paddingLeft: tokens.spacingHorizontalM,
  },
  buttonExpandIconEnd: {
    paddingRight: tokens.spacingHorizontalMNudge,
  },
  buttonDisabled: {
    cursor: 'not-allowed',
  },
  expandIcon: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    lineHeight: tokens.lineHeightBase500,
    fontSize: tokens.fontSizeBase500,
  },
  expandIconStart: {
    paddingRight: tokens.spacingHorizontalS,
  },
  expandIconEnd: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: tokens.spacingHorizontalS,
  },
  icon: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingRight: tokens.spacingHorizontalS,
    lineHeight: tokens.lineHeightBase500,
    fontSize: tokens.fontSizeBase500,
  },
});

/** Applies style classnames to slots */
export const useAccordionHeaderStyles_unstable = (state: AccordionHeaderState) => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(
    accordionHeaderClassNames.root,
    styles.root,
    state.inline && styles.rootInline,
    state.disabled && styles.rootDisabled,
    state.root.className,
  );

  state.button.className = mergeClasses(
    accordionHeaderClassNames.button,
    styles.resetButton,
    styles.button,
    styles.focusIndicator,
    state.expandIconPosition === 'end' && !state.icon && styles.buttonExpandIconEndNoIcon,
    state.expandIconPosition === 'end' && styles.buttonExpandIconEnd,
    state.inline && styles.buttonInline,
    state.size === 'small' && styles.buttonSmall,
    state.size === 'large' && styles.buttonLarge,
    state.size === 'extra-large' && styles.buttonExtraLarge,
    state.disabled && styles.buttonDisabled,
    state.button.className,
  );

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      accordionHeaderClassNames.expandIcon,
      styles.expandIcon,
      state.expandIconPosition === 'start' && styles.expandIconStart,
      state.expandIconPosition === 'end' && styles.expandIconEnd,
      state.expandIcon.className,
    );
  }
  if (state.icon) {
    state.icon.className = mergeClasses(accordionHeaderClassNames.icon, styles.icon, state.icon.className);
  }
  return state;
};
