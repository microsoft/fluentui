import { attr } from '@microsoft/fast-element';
import type { Tab } from '../tab/tab.js';
import { BaseTablist } from './tablist.base.js';
import { TablistAppearance, TablistOrientation, TablistSize } from './tablist.options.js';

type TabData = Omit<DOMRect, 'top' | 'bottom' | 'left' | 'right' | 'toJSON'>;

/**
 * A BaseTablist component with extra logic for handling the styled active tab indicator.
 *
 * @tag fluent-tablist
 *
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
   * size
   * defaults to medium.
   * Used to set the size of all the tab controls, which effects text size and margins. Three sizes: small, medium and large.
   */
  @attr
  public size?: TablistSize;

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
