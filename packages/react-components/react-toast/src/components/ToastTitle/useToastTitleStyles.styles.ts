import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { ToastTitleSlots, ToastTitleState } from './ToastTitle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const toastTitleClassNames: SlotClassNames<ToastTitleSlots> = {
  root: 'fui-ToastTitle',
  media: 'fui-ToastTitle__media',
  action: 'fui-ToastTitle__action',
};

const useRootBaseClassName = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  gridColumnEnd: 3,
});

const useMediaBaseClassName = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  gridColumnEnd: 2,
  paddingRight: '8px',
  fontSize: '16px',
});

const useActionBaseClassName = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '12px',
  gridColumnEnd: -1,
  color: tokens.colorBrandForeground1,
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
  progress: {
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
  const { intent } = state;
  state.root.className = mergeClasses(toastTitleClassNames.root, rootBaseClassName, state.root.className);

  if (state.media) {
    state.media.className = mergeClasses(
      toastTitleClassNames.media,
      mediaBaseClassName,
      state.media.className,
      intent && intentIconStyles[intent],
    );
  }

  if (state.action) {
    state.action.className = mergeClasses(toastTitleClassNames.action, actionBaseClassName, state.action.className);
  }

  return state;
};
