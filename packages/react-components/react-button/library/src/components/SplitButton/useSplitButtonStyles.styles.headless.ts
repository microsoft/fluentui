'use client';

import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SplitButtonSlots, SplitButtonState } from './SplitButton.types';

export const splitButtonClassNames: SlotClassNames<SplitButtonSlots> = {
  root: 'fui-SplitButton',
  menuButton: 'fui-SplitButton__menuButton',
  primaryActionButton: 'fui-SplitButton__primaryActionButton',
};

/**
 * Attaches only semantic slot class names and state modifiers
 */
export const useSplitButtonStyles_unstable = (state: SplitButtonState): SplitButtonState => {
  'use no memo';

  const { appearance, disabled, disabledFocusable, shape, size } = state;

  state.root.className = [
    splitButtonClassNames.root,

    // Appearance
    appearance && `${splitButtonClassNames.root}--${appearance}`,

    // Size
    size && `${splitButtonClassNames.root}--${size}`,

    // Shape
    shape && `${splitButtonClassNames.root}--${shape}`,

    // Disabled styles
    disabled && `${splitButtonClassNames.root}--disabled`,
    disabledFocusable && !disabled && `${splitButtonClassNames.root}--disabledFocusable`,

    // User provided class name
    state.root.className,
  ]
    .filter(Boolean)
    .join(' ');

  if (state.primaryActionButton) {
    state.primaryActionButton.className = [
      splitButtonClassNames.primaryActionButton,
      state.primaryActionButton.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  if (state.menuButton) {
    state.menuButton.className = [splitButtonClassNames.menuButton, state.menuButton.className]
      .filter(Boolean)
      .join(' ');
  }

  return state;
};
