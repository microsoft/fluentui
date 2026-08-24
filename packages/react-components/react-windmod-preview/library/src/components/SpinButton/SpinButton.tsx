'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSpinButton, useSpinButton } from '@fluentui/react-headless-components-preview/spin-button';
import { ChevronUp16Regular } from '@fluentui/react-icons/headless/svg/chevron-up';
import { ChevronDown16Regular } from '@fluentui/react-icons/headless/svg/chevron-down';

import type { SpinButtonProps, SpinButtonState } from './SpinButton.types';
import { useSpinButtonStyles } from './useSpinButtonStyles';

/**
 * A SpinButton lets people incrementally adjust a value in small steps. Windmod SpinButton: the
 * headless spin button decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const SpinButton: ForwardRefComponent<SpinButtonProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-spinbutton's styled useSpinButton, minus its overrides-context
  // fallback, which windmod ships no counterpart for.
  ({ appearance = 'outline', size = 'medium', ...rest }, ref) => {
    const base = useSpinButton(rest, ref);

    // Both stepper slots always render but carry no glyph of their own, so an unrestored SpinButton
    // shows two painted empty boxes. The chevrons are restored in a new state object, never on the
    // one the hook returned; consumer children always win. No pre-hook materialisation is needed —
    // both slots exist post-hook for every input, `null` included.
    const incrementButton: SpinButtonState['incrementButton'] = base.incrementButton && {
      ...base.incrementButton,
      children: base.incrementButton.children ?? <ChevronUp16Regular />,
    };
    const decrementButton: SpinButtonState['decrementButton'] = base.decrementButton && {
      ...base.decrementButton,
      children: base.decrementButton.children ?? <ChevronDown16Regular />,
    };

    return renderSpinButton(useSpinButtonStyles({ ...base, incrementButton, decrementButton, appearance, size }));
    // Casting is required due to lack of distributive union to support union on @types/react
  },
) as ForwardRefComponent<SpinButtonProps>;

SpinButton.displayName = 'SpinButton';
