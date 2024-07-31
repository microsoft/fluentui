import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { wrapInBounds } from '@microsoft/fast-web-utilities';
import {
  keyArrowDown,
  keyArrowLeft,
  keyArrowRight,
  keyArrowUp,
  keyEnd,
  keyHome,
  uniqueId,
} from '@microsoft/fast-web-utilities';
import { getDirection } from '../utils/index.js';
import { toggleState } from '../utils/element-internals.js';
import { isFocusableElement } from '../utils/focusable-element.js';
import { Tab } from '../index.js';
import { TablistAppearance, TablistOrientation, TablistSize } from './tablist.options.js';

type TabData = Omit<DOMRect, 'top' | 'bottom' | 'left' | 'right' | 'toJSON'>;

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

    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }

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
  protected tabsChanged(): void {
    if (this.$fastController.isConnected && this.tabs.length > 0) {
      this.tabIds = this.getTabIds();
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

    this.tabs.forEach((tab: HTMLElement, index: number) => {
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
        this.change();
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
      this.change();
    }
  }

  private handleTabClick = (event: MouseEvent): void => {
    const selectedTab = event.currentTarget as HTMLElement;
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
    const focusableTabs = this.tabs.filter(t => isFocusableElement(t));
    const currentActiveTabIndex = focusableTabs.indexOf(this.activetab);

    const nextTabIndex = wrapInBounds(0, focusableTabs.length - 1, currentActiveTabIndex + adjustment);

    // the index of the next focusable tab within the context of all available tabs
    const nextIndex = this.tabs.indexOf(focusableTabs[nextTabIndex]);

    if (nextIndex > -1) {
      this.activateTabByIndex(this.tabs, nextIndex);
    }
  }

  private activateTabByIndex(group: HTMLElement[], index: number) {
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
    this.activeTabIndex = this.getActiveIndex();
  }
}

/**
 * A BaseTablist component with extra logic for handling the styled active tab indicator.
 * @public
 */
export class Tablist extends BaseTablist {
  /**
   * activeTabData
   * The positional coordinates and size dimensions of the active tab. Used for calculating the offset and scale of the tab active indicator.
   */
  private activeTabData: TabData = { x: 0, y: 0, height: 0, width: 0 };
  /**
   * previousActiveTabData
   * The positional coordinates and size dimensions of the active tab. Used for calculating the offset and scale of the tab active indicator.
   */
  private previousActiveTabData: TabData = { x: 0, y: 0, height: 0, width: 0 };
  /**
   * activeTabOffset
   * Used to position the active indicator for animations of the active indicator on active tab changes.
   */
  private activeTabOffset = 0;
  /**
   * activeTabScale
   * Used to scale the tab active indicator up or down as animations of the active indicator occur.
   */
  private activeTabScale = 1;

  /**
   * appearance
   * There are two modes of appearance: transparent and subtle.
   */
  @attr
  public appearance?: TablistAppearance = TablistAppearance.transparent;

  /**
   * @internal
   */
  protected appearanceChanged(prev: TablistAppearance, next: TablistAppearance): void {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * size
   * defaults to medium.
   * Used to set the size of all the tab controls, which effects text size and margins. Three sizes: small, medium and large.
   */
  @attr
  public size?: TablistSize;

  /**
   * @internal
   */
  protected sizeChanged(prev: TablistSize, next: TablistSize): void {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * calculateAnimationProperties
   *
   * Recalculates the active tab offset and scale.
   * These values will be applied to css variables that control the tab active indicator position animations
   */
  private calculateAnimationProperties(tab: Tab) {
    this.activeTabOffset = this.getTabPosition(tab);
    this.activeTabScale = this.getTabScale(tab);
  }

  /**
   * getSelectedTabPosition - gets the x or y coordinates of the tab
   */
  private getTabPosition(tab: Tab): number {
    if (this.orientation === TablistOrientation.horizontal) {
      return this.previousActiveTabData.x - (tab.getBoundingClientRect().x - this.getBoundingClientRect().x);
    } else return this.previousActiveTabData.y - (tab.getBoundingClientRect().y - this.getBoundingClientRect().y);
  }

  /**
   * getSelectedTabScale - gets the scale of the tab
   */
  private getTabScale(tab: Tab): number {
    if (this.orientation === TablistOrientation.horizontal) {
      return this.previousActiveTabData.width / tab.getBoundingClientRect().width;
    } else return this.previousActiveTabData.height / tab.getBoundingClientRect().height;
  }

  /**
   * Calculates and applies updated values to CSS variables.
   *
   * @param tab - the tab element to apply the updated values to
   * @internal
   */
  private applyUpdatedCSSValues(tab: Tab) {
    this.calculateAnimationProperties(tab);
    this.setAnimationVars();
  }

  /**
   * Runs through all the operations required for setting the tab active indicator to its starting location, ending
   * location, and applying the animated css class to the tab.
   *
   * @param tab - the tab element to apply the updated values to
   * @internal
   */
  private animationLoop(tab: Tab) {
    // remove the animated class so nothing animates yet
    tab.setAttribute('data-animate', 'false');
    // animation start - this applyUpdatedCSSValues sets the active indicator to the location of the previously selected tab
    this.applyUpdatedCSSValues(tab);
    // changing the previously active tab allows the applyUpdatedCSSValues method to calculate the correct end to the animation.
    this.previousActiveTabData = this.activeTabData;
    // calculate and apply updated css values for animation.
    this.applyUpdatedCSSValues(tab);
    // add the css class and active indicator will animate from the previous tab location to its tab location
    tab.setAttribute('data-animate', 'true');
  }

  /**
   * Sets the data from the active tab onto the class. used for making all the animation calculations for the active
   * tab indicator.
   *
   * @internal
   */
  private setTabData(): void {
    if (this.tabs && this.tabs.length > 0) {
      const tabs = this.tabs as Tab[];
      const activeTab = this.activetab || tabs[0];
      const activeRect = activeTab?.getBoundingClientRect();
      const parentRect = this.getBoundingClientRect();

      this.activeTabData = {
        x: activeRect.x - parentRect.x,
        y: activeRect.y - parentRect.y,
        height: activeRect.height,
        width: activeRect.width,
      } as TabData;

      if (
        this.previousActiveTabData?.x !== this.activeTabData?.x &&
        this.previousActiveTabData?.y !== this.activeTabData?.y
      ) {
        this.previousActiveTabData = this.activeTabData;
      }
    }
  }

  /**
   * Sets the css variables for the active tab indicator.
   * @internal
   */
  private setAnimationVars() {
    this.style.setProperty('--tabIndicatorOffset', `${this.activeTabOffset}px`);
    this.style.setProperty('--tabIndicatorScale', `${this.activeTabScale}`);
  }

  /**
   * Initiates the active tab indicator animation loop when activeid changes.
   * @param oldValue - the previous tabId
   * @param newValue - the new tabId
   */
  public activeidChanged(oldValue: string, newValue: string) {
    super.activeidChanged(oldValue, newValue);
    this.setTabData();

    if (this.activetab) {
      this.animationLoop(this.activetab as Tab);
    }
  }

  /**
   * Initiates the active tab indicator animation loop when tabs change.
   */
  public tabsChanged(): void {
    super.tabsChanged();
    this.setTabData();

    if (this.activetab) {
      this.animationLoop(this.activetab as Tab);
    }
  }
}
