import * as React from 'react';
import { ChevronDownIcon } from '@fluentui/react-icons-mdl2';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { renderMenuButton } from './renderMenuButton';
import {
  useMenuButtonStyles,
  useMenuButtonContentStyles,
  useMenuButtonIconStyles,
  useMenuButtonMenuIconStyles,
  MenuButtonClassNames,
} from './useMenuButtonClasses';
import { useMenuButton } from './useMenuButton';
import { MenuButtonProps } from './MenuButton.types';

/**
 * Define a styled MenuButton, using the `useMenuButton` hook.
 * {@docCategory Button}
 */
export const MenuButton = React.forwardRef<HTMLElement, MenuButtonProps>((props, ref) => {
  const state = useMenuButton(props, ref, {
    menuIcon: { as: ChevronDownIcon },
  });

  state.className = useMenuButtonStyles(
    state,
    {
      componentName: 'Button',
      tokens: state.tokens,
    },
    MenuButtonClassNames.root,
    state.className,
  );
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (state.content as any).className = useMenuButtonContentStyles(
    state,
    {
      tokens: state.tokens,
    },
    MenuButtonClassNames.content,
    (state.content as any).className,
  );
  (state.icon as any).className = useMenuButtonIconStyles(
    state,
    {
      tokens: state.tokens,
    },
    MenuButtonClassNames.icon,
    (state.icon as any).className,
  );
  (state.menuIcon as any).className = useMenuButtonMenuIconStyles(
    state,
    {
      tokens: state.tokens,
    },
    MenuButtonClassNames.menuIcon,
    (state.menuIcon as any).className,
  );
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
