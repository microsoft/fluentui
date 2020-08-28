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
  handleDeleteSelected: React.MouseEventHandler<HTMLButtonElement>,
  handleAddComponent: (uuid, where) => void,
  handleDeleteComponent: (uuid) => void,
  titleRenderer: (Component, { content, expanded, hasSubtree, ...rest }) => React.ReactFragment,
) => TreeItemProps = (
  tree,
  selectedComponentId,
  handleSelectedComponent,
  handleClone,
  handleMove,
  handleDeleteSelected,
  handleAddComponent,
  handleDeleteComponent,
  titleRenderer,
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
    children: (C, p) => (
      <MenuButton
        contextMenu
        trigger={<C {...p} />}
        menu={menu(tree.uuid, handleAddComponent, handleDeleteComponent)}
      />
    ),
    onTitleClick: handleSelectedComponent,
    id: tree.uuid as string,
    title: {
      children: titleRenderer,
      content: tree.displayName,
      styles: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '2px 4px',
        ...(selectedComponentId === tree.uuid && {
          background: '#ffc65c',
          color: '#444',
          borderBottomLeftRadius: '0.5rem',
        }),
      },
    },
    ...(selectedComponentId === tree.uuid && {
      renderItemTitle: (C, { content, ...props }) => {
        return (
          <C {...props}>
            <>
              {props['level'] === 1 ? (
                <span style={{ flex: 1 }}>{content}</span>
              ) : (
                <span style={{ flex: 1, marginLeft: '1rem' }}>{content}</span>
              )}
              <>
                <MoveDebugButton onClick={handleMove} />
                <CloneDebugButton onClick={handleClone} />
                <TrashDebugButton onClick={handleDeleteSelected} />
              </>
            </>
          </C>
        );
      },
    }),
    items:
      Array.isArray(tree.props?.children) &&
      tree.props?.children?.map(item =>
        jsonTreeToTreeItems(
          item,
          selectedComponentId,
          handleSelectedComponent,
          handleClone,
          handleMove,
          handleDeleteSelected,
          handleAddComponent,
          handleDeleteComponent,
          titleRenderer,
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

  const titleRenderer = (Component, { content, expanded, hasSubtree, ...rest }) => {
    return (
      <>
        {rest['level'] !== 1 ? (
          <span
            style={{
              paddingRight: '1rem',
              borderLeft: '1px solid #eee',
              borderBottom: '1px solid #eee',
              borderBottomLeftRadius: '0.5rem',
            }}
          />
        ) : null}
        <div {...rest} style={{ display: 'inline-block', cursor: 'pointer', padding: '2px 4px' }}>
          {content}
        </div>
      </>
    );
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
    (Array.isArray(tree.props?.children) &&
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
          titleRenderer,
        ),
      )) ??
    [];
  items.forEach(item => getActiveItemIds(item));

  return (
    <Tree
      accessibility={behavior}
      onKeyDown={treeKeyDown}
      items={items}
      activeItemIds={activeItems}
      styles={{ minHeight: '17rem', maxHeight: '17rem', overflowY: 'auto' }}
    />
  );
};
