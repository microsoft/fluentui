'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../../utils/groupMarker';
import { useToolbarGroupStyles } from '../ToolbarGroup/useToolbarGroupStyles';
import type { ToolbarRadioGroupState } from './ToolbarRadioGroup.types';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const toolbarRadioGroupClassNames: { root: string } = {
  root: componentMarkers('toolbar-radio-group'),
};

/**
 * Applies the visual contract, returning new state. The look is ToolbarGroup's in full — there
 * is no stylesheet of its own — plus this component's marker pair, so a consumer can target
 * either identity.
 */
export const useToolbarRadioGroupStyles = (state: ToolbarRadioGroupState): ToolbarRadioGroupState => {
  const { root: groupRoot } = useToolbarGroupStyles(state);

  return {
    ...state,
    root: {
      ...groupRoot,
      className: clsx(toolbarRadioGroupClassNames.root, groupRoot.className),
    },
  };
};
