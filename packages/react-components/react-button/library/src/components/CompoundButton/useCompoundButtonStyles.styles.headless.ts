'use client';

import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CompoundButtonSlots, CompoundButtonState } from './CompoundButton.types';

// Re-export the same slot class names mapping used by the griffel styles file
export const compoundButtonClassNames: SlotClassNames<CompoundButtonSlots> = {
  root: 'fui-CompoundButton',
  icon: 'fui-CompoundButton__icon',
  contentContainer: 'fui-CompoundButton__contentContainer',
  secondaryContent: 'fui-CompoundButton__secondaryContent',
};

/**
 * Attaches only semantic slot class names and state modifiers
 */
export const useCompoundButtonStyles_unstable = (state: CompoundButtonState): CompoundButtonState => {
  'use no memo';

  const { appearance, disabled, disabledFocusable, icon, iconOnly, iconPosition, shape, size } = state as any;

  state.root.className = [
    compoundButtonClassNames.root,

    // Appearance
    appearance && `${compoundButtonClassNames.root}--${appearance}`,

    // Size
    size && `${compoundButtonClassNames.root}--${size}`,

    // Shape
    shape && `${compoundButtonClassNames.root}--${shape}`,

    // Disabled styles
    disabled && `${compoundButtonClassNames.root}--disabled`,
    disabledFocusable && `${compoundButtonClassNames.root}--disabledFocusable`,

    // Icon styles
    icon && iconPosition === 'before' && `${compoundButtonClassNames.root}--iconBefore`,
    icon && iconPosition === 'after' && `${compoundButtonClassNames.root}--iconAfter`,
    icon && iconOnly && `${compoundButtonClassNames.root}--iconOnly`,

    // User provided class name
    state.root.className,
  ]
    .filter(Boolean)
    .join(' ');

  if (state.icon) {
    state.icon.className = [compoundButtonClassNames.icon, state.icon.className].filter(Boolean).join(' ');
  }

  state.contentContainer.className = [compoundButtonClassNames.contentContainer, state.contentContainer.className]
    .filter(Boolean)
    .join(' ');

  if (state.secondaryContent) {
    state.secondaryContent.className = [compoundButtonClassNames.secondaryContent, state.secondaryContent.className]
      .filter(Boolean)
      .join(' ');
  }

  return state;
};
