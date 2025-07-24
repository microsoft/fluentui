import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { teachingPopoverHeaderClassNames, type TeachingPopoverHeaderState } from '@fluentui/react-teaching-popover';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    color: tokens.colorNeutralForeground3,
    fontWeight: semanticTokens.textStyleDefaultHeaderWeight,
    fontSize: semanticTokens.textRampSmItemBodyFontSize,
    lineHeight: semanticTokens.textRampSmItemBodyLineHeight,
    paddingBottom: tokens.spacingVerticalXS,
    alignItems: 'center',
    marginTop: semanticTokens.paddingContentNone,
    marginBottom: semanticTokens.paddingContentNone,
  },
  rootBrand: {
    color: semanticTokens.foregroundCtrlOnBrandRest,
  },
  dismissButton: {
    color: semanticTokens.foregroundContentNeutralSecondary,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampItemBodyFontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textRampItemBodyLineHeight,
    backgroundColor: semanticTokens.nullColor,
    boxSizing: 'border-box',
    marginInlineStart: 'auto',
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
    border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.strokeLayer}`,
  },
  dismissBrand: {
    color: semanticTokens.foregroundCtrlOnBrandRest,
  },
  icon: {
    height: semanticTokens.textGlobalCaption1FontSize,
    width: semanticTokens.textGlobalCaption1FontSize,
    lineHeight: semanticTokens.textGlobalCaption1LineHeight,
    fontSize: semanticTokens.textGlobalCaption1FontSize,
    alignItems: 'center',
    boxSizing: 'content-box',
    display: 'inline-flex',
    justifyContent: 'center',
    textDecorationLine: 'none',
    verticalAlign: 'middle',
    position: 'relative',
    backgroundColor: semanticTokens.nullColor,
    color: semanticTokens.foregroundContentNeutralSecondary,
    marginInlineEnd: semanticTokens.gapBetweenTextSmall,
  },
  iconBrand: {
    color: semanticTokens.foregroundCtrlOnBrandRest,
  },
});

/** Applies style classnames to slots */
export const useSemanticTeachingPopoverHeaderStyles = (_state: unknown) => {
  'use no memo';

  const state = _state as TeachingPopoverHeaderState;

  const styles = useStyles();
  const { appearance } = state;

  state.root.className = mergeClasses(
    state.root.className,
    teachingPopoverHeaderClassNames.root,
    styles.root,
    appearance === 'brand' && styles.rootBrand,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      state.dismissButton.className,
      teachingPopoverHeaderClassNames.dismissButton,
      styles.dismissButton,
      appearance === 'brand' ? styles.dismissBrand : undefined,
      getSlotClassNameProp_unstable(state.dismissButton),
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      teachingPopoverHeaderClassNames.icon,
      styles.icon,
      appearance === 'brand' ? styles.iconBrand : undefined,
      getSlotClassNameProp_unstable(state.icon),
    );
  }
  return state;
};
