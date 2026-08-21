'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderDivider, useDivider } from '@fluentui/react-headless-components-preview/divider';

import type { DividerProps, DividerState } from './Divider.types';
import { useDividerStyles } from './useDividerStyles';

/**
 * A Divider separates and distinguishes sections of content. Windmod Divider: the headless
 * divider decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Divider: ForwardRefComponent<DividerProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-divider's styled useDivider. `vertical` is deliberately
  // absent: the headless hook owns it and derives data-orientation from it.
  const { alignContent = 'center', appearance = 'default', inset = false, ...rest } = props;

  const state: DividerState = {
    ...useDivider(rest, ref),
    alignContent,
    appearance,
    inset,
  };

  return renderDivider(useDividerStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<DividerProps>;

Divider.displayName = 'Divider';
