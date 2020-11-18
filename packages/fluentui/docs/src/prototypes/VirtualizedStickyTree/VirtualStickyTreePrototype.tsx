import * as React from 'react';
import CustomTreeTitle from '../VirtualizedTree/CustomTreeTitle';
import getItems from './itemsGenerator';
import { VirtualStickyTree } from './VirtualStickyTree';

const items = getItems(3, 30, 2);

const VirtualStickyTreePrototype = () => {
  return (
    <div style={{ width: 400 }}>
      <VirtualStickyTree
        items={items}
        renderItemTitle={CustomTreeTitle}
        itemSize={30}
        stickyItemSize={20}
        height={500}
      />
    </div>
  );
};

export default VirtualStickyTreePrototype;
