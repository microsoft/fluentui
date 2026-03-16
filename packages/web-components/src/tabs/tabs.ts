import { attr, css, type ElementStyles } from '@microsoft/fast-element';
import type { Tab } from '../tab/tab.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { StartEnd } from '../patterns/index.js';
import { BaseTabs } from './tabs.base.js';
import { TabsAppearance, TabsOrientation, type TabsSize } from './tabs.options.js';

type TabData = Omit<DOMRect, 'top' | 'bottom' | 'left' | 'right' | 'toJSON'>;

/**
 * @deprecated - Use tablist instead
 *
 * @tag fluent-tabs
 */
export class Tabs extends BaseTabs {
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
   * styles
   * used in the class for storing the css variables required for animations
   */
  private styles: ElementStyles | undefined;

  /**
   * appearance
   * There are two modes of appearance: transparent and subtle.
   */
  @attr
  public appearance?: TabsAppearance = TabsAppearance.transparent;

  /**
   * disabled
   * Used for disabling all click and keyboard events for the tabs, child tab elements and tab panel elements. UI styling of content and tabs will appear as "grayed out."
   */
  @attr({ mode: 'boolean' })
  public disabled?: boolean;

  /**
   * size
   * defaults to medium.
   * Used to set the size of all the tab controls, which effects text size and margins. Three sizes: small, medium and large.
   */
  @attr
  public size?: TabsSize;

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
    if (this.orientation === TabsOrientation.horizontal) {
      return this.previousActiveTabData.x - (tab.getBoundingClientRect().x - this.getBoundingClientRect().x);
    } else return this.previousActiveTabData.y - (tab.getBoundingClientRect().y - this.getBoundingClientRect().y);
  }

  /**
   * getSelectedTabScale - gets the scale of the tab
   */
  private getTabScale(tab: Tab): number {
    if (this.orientation === TabsOrientation.horizontal) {
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
    this.setTabScaleCSSVar();
    this.setTabOffsetCSSVar();
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
    // animation start - this applyUpdeatedCSSValues sets the active indicator to the location of the previously selected tab
    this.applyUpdatedCSSValues(tab);
    // changing the previously active tab allows the applyUpdatedCSSValues method to calculate the correct end to the animation.
    this.previousActiveTabData = this.activeTabData;
    // calculate and apply updated css values for animation.
    this.applyUpdatedCSSValues(tab);
    // add the css class and active indicator will animate from the previous tab location to its tab location
    tab.setAttribute('data-animate', 'true');
  }

  /**
   * Gets the position data for a tab element relative to its parent
   * @param tab - The tab element to get position data for
   * @returns The position data for the tab
   */
  private getTabPositionData(tab: HTMLElement): TabData {
    const rect = tab.getBoundingClientRect();
    const parentRect = this.getBoundingClientRect();

    return {
      x: rect.x - parentRect.x,
      y: rect.y - parentRect.y,
      height: rect.height,
      width: rect.width,
    } as TabData;
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

      this.activeTabData = this.getTabPositionData(activeTab);

      if (
        this.previousActiveTabData?.x !== this.activeTabData?.x &&
        this.previousActiveTabData?.y !== this.activeTabData?.y
      ) {
        this.previousActiveTabData = this.activeTabData;
      }
    }
  }

  private setTabOffsetCSSVar() {
    this.styles = css/**css*/ `
      :host {
        --tabIndicatorOffset: ${this.activeTabOffset.toString()}px;
      }
    `;
    this.$fastController.addStyles(this.styles);
  }

  private setTabScaleCSSVar() {
    this.styles = css/**css*/ `
      :host {
        --tabIndicatorScale: ${this.activeTabScale.toString()};
      }
    `;
    this.$fastController.addStyles(this.styles);
  }
  public activeidChanged(oldValue: string, newValue: string) {
    if (oldValue && this.tabs) {
      const oldTab = this.tabs.find(tab => tab.id === oldValue);
      if (oldTab) {
        this.previousActiveTabData = this.getTabPositionData(oldTab);
      }
    }

    super.activeidChanged(oldValue, newValue);
    this.setTabData();

    if (this.activetab) {
      this.animationLoop(this.activetab as Tab);
    }
  }

  public tabsChanged(): void {
    super.tabsChanged();
    this.setTabData();

    if (this.activetab) {
      this.animationLoop(this.activetab as Tab);
    }
  }
}

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface Tabs extends StartEnd {}
applyMixins(Tabs, StartEnd);
