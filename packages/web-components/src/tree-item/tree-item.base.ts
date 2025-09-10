import { attr, css, ElementStyles, FASTElement, observable } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import { isTreeItem } from './tree-item.options.js';

export class BaseTreeItem extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /** @internal */
  @observable
  public itemSlot!: HTMLSlotElement;

  constructor() {
    super();
    this.elementInternals.role = 'treeitem';
  }

  /**
   * When true, the control will be appear expanded by user interaction.
   * @public
   * HTML Attribute: `expanded`
   */
  @attr({ mode: 'boolean' })
  expanded: boolean = false;

  /**
   * Handles changes to the expanded attribute
   * @param prev - the previous state
   * @param next - the next state
   *
   * @public
   */
  public expandedChanged(prev: boolean, next: boolean): void {
    this.$emit('toggle', {
      oldState: prev ? 'open' : 'closed',
      newState: next ? 'open' : 'closed',
    });
    toggleState(this.elementInternals, 'expanded', next);
    if (this.childTreeItems && this.childTreeItems.length > 0) {
      this.elementInternals.ariaExpanded = next ? 'true' : 'false';
    }
  }

  /**
   * When true, the control will appear selected by user interaction.
   * @public
   * @remarks
   * HTML Attribute: selected
   */
  @attr({ mode: 'boolean' })
  selected: boolean = false;

  /**
   * Handles changes to the selected attribute
   * @param prev - the previous state
   * @param next - the next state
   *
   * @internal
   */
  protected selectedChanged(prev: boolean, next: boolean): void {
    this.updateTabindexBySelected();
    this.$emit('change');
    toggleState(this.elementInternals, 'selected', next);
    this.elementInternals.ariaSelected = next ? 'true' : 'false';
  }

  /**
   * When true, the control has no child tree items
   * @public
   * HTML Attribute: empty
   */
  @attr({ mode: 'boolean' })
  public empty: boolean = false;

  private styles: ElementStyles | undefined;

  /**
   * The indent of the tree item element.
   * This is not needed once css attr() is supported (--indent: attr(data-indent type(<number>)));
   * @public
   */
  @attr({ attribute: 'data-indent' })
  public dataIndent!: number | undefined;

  protected dataIndentChanged(prev: number, next: number) {
    if (this.styles !== undefined) {
      this.$fastController.removeStyles(this.styles);
    }

    this.styles = css`
      :host {
        --indent: ${next as any};
      }
    `;

    this.$fastController.addStyles(this.styles);
  }

  /** @internal */
  @observable
  public childTreeItems: BaseTreeItem[] | undefined = [];

  /**
   * Handles changes to the child tree items
   *
   * @public
   */
  public childTreeItemsChanged() {
    this.empty = this.childTreeItems?.length === 0;
    this.updateChildTreeItems();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTabindexBySelected();
  }

  /**
   * Updates the childrens indent
   *
   * @public
   */
  public updateChildTreeItems() {
    if (!this.childTreeItems?.length) {
      return;
    }

    //If a tree item is nested and initially set to selected expand the tree items so the selected item is visible
    if (!this.expanded) {
      this.expanded = Array.from(this.querySelectorAll('[selected]')).some(el => isTreeItem(el));
    }

    this.childTreeItems.forEach(item => {
      this.setIndent(item);
    });
  }

  /**
   * Sets the indent for each item
   */
  private setIndent(item: BaseTreeItem): void {
    const indent = this.dataIndent ?? 0;
    item.dataIndent = indent + 1;
  }

  /**
   * Toggle the expansion state of the tree item
   *
   * @public
   */
  public toggleExpansion() {
    if (this.childTreeItems?.length) {
      this.expanded = !this.expanded;
    }
  }

  /**
   * Whether the tree is nested
   * @internal
   */
  get isNestedItem() {
    return isTreeItem(this.parentElement);
  }

  protected updateTabindexBySelected() {
    if (this.$fastController.isConnected) {
      this.tabIndex = this.selected ? 0 : -1;
    }
  }

  /** @internal */
  public handleItemSlotChange() {
    this.childTreeItems = this.itemSlot.assignedElements().filter(el => isTreeItem(el));
  }
}
