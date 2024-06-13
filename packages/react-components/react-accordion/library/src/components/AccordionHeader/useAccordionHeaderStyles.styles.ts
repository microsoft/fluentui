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
    color: `var(--ctrl-token-AccordionHeader-17, var(--semantic-token-AccordionHeader-18, ${tokens.colorNeutralForeground1}))`,
    backgroundColor: `var(--ctrl-token-AccordionHeader-19, var(--semantic-token-AccordionHeader-20, ${tokens.colorTransparentBackground}))`,
    margin: '0',
    borderRadius: `var(--ctrl-token-AccordionHeader-21, var(--semantic-token-AccordionHeader-22, ${tokens.borderRadiusMedium}))`,
  },
  rootDisabled: {
    backgroundImage: 'none',
    color: `var(--ctrl-token-AccordionHeader-23, var(--semantic-token-AccordionHeader-24, ${tokens.colorNeutralForegroundDisabled}))`,
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
    fontSize: `var(--ctrl-token-AccordionHeader-25, var(--semantic-token-AccordionHeader-26, ${tokens.fontSizeBase200}))`,
  },
  buttonLarge: {
    lineHeight: `var(--ctrl-token-AccordionHeader-27, var(--semantic-token-AccordionHeader-28, ${tokens.lineHeightBase400}))`,
    fontSize: `var(--ctrl-token-AccordionHeader-29, var(--semantic-token-AccordionHeader-30, ${tokens.fontSizeBase400}))`,
  },
  buttonExtraLarge: {
    lineHeight: `var(--ctrl-token-AccordionHeader-31, var(--semantic-token-AccordionHeader-32, ${tokens.lineHeightBase500}))`,
    fontSize: `var(--ctrl-token-AccordionHeader-33, var(--semantic-token-AccordionHeader-34, ${tokens.fontSizeBase500}))`,
  },
  buttonInline: {
    display: 'inline-flex',
  },
  buttonExpandIconEndNoIcon: {
    paddingLeft: `var(--ctrl-token-AccordionHeader-35, var(--semantic-token-AccordionHeader-36, ${tokens.spacingHorizontalM}))`,
  },
  buttonExpandIconEnd: {
    paddingRight: `var(--ctrl-token-AccordionHeader-37, var(--semantic-token-AccordionHeader-38, ${tokens.spacingHorizontalMNudge}))`,
  },
  buttonDisabled: {
    cursor: 'not-allowed',
  },
  expandIcon: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    lineHeight: `var(--ctrl-token-AccordionHeader-39, var(--semantic-token-AccordionHeader-40, ${tokens.lineHeightBase500}))`,
    fontSize: `var(--ctrl-token-AccordionHeader-41, var(--semantic-token-AccordionHeader-42, ${tokens.fontSizeBase500}))`,
  },
  expandIconStart: {
    paddingRight: `var(--ctrl-token-AccordionHeader-43, var(--semantic-token-AccordionHeader-44, ${tokens.spacingHorizontalS}))`,
  },
  expandIconEnd: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: `var(--ctrl-token-AccordionHeader-45, var(--semantic-token-AccordionHeader-46, ${tokens.spacingHorizontalS}))`,
  },
  icon: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingRight: `var(--ctrl-token-AccordionHeader-47, var(--semantic-token-AccordionHeader-48, ${tokens.spacingHorizontalS}))`,
    lineHeight: `var(--ctrl-token-AccordionHeader-49, var(--semantic-token-AccordionHeader-50, ${tokens.lineHeightBase500}))`,
    fontSize: `var(--ctrl-token-AccordionHeader-51, var(--semantic-token-AccordionHeader-52, ${tokens.fontSizeBase500}))`,
  },
});

/** Applies style classnames to slots */
export const useAccordionHeaderStyles_unstable = (state: AccordionHeaderState) => {
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
