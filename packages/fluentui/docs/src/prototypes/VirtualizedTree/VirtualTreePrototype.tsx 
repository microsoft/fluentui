import * as React from 'react';
import { TriangleDownIcon, TreeTitleProps, TriangleEndIcon } from '@fluentui/react-northstar';
import getItems from './itemsGenerator';
import { VirtualTree } from './VirtualTree';

const items = getItems();

const CustomTreeTitle = (
  Component: React.ElementType<TreeTitleProps>,
  { content, expanded, hasSubtree, ...restProps }: TreeTitleProps,
) => (
  <Component expanded={expanded} hasSubtree={hasSubtree} {...restProps}>
    {hasSubtree && (expanded ? <TriangleDownIcon /> : <TriangleEndIcon />)}
    {content}
  </Component>
);

const VirtualizedTreePrototype = () => {
  const getItemSize = React.useCallback(index => 20, []);

  return (
    <VirtualTree
      items={items}
      renderItemTitle={CustomTreeTitle}
      itemSize={getItemSize}
      estimatedItemSize={20}
      height={300}
    />
  );
};

export default VirtualizedTreePrototype;
