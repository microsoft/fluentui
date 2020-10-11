import * as React from 'react';
import { TreeItemProps } from '@fluentui/react-northstar';

export interface InnerElementContextType {
  height: number;
  stickyItemSize: number;
  stickyTopIds: string[];
  stickyBottomIds: string[];
  onClickSticky: (event: React.SyntheticEvent<HTMLElement>, itemProps: TreeItemProps) => void;
}
export const InnerElementContext = React.createContext<InnerElementContextType>({} as InnerElementContextType);
