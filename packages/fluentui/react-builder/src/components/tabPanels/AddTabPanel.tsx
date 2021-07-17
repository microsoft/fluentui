import * as React from 'react';
import { ComponentList } from '../ComponentList';

export type AddTabPanelProps = {
  onDragStart?: (info: any, e: any) => void;
};

export const AddTabPanel: React.FunctionComponent<AddTabPanelProps> = ({ onDragStart }) => {
  return (
    <div>
      <ComponentList style={{ overflowY: 'auto' }} onDragStart={onDragStart} />
    </div>
  );
};
