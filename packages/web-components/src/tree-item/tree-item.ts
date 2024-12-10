import { attr, FASTElement, nullableNumberConverter, observable, volatile } from '@microsoft/fast-element';
import { TreeItemAppearance, TreeItemSize } from './tree-item.options.js';
import { toggleState } from '../utils/element-internals.js';

export class TreeItem extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled | disabled HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr({ mode: 'boolean' })
  disabled = false;

  /**
   * Handles changes to the disabled attribute
   * @param prev - the previous state
   * @param next - the next state
   */
  disabledChanged(prev: boolean, next: boolean): void {
    this.elementInternals.ariaDisabled = next ? 'true' : 'false';
  }

  constructor() {
    super();
    this.elementInternals.role = 'treeitem';
  }

  /**
   * The depth of the tree item
   */
  @attr({ converter: nullableNumberConverter })
  depth: number = 0;

  /**
   * When true, the control will be appear expanded by user interaction.
   * @public
   * HTML Attribute: expanded
   */
  @attr({ mode: 'boolean' })
  expanded = false;

  /**
   * Handles changes to the expanded attribute
   * @param prev - the previous state
   * @param next - the next state
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
  selected = false;

  /**
   * Handles changes to the selected attribute
   * @param prev - the previous state
   * @param next - the next state
   */
  protected selectedChanged(prev: boolean, next: boolean): void {
    toggleState(this.elementInternals, 'selected', next);
    this.elementInternals.ariaSelected = next ? 'true' : 'false';
  }

  /**
   * The size of the tree item element
   */
  @observable
  size: TreeItemSize = 'medium';

  /**
   * Handles changes to the size attribute
   * we update the child tree items' size based on the size
   */
  private sizeChanged() {
    this.updateChildTreeItems();
  }

  /**
   * The size of the tree item element
   */
  @observable
  appearance: TreeItemAppearance = 'subtle';

  /**
   * Handles changes to the appearance attribute
   */
  private appearanceChanged() {
    this.updateChildTreeItems();
  }

  @observable
  childTreeItems: TreeItem[] | undefined = [];

  /**
   * Handles changes to the child tree items
   */
  private childTreeItemsChanged() {
    this.updateChildTreeItems();
  }

  /**
   * 1. Update the child items' size based on the tree's size
   * 2. Update the child items' appearance based on the tree's appearance
   */
  private updateChildTreeItems() {
    if (!this.childTreeItems || !this.childTreeItems.length) {
      return;
    }
    this.childTreeItems.forEach(item => {
      item.size = this.size;
      item.appearance = this.appearance;
      item.depth = this.depth + 1;
    });
  }

  /**
   * Handle focus events
   *
   * @internal
   */
  handleFocus = (e: FocusEvent): void => {
    if (
      e.target === this ||
      // In case where the tree-item contains a focusable element, we should not set the tabindex to 0 when the focus is on its child focusable element,
      // so users can shift+tab to navigate to the tree-item from its child focusable element.
      this.contains(e.target as Node)
    ) {
      this.setAttribute('tabindex', '0');
    }
  };

  /**
   * Handle blur events
   *
   * @internal
   */
  handleBlur = (e: FocusEvent): void => {
    if (e.target === this) {
      this.setAttribute('tabindex', '-1');
    }
  };

  /**
   * Toggle the expansion state of the tree item
   */
  toggleExpansion() {
    if (!this.disabled && this.childTreeItems?.length) {
      this.expanded = !this.expanded;
    }
  }

  /**
   * Toggle the single selection state of the tree item
   */
  toggleSelection() {
    if (!this.disabled) {
      this.selected = !this.selected;
    }
  }

  /**
   * Whether the tree is nested
   * @internal
   */
  get isNestedItem() {
    return this.parentElement instanceof TreeItem;
  }

  /**
   * Whether the tree is an root item
   * @internal
   */
  get isRootItem() {
    return this.parentElement && (this.parentElement as any).isTreeView;
  }

  get isExpanded() {
    return this.expanded && this.childTreeItems && this.childTreeItems.length > 0;
  }

  /**
   * Calculate the class list that should be applied to the positioning-region
   * @internal
   */
  @volatile
  get calculatedClassName() {
    let className = '';
    if (!this.childTreeItems?.length) {
      className += 'leaf';
    }
    if (this.isRootItem) {
      className += ' root-item';
    }
    className += ` ${this.size} ${this.appearance}`;
    return className.trim();
  }
}
