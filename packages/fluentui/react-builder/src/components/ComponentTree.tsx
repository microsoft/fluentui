import * as React from 'react';
import { TreeItemProps, Tree, MenuButton } from '@fluentui/react-northstar';
import { treeBehavior, treeAsListBehavior } from '@fluentui/accessibility';
import { JSONTreeElement } from './types';
import { jsonTreeFindElement } from '../config';
import { CloneDebugButton, TrashDebugButton, MoveDebugButton } from './DebugButtons';

export type ComponentTreeProps = {
  tree: JSONTreeElement;
  selectedComponent?: JSONTreeElement;
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  onCloneComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onMoveComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onDeleteSelectedComponent?: () => void;
  onAddComponent?: (uuid: string, where: string) => void;
};

const isMac = navigator.userAgent.indexOf('Mac OS X') !== -1;
const behavior = isMac ? treeAsListBehavior : treeBehavior;

const macKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
  const keyCode = e.keyCode || e.which;
  const F10 = 121;
  if (e.shiftKey && keyCode === F10) {
    const activeElement = document.activeElement;
    if (activeElement) {
      const event = new MouseEvent('contextmenu', { bubbles: true });
      activeElement.dispatchEvent(event);
    }
  }
};

const treeKeyDown = isMac ? macKeyDown : undefined;

const menu = (uuid, handleAddComponent, handleDeleteComponent) => [
  { key: 'add after', content: 'Add after', onClick: () => handleAddComponent(uuid, 'after') },
  { key: 'add before', content: 'Add before', onClick: () => handleAddComponent(uuid, 'before') },
  { key: 'add child', content: 'Add child', onClick: () => handleAddComponent(uuid, 'child') },
  { key: 'remove', content: 'Remove', onClick: () => handleDeleteComponent(uuid) },
];

const jsonTreeToTreeItems: (
  tree: JSONTreeElement | string,
  selectedComponentId: string,
  handleSelectedComponent: TreeItemProps['onTitleClick'],
  handleClone: React.MouseEventHandler<HTMLButtonElement>,
  handleMove: React.MouseEventHandler<HTMLButtonElement>,
  handleDeleteSelected: React.MouseEventHandler<HTMLButtonElement>,
  handleAddComponent: (uuid, where) => void,
  handleDeleteComponent: (uuid) => void,
) => TreeItemProps = (
  tree,
  selectedComponentId,
  handleSelectedComponent,
  handleClone,
  handleMove,
  handleDeleteSelected,
  handleAddComponent,
  handleDeleteComponent,
) => {
  // calculate number of accessibility errors
  // todo: test, create function as class?
  if (typeof tree === 'string') {
    return {
      id: Math.random().toString(36).slice(2),
      title: 'string',
    };
  }
  return {
    children: (C, p) => (
      <MenuButton
        contextMenu
        trigger={<C {...p} />}
        key={`context menu ${tree.uuid}`}
        menu={menu(tree.uuid, handleAddComponent, handleDeleteComponent)}
      />
    ),
    onTitleClick: handleSelectedComponent,
    id: tree.uuid as string,
    title: {
      content: tree.displayName,
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '2px 4px',
        ...(selectedComponentId === tree.uuid && {
          background: '#ffc65c',
          color: '#444',
        }),
      },
    },

    ...(selectedComponentId === tree.uuid && {
      renderItemTitle: (C, { content, ...props }) => {
        return (
          <C {...props}>
            <span style={{ flex: 1 }}>{content}</span>
            <>
              <MoveDebugButton onClick={handleMove} />
              <CloneDebugButton onClick={handleClone} />
              <TrashDebugButton onClick={handleDeleteSelected} />
            </>
          </C>
        );
      },
    }),
    items: tree.props?.children?.map(item =>
      jsonTreeToTreeItems(
        item,
        selectedComponentId,
        handleSelectedComponent,
        handleClone,
        handleMove,
        handleDeleteSelected,
        handleAddComponent,
        handleDeleteComponent,
      ),
    ),
  };
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
  const handleSelectComponent = React.useCallback(
    (e, props: TreeItemProps) => {
      onSelectComponent?.(jsonTreeFindElement(tree, props.id));
    },
    [onSelectComponent, tree],
  );

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
  const items: TreeItemProps[] =
    tree.props?.children?.map(item =>
      jsonTreeToTreeItems(
        item,
        selectedComponentId,
        handleSelectComponent,
        handleClone,
        handleMove,
        handleDeleteSelected,
        handleAddComponent,
        handleDeleteComponent,
      ),
    ) ?? [];
  items.forEach(item => getActiveItemIds(item));

  return (
    <Tree
      accessibility={behavior}
      onKeyDown={treeKeyDown}
      items={items}
      activeItemIds={activeItems}
      styles={{
        minHeight: '17rem',
        maxHeight: '57rem',
        overflowY: 'auto',
      }}
    />
  );
};
