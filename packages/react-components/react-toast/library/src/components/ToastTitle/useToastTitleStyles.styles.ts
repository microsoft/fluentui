import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToastTitleSlots, ToastTitleState } from './ToastTitle.types';

export const toastTitleClassNames: SlotClassNames<ToastTitleSlots> = {
  root: 'fui-ToastTitle',
  media: 'fui-ToastTitle__media',
  action: 'fui-ToastTitle__action',
};

const useRootBaseClassName = makeResetStyles({
  display: 'flex',
  gridColumnEnd: 3,
  color: tokens.colorNeutralForeground1,
  wordBreak: 'break-word',
});

const useMediaBaseClassName = makeResetStyles({
  display: 'flex',
  paddingTop: '2px',
  gridColumnEnd: 2,
  paddingRight: '8px',
  fontSize: '16px',
  color: tokens.colorNeutralForeground1,
});

const useActionBaseClassName = makeResetStyles({
  display: 'flex',
  alignItems: 'start',
  paddingLeft: '12px',
  gridColumnEnd: -1,
  color: tokens.colorBrandForeground1,
});

const useInvertedStyles = makeStyles({
  root: {
    color: tokens.colorNeutralForegroundInverted2,
  },

  action: {
    color: tokens.colorBrandForegroundInverted,
  },

  media: {
    color: tokens.colorNeutralForegroundInverted,
  },
});

const useIntentIconStyles = makeStyles({
  success: {
    color: tokens.colorStatusSuccessForeground1,
  },
  error: {
    color: tokens.colorStatusDangerForeground1,
  },
  warning: {
    color: tokens.colorStatusWarningForeground1,
  },
  info: {
    color: tokens.colorNeutralForeground2,
  },
});

const useIntentIconStylesInverted = makeStyles({
  success: {
    color: tokens.colorStatusSuccessForegroundInverted,
  },
  error: {
    color: tokens.colorStatusDangerForegroundInverted,
  },
  warning: {
    color: tokens.colorStatusWarningForegroundInverted,
  },
  info: {
    color: tokens.colorNeutralForegroundInverted2,
  },
});

/**
 * Apply styling to the ToastTitle slots based on the state
 */
export const useToastTitleStyles_unstable = (state: ToastTitleState): ToastTitleState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const actionBaseClassName = useActionBaseClassName();
  const mediaBaseClassName = useMediaBaseClassName();
  const intentIconStyles = useIntentIconStyles();
  const intentIconStylesInverted = useIntentIconStylesInverted();
  const { intent } = state;
  const invertedStyles = useInvertedStyles();
  state.root.className = mergeClasses(
    toastTitleClassNames.root,
    rootBaseClassName,
    state.backgroundAppearance === 'inverted' && invertedStyles.root,
    state.root.className,
  );

  if (state.media) {
    state.media.className = mergeClasses(
      toastTitleClassNames.media,
      mediaBaseClassName,
      state.backgroundAppearance === 'inverted' && invertedStyles.media,
      state.media.className,
      intent && intentIconStyles[intent],
      intent && state.backgroundAppearance === 'inverted' && intentIconStylesInverted[intent],
    );
  }

  if (state.action) {
    state.action.className = mergeClasses(
      toastTitleClassNames.action,
      actionBaseClassName,
      state.backgroundAppearance === 'inverted' && invertedStyles.action,
      state.action.className,
    );
  }

  return state;
};
