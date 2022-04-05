import * as React from 'react';
import { styled } from '../../Utilities';
import { ContextualMenuItemBase } from './ContextualMenuItem.base';
import { getItemStyles } from './ContextualMenu.classNames';
import type {
  IContextualMenuItemProps,
  IContextualMenuItemStyleProps,
  IContextualMenuItemStyles,
} from './ContextualMenuItem.types';

/**
 * ContextualMenuItem description
 */
export const ContextualMenuItem: React.FunctionComponent<IContextualMenuItemProps> = styled<
  IContextualMenuItemProps,
  IContextualMenuItemStyleProps,
  IContextualMenuItemStyles
>(ContextualMenuItemBase, getItemStyles, undefined, { scope: 'ContextualMenuItem' });
