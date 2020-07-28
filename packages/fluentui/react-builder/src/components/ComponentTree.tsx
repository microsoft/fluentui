import * as React from 'react';
import { TreeItemProps, Tree, MenuButton, treeBehavior, treeAsListBehavior } from '@fluentui/react-northstar';
import { JSONTreeElement } from './types';
import { jsonTreeFindElement } from '../config';
import { CloneDebugButton, TrashDebugButton, MoveDebugButton } from './DebugButtons';

export type ComponentTreeProps = {
  tree: JSONTreeElement;
  selectedComponent?: JSONTreeElement;
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  onCloneComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onMoveComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onDeleteComponent?: () => void;
  onAddComponent?: (uuid: string, where: string) => void;
};

const isMac = navigator.userAgent.indexOf('Mac OS X') !== -1;
const behavior = isMac ? treeAsListBehavior : treeBehavior;

const macKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
  const keyCode = e.keyCode || e.which;
  if (e.shiftKey && keyCode === 121) {
    const activeElement = document.activeElement;
    if (activeElement) {
      const event = new MouseEvent('contextmenu', { bubbles: true });
      activeElement.dispatchEvent(event);
    }
  }
};

const treeKeyDown = isMac ? macKeyDown : undefined;

const menu = (uuid, handleAddComponent, handleDeleteComponent) => [
  { content: 'Add after', onClick: () => handleAddComponent(uuid, 'after') },
  { content: 'Add before', onClick: () => handleAddComponent(uuid, 'before') },
  { content: 'Add child', onClick: () => handleAddComponent(uuid, 'child') },
  { content: 'Remove', onClick: () => handleDeleteComponent(uuid) },
];

const jsonTreeToTreeItems: (
  tree: JSONTreeElement | string,
  selectedComponentId: string,
  handleSelectedComponent: TreeItemProps['onTitleClick'],
  handleClone: React.MouseEventHandler<HTMLButtonElement>,
  handleMove: React.MouseEventHandler<HTMLButtonElement>,
  handleDelete: React.MouseEventHandler<HTMLButtonElement>,
  handleAddComponent: (uuid, where) => void,
  handleDeleteComponent: (uuid) => void,
) => TreeItemProps = (
  tree,
  selectedComponentId,
  handleSelectedComponent,
  handleClone,
  handleMove,
  handleDelete,
  handleAddComponent,
  handleDeleteComponent,
) => {
  if (typeof tree === 'string') {
    return {
      id: Math.random()
        .toString(36)
        .slice(2),
      title: 'string',
    };
  }
  return {
    onTitleClick: handleSelectedComponent,
    id: tree.uuid as string,
    title: {
      content: tree.displayName,
      styles: {
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
    children: (C, p) => (
      <MenuButton
        contextMenu
        trigger={<C {...p} />}
        menu={menu(tree.uuid, handleAddComponent, handleDeleteComponent)}
      />
    ),
    renderItemTitle: (C, { content, ...props }) => {
      return (
        <C {...props}>
          <>
            <span style={{ flex: 1 }}>{content}</span>
            {selectedComponentId === tree.uuid && (
              <>
                <MoveDebugButton onClick={handleMove} />
                <CloneDebugButton onClick={handleClone} />
                <TrashDebugButton onClick={handleDelete} />
              </>
            )}
          </>
        </C>
      );
    },
    expanded: true,
    items: tree.props?.children?.map(item =>
      jsonTreeToTreeItems(
        item,
        selectedComponentId,
        handleSelectedComponent,
        handleClone,
        handleMove,
        handleDelete,
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
  onDeleteComponent,
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

  const handleDelete = React.useCallback(
    e => {
      onDeleteComponent?.();
      e.stopPropagation();
      e.preventDefault();
    },
    [onDeleteComponent],
  );

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
        onDeleteComponent();
      }, 0);
    },
    [onSelectComponent, onDeleteComponent, tree],
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
        handleDelete,
        handleAddComponent,
        handleDeleteComponent,
      ),
    ) ?? [];
  return <Tree accessibility={behavior} onKeyDown={treeKeyDown} items={items} />;
};
