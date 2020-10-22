import * as React from 'react';
import { ChevronDownIcon } from '@fluentui/react-icons-mdl2';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { useMenuButton } from './useMenuButton';
import { MenuButtonProps } from './MenuButton.types';
import { useButtonClasses } from '../Button/index';
import { useMenuButtonClasses } from './useMenuButtonClasses';

/**
 * Define a styled MenuButton, using the `useMenuButton` hook.
 * {@docCategory Button}
 */
export const MenuButton = React.forwardRef<HTMLElement, MenuButtonProps>((props, ref) => {
  const { state, render } = useMenuButton(props, ref, {
    menuIcon: { as: ChevronDownIcon },
  });

  useButtonClasses(state);
  useMenuButtonClasses(state);

  // TODO remove any
  /**
   * Type 'MenuButtonState' has no properties in common with type '{
   *  style?: CSSProperties | undefined; tokens?: string | { [key: string]: any; }
   *  | undefined; }
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useInlineTokens(state as any, '--button');

  return render(state);
});

MenuButton.displayName = 'MenuButton';
