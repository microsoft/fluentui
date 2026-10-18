import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-headless-components-preview/tree';
import type { TreeItemValue } from '@fluentui/react-headless-components-preview/tree';

import styles from './tree.module.css';

const sizes = ['Small', 'Medium', 'Large'];

export const SingleSelection = (): React.ReactNode => {
  const [selected, setSelected] = React.useState<TreeItemValue>('Medium');

  return (
    <>
      <Tree
        aria-label="Size"
        className={styles.tree}
        selectionMode="single"
        checkedItems={[selected]}
        onCheckedChange={(_, data) => setSelected(data.value)}
      >
        {sizes.map(size => (
          <TreeItem className={styles.item} key={size} value={size} itemType="leaf">
            <TreeItemLayout
              className={styles.layout}
              selector={{ className: styles.selector }}
              main={{ className: styles.main }}
            >
              {size}
            </TreeItemLayout>
          </TreeItem>
        ))}
      </Tree>
      <p className={styles.description}>Selected: {selected}</p>
    </>
  );
};
