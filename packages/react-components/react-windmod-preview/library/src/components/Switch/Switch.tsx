'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSwitch, useSwitch } from '@fluentui/react-headless-components-preview/switch';
import { CircleFilled } from '@fluentui/react-icons/headless/svg/circle';

import type { SwitchProps, SwitchState } from './Switch.types';
import { useSwitchStyles } from './useSwitchStyles';

/**
 * A Switch toggles between two mutually exclusive states. Windmod Switch: the headless switch
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Switch: ForwardRefComponent<SwitchProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-switch's styled useSwitch.
  const { size = 'medium', ...rest } = props;

  const base = useSwitch(rest, ref);

  // The headless indicator slot ships no thumb so the package needs no icon dependency; windmod
  // restores the Fluent default in a new state object, never on the one the hook returned. A
  // consumer's own indicator children still win. The slot always renders — unlike MenuButton's
  // menuIcon, which needs pre-hook materialisation to stay removable (see MenuButton.tsx) — so
  // `indicator={null}` leaves an indicator carrying the default thumb rather than removing it.
  const state: SwitchState = {
    ...base,
    size,
    indicator: { ...base.indicator, children: base.indicator.children ?? <CircleFilled /> },
  };

  return renderSwitch(useSwitchStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<SwitchProps>;

Switch.displayName = 'Switch';
