import { attr } from '@microsoft/fast-element';
import type { TreeItem } from '../tree-item/tree-item.js';
import { TreeItemAppearance, TreeItemSize } from '../tree-item/tree-item.options.js';
import { BaseTree } from './tree.base.js';

/**
 * The Fluent Tree Element. Implements {@link @microsoft/fast-foundation#BaseTree}.
 *
 * @tag fluent-tree
 *
 */
export class Tree extends BaseTree {
  /**
   * The size of the tree item element
   * @public
   * HTML Attribute: size
   */
  @attr
  public size: TreeItemSize = TreeItemSize.small;
  protected sizeChanged() {
    this.updateSizeAndAppearance();
  }

  /**
   * The appearance variants of the tree item element
   * @public
   * HTML Attribute: appearance
   */
  @attr
  public appearance: TreeItemAppearance = TreeItemAppearance.subtle;
  protected appearanceChanged() {
    this.updateSizeAndAppearance();
  }

  /**
   * child tree items supered change event
   * @internal
   */
  public childTreeItemsChanged() {
    super.childTreeItemsChanged();
    this.updateSizeAndAppearance();
  }

  /**
   * 1. Update the child items' size based on the tree's size
   * 2. Update the child items' appearance based on the tree's appearance
   */
  public updateSizeAndAppearance() {
    if (!this.childTreeItems?.length) {
      return;
    }

    this.childTreeItems.forEach(item => {
      (item as TreeItem).size = this.size;
      (item as TreeItem).appearance = this.appearance;
    });
  }
}
