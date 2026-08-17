import { clsx } from 'clsx';
import type { CardPreviewState } from './CardPreview.types';

import styles from './CardPreview.module.css';

/**
 * CardPreview's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const cardPreviewClassNames: { root: string } = {
  root: 'group/fui-card-preview',
};

/**
 * Apply styling to the CardPreview slots based on the state.
 */
export const useCardPreviewStyles_unstable = (state: CardPreviewState): CardPreviewState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, cardPreviewClassNames.root, state.root.className);

  if (state.logo) {
    state.logo.className = clsx(styles.logo, state.logo.className);
  }

  return state;
};
