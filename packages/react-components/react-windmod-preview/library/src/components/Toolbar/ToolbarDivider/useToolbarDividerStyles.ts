'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../../utils/groupMarker';
import { useDividerStyles } from '../../Divider/useDividerStyles';
import type { ToolbarDividerState } from './ToolbarDivider.types';

import styles from './ToolbarDivider.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const toolbarDividerClassNames: { root: string } = {
  root: componentMarkers('toolbar-divider'),
};

type ToolbarDividerRootDataAttributes = {
  'data-orientation'?: 'horizontal' | 'vertical';
};

/**
 * Applies the visual contract on top of Divider's, returning new state. The headless toolbar
 * hook stamps data-vertical but not data-orientation, and the whole Divider line is gated on
 * data-orientation — without this stamp no line is drawn at all.
 */
export const useToolbarDividerStyles = (state: ToolbarDividerState): ToolbarDividerState => {
  const { root: dividerRoot } = useDividerStyles(state);

  const root: ToolbarDividerState['root'] & ToolbarDividerRootDataAttributes = {
    ...dividerRoot,
    'data-orientation': state.vertical ? 'vertical' : 'horizontal',
    className: clsx(toolbarDividerClassNames.root, styles.root, dividerRoot.className),
  };

  return {
    ...state,
    root,
  };
};
