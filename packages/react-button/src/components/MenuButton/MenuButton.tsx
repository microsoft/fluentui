import * as React from 'react';
import { ChevronDownIcon } from '@fluentui/react-icons-mdl2';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { useMenuButton } from './useMenuButton';
import { MenuButtonProps } from './MenuButton.types';
import {
  useMenuButtonStyles,
  useMenuButtonContentStyles,
  useMenuButtonIconStyles,
  useMenuButtonMenuIconStyles,
  MenuButtonClassNames,
} from './useMenuButtonClasses';
import { renderMenuButton } from './renderMenuButton';

/**
 * Define a styled MenuButton, using the `useMenuButton` hook.
 * {@docCategory Button}
 */
export const MenuButton = React.forwardRef<HTMLElement, MenuButtonProps>((props, ref) => {
  const state = useMenuButton(props, ref, {
    menuIcon: { as: ChevronDownIcon },
  });

  state.className = useMenuButtonStyles(state, {
    componentName: 'Button',
    classNames: [MenuButtonClassNames.root, state.className],
  });
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (state.content as any).className = useMenuButtonContentStyles(state, {
    classNames: [MenuButtonClassNames.content, (state.content as any).className],
  });
  (state.icon as any).className = useMenuButtonIconStyles(state, {
    classNames: [MenuButtonClassNames.icon, (state.icon as any).className],
  });
  (state.menuIcon as any).className = useMenuButtonMenuIconStyles(state, {
    classNames: [MenuButtonClassNames.menuIcon, (state.menuIcon as any).className],
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // TODO remove any
  /**
   * Type 'MenuButtonState' has no properties in common with type '{
   *  style?: CSSProperties | undefined; tokens?: string | { [key: string]: any; }
   *  | undefined; }
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useInlineTokens(state as any, '--button');

  return renderMenuButton(state);
});

MenuButton.displayName = 'MenuButton';
