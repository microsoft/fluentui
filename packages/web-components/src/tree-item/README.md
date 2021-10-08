---
id: tree-item
title: tree-item
sidebar_label: tree-item
---

An implementation of a [tree-item](https://w3c.github.io/aria/#treeitem) as a web-component to be placed inside a `fluent-tree-view`.

## Usage

```html live
<fluent-design-system-provider>
  <fluent-tree-view>
    Root
    <fluent-tree-item>Item 1</fluent-tree-item>
    <fluent-tree-item>Item 2</fluent-tree-item>
  </fluent-tree-view>
</fluent-design-system-provider>
```

## Applying custom styles

```ts
import { customElement } from '@microsoft/fluent-element';
import { TreeItem, TreeItemTemplate as template } from '@microsoft/fast-foundation';
import { TreeItemStyles as styles } from './tree-view.styles';

@customElement({
  name: 'fluent-tree-item',
  template,
  styles,
})
export class fluentTreeItem extends TreeItem {}
```
