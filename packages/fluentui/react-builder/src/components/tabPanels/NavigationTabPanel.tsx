import * as React from 'react';

import { JSONTreeElement } from '../types';
import { ComponentListViewPanel } from '../ComponentTreePanel';

export type NavigatorTabPanelProps = {
  jsonTree: JSONTreeElement;
  onAddComponent?: (uuid: string, where: string) => void;
  onCloneComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onDeleteSelectedComponent?: () => void;
  onDragStart?: (info: any, e: any) => void;
  onOpenAddComponentDialog?: (uuid: string, where: string) => void;
  onMoveComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  selectedComponent?: JSONTreeElement;
};

export const NavigatorTabPanel: React.FunctionComponent<NavigatorTabPanelProps> = (props: NavigatorTabPanelProps) => {
  return (
    <ComponentListViewPanel
      jsonTree={props.jsonTree}
      onAddComponent={props.onAddComponent}
      onCloneComponent={props.onCloneComponent}
      onDeleteSelectedComponent={props.onDeleteSelectedComponent}
      onMoveComponent={props.onMoveComponent}
      onOpenAddComponentDialog={props.onOpenAddComponentDialog}
      onSelectComponent={props.onSelectComponent}
      selectedComponent={props.selectedComponent}
    />
  );
};
