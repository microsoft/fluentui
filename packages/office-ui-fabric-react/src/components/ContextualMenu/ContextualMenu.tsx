import * as React from 'react';
import { styled } from '../../Utilities';
import { IContextualMenuProps, IContextualMenuStyleProps, IContextualMenuStyles } from './ContextualMenu.types';
import { ContextualMenuBase } from './ContextualMenu.base';
import { getStyles } from './ContextualMenu.styles';

// This is to prevent cyclic import with ContextualMenu.base.tsx.
let LocalContextualMenu: React.StatelessComponent<IContextualMenuProps>;

function onRenderSubMenu(subMenuProps: IContextualMenuProps, _: any) {
  return <LocalContextualMenu {...subMenuProps} />;
}

LocalContextualMenu = styled<IContextualMenuProps, IContextualMenuStyleProps, IContextualMenuStyles>(
  ContextualMenuBase,
  getStyles,
  _ => {
    return {
      onRenderSubMenu: onRenderSubMenu
    };
  },
  { scope: 'ContextualMenu' }
);

/**
 * ContextualMenu description
 */
export const ContextualMenu: React.StatelessComponent<IContextualMenuProps> = LocalContextualMenu;
