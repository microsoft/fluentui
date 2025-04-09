import { attr } from '@microsoft/fast-element';
import { TreeItemAppearance, TreeItemSize } from './tree-item.options.js';
import { BaseTreeItem } from './tree-item.base.js';

export class TreeItem extends BaseTreeItem {
  /**
   * The size of the tree item element
   * @public
   */
  @attr
  public size: TreeItemSize = TreeItemSize.small;

  /**
   * Handles changes to the size attribute
   * we update the child tree items' size based on the size
   *  @internal
   */
  private sizeChanged() {
    this.updateSizeAndAppearance();
  }

  /**
   * The size of the tree item element
   * @public
   */
  @attr
  public appearance: TreeItemAppearance = TreeItemAppearance.subtle;

  /**
   * Handles changes to the appearance attribute
   *
   * @internal
   */
  private appearanceChanged() {
    this.updateSizeAndAppearance();
  }

  /**
   * child tree items supered change event
   * @internal
   */
  public childTreeItemsChanged(): void {
    super.childTreeItemsChanged();
    this.updateSizeAndAppearance();
  }

  /**
   * 1. Update the child items' size based on the tree's size
   * 2. Update the child items' appearance based on the tree's appearance
   *
   * @public
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
