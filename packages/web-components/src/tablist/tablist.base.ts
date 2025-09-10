import { attr, FASTElement, observable } from '@microsoft/fast-element';
import {
  keyArrowDown,
  keyArrowLeft,
  keyArrowRight,
  keyArrowUp,
  keyEnd,
  keyHome,
  uniqueId,
  wrapInBounds,
} from '@microsoft/fast-web-utilities';
import { getDirection } from '../utils/index.js';
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

  /**
   * Handles disabled changes
   * @param prev - previous value
   * @param next - next value
   *
   * @internal
   */
  protected disabledChanged(prev: boolean, next: boolean): void {
    toggleState(this.elementInternals, 'disabled', next);
  }

  /**
   * The orientation
   * @public
   * @remarks
   * HTML Attribute: orientation
   */
  @attr
  public orientation: TablistOrientation = TablistOrientation.horizontal;
  /**
   * @internal
   */
  protected orientationChanged(prev: TablistOrientation, next: TablistOrientation): void {
    this.elementInternals.ariaOrientation = next ?? TablistOrientation.horizontal;

    swapStates(this.elementInternals, prev, next, TablistOrientation);

    if (this.$fastController.isConnected) {
      this.setTabs();
    }
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
  /**
   * @internal
   */
  protected activeidChanged(oldValue: string, newValue: string): void {
    if (this.$fastController.isConnected && this.tabs.length > 0) {
      this.prevActiveTabIndex = this.tabs.findIndex((item: HTMLElement) => item.id === oldValue);
      this.setTabs();

      if (oldValue) {
        const prevActiveTab = this.tabs[this.prevActiveTabIndex];
        const prevActivePanel = this.tabPanelMap.get(prevActiveTab);
        if (prevActivePanel) {
          prevActivePanel.hidden = true;
        }
      }

      if (newValue && this.activetab) {
        const activePanel = this.tabPanelMap.get(this.activetab);
        if (activePanel) {
          activePanel.hidden = false;
        }
      }

      if (oldValue !== newValue) {
        this.change();
      }
    }
  }

  /**
   * Content slotted in the tab slot.
   * @internal
   */
  @observable
  public slottedTabs!: Node[];

  /**
   * Updates the tabs property when content in the tabs slot changes.
   * @internal
   */
  public slottedTabsChanged(prev: Node[] | undefined, next: Node[] | undefined): void {
    this.tabs = (next?.filter(tab => isTab(tab)) as Tab[]) ?? [];
  }

  /**
   * @internal
   */
  @observable
  public tabs!: Tab[];
  /**
   * @internal
   */
  protected tabsChanged(): void {
    if (this.$fastController.isConnected && this.tabs.length > 0) {
      this.tabIds = this.getTabIds();
      this.setTabs();

      for (const tab of this.tabs) {
        const ariaControls = tab.getAttribute('aria-controls') ?? '';
        const rootNode = this.getRootNode() as Document | ShadowRoot;
        const panel = rootNode.getElementById(ariaControls);
        if (ariaControls && panel) {
          panel.role ??= 'tabpanel';
          panel.hidden = this.activeid !== tab.id;
          this.tabPanelMap.set(tab, panel);
        }
      }
    }
  }

  /**
   * A reference to the active tab
   * @public
   */
  public activetab!: Tab;

  private prevActiveTabIndex: number = 0;
  private activeTabIndex: number = 0;
  private tabIds!: Array<string>;

  private tabPanelMap = new WeakMap<HTMLElement, HTMLElement>();

  private change = (): void => {
    this.$emit('change', this.activetab);
  };

  private getActiveIndex(): number {
    const id: string = this.activeid;
    if (id !== undefined) {
      return this.tabIds.indexOf(this.activeid) === -1 ? 0 : this.tabIds.indexOf(this.activeid);
    } else {
      return 0;
    }
  }

  /**
   * Function that is invoked whenever the selected tab or the tab collection changes.
   *
   * @public
   */
  protected setTabs(): void {
    this.activeTabIndex = this.getActiveIndex();

    const hasStartSlot = this.tabs.some(tab => !!tab.querySelector("[slot='start']"));

    this.tabs.forEach((tab: Tab, index: number) => {
      if (tab.slot === 'tab') {
        const isActiveTab = this.activeTabIndex === index && isFocusableElement(tab);
        const tabId: string = this.tabIds[index];
        tab.setAttribute('id', tabId);
        tab.setAttribute('aria-selected', isActiveTab ? 'true' : 'false');
        tab.addEventListener('click', this.handleTabClick);
        tab.addEventListener('keydown', this.handleTabKeyDown);
        tab.setAttribute('tabindex', isActiveTab && !this.disabled ? '0' : '-1');
        if (isActiveTab) {
          this.activetab = tab;
          this.activeid = tabId;
        }
        // Only set the data-hasIndent attribute if the tab has a start slot and the orientation is vertical
        if (hasStartSlot && this.orientation === TablistOrientation.vertical) {
          tab.setAttribute('data-hasIndent', '');
        }
      }
    });
  }

  private getTabIds(): Array<string> {
    return this.tabs.map((tab: HTMLElement) => {
      return tab.getAttribute('id') ?? `tab-${uniqueId()}`;
    });
  }

  private setComponent(): void {
    if (this.activeTabIndex !== this.prevActiveTabIndex) {
      this.activeid = this.tabIds[this.activeTabIndex] as string;
      this.focusTab();
    }
  }

  private handleTabClick = (event: MouseEvent): void => {
    const selectedTab = event.currentTarget as Tab;
    if (selectedTab.nodeType === Node.ELEMENT_NODE && isFocusableElement(selectedTab)) {
      this.prevActiveTabIndex = this.activeTabIndex;
      this.activeTabIndex = this.tabs.indexOf(selectedTab);
      this.setComponent();
    }
  };

  private isHorizontal(): boolean {
    return this.orientation === TablistOrientation.horizontal;
  }

  private handleTabKeyDown = (event: KeyboardEvent): void => {
    const dir = getDirection(this);
    switch (event.key) {
      case keyArrowLeft:
        if (!this.isHorizontal()) {
          return;
        }
        event.preventDefault();
        this.adjust(dir === 'ltr' ? -1 : 1);
        break;
      case keyArrowRight:
        if (!this.isHorizontal()) {
          return;
        }
        event.preventDefault();
        this.adjust(dir === 'ltr' ? 1 : -1);
        break;
      case keyArrowUp:
        if (this.isHorizontal()) {
          return;
        }
        event.preventDefault();
        this.adjust(-1);
        break;
      case keyArrowDown:
        if (this.isHorizontal()) {
          return;
        }
        event.preventDefault();
        this.adjust(1);
        break;
      case keyHome:
        event.preventDefault();
        this.adjust(-this.activeTabIndex);
        break;
      case keyEnd:
        event.preventDefault();
        this.adjust(this.tabs.filter(t => isFocusableElement(t)).length - this.activeTabIndex - 1);
        break;
    }
  };

  /**
   * The adjust method for FASTTabs
   * @public
   * @remarks
   * This method allows the active index to be adjusted by numerical increments
   */
  public adjust(adjustment: number): void {
    const focusableTabs = this.tabs.filter(t => isFocusableElement(t));
    const currentActiveTabIndex = focusableTabs.indexOf(this.activetab);

    const nextTabIndex = wrapInBounds(0, focusableTabs.length - 1, currentActiveTabIndex + adjustment);

    // the index of the next focusable tab within the context of all available tabs
    const nextIndex = this.tabs.indexOf(focusableTabs[nextTabIndex]);

    if (nextIndex > -1) {
      this.activateTabByIndex(this.tabs, nextIndex);
    }
  }

  private activateTabByIndex(group: Tab[], index: number) {
    const tab = group[index];
    this.activetab = tab;
    this.prevActiveTabIndex = this.activeTabIndex;
    this.activeTabIndex = index;
    tab.focus();
    this.setComponent();
  }

  private focusTab(): void {
    this.tabs[this.activeTabIndex].focus();
  }

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    this.tabIds = this.getTabIds();
    this.activeTabIndex = this.getActiveIndex();
  }
}
