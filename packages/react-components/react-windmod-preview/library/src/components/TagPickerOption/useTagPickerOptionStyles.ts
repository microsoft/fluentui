import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { TagPickerOptionState } from './TagPickerOption.types';

import styles from './TagPickerOption.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const tagPickerOptionClassNames: { root: string } = {
  root: componentMarkers('tag-picker-option'),
};

/**
 * Applies the visual contract, returning new state. The resting look is a clone of the three
 * Option buckets Griffel actually reaches here rather than a reuse of windmod Option's module —
 * see TagPickerOption.module.css.
 *
 * `state.root.className` stays LAST, as everywhere: the headless hook injects react-combobox's
 * literal `fui-Option` there by hand, and the picker's active-descendant controller finds options
 * by that class.
 */
export const useTagPickerOptionStyles = (state: TagPickerOptionState): TagPickerOptionState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(
      tagPickerOptionClassNames.root,
      styles.root,
      state.secondaryContent && styles.withSecondaryContent,
      state.root.className,
    ),
  },
  media: slotClasses(state.media, styles.media),
  secondaryContent: slotClasses(state.secondaryContent, styles.secondaryContent),
});
