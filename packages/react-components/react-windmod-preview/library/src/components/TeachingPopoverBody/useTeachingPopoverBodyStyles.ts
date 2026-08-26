import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TeachingPopoverBodyState } from './TeachingPopoverBody.types';

import styles from './TeachingPopoverBody.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const teachingPopoverBodyClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-body'),
};

const mediaLengthClass = (mediaLength: TeachingPopoverBodyState['mediaLength']): string => {
  if (mediaLength === 'medium') {
    return styles.medium;
  }
  if (mediaLength === 'tall') {
    return styles.tall;
  }
  return styles.short;
};

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
    media: state.media && {
      ...state.media,
      className: clsx(styles.media, mediaLengthClass(state.mediaLength), state.media.className),
    },
  };
};
