'use client';

import * as React from 'react';
import { slot, type ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSplitButton, useSplitButton } from '@fluentui/react-headless-components-preview/split-button';

import { Button } from '../Button/Button';
import { MenuButton } from '../MenuButton/MenuButton';
import type { SplitButtonProps, SplitButtonState } from './SplitButton.types';
import { useSplitButtonStyles } from './useSplitButtonStyles';

/**
 * SplitButtons are a grouping of two interactive surfaces where interacting with the first one
 * triggers a primary action, while interacting with the second one opens a menu with secondary
 * actions. Windmod SplitButton: the headless split button decorated with the Fluent visual
 * contract (Tailwind v4 + CSS Modules).
 */
export const SplitButton: ForwardRefComponent<SplitButtonProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-button's styled useSplitButton.
  const { appearance = 'secondary', shape = 'rounded', size = 'medium', ...rest } = props;

  const base = useSplitButton(rest, ref);

  // The headless hook builds both children from the HEADLESS Button and MenuButton, which carry no
  // visual contract; the slots are rebuilt on windmod's own components with the look props as
  // defaults, so a per-slot value the consumer supplied still wins. New state object, never the
  // one the hook returned.
  const state: SplitButtonState = {
    ...base,
    components: { root: 'div', menuButton: MenuButton, primaryActionButton: Button },
    menuButton: slot.optional(props.menuButton, {
      defaultProps: { appearance, shape, size, ...base.menuButton },
      renderByDefault: true,
      elementType: MenuButton,
    }),
    primaryActionButton: slot.optional(props.primaryActionButton, {
      defaultProps: { appearance, shape, size, ...base.primaryActionButton },
      renderByDefault: true,
      elementType: Button,
    }),
    appearance,
    shape,
    size,
  };

  return renderSplitButton(useSplitButtonStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<SplitButtonProps>;

SplitButton.displayName = 'SplitButton';
