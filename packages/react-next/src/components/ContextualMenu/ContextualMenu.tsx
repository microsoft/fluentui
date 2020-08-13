import * as React from 'react';
import { styled } from '../../Utilities';
import { IContextualMenuProps, IContextualMenuStyleProps, IContextualMenuStyles } from './ContextualMenu.types';
import { ContextualMenuBase } from './ContextualMenu.base';
import { getStyles } from './ContextualMenu.styles';

function onRenderSubMenu(subMenuProps: IContextualMenuProps) {
  return <LocalContextualMenu {...subMenuProps} />;
}

// This is to prevent cyclic import with ContextualMenu.base.tsx.
const LocalContextualMenu: React.FunctionComponent<IContextualMenuProps> = styled<
  IContextualMenuProps,
  IContextualMenuStyleProps,
  IContextualMenuStyles
>(ContextualMenuBase, getStyles, () => ({ onRenderSubMenu }), { scope: 'ContextualMenu' });

/**
 * ContextualMenu description
 */
export const ContextualMenu: React.FunctionComponent<IContextualMenuProps> = LocalContextualMenu;
