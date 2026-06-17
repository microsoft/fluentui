import { attr } from '@microsoft/fast-element';
import { BaseTreeItem } from './tree-item.base.js';
import { TreeItemAppearance, TreeItemSize } from './tree-item.options.js';

/**
 * The Fluent Tree Item Element. Implements {@link @microsoft/fast-foundation#BaseTreeItem}.
 *
 * @tag fluent-tree-item
 *
 * @slot - The default slot. Accepts the content of the tree item.
 * @slot start - Content shown before the item label.
 * @slot end - Content shown after the item label.
 * @slot aside - Content shown at the far end of the row.
 * @slot item - Child tree items.
 *
 * @csspart positioning-region - The container for item content and aside regions.
 * @csspart content - The item content region.
 * @csspart chevron - The expand/collapse indicator region.
 * @csspart aside - The trailing aside region.
 * @csspart items - The child items group region.
 *
 * @fires { ToggleEvent } toggle - Fired when expanded state toggles.
 * @fires { Event } change - Fired when selected state changes.
 *
 */
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
  protected sizeChanged() {
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
  protected appearanceChanged() {
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
