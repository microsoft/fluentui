import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { MenuItemSwitchProps, MenuItemSwitchState } from './MenuItemSwitch.types';
import { useMenuItemCheckbox_unstable } from '../MenuItemCheckbox/useMenuItemCheckbox';
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
  const baseState = useMenuItemCheckbox_unstable(props, ref);
  return {
    ...baseState,
    switchIndicator: slot.optional(props.switchIndicator, {
      renderByDefault: true,
      elementType: 'span',
      defaultProps: {
        children: <CircleFilled className={circleFilledClassName} />,
      },
    }),
    components: {
      ...baseState.components,
      switchIndicator: 'span',
    },
  };
};
