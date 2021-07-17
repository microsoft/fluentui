import * as React from 'react';

import { JSONTreeElement } from '../types';
import { Button } from '@fluentui/react-northstar/src';
import { ComponentTree } from '../ComponentTree';

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
    <div>
      {(!props.jsonTree?.props?.children || props.jsonTree?.props?.children?.length === 0) && (
        <Button
          text
          content="Insert first component"
          fluid
          onClick={() => props.onOpenAddComponentDialog('', 'first')}
        />
      )}
      <ComponentTree
        onAddComponent={props.onAddComponent}
        onCloneComponent={props.onCloneComponent}
        onDeleteSelectedComponent={props.onDeleteSelectedComponent}
        onMoveComponent={props.onMoveComponent}
        onSelectComponent={props.onSelectComponent}
        selectedComponent={props.selectedComponent}
        tree={props.jsonTree}
      />
    </div>
  );
};
