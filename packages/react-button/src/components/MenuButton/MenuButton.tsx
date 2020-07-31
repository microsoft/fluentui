import * as React from 'react';
import { ChevronDownIcon } from '@fluentui/react-icons';
import { ContextualMenu, useFocusRects } from 'office-ui-fabric-react';
import { createMenuButton } from './createMenuButton';
import { MenuButtonProps } from './MenuButton.types';
import * as classes from './MenuButton.scss';
import { useButtonClasses } from '../Button/Button';
import { makeClasses } from '@fluentui/react-compose/lib/next/index';
import { useInlineTokens } from '@fluentui/react-theme-provider';

export const useMenuButtonClasses = makeClasses(classes);

export const MenuButton = React.forwardRef<HTMLElement, MenuButtonProps>((props, ref) => {
  const { state, render } = createMenuButton(props, ref, {
    menuIcon: { as: ChevronDownIcon },
    menu: { as: ContextualMenu },
  });

  // Styling hooks.
  useButtonClasses(state);
  useMenuButtonClasses(state);
  useFocusRects(state.ref);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useInlineTokens(state as any);

  return render(state);
});

MenuButton.displayName = 'MenuButton';
