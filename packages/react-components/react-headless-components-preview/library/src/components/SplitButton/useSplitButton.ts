'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ExtractSlotProps } from '@fluentui/react-utilities';
import { useSplitButtonBase_unstable } from '@fluentui/react-button';
import { Button } from '../Button/Button';
import { MenuButton } from '../MenuButton/MenuButton';
import type { SplitButtonProps, SplitButtonSlots, SplitButtonState } from './SplitButton.types';

/**
 * Returns the state for a SplitButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSplitButton`.
 *
 * Composes the design-agnostic `useSplitButtonBase_unstable` from `@fluentui/react-button` and
 * recreates both child slots with the headless `Button`/`MenuButton` components. Recreating (not
 * just patching `state.components`) is required because production rendering resolves each
 * slot's element type from its `SLOT_ELEMENT_TYPE_SYMBOL` metadata, which only
 * `slot.optional`/`slot.always` can set correctly.
 *
 * The wrapper intentionally adds no SplitButton-specific `data-*` attributes: the nested
 * headless `Button` and `MenuButton` remain the state owners and already emit their own
 * `data-disabled`, `data-disabled-focusable`, and `data-icon-only` attributes.
 */
export const useSplitButton = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): SplitButtonState => {
  const baseState = useSplitButtonBase_unstable(props, ref as React.Ref<HTMLDivElement>);

  const menuButtonShorthand = slot.optional<ExtractSlotProps<NonNullable<SplitButtonSlots['menuButton']>>>(
    baseState.menuButton,
    {
      renderByDefault: true,
      elementType: MenuButton,
    },
  );
  const primaryActionButtonShorthand = slot.optional<
    ExtractSlotProps<NonNullable<SplitButtonSlots['primaryActionButton']>>
  >(baseState.primaryActionButton, {
    renderByDefault: true,
    elementType: Button,
  });

  return {
    ...baseState,
    components: { root: 'div', menuButton: MenuButton, primaryActionButton: Button },
    menuButton: menuButtonShorthand,
    primaryActionButton: primaryActionButtonShorthand,
  };
};
