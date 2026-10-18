import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-headless-components-preview/tree';
import type { TreeItemValue } from '@fluentui/react-headless-components-preview/tree';
import { ChevronRightRegular } from '@fluentui/react-icons';

import styles from './tree.module.css';

const sections = [
  { value: 'getting-started', name: 'Getting started', pages: ['Installation', 'Theming'] },
  { value: 'components', name: 'Components', pages: ['Button', 'Tree'] },
  { value: 'guides', name: 'Guides', pages: ['Accessibility', 'Server rendering'] },
];

export const OpenItemsControlled = (): React.ReactNode => {
  const [openItems, setOpenItems] = React.useState<Set<TreeItemValue>>(() => new Set(['components']));

  return (
    <>
      <div className={styles.toolbar}>
        <button className={styles.button} onClick={() => setOpenItems(new Set(sections.map(({ value }) => value)))}>
          Expand all
        </button>
        <button className={styles.button} onClick={() => setOpenItems(new Set())}>
          Collapse all
        </button>
      </div>
      <Tree
        aria-label="Documentation"
        className={styles.tree}
        openItems={openItems}
        onOpenChange={(_, data) => setOpenItems(data.openItems)}
      >
        {sections.map(section => (
          <TreeItem className={styles.item} key={section.value} value={section.value} itemType="branch">
            <TreeItemLayout
              className={styles.layout}
              expandIcon={{ className: styles.expandIcon, children: <ChevronRightRegular /> }}
              main={{ className: styles.main }}
            >
              {section.name}
            </TreeItemLayout>
            <Tree className={styles.subtree}>
              {section.pages.map(page => (
                <TreeItem className={styles.item} key={page} value={`${section.value}/${page}`} itemType="leaf">
                  <TreeItemLayout className={styles.layout} main={{ className: styles.main }}>
                    {page}
                  </TreeItemLayout>
                </TreeItem>
              ))}
            </Tree>
          </TreeItem>
        ))}
      </Tree>
      <p className={styles.description}>Open: {Array.from(openItems).join(', ') || 'nothing'}</p>
    </>
  );
};
