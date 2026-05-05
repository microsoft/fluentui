'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { MenuItemSwitchProps, MenuItemSwitchState } from './MenuItemSwitch.types';
import { useMenuItemCheckboxBase_unstable } from '../MenuItemCheckbox/useMenuItemCheckbox';
import { CircleFilled } from '@fluentui/react-icons';
import { circleFilledClassName } from './useMenuItemSwitchStyles.styles';

/**
 * Create the state required to render MenuItemSwitch.
 *
 * The returned state can be modified with hooks such as useMenuItemSwitchStyles_unstable,
 * before being passed to renderMenuItemSwitch_unstable.
 *
 * @param props - props from this instance of MenuItemSwitch
 * @param ref - reference to root HTMLDivElement of MenuItemSwitch
 */
export const useMenuItemSwitch_unstable = (
  props: MenuItemSwitchProps,
  ref: React.Ref<HTMLDivElement>,
): MenuItemSwitchState => {
  const state = useMenuItemSwitchBase_unstable(props, ref);

  // Set default icon for switch indicator
  if (state.switchIndicator) {
    state.switchIndicator.children ??= <CircleFilled className={circleFilledClassName} />;
  }

  return state;
};

/**
 * Base hook for MenuItemSwitch component, produces state required to render the component.
 * It doesn't set any design-related props specific to MenuItemSwitch.
 *
 * @internal
 * @param props - props from this instance of MenuItemSwitch
 * @param ref - reference to root HTMLDivElement of MenuItemSwitch
 */
export const useMenuItemSwitchBase_unstable = (
  props: MenuItemSwitchProps,
  ref: React.Ref<HTMLDivElement>,
): MenuItemSwitchState => {
  const baseState = useMenuItemCheckboxBase_unstable(props, ref);
  return {
    ...baseState,
    switchIndicator: slot.optional(props.switchIndicator, {
      renderByDefault: true,
      elementType: 'span',
    }),
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...baseState.components,
      switchIndicator: 'span',
    },
  };
};
