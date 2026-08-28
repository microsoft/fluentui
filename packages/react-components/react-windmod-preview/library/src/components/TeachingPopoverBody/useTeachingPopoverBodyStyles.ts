import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { TeachingPopoverBodyState } from './TeachingPopoverBody.types';

import styles from './TeachingPopoverBody.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const teachingPopoverBodyClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-body'),
};

// One key per mediaLength member, so the keys partition the union with no implied else; `+()`
// coerces a condition to 1 or 0 because TS rejects a bare boolean computed key (TS2464).
const mediaLengthClass = (mediaLength: TeachingPopoverBodyState['mediaLength']): string =>
  ({
    [+(mediaLength === 'short')]: styles.short,
    [+(mediaLength === 'medium')]: styles.medium,
    [+(mediaLength === 'tall')]: styles.tall,
  })[1];

/**
 * Applies the visual contract, returning new state. The headless hook already resolves
 * mediaLength, defaulting it to 'short'.
 */
export const useTeachingPopoverBodyStyles = (state: TeachingPopoverBodyState): TeachingPopoverBodyState => {
  return {
    ...state,
    root: {
      ...state.root,
      className: clsx(teachingPopoverBodyClassNames.root, styles.root, state.root.className),
    },
    media: slotClasses(state.media, styles.media, mediaLengthClass(state.mediaLength)),
  };
};
