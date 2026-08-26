import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { TagPickerControlState } from './TagPickerControl.types';

import styles from './TagPickerControl.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const tagPickerControlClassNames: { root: string } = {
  root: componentMarkers('tag-picker-control'),
};

type TagPickerControlRootDataAttributes = {
  'data-size'?: TagPickerControlState['size'];
};

/**
 * Applies the visual contract, returning new state. This is the family's picker-scale `data-size`
 * stamp, and the whole family reads it: the aside, the expand icon, the input and the button all
 * take their size steps through the control's group-size variants rather than a stamp of their own.
 * TagPickerGroup carries a second, independent picker-scale stamp for its own gaps.
 *
 * The headless hook already stamps data-disabled and data-invalid, so neither is duplicated; the
 * expand icon's disabled colour and the input's disabled look both read data-disabled from CSS
 * where Griffel gates them in JS.
 */
export const useTagPickerControlStyles = (state: TagPickerControlState): TagPickerControlState => {
  const { appearance, disabled, invalid, size } = state;

  const root: TagPickerControlState['root'] & TagPickerControlRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(
      tagPickerControlClassNames.root,
      styles.root,
      appearance === 'outline' && styles.outline,
      appearance === 'underline' && styles.underline,
      appearance === 'filled-lighter' && styles.filledLighter,
      appearance === 'filled-darker' && styles.filledDarker,
      !disabled && appearance === 'outline' && styles.outlineInteractive,
      invalid && appearance !== 'underline' && styles.invalid,
      invalid && appearance === 'underline' && styles.invalidUnderline,
      disabled && styles.disabled,
      state.root.className,
    ),
  };

  return {
    ...state,
    root,
    aside: slotClasses(state.aside, styles.aside),
    expandIcon: slotClasses(state.expandIcon, styles.expandIcon),
    secondaryAction: slotClasses(state.secondaryAction, styles.secondaryAction),
  };
};
