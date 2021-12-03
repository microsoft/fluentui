import * as React from 'react';
import { useMenuButtonState } from './useMenuButtonState';
import { useMenuButtonARIA } from './useMenuButtonARIA';
import { useMenuButtonStyles } from './useMenuButtonStyles';
import { renderMenuButton } from './renderMenuButton';
import type { MenuButtonProps, MenuButtonState, RenderMenuButton } from './MenuButton.types';

/**
 * Given user props, returns the final state for a MenuButton.
 */
export const useMenuButton = (
  { menuIcon, ...props }: MenuButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): [MenuButtonState, RenderMenuButton] => {
  const state: MenuButtonState = useMenuButtonState(props);
  useMenuButtonARIA(state, props, ref);
  useMenuButtonStyles(state);

  return [state, renderMenuButton];
};
