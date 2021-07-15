import * as React from 'react';

import { Button } from '@fluentui/react-northstar';
import { ComponentTree } from '../ComponentTree';
import { JSONTreeElement } from '../types';
import { AccessibilityError } from '../../accessibility/types';

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
  selectedComponentAccessibilityErrors: AccessibilityError[];
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
        tree={props.jsonTree}
        selectedComponent={props.selectedComponent}
        selectedComponentAccessibilityErrors={props.selectedComponentAccessibilityErrors}
        onSelectComponent={props.onSelectComponent}
        onCloneComponent={props.onCloneComponent}
        onMoveComponent={props.onMoveComponent}
        onDeleteSelectedComponent={props.onDeleteSelectedComponent}
        onAddComponent={props.onAddComponent}
      />
    </div>
  );
};
