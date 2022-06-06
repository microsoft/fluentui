import * as React from 'react';
import { styled, composeRenderFunction } from '../../Utilities';
import { ContextualMenuBase } from './ContextualMenu.base';
import { getStyles } from './ContextualMenu.styles';
import type { IContextualMenuProps, IContextualMenuStyleProps, IContextualMenuStyles } from './ContextualMenu.types';

function onRenderSubMenu(subMenuProps: IContextualMenuProps) {
  return <LocalContextualMenu {...subMenuProps} />;
}

// This is to prevent cyclic import with ContextualMenu.base.tsx.
const LocalContextualMenu: React.FunctionComponent<IContextualMenuProps> = styled<
  IContextualMenuProps,
  IContextualMenuStyleProps,
  IContextualMenuStyles
>(
  ContextualMenuBase,
  getStyles,
  (props: IContextualMenuProps) => ({
    onRenderSubMenu: props.onRenderSubMenu
      ? composeRenderFunction(props.onRenderSubMenu, onRenderSubMenu)
      : onRenderSubMenu,
  }),
  { scope: 'ContextualMenu' },
);

/**
 * ContextualMenu description
 */
export const ContextualMenu: React.FunctionComponent<IContextualMenuProps> = LocalContextualMenu;
ContextualMenu.displayName = 'ContextualMenu';
