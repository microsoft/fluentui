import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-headless-components-preview/tree';
import { ChevronRightRegular, DocumentRegular, FolderRegular } from '@fluentui/react-icons';

import styles from './tree.module.css';

type FileNode = {
  value: string;
  name: string;
  children?: FileNode[];
};

const files: FileNode[] = [
  {
    value: 'src',
    name: 'src',
    children: [
      {
        value: 'src/components',
        name: 'components',
        children: [
          { value: 'src/components/Button.tsx', name: 'Button.tsx' },
          { value: 'src/components/Tree.tsx', name: 'Tree.tsx' },
        ],
      },
      { value: 'src/index.ts', name: 'index.ts' },
    ],
  },
  {
    value: 'docs',
    name: 'docs',
    children: [{ value: 'docs/README.md', name: 'README.md' }],
  },
  { value: 'package.json', name: 'package.json' },
];

const renderItems = (nodes: FileNode[]): React.ReactNode =>
  nodes.map(node =>
    node.children ? (
      <TreeItem className={styles.item} key={node.value} value={node.value} itemType="branch">
        <TreeItemLayout
          className={styles.layout}
          expandIcon={{ className: styles.expandIcon, children: <ChevronRightRegular /> }}
          iconBefore={{ className: styles.icon, children: <FolderRegular /> }}
          main={{ className: styles.main }}
        >
          {node.name}
        </TreeItemLayout>
        <Tree className={styles.subtree}>{renderItems(node.children)}</Tree>
      </TreeItem>
    ) : (
      <TreeItem className={styles.item} key={node.value} value={node.value} itemType="leaf">
        <TreeItemLayout
          className={styles.layout}
          iconBefore={{ className: styles.icon, children: <DocumentRegular /> }}
          main={{ className: styles.main }}
        >
          {node.name}
        </TreeItemLayout>
      </TreeItem>
    ),
  );

export const Default = (): React.ReactNode => (
  <Tree aria-label="Files" className={styles.tree} defaultOpenItems={['src']}>
    {renderItems(files)}
  </Tree>
);
