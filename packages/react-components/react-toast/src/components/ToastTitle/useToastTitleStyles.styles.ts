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
  alignItems: 'center',
  gridColumnEnd: 3,
  color: tokens.colorNeutralForeground1,
});

const useMediaBaseClassName = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  gridColumnEnd: 2,
  paddingRight: '8px',
  fontSize: '16px',
  color: tokens.colorNeutralForeground1,
});

const useActionBaseClassName = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
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
    // FIXME https://github.com/microsoft/fluentui/issues/28219
    color: tokens.colorPaletteGreenForeground3,
  },
  error: {
    // FIXME https://github.com/microsoft/fluentui/issues/28219
    color: tokens.colorPaletteCranberryForeground2,
  },
  warning: {
    // FIXME https://github.com/microsoft/fluentui/issues/28219
    color: tokens.colorPaletteDarkOrangeForeground1,
  },
  info: {
    color: tokens.colorNeutralForeground2,
  },
});

const useIntentIconStylesInverted = makeStyles({
  success: {
    // FIXME https://github.com/microsoft/fluentui/issues/28219
    color: tokens.colorPaletteGreenForegroundInverted,
  },
  error: {
    // FIXME https://github.com/microsoft/fluentui/issues/28219
    color: tokens.colorPaletteRedForegroundInverted,
  },
  warning: {
    // FIXME https://github.com/microsoft/fluentui/issues/28219
    color: tokens.colorPaletteYellowForegroundInverted,
  },
  info: {
    color: tokens.colorNeutralForegroundInverted2,
  },
});

/**
 * Apply styling to the ToastTitle slots based on the state
 */
export const useToastTitleStyles_unstable = (state: ToastTitleState): ToastTitleState => {
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
