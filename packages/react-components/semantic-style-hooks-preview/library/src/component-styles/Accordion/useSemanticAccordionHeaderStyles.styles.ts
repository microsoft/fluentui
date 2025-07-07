import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { accordionHeaderClassNames, type AccordionHeaderState } from '@fluentui/react-accordion';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const paddingCtrlHorizontalDefaultNudge = `max(calc(${semanticTokens.paddingCtrlHorizontalDefault} - 2px), 2px)`;

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
  focusIndicator: createFocusOutlineStyle({
    style: {
      outlineRadius: semanticTokens.ctrlListCornerRest,
      outlineOffset: semanticTokens._ctrlAccordionFocusInnerStrokeWidth,
      outlineColor: semanticTokens._ctrlAccordionFocusOuterStroke,
      outlineWidth: semanticTokens.ctrlFocusOuterStrokeWidth,
    },
  }),
  root: {
    color: semanticTokens._ctrlAccordionForegroundRest,
    backgroundColor: semanticTokens._ctrlAccordionBackgroundRest,
    margin: '0',
    borderRadius: semanticTokens.ctrlListCornerRest,

    ':hover': {
      color: semanticTokens._ctrlAccordionForegroundHover,
    },

    ':hover:active': {
      color: semanticTokens._ctrlAccordionForegroundPressed,
    },
  },
  rootDisabled: {
    backgroundImage: 'none',
    color: semanticTokens.foregroundCtrlOnTransparentDisabled,
  },
  rootInline: {
    display: 'inline-block',
  },
  button: {
    position: 'relative',
    width: '100%',
    ...shorthands.borderWidth('0'),
    padding: `${semanticTokens._ctrlAccordionPaddingTextTop} ${semanticTokens.paddingCtrlHorizontalDefault} ${semanticTokens._ctrlAccordionPaddingTextBottom} ${paddingCtrlHorizontalDefaultNudge}`,
    minHeight: semanticTokens.sizeCtrlDefault,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    fontSize: semanticTokens.textGlobalBody3FontSize,
    lineHeight: semanticTokens.textGlobalBody3LineHeight,
    boxSizing: 'border-box',
  },
  buttonSmall: {
    minHeight: semanticTokens.sizeCtrlSmDefault,
    fontSize: semanticTokens.textGlobalCaption1FontSize,
    paddingTop: semanticTokens.paddingCtrlSmTextTop,
    paddingBottom: semanticTokens.paddingCtrlSmTextBottom,
  },
  buttonLarge: {
    minHeight: semanticTokens.sizeCtrlLgDefault,
    lineHeight: semanticTokens.textGlobalBody2LineHeight,
    fontSize: semanticTokens.textGlobalBody2FontSize,
    paddingTop: semanticTokens.paddingCtrlLgTextTop,
    paddingBottom: semanticTokens.paddingCtrlLgTextBottom,
  },
  buttonExtraLarge: {
    minHeight: semanticTokens.sizeCtrlLgDefault,
    lineHeight: semanticTokens.textGlobalBody1LineHeight,
    fontSize: semanticTokens.textGlobalBody1FontSize,
    paddingTop: semanticTokens.paddingCtrlLgTextTop,
    paddingBottom: semanticTokens.paddingCtrlLgTextBottom,
  },
  buttonInline: {
    display: 'inline-flex',
  },
  buttonExpandIconEndNoIcon: {
    paddingLeft: semanticTokens.paddingCtrlHorizontalDefault,
  },
  buttonExpandIconEnd: {
    paddingRight: paddingCtrlHorizontalDefaultNudge,
  },
  buttonDisabled: {
    cursor: 'not-allowed',
  },
  expandIcon: {
    height: semanticTokens.ctrlChoiceBaseSize,
    width: semanticTokens.ctrlChoiceBaseSize,
    display: 'flex',
    alignItems: 'center',
    lineHeight: semanticTokens.textGlobalBody1LineHeight,
    fontSize: semanticTokens.sizeCtrlIcon,
    '> *': {
      height: semanticTokens.sizeCtrlIcon,
      width: semanticTokens.sizeCtrlIcon,
    },
  },
  expandIconStart: {
    paddingRight: semanticTokens.gapInsideCtrlDefault,
  },
  expandIconEnd: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: semanticTokens.gapInsideCtrlDefault,
  },
  icon: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingRight: semanticTokens.gapInsideCtrlDefault,
    lineHeight: semanticTokens.textGlobalBody1LineHeight,
    fontSize: semanticTokens.textGlobalBody1FontSize,
  },
});

/** Applies style classnames to slots */
export const useSemanticAccordionHeaderStyles = (_state: unknown): AccordionHeaderState => {
  'use no memo';

  const state = _state as AccordionHeaderState;

  const styles = useStyles();
  state.root.className = mergeClasses(
    accordionHeaderClassNames.root,
    styles.root,
    state.inline && styles.rootInline,
    state.disabled && styles.rootDisabled,
    state.root.className,
    getSlotClassNameProp_unstable(state.root),
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
    getSlotClassNameProp_unstable(state.button),
  );

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      accordionHeaderClassNames.expandIcon,
      styles.expandIcon,
      state.expandIconPosition === 'start' && styles.expandIconStart,
      state.expandIconPosition === 'end' && styles.expandIconEnd,
      state.expandIcon.className,
      getSlotClassNameProp_unstable(state.expandIcon),
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      accordionHeaderClassNames.icon,
      styles.icon,
      state.icon.className,
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  return state;
};
