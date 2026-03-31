import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { uniqueId, wrapInBounds } from '@microsoft/fast-web-utilities';
import { swapStates, toggleState } from '../utils/element-internals.js';
import { isFocusableElement } from '../utils/focusable-element.js';
import type { Tab } from '../tab/tab.js';
import { isTab } from '../tab/tab.options.js';
import { TablistOrientation } from './tablist.options.js';

/**
 * A Tablist element that wraps a collection of tab elements
 * @public
 */
export class BaseTablist extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * Used for disabling all click and keyboard events for the tabs, child tab elements.
   * @public
   * @remarks
   * HTML Attribute: disabled.
   */
  @attr({ mode: 'boolean' })
  public disabled: boolean = false;
  protected disabledChanged(prev: boolean, next: boolean): void {
    toggleState(this.elementInternals, 'disabled', next);

    if (!this.$fastController.isConnected) {
      return;
    }

    this.setTabs({ forceDisabled: true });
  }

  /**
   * The orientation
   * @public
   * @remarks
   * HTML Attribute: orientation
   */
  @attr
  public orientation: TablistOrientation = TablistOrientation.horizontal;
  protected orientationChanged(prev: TablistOrientation, next: TablistOrientation): void {
    this.elementInternals.ariaOrientation = next ?? TablistOrientation.horizontal;

    swapStates(this.elementInternals, prev, next, TablistOrientation);

    if (!this.$fastController.isConnected) {
      return;
    }

    this.setTabs();
  }

  /**
   * The id of the active tab
   *
   * @public
   * @remarks
   * HTML Attribute: activeid
   */
  @attr
  public activeid!: string;
  protected activeidChanged(oldValue: string, newValue: string): void {
    if (!this.$fastController.isConnected || this.tabs.length === 0) {
      return;
    }

    this.changeTab(oldValue, newValue);
  }

  /**
   * Content slotted in the tab slot.
   * @internal
   */
  @observable
  public slottedTabs!: Node[];
  protected slottedTabsChanged(prev: Node[] | undefined, next: Node[] | undefined): void {
    this.tabs = (next?.filter(tab => isTab(tab)) as Tab[]) ?? [];
  }

  /** @internal */
  @observable
  public tabs: Tab[] = [];
  protected tabsChanged(): void {
    if (!this.$fastController.isConnected || this.tabs.length === 0) {
      return;
    }

    this.setTabs({ connectToPanel: true });
  }

  /**
   * A reference to the active tab
   * @public
   */
  public activetab!: Tab;

  private tabPanelMap = new WeakMap<HTMLElement, HTMLElement>();

  private change = (): void => {
    this.$emit('change', this.activetab);
  };

  /** @internal */
  public connectedCallback(): void {
    super.connectedCallback();

    Updates.enqueue(() => {
      // @ts-expect-error: Client side module.
      window.FOCUSGROUP_POLYFILL?.(this);
    });
  }

  /**
   * Function that is invoked whenever the selected tab or the tab collection changes.
   *
   * @internal
   */
  protected setTabs({ connectToPanel = false, forceDisabled = false } = {}): void {
    const hasStartSlot = this.tabs.some(tab => !!tab.querySelector("[slot='start']"));
    const rootNode = this.getRootNode() as Document | ShadowRoot;
    let firstEnabledTabId = '';

    for (const tab of this.tabs) {
      if (tab.slot !== 'tab') {
        continue;
      }

      tab.id ||= uniqueId('tab-');
      if (forceDisabled) {
        tab.disabled = this.disabled;
      } else {
        tab.disabled = tab.disabled || this.disabled;
      }

      if (!firstEnabledTabId && !tab.disabled) {
        firstEnabledTabId = tab.id;
      }

      if (this.activeid === tab.id) {
        tab.setAttribute('focusgroupstart', '');
      }

      // Only set the data-hasIndent attribute if the tab has a start slot and the orientation is vertical
      if (hasStartSlot && this.orientation === TablistOrientation.vertical) {
        tab.setAttribute('data-hasIndent', '');
      }

      if (connectToPanel) {
        const ariaControls = tab.getAttribute('aria-controls') ?? '';
        const panel = rootNode.getElementById(ariaControls);
        if (ariaControls && panel) {
          panel.role ??= 'tabpanel';
          panel.hidden = this.activeid !== tab.id;
          this.tabPanelMap.set(tab, panel);
        }
      }
    }

    if (!this.disabled) {
      if (this.activeid) {
        this.changeTab(undefined, this.activeid);
      } else if (firstEnabledTabId) {
        this.activeid = firstEnabledTabId;
      }
    }
  }

  /** @internal */
  public handleFocusIn(event: FocusEvent) {
    const target = event.target as Node;
    if (!isTab(target) || target.disabled) {
      return;
    }
    this.activeid = target.id;
  }

  private changeTab(oldId: undefined | string, newId: string) {
    const rootNode = this.getRootNode() as Document | ShadowRoot;
    const prevTab = oldId ? rootNode.getElementById(oldId) : null;
    const nextTab = rootNode.getElementById(newId);

    if (!isTab(nextTab) || !this.contains(nextTab)) {
      return;
    }

    if (prevTab) {
      prevTab.removeAttribute('aria-selected');
      prevTab.removeAttribute('focusgroupstart');
      const prevPanel = this.tabPanelMap.get(prevTab);
      if (prevPanel) {
        prevPanel.hidden = true;
      }
    }

    nextTab.setAttribute('aria-selected', 'true');
    nextTab.setAttribute('focusgroupstart', '');
    const nextPanel = this.tabPanelMap.get(nextTab);
    if (nextPanel) {
      nextPanel.hidden = false;
    }

    this.activetab = nextTab;

    this.change();
  }

  /**
   * The adjust method for FASTTabs
   * @public
   * @remarks
   * This method allows the active index to be adjusted by numerical increments
   */
  public adjust(adjustment: number): void {
    /*
    const focusableTabs = this.tabs.filter(t => isFocusableElement(t));
    const currentActiveTabIndex = focusableTabs.indexOf(this.activetab);

    const nextTabIndex = wrapInBounds(0, focusableTabs.length - 1, currentActiveTabIndex + adjustment);

    // the index of the next focusable tab within the context of all available tabs
    const nextIndex = this.tabs.indexOf(focusableTabs[nextTabIndex]);

    if (nextIndex > -1) {
      this.activateTabByIndex(this.tabs, nextIndex);
    }
    */
  }
}
