import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-headless-components-preview/tree';
import type { TreeItemValue, TreeProps, TreeSelectionValue } from '@fluentui/react-headless-components-preview/tree';
import { ChevronRightRegular } from '@fluentui/react-icons';

import styles from './tree.module.css';

const toppings = {
  cheese: ['Mozzarella', 'Parmesan', 'Gorgonzola'],
  vegetables: ['Mushrooms', 'Peppers', 'Olives'],
};

const children = Object.entries(toppings).map(([group, values]) => ({
  group,
  values: values.map(name => ({ value: `${group}/${name}`, name })),
}));

/**
 * Derives the checked state of each group from its toppings, as a parent's checked state is
 * owned by the consumer.
 */
const withGroups = (checkedToppings: Set<string>): Array<[TreeItemValue, TreeSelectionValue]> => {
  const groups = children.map(({ group, values }) => {
    const checkedCount = values.filter(({ value }) => checkedToppings.has(value)).length;
    const checked: TreeSelectionValue = checkedCount === 0 ? false : checkedCount === values.length ? true : 'mixed';
    return [group, checked] as [TreeItemValue, TreeSelectionValue];
  });

  return [...groups, ...Array.from(checkedToppings, value => [value, true] as [TreeItemValue, TreeSelectionValue])];
};

export const Multiselect = (): React.ReactNode => {
  const [checkedToppings, setCheckedToppings] = React.useState(() => new Set(['cheese/Mozzarella']));

  const onCheckedChange: TreeProps['onCheckedChange'] = (_, data) => {
    setCheckedToppings(previous => {
      const next = new Set(previous);
      const group = children.find(item => item.group === data.value);
      // A group toggles all of its toppings, a topping toggles itself.
      const values = group ? group.values.map(({ value }) => value) : [String(data.value)];
      values.forEach(value => (data.checked === true ? next.add(value) : next.delete(value)));
      return next;
    });
  };

  return (
    <>
      <Tree
        aria-label="Pizza toppings"
        className={styles.tree}
        selectionMode="multiselect"
        defaultOpenItems={['cheese']}
        checkedItems={withGroups(checkedToppings)}
        onCheckedChange={onCheckedChange}
      >
        {children.map(({ group, values }) => (
          <TreeItem className={styles.item} key={group} value={group} itemType="branch">
            <TreeItemLayout
              className={styles.layout}
              expandIcon={{ className: styles.expandIcon, children: <ChevronRightRegular /> }}
              selector={{ className: styles.selector }}
              main={{ className: styles.main }}
            >
              {group}
            </TreeItemLayout>
            <Tree className={styles.subtree}>
              {values.map(({ value, name }) => (
                <TreeItem className={styles.item} key={value} value={value} itemType="leaf">
                  <TreeItemLayout
                    className={styles.layout}
                    selector={{ className: styles.selector }}
                    main={{ className: styles.main }}
                  >
                    {name}
                  </TreeItemLayout>
                </TreeItem>
              ))}
            </Tree>
          </TreeItem>
        ))}
      </Tree>
      <p className={styles.description}>
        Selected: {Array.from(checkedToppings, value => value.split('/')[1]).join(', ') || 'nothing'}
      </p>
    </>
  );
};
