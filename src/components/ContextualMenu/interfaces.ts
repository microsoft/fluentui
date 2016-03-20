import * as React from 'react';

export enum DirectionalHint {
  topLeftEdge,
  topCenter,
  topRightEdge,
  topAutoEdge,
  bottomLeftEdge,
  bottomCenter,
  bottomRightEdge,
  bottomAutoEdge,
  leftTopEdge,
  leftCenter,
  leftBottomEdge,
  rightTopEdge,
  rightCenter,
  rightBottomEdge
};

export interface IContextualMenuItem {
  key?: string;
  name: string;
  icon?: string;
  isEnabled?: boolean;
  shortCut?: string;
  canCheck?: boolean;
  isChecked?: boolean;
  data?: any;
  onClick?: (item?: IContextualMenuItem, ev?: React.MouseEvent) => void;
  items?: IContextualMenuItem[];
}
