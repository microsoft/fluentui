import * as React from 'react';
import { TriangleDownIcon, TreeTitleProps, TriangleEndIcon } from '@fluentui/react-northstar';
import getItems from './itemsGenerator';
import { VirtualStickyTree } from './VirtualStickyTree';

const items = getItems(3, 30, 2);

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

const VirtualStickyTreePrototype = () => {
  return (
    <div style={{ width: 400 }}>
      <VirtualStickyTree
        items={items}
        renderItemTitle={CustomTreeTitle}
        itemSize={30}
        stickyItemSize={20}
        height={500}
        itemToString={itemToString}
      />
    </div>
  );
};

export default VirtualStickyTreePrototype;
