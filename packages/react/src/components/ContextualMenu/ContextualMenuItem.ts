import * as React from 'react';
import { styled } from '../../Utilities';
import {
  IContextualMenuItemProps,
  IContextualMenuItemStyleProps,
  IContextualMenuItemStyles,
} from './ContextualMenuItem.types';
import { ContextualMenuItemBase } from './ContextualMenuItem.base';
import { getItemStyles } from './ContextualMenu.classNames';

/**
 * ContextualMenuItem description
 */
export const ContextualMenuItem: React.FunctionComponent<IContextualMenuItemProps> = styled<
  IContextualMenuItemProps,
  IContextualMenuItemStyleProps,
  IContextualMenuItemStyles
>(ContextualMenuItemBase, getItemStyles, undefined, { scope: 'ContextualMenuItem' });
