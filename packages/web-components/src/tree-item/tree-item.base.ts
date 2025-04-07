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

  private dataIndentChanged(prev: number, next: number) {
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

  /**
   * Updates the childrens indent
   *
   * @public
   */
  public updateChildTreeItems() {
    if (!this.childTreeItems?.length) {
      return;
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
   * Handle focus events
   *
   * @public
   */
  public focusHandler(e: FocusEvent): void {
    if (
      e.target === this ||
      // In case where the tree-item contains a focusable element, we should not set the tabindex to 0 when the focus is on its child focusable element,
      // so users can shift+tab to navigate to the tree-item from its child focusable element.
      this.contains(e.target as Node)
    ) {
      this.setAttribute('tabindex', '0');
    }
  }

  /**
   * Handle blur events
   *
   * @public
   */
  public blurHandler(e: FocusEvent): void {
    if (e.target === this) {
      this.setAttribute('tabindex', '-1');
    }
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
   * Toggle the single selection state of the tree item
   *
   * @public
   */
  public toggleSelection() {
    this.selected = !this.selected;
  }

  /**
   * Whether the tree is nested
   * @internal
   */
  get isNestedItem() {
    return isTreeItem(this.parentElement);
  }
}
