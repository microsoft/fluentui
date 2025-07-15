import { makeStyles, mergeClasses } from '@griffel/react';
import { breadcrumbButtonClassNames, type BreadcrumbButtonState } from '@fluentui/react-breadcrumb';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { useButtonStyles_unstable, buttonClassNames } from '@fluentui/react-button';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import * as semanticTokens from '@fluentui/semantic-tokens';

/**
 * CSS variable names used internally for styling in the Breadcrumb.
 */
const breadcrumbCSSVars = {
  breadcrumbIconSizeVar: '--fui-Breadcrumb--icon-size',
  breadcrumbIconLineHeightVar: '--fui-Breadcrumb--icon-line-height',
};

const useIconStyles = makeStyles({
  base: {
    fontSize: `var(${breadcrumbCSSVars.breadcrumbIconSizeVar})`,
    height: `var(${breadcrumbCSSVars.breadcrumbIconSizeVar})`,
    lineHeight: `var(${breadcrumbCSSVars.breadcrumbIconLineHeightVar})`,
    width: `var(${breadcrumbCSSVars.breadcrumbIconSizeVar})`,
    marginRight: semanticTokens.gapInsideCtrlSmDefault,
  },
  small: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: '12px',
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: semanticTokens.textGlobalCaption1LineHeight,
  },
  medium: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: semanticTokens._ctrlBreadcrumbSizeSmIcon,
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: semanticTokens.textGlobalBody2LineHeight,
  },
  large: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: semanticTokens.sizeCtrlIcon,
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: semanticTokens.textGlobalSubtitle2LineHeight,
  },
});

const defaultButtonStyles = {
  backgroundColor: semanticTokens.nullColor,
  color: semanticTokens.foregroundCtrlOnTransparentRest,
  cursor: 'auto',
};

const currentIconStyles = {
  ...defaultButtonStyles,
  [`& .${buttonClassNames.icon}`]: {
    color: 'unset',
  },
  [`& .${iconFilledClassName}`]: {
    display: 'none',
  },
  [`& .${iconRegularClassName}`]: {
    display: 'inline',
  },
};

const useStyles = makeStyles({
  root: {
    minWidth: 'unset',
    textWrap: 'nowrap',
  },
  small: {
    height: '24px',
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textGlobalCaption1FontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textGlobalCaption1LineHeight,
    padding: semanticTokens.gapInsideCtrlToLabel,
  },
  medium: {
    height: semanticTokens._ctrlBreadcrumbSizeDefault,
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampItemBodyFontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textRampItemBodyLineHeight,
    padding: semanticTokens.gapInsideCtrlToLabel,
  },
  large: {
    height: semanticTokens._ctrlBreadcrumbSizeLgDefault,
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textGlobalBody2FontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textGlobalBody2LineHeight,
    padding: semanticTokens.gapInsideCtrlLgToLabel,
  },
  current: {
    ':hover': {
      ...currentIconStyles,
    },
    ':hover:active': {
      ...currentIconStyles,
    },
    ':disabled': {
      ...currentIconStyles,
    },
  },
  currentSmall: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textGlobalCaption1FontSize,
    fontWeight: semanticTokens.textCtrlButtonWeightDefault,
    lineHeight: semanticTokens.textGlobalCaption1LineHeight,
  },
  currentMedium: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampItemBodyFontSize,
    fontWeight: semanticTokens.textCtrlButtonWeightDefault,
    lineHeight: semanticTokens.textRampItemBodyLineHeight,
  },
  currentLarge: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampLgItemBodyFontSize,
    fontWeight: semanticTokens.textCtrlButtonWeightDefault,
    lineHeight: semanticTokens.textRampLgItemBodyLineHeight,
  },
});

/**
 * Apply styling to the BreadcrumbButton slots based on the state
 */
export const useSemanticBreadcrumbButtonStyles = (_state: unknown): BreadcrumbButtonState => {
  'use no memo';

  const state = _state as BreadcrumbButtonState;

  const styles = useStyles();
  const iconStyles = useIconStyles();

  const currentSizeMap = {
    small: styles.currentSmall,
    medium: styles.currentMedium,
    large: styles.currentLarge,
  };
  state.root.className = mergeClasses(
    state.root.className,
    breadcrumbButtonClassNames.root,
    styles[state.size],
    styles.root,
    state.current && currentSizeMap[state.size],
    state.current && styles.current,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      iconStyles.base,
      iconStyles[state.size],
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  useButtonStyles_unstable(state);

  return state;
};
