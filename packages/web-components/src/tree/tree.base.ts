import { FASTElement, observable, Updates } from '@microsoft/fast-element';
import { isHTMLElement, keyArrowLeft, keyArrowRight, keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import { polyfill as focusgroupPolyfill } from '@microsoft/focusgroup-polyfill';
import type { BaseTreeItem } from '../tree-item/tree-item.base.js';
import { isTreeItem } from '../tree-item/tree-item.options.js';

export class BaseTree extends FASTElement {
  /**
   * The currently selected tree item
   * @public
   */
  @observable
  public currentSelected: HTMLElement | null = null;

  /**
   * The tree item that is designated to be in the tab queue.
   *
   * @internal
   */
  private currentFocused: HTMLElement | null = null;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /** @internal */
  @observable
  public defaultSlot!: HTMLSlotElement;

  /**
   * Calls the slot change handler when the `defaultSlot` reference is updated
   * by the template binding.
   *
   * @internal
   */
  defaultSlotChanged() {
    this.handleDefaultSlotChange();
  }

  constructor() {
    super();
    this.elementInternals.role = 'tree';
  }

  /** @internal */
  connectedCallback() {
    super.connectedCallback();

    Updates.enqueue(() => {
      focusgroupPolyfill(this);
    });
  }

  /** @internal */
  @observable
  childTreeItems!: BaseTreeItem[];

  /** @internal */
  public childTreeItemsChanged() {
    this.updateCurrentSelected();
  }

  /**
   * Updates current selected when slottedTreeItems changes
   */
  private updateCurrentSelected() {
    // force single selection
    // defaults to first one found
    const selectedItem = this.querySelector<HTMLElement>(`[selected]`);
    this.currentSelected = selectedItem;

    // invalidate the current focused item if it is no longer valid
    if (this.currentFocused === null || !this.contains(this.currentFocused)) {
      this.currentFocused = this.getValidFocusableItem();
    }
  }

  /**
   * KeyDown handler
   *
   *  @internal
   */
  public keydownHandler(e: KeyboardEvent): boolean | void {
    if (e.defaultPrevented) {
      return;
    }

    const item = e.target as HTMLElement;
    if (!isTreeItem(item) || this.childTreeItems.length < 1) {
      return true;
    }

    switch (e.key) {
      case keyArrowLeft: {
        if (item?.childTreeItems?.length && item.expanded) {
          item.expanded = false;
        } else if (isTreeItem(item.parentElement)) {
          item.parentElement.focus();
        }
        return;
      }
      case keyArrowRight: {
        if (item?.childTreeItems?.length) {
          if (!item.expanded) {
            item.expanded = true;
          }
        }
        return;
      }
      case keyEnter: {
        // In single-select trees where selection does not follow focus (see note below),
        // the default action is typically to select the focused node.
        this.clickHandler(e as Event);
        return;
      }
      case keySpace: {
        item.selected = true;
        return;
      }
    }

    // don't prevent default if we took no action
    return true;
  }

  /**
   * Handles click events bubbling up
   *
   *  @internal
   */

  public clickHandler(e: Event): boolean | void {
    if (e.defaultPrevented) {
      // handled, do nothing
      return;
    }

    if (!isTreeItem(e.target as HTMLElement)) {
      // not a tree item, ignore
      // return true, do not prevent default
      return true;
    }

    const item = e.target as BaseTreeItem;
    item.toggleExpansion();
    item.selected = true;
  }

  /**
   * Handles the selected-changed events bubbling up
   * from child tree items
   *
   *  @internal
   */
  public changeHandler(e: Event): boolean | void {
    if (e.defaultPrevented) {
      return;
    }

    if (!isTreeItem(e.target as HTMLElement)) {
      return true;
    }

    const item = e.target as BaseTreeItem;

    if (item.selected) {
      // Deselect the prevously selected item
      if (this.currentSelected && this.currentSelected !== item && isTreeItem(this.currentSelected)) {
        this.currentSelected.selected = false;
      }
      // New selected item
      this.currentSelected = item;
    } else if (!item.selected && this.currentSelected === item) {
      // Selected item deselected
      this.currentSelected = null;
    }
  }

  /**
   * checks if there are any nested tree items
   */
  private getValidFocusableItem() {
    const elements: HTMLElement[] | void = this.getVisibleNodes();
    // default to selected element if there is one
    let focusIndex = elements.findIndex(el => (el as any).selected);
    if (focusIndex === -1) {
      // otherwise first focusable tree item
      focusIndex = elements.findIndex(el => isTreeItem(el));
    }
    if (focusIndex !== -1) {
      return elements[focusIndex];
    }
    return null;
  }

  private getVisibleNodes(): HTMLElement[] {
    return Array.from(this.querySelectorAll('*')).filter(
      node => isTreeItem(node) && node.offsetParent !== null,
    ) as HTMLElement[];
  }

  /** @internal */
  public handleDefaultSlotChange() {
    this.childTreeItems = this.defaultSlot.assignedElements().filter(el => isTreeItem(el));
  }
}
