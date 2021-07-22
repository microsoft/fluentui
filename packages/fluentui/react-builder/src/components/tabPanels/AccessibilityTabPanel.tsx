import * as React from 'react';

import { JSONTreeElement } from '../types';
import { AccessibilityError } from '../../accessibility/types';
import { ComponentTree } from '../ComponentTree';

export type AccessibilityTabPanelProps = {
  accessibilityErrors: AccessibilityError[];
  jsonTree: JSONTreeElement;
  onAddComponent?: (uuid: string, where: string) => void;
  onCloneComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onDeleteSelectedComponent?: () => void;
  onDragStart?: (info: any, e: any) => void;
  onMoveComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onOpenAddComponentDialog?: (uuid: string, where: string) => void;
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  selectedComponent?: JSONTreeElement;
};

export const AccessibilityTabPanel: React.FunctionComponent<AccessibilityTabPanelProps> = (
  props: AccessibilityTabPanelProps,
) => {
  const currentChildren = props.jsonTree?.props?.children;
  const filteredChildren = [];
  if (currentChildren) {
    for (const child of currentChildren) {
      if (props.accessibilityErrors.find(e => e.elementUuid === (child as JSONTreeElement).uuid)) {
        filteredChildren.push(child);
      }
    }
  }

  const updatedTree = {
    uuid: props.jsonTree.uuid,
    type: props.jsonTree.type,
    props: {
      children: filteredChildren,
    },
  } as JSONTreeElement;

  return (
    <div>
      <div style={{ padding: '10px', wordWrap: 'break-word', fontWeight: 'lighter' }}>
        To learn more about best practices for accessibility, visit{' '}
        <a
          aria-describedby="microsoft accessibility website"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.microsoft.com/en-us/accessibility"
        >
          https://www.microsoft.com/en-us/accessibility
        </a>
        .
      </div>
      <hr style={{ margin: 'auto', width: '75%' }} />
      {(!updatedTree || updatedTree?.props?.children?.length === 0) && (
        <div style={{ padding: '10px' }}>No accessibility errors found.</div>
      )}
      <ComponentTree
        onAddComponent={props.onAddComponent}
        onCloneComponent={props.onCloneComponent}
        onDeleteSelectedComponent={props.onDeleteSelectedComponent}
        onMoveComponent={props.onMoveComponent}
        onSelectComponent={props.onSelectComponent}
        selectedComponent={props.selectedComponent}
        tree={updatedTree}
      />
    </div>
  );
};
