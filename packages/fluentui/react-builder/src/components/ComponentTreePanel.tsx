import * as React from 'react';

import { Button } from '@fluentui/react-northstar';
import { ComponentTree } from './ComponentTree';
import { JSONTreeElement } from './types';

export type ComponentListViewPanelProps = {
  jsonTree: JSONTreeElement;
  onAddComponent?: (uuid: string, where: string) => void;
  onCloneComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onDeleteSelectedComponent?: () => void;
  onMoveComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onOpenAddComponentDialog?: (uuid: string, where: string) => void;
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  selectedComponent?: JSONTreeElement;
};

export const ComponentListViewPanel: React.FunctionComponent<ComponentListViewPanelProps> = (
  props: ComponentListViewPanelProps,
) => {
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
