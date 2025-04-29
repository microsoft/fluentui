import { attr, FASTElement, observable } from '@microsoft/fast-element';
import {
  keyArrowDown,
  keyArrowLeft,
  keyArrowRight,
  keyArrowUp,
  keyEnd,
  keyHome,
  limit,
  uniqueId,
} from '@microsoft/fast-web-utilities';
import { TabsOrientation } from './tabs.options.js';

/**
 * A Tabs component that wraps a collection of tab and tab panel elements.
 *
 * @deprecated - use tablist instead
 */
export class BaseTabs extends FASTElement {
  /**
   * The orientation
   * @public
   * @remarks
   * HTML Attribute: orientation
   */
  @attr
  public orientation: TabsOrientation = TabsOrientation.horizontal;
  /**
   * @internal
   */
  public orientationChanged(): void {
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
  public activeidChanged(oldValue: string, newValue: string): void {
    if (this.$fastController.isConnected && this.tabs.length <= this.tabpanels.length) {
      this.prevActiveTabIndex = this.tabs.findIndex((item: HTMLElement) => item.id === oldValue);
      this.setTabs();
    }
  }

  /**
   * @internal
   */
  @observable
  public tabs!: HTMLElement[];
  /**
   * @internal
   */
  public tabsChanged(): void {
    if (this.$fastController.isConnected && this.tabs.length <= this.tabpanels.length) {
      this.tabIds = this.getTabIds();
      this.tabpanelIds = this.getTabPanelIds();

      this.setTabs();
    }
  }

  /**
   * @internal
   */
  @observable
  public tabpanels!: HTMLElement[];
  /**
   * @internal
   */
  public tabpanelsChanged(): void {
    if (this.$fastController.isConnected && this.tabpanels.length <= this.tabs.length) {
      this.tabIds = this.getTabIds();
      this.tabpanelIds = this.getTabPanelIds();

      this.setTabs();
    }
  }

  /**
   * A reference to the active tab
   * @public
   */
  public activetab!: HTMLElement;

  private prevActiveTabIndex: number = 0;
  private activeTabIndex: number = 0;
  private tabIds!: Array<string>;
  private tabpanelIds!: Array<string>;

  private change = (): void => {
    this.$emit('change', this.activetab);
  };

  private isDisabledElement = (el: Element): el is HTMLElement => {
    return el.getAttribute('aria-disabled') === 'true';
  };

  private isHiddenElement = (el: Element): el is HTMLElement => {
    return el.hasAttribute('hidden');
  };

  private isFocusableElement = (el: Element): el is HTMLElement => {
    return !this.isDisabledElement(el) && !this.isHiddenElement(el);
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
    const gridHorizontalProperty: string = 'gridColumn';
    const gridVerticalProperty: string = 'gridRow';
    const gridProperty: string = this.isHorizontal() ? gridHorizontalProperty : gridVerticalProperty;

    this.activeTabIndex = this.getActiveIndex();

    this.tabs.forEach((tab: HTMLElement, index: number) => {
      if (tab.slot === 'tab') {
        const isActiveTab = this.activeTabIndex === index && this.isFocusableElement(tab);

        const tabId: string = this.tabIds[index];
        const tabpanelId: string = this.tabpanelIds[index];
        tab.setAttribute('id', tabId);
        tab.setAttribute('aria-selected', isActiveTab ? 'true' : 'false');
        tab.setAttribute('aria-controls', tabpanelId);
        tab.addEventListener('click', this.handleTabClick);
        tab.addEventListener('keydown', this.handleTabKeyDown);
        tab.setAttribute('tabindex', isActiveTab ? '0' : '-1');
        if (isActiveTab) {
          this.activetab = tab;
          this.activeid = tabId;
        }
      }

      // If the original property isn't emptied out,
      // the next set will morph into a grid-area style setting that is not what we want
      tab.style[gridHorizontalProperty as any] = '';
      tab.style[gridVerticalProperty as any] = '';
      tab.style[gridProperty as any] = `${index + 1}`;
      !this.isHorizontal() ? tab.classList.add('vertical') : tab.classList.remove('vertical');
    });
    this.setTabPanels();
  }

  private setTabPanels(): void {
    this.tabpanels.forEach((tabpanel: HTMLElement, index: number) => {
      const tabId: string = this.tabIds[index];
      const tabpanelId: string = this.tabpanelIds[index];
      tabpanel.setAttribute('id', tabpanelId);
      tabpanel.setAttribute('aria-labelledby', tabId);
      this.activeTabIndex !== index ? tabpanel.setAttribute('hidden', '') : tabpanel.removeAttribute('hidden');
    });
  }

  private getTabIds(): Array<string> {
    return this.tabs.map((tab: HTMLElement) => {
      return tab.getAttribute('id') ?? `tab-${uniqueId()}`;
    });
  }

  private getTabPanelIds(): Array<string> {
    return this.tabpanels.map((tabPanel: HTMLElement) => {
      return tabPanel.getAttribute('id') ?? `panel-${uniqueId()}`;
    });
  }

  private setComponent(): void {
    if (this.activeTabIndex !== this.prevActiveTabIndex) {
      this.activeid = this.tabIds[this.activeTabIndex] as string;
      this.focusTab();
      this.change();
    }
  }

  private handleTabClick = (event: MouseEvent): void => {
    const selectedTab = event.currentTarget as HTMLElement;
    if (selectedTab.nodeType === 1 && this.isFocusableElement(selectedTab)) {
      this.prevActiveTabIndex = this.activeTabIndex;
      this.activeTabIndex = this.tabs.indexOf(selectedTab);
      this.setComponent();
    }
  };

  private isHorizontal(): boolean {
    return this.orientation === TabsOrientation.horizontal;
  }

  private handleTabKeyDown = (event: KeyboardEvent): void => {
    if (this.isHorizontal()) {
      switch (event.key) {
        case keyArrowLeft:
          event.preventDefault();
          this.adjustBackward(event);
          break;
        case keyArrowRight:
          event.preventDefault();
          this.adjustForward(event);
          break;
      }
    } else {
      switch (event.key) {
        case keyArrowUp:
          event.preventDefault();
          this.adjustBackward(event);
          break;
        case keyArrowDown:
          event.preventDefault();
          this.adjustForward(event);
          break;
      }
    }
    switch (event.key) {
      case keyHome:
        event.preventDefault();
        this.adjust(-this.activeTabIndex);
        break;
      case keyEnd:
        event.preventDefault();
        this.adjust(this.tabs.length - this.activeTabIndex - 1);
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
    const focusableTabs = this.tabs.filter(t => this.isFocusableElement(t));
    const currentActiveTabIndex = focusableTabs.indexOf(this.activetab);

    const nextTabIndex = limit(0, focusableTabs.length - 1, currentActiveTabIndex + adjustment);

    // the index of the next focusable tab within the context of all available tabs
    const nextIndex = this.tabs.indexOf(focusableTabs[nextTabIndex]);

    if (nextIndex > -1) {
      this.moveToTabByIndex(this.tabs, nextIndex);
    }
  }

  private adjustForward(e: KeyboardEvent): void {
    const group: HTMLElement[] = this.tabs;
    let index: number = 0;

    index = this.activetab ? group.indexOf(this.activetab) + 1 : 1;
    if (index === group.length) {
      index = 0;
    }

    while (index < group.length && group.length > 1) {
      if (this.isFocusableElement(group[index])) {
        this.moveToTabByIndex(group, index);
        break;
      } else if (this.activetab && index === group.indexOf(this.activetab)) {
        break;
      } else if (index + 1 >= group.length) {
        index = 0;
      } else {
        index += 1;
      }
    }
  }

  private adjustBackward(e: KeyboardEvent): void {
    const group: HTMLElement[] = this.tabs;
    let index: number = 0;

    index = this.activetab ? group.indexOf(this.activetab) - 1 : 0;
    index = index < 0 ? group.length - 1 : index;

    while (index >= 0 && group.length > 1) {
      if (this.isFocusableElement(group[index])) {
        this.moveToTabByIndex(group, index);
        break;
      } else if (index - 1 < 0) {
        index = group.length - 1;
      } else {
        index -= 1;
      }
    }
  }

  private moveToTabByIndex(group: HTMLElement[], index: number) {
    const tab: HTMLElement = group[index] as HTMLElement;
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
    this.tabpanelIds = this.getTabPanelIds();
    this.activeTabIndex = this.getActiveIndex();
  }
}
