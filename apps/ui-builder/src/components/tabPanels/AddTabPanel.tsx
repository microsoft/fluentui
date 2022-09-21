import * as React from 'react';
import { ComponentList } from '../ComponentList';
import { ComponentInfo } from '../../componentInfo/types';

export type AddTabPanelProps = {
  onDragStart?: (info: any, e: any) => void;
  selectedComponentInfo?: ComponentInfo;
};

export const AddTabPanel: React.FunctionComponent<AddTabPanelProps> = ({ onDragStart, selectedComponentInfo }) => {
  return (
    <div>
      <ComponentList
        style={{ overflowY: 'auto' }}
        onDragStart={onDragStart}
        selectedComponentInfo={selectedComponentInfo}
      />
    </div>
  );
};
