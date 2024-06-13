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
  fontSize: `var(--ctrl-token-ToastBody-2781, var(--semantic-token-ToastBody-2782, ${tokens.fontSizeBase300}))`,
  lineHeight: `var(--ctrl-token-ToastBody-2783, var(--semantic-token-ToastBody-2784, ${tokens.fontSizeBase300}))`,
  fontWeight: `var(--ctrl-token-ToastBody-2785, var(--semantic-token-ToastBody-2786, ${tokens.fontWeightRegular}))`,
  color: `var(--ctrl-token-ToastBody-2787, var(--semantic-token-ToastBody-2788, ${tokens.colorNeutralForeground1}))`,
  wordBreak: 'break-word',
});

const useSubtitleBaseClassName = makeResetStyles({
  paddingTop: '4px',
  gridColumnStart: 2,
  gridColumnEnd: 3,
  fontSize: `var(--ctrl-token-ToastBody-2789, var(--semantic-token-ToastBody-2790, ${tokens.fontSizeBase200}))`,
  lineHeight: `var(--ctrl-token-ToastBody-2791, var(--semantic-token-ToastBody-2792, ${tokens.fontSizeBase200}))`,
  fontWeight: `var(--ctrl-token-ToastBody-2793, var(--semantic-token-ToastBody-2794, ${tokens.fontWeightRegular}))`,
  color: `var(--ctrl-token-ToastBody-2795, var(--semantic-token-ToastBody-2796, ${tokens.colorNeutralForeground2}))`,
});

const useInvertedStyles = makeStyles({
  root: {
    color: `var(--ctrl-token-ToastBody-2797, var(--semantic-token-ToastBody-2798, ${tokens.colorNeutralForegroundInverted2}))`,
  },
  subtitle: {
    color: `var(--ctrl-token-ToastBody-2799, var(--semantic-token-ToastBody-2800, ${tokens.colorNeutralForegroundInverted2}))`,
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
