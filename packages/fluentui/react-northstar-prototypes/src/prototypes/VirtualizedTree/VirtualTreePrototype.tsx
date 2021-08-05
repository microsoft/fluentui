import * as React from 'react';
import { TriangleDownIcon, TreeTitleProps, TriangleEndIcon } from '@fluentui/react-northstar';
import getItemsWithHeight from './itemsGenerator';
import { VirtualTree } from './VirtualTree';

const items = getItemsWithHeight(20, 40, 2, (level: number): number => (level === 1 ? 30 : 40));

const CustomTreeTitle = (
  Component: React.ElementType<TreeTitleProps>,
  { content, expanded, hasSubtree, ...restProps }: TreeTitleProps,
) => (
  <Component expanded={expanded} hasSubtree={hasSubtree} {...restProps}>
    {hasSubtree && (expanded ? <TriangleDownIcon /> : <TriangleEndIcon />)}
    {content}
  </Component>
);

const itemToString = item => item.title;

const VirtualizedTreePrototype = () => {
  return (
    <VirtualTree
      items={items}
      renderItemTitle={CustomTreeTitle}
      estimatedItemSize={20}
      height={500}
      itemToString={itemToString}
    />
  );
};

export default VirtualizedTreePrototype;
