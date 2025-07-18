import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { toastBodyClassNames, type ToastBodyState } from '@fluentui/react-toast';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useRootBaseClassName = makeResetStyles({
  gridColumnStart: 2,
  gridColumnEnd: 3,
  paddingTop: '6px', //not connected to tokens in Figma
  fontSize: semanticTokens.textRampItemBodyFontSize,
  lineHeight: semanticTokens.textRampItemBodyLineHeight,
  fontWeight: semanticTokens.textStyleDefaultRegularWeight,
  color: semanticTokens.foregroundContentNeutralPrimary,
  wordBreak: 'break-word',
});

const useSubtitleBaseClassName = makeResetStyles({
  paddingTop: '4px', //not connected to tokens in Figma
  gridColumnStart: 2,
  gridColumnEnd: 3,
  fontSize: semanticTokens.textRampMetadataFontSize,
  lineHeight: semanticTokens.textRampMetadataLineHeight,
  fontWeight: semanticTokens.textStyleDefaultRegularWeight,
  color: semanticTokens.foregroundContentNeutralSecondary,
});

const useInvertedStyles = makeStyles({
  root: {
    color: semanticTokens._ctrlToastBodyForegroundContentNeutralPrimary,
  },
  subtitle: {
    color: semanticTokens._ctrlToastBodyForegroundContentNeutralSecondary,
  },
});

/**
 * Apply styling to the ToastBody slots based on the state
 */
export const useSemanticToastBodyStyles = (_state: unknown): ToastBodyState => {
  'use no memo';
  const state = _state as ToastBodyState;
  const rootBaseClassName = useRootBaseClassName();
  const subtitleBaseClassName = useSubtitleBaseClassName();
  const invertedStyles = useInvertedStyles();
  state.root.className = mergeClasses(
    state.root.className,
    toastBodyClassNames.root,
    rootBaseClassName,
    state.backgroundAppearance === 'inverted' && invertedStyles.root,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.subtitle) {
    state.subtitle.className = mergeClasses(
      state.subtitle.className,
      toastBodyClassNames.subtitle,
      subtitleBaseClassName,
      state.backgroundAppearance === 'inverted' && invertedStyles.subtitle,
      getSlotClassNameProp_unstable(state.subtitle),
    );
  }

  return state;
};
