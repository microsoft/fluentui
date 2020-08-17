import * as React from 'react';
import { JSONTreeElement } from './types';
import { TreeItemProps, Tree, treeBehavior } from '@fluentui/react-northstar';
import { jsonTreeFindElement } from '../config';
import { CloneDebugButton, TrashDebugButton, MoveDebugButton } from './DebugButtons';

export type ComponentTreeProps = {
  tree: JSONTreeElement;
  selectedComponent?: JSONTreeElement;
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  onCloneComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onMoveComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onDeleteComponent?: () => void;
};

const jsonTreeToTreeItems: (
  tree: JSONTreeElement | string,
  selectedComponentId: string,
  handleSelectedComponent: TreeItemProps['onTitleClick'],
  handleClone: React.MouseEventHandler<HTMLButtonElement>,
  handleMove: React.MouseEventHandler<HTMLButtonElement>,
  handleDelete: React.MouseEventHandler<HTMLButtonElement>,
  titleRenderer: (Component, { content, expanded, hasSubtree, ...rest }) => React.ReactFragment,
) => TreeItemProps = (
  tree,
  selectedComponentId,
  handleSelectedComponent,
  handleClone,
  handleMove,
  handleDelete,
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
                <TrashDebugButton onClick={handleDelete} />
              </>
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
        handleDelete,
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
  onDeleteComponent,
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
        titleRenderer,
      ),
    ) ?? [];
  items.forEach(item => getActiveItemIds(item));

  return (
    <Tree
      accessibility={treeBehavior}
      items={items}
      activeItemIds={activeItems}
      styles={{ minHeight: '17rem', maxHeight: '17rem', overflowY: 'auto' }}
    />
  );
};
