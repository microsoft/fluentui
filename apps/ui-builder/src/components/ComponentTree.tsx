import * as React from 'react';
import { JSONTreeElement } from './types';
import { jsonTreeFindElement } from '../config';
import { ComponentTreeItem, ComponentTreeNode } from './ComponentTreeItem';

export type ComponentTreeProps = {
  tree: JSONTreeElement;
  selectedComponent?: JSONTreeElement;
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  onCloneComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onMoveComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onDeleteSelectedComponent?: () => void;
  onAddComponent?: (uuid: string, where: string) => void;
};

const treeToArray = (tree: JSONTreeElement | string, level: number): ComponentTreeNode[] => {
  if (typeof tree === 'string') {
    return [
      {
        id: Math.random().toString(36).slice(2),
        title: 'string',
        level: level,
        element: null,
      },
    ];
  }

  let result = [];

  if (tree.uuid !== 'builder-root') {
    const item = { title: tree.displayName, level: level, id: tree.uuid as string, element: tree };
    result.push(item);
  }

  if (tree.props.children?.length > 0) {
    tree.props.children.forEach(i => {
      result = [...result, ...treeToArray(i, level + 1)];
    });
  }

  return result;
};

export const ComponentTree: React.FunctionComponent<ComponentTreeProps> = ({
  tree,
  selectedComponent,
  onSelectComponent,
  onCloneComponent,
  onMoveComponent,
  onDeleteSelectedComponent,
  onAddComponent,
}) => {
  const handleClone = React.useCallback(
    e => {
      onCloneComponent?.({ clientX: e.clientX, clientY: e.clientY });
      e.stopPropagation();
      e.preventDefault();
    },
    [onCloneComponent],
  );

  const handleMove = React.useCallback(
    e => {
      onMoveComponent?.({ clientX: e.clientX, clientY: e.clientY });
      e.stopPropagation();
      e.preventDefault();
    },
    [onMoveComponent],
  );

  const handleDeleteSelected = React.useCallback(
    e => {
      onDeleteSelectedComponent?.();
      e.stopPropagation();
      e.preventDefault();
    },
    [onDeleteSelectedComponent],
  );

  const activeItems = [];
  const getActiveItemIds = item => {
    if (item.items) {
      activeItems.push(item.id);
      item.items.forEach(i => getActiveItemIds(i));
    }
  };

  const handleAddComponent = React.useCallback(
    (uuid, where) => {
      onAddComponent?.(uuid, where);
    },
    [onAddComponent],
  );

  const handleDeleteComponent = React.useCallback(
    uuid => {
      onSelectComponent(jsonTreeFindElement(tree, uuid));
      setTimeout(() => {
        onDeleteSelectedComponent();
      }, 0);
    },
    [onSelectComponent, onDeleteSelectedComponent, tree],
  );

  const selectedComponentId = selectedComponent?.uuid as string;
  const flat = treeToArray(tree, 0);

  return (
    <>
      {flat.map(i => (
        <ComponentTreeItem
          key={i.id}
          node={i}
          selected={i.id === selectedComponentId}
          handleAddComponent={handleAddComponent}
          handleSelectComponent={onSelectComponent}
          handleDeleteComponent={handleDeleteComponent}
          handleDeleteSelected={handleDeleteSelected}
          handleClone={handleClone}
          handleMove={handleMove}
        />
      ))}
    </>
  );
};
