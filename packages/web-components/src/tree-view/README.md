---
id: tree-view
title: fluent-tree-view
sidebar_label: tree-view
---

As defined by the [W3C](https://w3c.github.io/aria/#tree):

> A tree view widget presents a hierarchical list. Any item in the hierarchy may have child items, and items that have children may be expanded or collapsed to show or hide the children. For example, in a file system navigator that uses a tree view to display folders and files, an item representing a folder can be expanded to reveal the contents of the folder, which may be files, folders, or both.

## Setup

### Basic Setup

```ts
import { providefluentDesignSystem, fluentTreeItem, fluentTreeView } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentTreeItem(), fluentTreeView());
```

### Customizing the Glyph

```ts
import { providefluentDesignSystem, fluentTreeItem, fluentTreeView } from '@fluentui/web-components';

providefluentDesignSystem().register(
  fluentTreeItem({
    expandCollapseGlyph: `...your expand/collapse glyph`,
  }),
  fluentTreeView(),
);
```

## Usage

```html live
<fluent-tree-view>
  Root
  <fluent-tree-item>
    Item 1
    <fluent-tree-item>Sub-item 1</fluent-tree-item>
    <fluent-tree-item>Sub-item 2</fluent-tree-item>
  </fluent-tree-item>
  <fluent-tree-item>Item 2</fluent-tree-item>
</fluent-tree-view>
```

## Create your own design

### TreeItem

```ts
import { treeItemTemplate as template, TreeItem, TreeItemOptions } from '@microsoft/fast-foundation';
import { treeItemStyles as styles } from './my-tree-item.styles';

export const myTreeItem = TreeItem.compose<TreeItemOptions>({
  baseName: 'tree-item',
  template,
  styles,
  expandCollapseGlyph: `...default expand/collapse glyph`,
});
```

### TreeView

```ts
import { treeViewTemplate as template, TreeView } from '@microsoft/fast-foundation';
import { treeViewStyles as styles } from './tree-view.styles';

export const myTreeView = TreeView.compose({
  baseName: 'tree-view',
  template,
  styles,
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-tree-view)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/tree-view/tree-view.spec.md)
- [W3C Component Aria Practices](https://www.w3.org/TR/wai-aria/#tree)
