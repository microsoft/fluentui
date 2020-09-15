import * as React from 'react';
import { ChevronDownIcon } from '@fluentui/react-icons';
import { ContextualMenu, useFocusRects } from 'office-ui-fabric-react';
import { useMenuButton } from './useMenuButton';
import { MenuButtonProps } from './MenuButton.types';
import { useButtonClasses } from '../Button/index';
import { useMenuButtonClasses } from './useMenuButtonClasses';
import { useInlineTokens } from '@fluentui/react-theme-provider';

export const MenuButton = React.forwardRef<HTMLElement, MenuButtonProps>((props, ref) => {
  const { state, render } = useMenuButton(props, ref, {
    menuIcon: { as: ChevronDownIcon },
    menu: { as: ContextualMenu },
  });

  useButtonClasses(state);
  useMenuButtonClasses(state);

  useFocusRects(state.ref);

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
