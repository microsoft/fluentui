import * as React from 'react';
import ContextualMenu from './ContextualMenu';
import { IContextualMenuItem, DirectionalHint } from './interfaces';

export interface IContextualMenuProps extends React.Props<ContextualMenu> {
  items: IContextualMenuItem[];
  targetElement?: HTMLElement;
  directionalHint?: DirectionalHint;
  gapSpace?: number;
  labelElementId?: string;
  shouldFocusOnMount?: boolean;
  isBeakVisible?: boolean;
  onDismiss?: (ev?: any) => void;
  className?: string;
}
