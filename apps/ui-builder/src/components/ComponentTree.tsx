import * as React from 'react';
import { JSONTreeElement } from './types';
import { jsonTreeFindElement } from '../config';
import { ComponentTreeItem } from './ComponentTreeItem';
import { TreeItemProps, Tree } from '@fluentui/react-northstar';
import { TreeTitleProps } from '@fluentui/react-northstar/dist/dts/src';
import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  tree: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(0, '2px'),
    '> div': { display: 'flex', width: '100%' },
    '> div > *': { marginLeft: 0, width: '100%', ...shorthands.padding(0) },
  },
});

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
const macKeyDown = (e, target) => {
  const keyCode = e.keyCode || e.which;
  const F10 = 121;
  if (e.shiftKey && keyCode === F10) {
    const activeElement = target;
    if (activeElement) {
      const event = new MouseEvent('contextmenu', {
        bubbles: true,
        clientX: e.target.offsetLeft,
        clientY: e.target.offsetTop,
      });
      activeElement.dispatchEvent(event);
    }
  }
};

const jsonTreeToTreeItems: (
  tree: JSONTreeElement | string,
  selectedComponentId: string,
  handleSelectComponent: (jsonTreeElement: JSONTreeElement) => void,
  handleClone: React.MouseEventHandler<HTMLButtonElement>,
  handleMove: React.MouseEventHandler<HTMLButtonElement>,
  handleDeleteSelected: React.MouseEventHandler<HTMLButtonElement>,
  handleAddComponent: (uuid, where) => void,
  handleDeleteComponent: (uuid) => void,
  level: number,
) => TreeItemProps = (
  tree,
  selectedComponentId,
  handleSelectComponent,
  handleClone,
  handleMove,
  handleDeleteSelected,
  handleAddComponent,
  handleDeleteComponent,
  level,
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
    onTitleClick: () => handleSelectComponent(tree),
    onKeyDown: (e, data) => {
      if (isMac) {
        macKeyDown(e, e.target.firstChild);
      }
    },
    id: tree.uuid as string,
    title: {
      content: tree.displayName,
    },
    renderItemTitle: (Component: React.ElementType<TreeTitleProps>, { content, ...props }) => {
      return (
        <Component {...props}>
          <ComponentTreeItem
            key={tree.uuid}
            node={tree}
            level={level}
            selected={tree.uuid === selectedComponentId}
            handleAddComponent={handleAddComponent}
            handleDeleteComponent={handleDeleteComponent}
            handleDeleteSelected={handleDeleteSelected}
            handleClone={handleClone}
            handleMove={handleMove}
          />
        </Component>
      );
    },
    items: tree.props?.children?.map(item =>
      jsonTreeToTreeItems(
        item,
        selectedComponentId,
        handleSelectComponent,
        handleClone,
        handleMove,
        handleDeleteSelected,
        handleAddComponent,
        handleDeleteComponent,
        level + 1,
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
  const styles = useStyles();

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

  const handleSelectComponent = React.useCallback((item: JSONTreeElement) => onSelectComponent(item), [
    onSelectComponent,
  ]);

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
        0,
      ),
    ) ?? [];
  items.forEach(item => getActiveItemIds(item));

  return <Tree items={items} activeItemIds={activeItems} className={styles.tree} />;
};
