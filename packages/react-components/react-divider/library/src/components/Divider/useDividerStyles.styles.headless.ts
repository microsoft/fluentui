'use client';

import { DividerSlots, DividerState } from './Divider.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const dividerClassNames: SlotClassNames<DividerSlots> = {
  root: 'fui-Divider',
  wrapper: 'fui-Divider__wrapper',
};

/**
 * Attaches only semantic slot class names and state modifiers
 */
export const useDividerStyles_unstable = (state: DividerState): DividerState => {
  'use no memo';

  const { alignContent, appearance, inset, vertical } = state;

  state.root.className = [
    dividerClassNames.root,

    // Alignment
    `${dividerClassNames}--align-${alignContent}`,

    // Appearance
    `${dividerClassNames}--${appearance}`,

    // Orientation
    vertical ? `${dividerClassNames}--vertical` : `${dividerClassNames}--horizontal`,

    // Inset
    inset && `${dividerClassNames}--inset`,

    // User provided class name
    state.root.className,
  ]
    .filter(Boolean)
    .join(' ');

  if (state.wrapper) {
    state.wrapper.className = [dividerClassNames.wrapper, state.wrapper.className].filter(Boolean).join(' ');
  }

  return state;
};
