'use client';

import { clsx } from 'clsx';

import { useOptionGroupStyles } from '../OptionGroup/useOptionGroupStyles';
import { componentMarkers } from '../../utils/groupMarker';
import type { TagPickerOptionGroupState } from './TagPickerOptionGroup.types';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const tagPickerOptionGroupClassNames: { root: string } = {
  root: componentMarkers('tag-picker-option-group'),
};

/**
 * Applies the visual contract, returning new state. This component owns no module.css: Griffel's
 * TagPickerOptionGroup style hook adds two class-name strings and zero declarations over the shared
 * OptionGroup look, so windmod adds its own marker pair over windmod OptionGroup's styles hook and
 * nothing else. The marker pair leads, keeping a slash-free classList[0].
 */
export const useTagPickerOptionGroupStyles = (state: TagPickerOptionGroupState): TagPickerOptionGroupState => {
  const styled = useOptionGroupStyles(state);

  return {
    ...styled,
    root: {
      ...styled.root,
      className: clsx(tagPickerOptionGroupClassNames.root, styled.root.className),
    },
  };
};
