import * as React from 'react';
import { getSlots } from '@fluentui/react-compose/lib/next/index';
import { useMenuContext } from '@fluentui/react-shared-contexts';
import { MenuButtonState } from './MenuButton.types';
import { menuButtonShorthandProps } from './useMenuButton';

/**
 * Redefine the render function to add slots. Reuse the button structure but add
 * slots to children.
 */
export const renderMenuButton = (state: MenuButtonState) => {
  const { slots, slotProps } = getSlots(state, menuButtonShorthandProps);
  const { iconOnly, children } = state;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { hidden } = useMenuContext();

  const contentVisible = !iconOnly && (children || slotProps.content?.children);

  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
      {contentVisible && <slots.content {...slotProps.content} />}
      {!iconOnly && <slots.menuIcon {...slotProps.menuIcon} />}
      {!hidden && <slots.menu {...slotProps.menu} />}
    </slots.root>
  );
};
