import { styled } from '../../Utilities';
import { IContextualMenuProps, IContextualMenuStyleProps, IContextualMenuStyles } from './ContextualMenu.types';
import { ContextualMenuBase } from './ContextualMenu.base';
import { getStyles } from './ContextualMenu.styles';

/**
 * ContextualMenu description
 */
export const ContextualMenu: React.StatelessComponent<IContextualMenuProps> = styled<
  IContextualMenuProps,
  IContextualMenuStyleProps,
  IContextualMenuStyles
>(ContextualMenuBase, getStyles, undefined, { scope: 'ContextualMenu' });
