import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { teachingPopoverTitleClassNames, type TeachingPopoverTitleState } from '@fluentui/react-teaching-popover';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import * as semanticTokens from '@fluentui/semantic-tokens';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: semanticTokens.textRampLgItemBodyFontSize,
    fontWeight: semanticTokens.textStyleDefaultHeaderWeight,
    color: semanticTokens.foregroundContentNeutralPrimary,
    lineHeight: semanticTokens.textRampLgItemBodyLineHeight,
    paddingBottom: semanticTokens.ctrlChoicePaddingVertical,
    marginTop: semanticTokens.paddingContentNone,
    marginBottom: semanticTokens.paddingContentNone,
  },
  rootBrand: {
    color: semanticTokens.foregroundCtrlOnBrandRest,
  },
  dismissButton: {
    position: 'relative',
    border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.strokeLayer}`,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampItemBodyFontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textRampItemBodyLineHeight,
    backgroundColor: semanticTokens.nullColor,
    boxSizing: 'border-box',
    borderTopRightRadius: semanticTokens.cornerZero,
    borderBottomRightRadius: semanticTokens.cornerZero,
    borderRightStyle: 'none',
    ...createCustomFocusIndicatorStyle({
      outline: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens.ctrlFocusInnerStroke}`,
      borderRadius: semanticTokens.cornerCtrlRest,
      ...shorthands.borderColor(semanticTokens.nullColor),
    }),
    marginInlineStart: 'auto',
  },
  dismissBrand: {
    color: semanticTokens.foregroundCtrlOnBrandRest,
  },
});

/** Applies style classnames to slots */
export const useSemanticTeachingPopoverTitleStyles = (_state: unknown) => {
  'use no memo';

  const state = _state as TeachingPopoverTitleState;

  const styles = useStyles();
  const { appearance } = state;

  state.root.className = mergeClasses(
    state.root.className,
    teachingPopoverTitleClassNames.root,
    styles.root,
    appearance === 'brand' && styles.rootBrand,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      state.dismissButton.className,
      teachingPopoverTitleClassNames.dismissButton,
      styles.dismissButton,
      appearance === 'brand' ? styles.dismissBrand : undefined,
      getSlotClassNameProp_unstable(state.dismissButton),
    );
  }

  return state;
};
