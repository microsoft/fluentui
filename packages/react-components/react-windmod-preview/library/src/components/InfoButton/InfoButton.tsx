'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderInfoButton, useInfoButton } from '@fluentui/react-headless-components-preview/info-label';
import { bundleIcon } from '@fluentui/react-icons/headless';
import {
  Info12Filled,
  Info12Regular,
  Info16Filled,
  Info16Regular,
  Info20Filled,
  Info20Regular,
} from '@fluentui/react-icons/headless/svg/info';

import { Popover } from '../Popover';
import type { PopoverProps, PopoverSize } from '../Popover';
import { PopoverSurface } from '../PopoverSurface';
import type { InfoButtonProps, InfoButtonSize } from './InfoButton.types';
import { useInfoButtonStyles } from './useInfoButtonStyles';

/** bundleIcon returns a component, so it is called once per size at module scope, never during
 * render. */
const defaultGlyphs = {
  small: bundleIcon(Info12Filled, Info12Regular),
  medium: bundleIcon(Info16Filled, Info16Regular),
  large: bundleIcon(Info20Filled, Info20Regular),
} as const;

/** Copied from @fluentui/react-infolabel: the button's size and its popover's size are separate
 * scales. */
const popoverSizeMap: Record<InfoButtonSize, PopoverSize> = {
  small: 'small',
  medium: 'small',
  large: 'medium',
};

/**
 * An InfoButton displays additional information about a form field or an area in the UI. Windmod
 * InfoButton: the headless info button decorated with the Fluent visual contract (Tailwind v4 +
 * CSS Modules).
 */
export const InfoButton: ForwardRefComponent<InfoButtonProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-infolabel's styled useInfoButton.
  ({ size = 'medium', ...rest }: InfoButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    const state = useInfoButton(rest, ref);
    const Glyph = defaultGlyphs[size];

    return renderInfoButton(
      useInfoButtonStyles({
        ...state,
        // The element type that renders is the slot's own metadata, so a components swap alone is
        // inert outside development; every swapped slot is re-slotted too, and the components
        // entry keeps assertSlots warning in development when the two disagree. The already
        // resolved slot is passed back as the shorthand so nothing is merged a second time.
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- reading base.components to keep every other slot's element type
        components: { ...state.components, popover: Popover, info: PopoverSurface },
        // The slot's props are partial while the component's children are required, so the
        // element type is widened exactly as the headless hook widens its own.
        popover: slot.always<Partial<PopoverProps>>(
          { size: popoverSizeMap[size], ...state.popover },
          { elementType: Popover as React.FC<Partial<PopoverProps>> },
        ),
        info: slot.always({ ...state.info }, { elementType: PopoverSurface }),
        // The headless surface ships no glyph. Consumer children always win.
        root: { ...state.root, children: state.root.children ?? <Glyph /> },
        size,
      }),
    );
    // Casting is required due to lack of distributive union to support union on @types/react
  },
) as ForwardRefComponent<InfoButtonProps>;

InfoButton.displayName = 'InfoButton';
