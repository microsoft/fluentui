import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { toastClassNames, type ToastState } from '@fluentui/react-toast';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useRootBaseClassName = makeResetStyles({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  padding: semanticTokens.paddingContentSmall,
  borderRadius: semanticTokens._ctrlToastCornerFlyoutRest,
  border: `1px solid ${semanticTokens._ctrlToastStrokeFlyout}`,
  boxShadow: semanticTokens._ctrlToastShadowFlyout,
  fontSize: semanticTokens.textRampItemHeaderFontSize,
  lineHeight: semanticTokens._ctrlToastTextRampItemHeaderLineHeight,
  fontWeight: semanticTokens.textStyleDefaultHeaderWeight,
  color: semanticTokens.foregroundContentNeutralPrimary,
  backgroundColor: semanticTokens.backgroundFlyoutLumBlend,
});

const useStyles = makeStyles({
  inverted: {
    color: semanticTokens._ctrlToastForegroundContentNeutralPrimary,
    backgroundColor: semanticTokens._ctrlToastBackgroundFlyoutLumBlend,
  },
});

/**
 * Apply styling to the Toast slots based on the state
 */
export const useSemanticToastStyles = (_state: unknown): ToastState => {
  'use no memo';

  const state = _state as ToastState;

  const rootBaseClassName = useRootBaseClassName();
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    toastClassNames.root,
    rootBaseClassName,
    state.backgroundAppearance === 'inverted' && styles.inverted,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
