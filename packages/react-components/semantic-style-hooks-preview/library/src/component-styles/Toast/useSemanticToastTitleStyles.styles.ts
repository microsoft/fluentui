import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import { toastTitleClassNames, type ToastTitleState } from '@fluentui/react-toast';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useRootBaseClassName = makeResetStyles({
  display: 'flex',
  gridColumnEnd: 3,
  color: semanticTokens.foregroundContentNeutralPrimary,
  wordBreak: 'break-word',
});

const useMediaBaseClassName = makeResetStyles({
  display: 'flex',
  paddingTop: '2px',
  gridColumnEnd: 2,
  paddingRight: semanticTokens.gapInsideCtrlDefault,
  fontSize: semanticTokens._ctrlToastTextRampItemHeaderFontSize,
  color: semanticTokens.foregroundContentNeutralPrimary,
});

const useActionBaseClassName = makeResetStyles({
  display: 'flex',
  alignItems: 'start',
  paddingLeft: semanticTokens._ctrlToastTitleGapBetweenCtrlDefault,
  gridColumnEnd: -1,
  color: semanticTokens._ctrlToastTitleCtrlLinkForegroundBrandRest,
});

const useInvertedStyles = makeStyles({
  root: {
    color: semanticTokens._ctrlToastTitleForegroundContentNeutralPrimary,
  },

  action: {
    color: semanticTokens._ctrlToastTitleCtrlLinkForegroundBrandRestInverted,
  },

  media: {
    color: semanticTokens._ctrlToastTitleForegroundContentNeutralPrimaryMedia,
  },
});

const useIntentIconStyles = makeStyles({
  success: {
    color: semanticTokens.statusSuccessTintForeground,
  },
  error: {
    color: semanticTokens._ctrlToastTitleStatusDangerTintForeground,
  },
  warning: {
    color: semanticTokens._ctrlToastTitleStatusWarningTintForeground,
  },
  info: {
    color: semanticTokens._ctrlToastTitleStatusInformativeTintForeground,
  },
});

const useIntentIconStylesInverted = makeStyles({
  success: {
    color: semanticTokens._ctrlToastTitleStatusSuccessTintForegroundInverted,
  },
  error: {
    color: semanticTokens._ctrlToastTitleStatusDangerTintForegroundInverted,
  },
  warning: {
    color: semanticTokens._ctrlToastTitleStatusWarningTintForegroundInverted,
  },
  info: {
    color: semanticTokens._ctrlToastTitleStatusInformativeTintForegroundInverted,
  },
});

/**
 * Apply styling to the ToastTitle slots based on the state
 */
export const useSemanticToastTitleStyles = (_state: unknown): ToastTitleState => {
  'use no memo';

  const state = _state as ToastTitleState;

  const rootBaseClassName = useRootBaseClassName();
  const actionBaseClassName = useActionBaseClassName();
  const mediaBaseClassName = useMediaBaseClassName();
  const intentIconStyles = useIntentIconStyles();
  const intentIconStylesInverted = useIntentIconStylesInverted();
  const { intent } = state;
  const invertedStyles = useInvertedStyles();
  state.root.className = mergeClasses(
    state.root.className,
    toastTitleClassNames.root,
    rootBaseClassName,
    state.backgroundAppearance === 'inverted' && invertedStyles.root,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.media) {
    state.media.className = mergeClasses(
      state.media.className,
      toastTitleClassNames.media,
      mediaBaseClassName,
      state.backgroundAppearance === 'inverted' && invertedStyles.media,
      intent && intentIconStyles[intent],
      intent && state.backgroundAppearance === 'inverted' && intentIconStylesInverted[intent],
      getSlotClassNameProp_unstable(state.media),
    );
  }

  if (state.action) {
    state.action.className = mergeClasses(
      state.action.className,
      toastTitleClassNames.action,
      actionBaseClassName,
      state.backgroundAppearance === 'inverted' && invertedStyles.action,
      getSlotClassNameProp_unstable(state.action),
    );
  }

  return state;
};
