import * as React from 'react';
import { JSONTreeElement } from './types';
import { TreeItemProps, Tree } from '@fluentui/react-northstar';
import { jsonTreeFindElement } from '../config';

export type ComponentTreeProps = {
  tree: JSONTreeElement;
  selectedComponent?: JSONTreeElement;
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
};

const jsonTreeToTreeItems: (
  tree: JSONTreeElement | string,
  selectedComponentId: string,
  handleSelectedComponent: TreeItemProps['onTitleClick'],
) => TreeItemProps = (tree, selectedComponentId, handleSelectedComponent) => {
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
      ...(selectedComponentId === tree.uuid && { styles: { background: '#ffc65c11', border: '1px solid #ffc65ccc' } }),
    },
    expanded: true,
    items: tree.props?.children?.map(item => jsonTreeToTreeItems(item, selectedComponentId, handleSelectedComponent)),
  };
};

export const ComponentTree: React.FunctionComponent<ComponentTreeProps> = ({
  tree,
  selectedComponent,
  onSelectComponent,
}) => {
  const handleSelectComponent = React.useCallback(
    (e, props: TreeItemProps) => {
      console.log('ComponentTree:handleSelectComponent', props.id);

      onSelectComponent?.(jsonTreeFindElement(tree, props.id));
    },
    [onSelectComponent, tree],
  );

  const selectedComponentId = selectedComponent?.uuid as string;
  const items: TreeItemProps[] =
    tree.props?.children?.map(item => jsonTreeToTreeItems(item, selectedComponentId, handleSelectComponent)) ?? [];
  return <Tree items={items} />;
};
