import * as React from 'react';
import { ChevronDownIcon } from '@fluentui/react-icons-mdl2';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { css } from '@fluentui/utilities';
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

  state.className = css(MenuButtonClassNames.root, state.className, useMenuButtonStyles(state));
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (state.content as any).className = css(
    MenuButtonClassNames.content,
    (state.content as any).className,
    useMenuButtonContentStyles(state),
  );
  (state.icon as any).className = css(
    MenuButtonClassNames.icon,
    (state.icon as any).className,
    useMenuButtonIconStyles(state),
  );
  (state.menuIcon as any).className = css(
    MenuButtonClassNames.menuIcon,
    (state.menuIcon as any).className,
    useMenuButtonMenuIconStyles(state),
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
