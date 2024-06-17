import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { ToastBodySlots, ToastBodyState } from './ToastBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const toastBodyClassNames: SlotClassNames<ToastBodySlots> = {
  root: 'fui-ToastBody',
  subtitle: 'fui-ToastBody__subtitle',
};

const useRootBaseClassName = makeResetStyles({
  gridColumnStart: 2,
  gridColumnEnd: 3,
  paddingTop: '6px',
  fontSize: `var(--2781, var(--2782, ${tokens.fontSizeBase300}))`,
  lineHeight: `var(--2783, var(--2784, ${tokens.fontSizeBase300}))`,
  fontWeight: `var(--2785, var(--2786, ${tokens.fontWeightRegular}))`,
  color: `var(--2787, var(--2788, ${tokens.colorNeutralForeground1}))`,
  wordBreak: 'break-word',
});

const useSubtitleBaseClassName = makeResetStyles({
  paddingTop: '4px',
  gridColumnStart: 2,
  gridColumnEnd: 3,
  fontSize: `var(--2789, var(--2790, ${tokens.fontSizeBase200}))`,
  lineHeight: `var(--2791, var(--2792, ${tokens.fontSizeBase200}))`,
  fontWeight: `var(--2793, var(--2794, ${tokens.fontWeightRegular}))`,
  color: `var(--2795, var(--2796, ${tokens.colorNeutralForeground2}))`,
});

const useInvertedStyles = makeStyles({
  root: {
    color: `var(--2797, var(--2798, ${tokens.colorNeutralForegroundInverted2}))`,
  },
  subtitle: {
    color: `var(--2799, var(--2800, ${tokens.colorNeutralForegroundInverted2}))`,
  },
});

/**
 * Apply styling to the ToastBody slots based on the state
 */
export const useToastBodyStyles_unstable = (state: ToastBodyState): ToastBodyState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const subtitleBaseClassName = useSubtitleBaseClassName();
  const invertedStyles = useInvertedStyles();
  state.root.className = mergeClasses(
    toastBodyClassNames.root,
    rootBaseClassName,
    state.backgroundAppearance === 'inverted' && invertedStyles.root,
    state.root.className,
  );

  if (state.subtitle) {
    state.subtitle.className = mergeClasses(
      toastBodyClassNames.subtitle,
      subtitleBaseClassName,
      state.backgroundAppearance === 'inverted' && invertedStyles.subtitle,
      state.subtitle.className,
    );
  }

  return state;
};
