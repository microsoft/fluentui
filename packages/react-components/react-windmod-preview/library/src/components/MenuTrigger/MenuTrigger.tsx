'use client';

import type * as React from 'react';
import type { FluentTriggerComponent, JSXElement } from '@fluentui/react-utilities';
import { renderMenuTrigger, useMenuTrigger } from '@fluentui/react-headless-components-preview/menu';

import type { MenuTriggerProps } from './MenuTrigger.types';
import { useMenuTriggerStyles } from './useMenuTriggerStyles';

/**
 * A MenuTrigger wires the consumer's own element to the menu it opens. Windmod MenuTrigger:
 * the headless trigger plus the marker pair, so a consumer can compose against the trigger the
 * same way they compose against any windmod component.
 */
export const MenuTrigger: React.FC<MenuTriggerProps> = (props: MenuTriggerProps): JSXElement | null => {
  const state = useMenuTrigger(props);
  const styled = useMenuTriggerStyles(state);

  return renderMenuTrigger(styled);
};

MenuTrigger.displayName = 'MenuTrigger';

/** Lets trigger utilities clone props through MenuTrigger. */
(MenuTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
