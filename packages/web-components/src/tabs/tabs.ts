import { attr, css, ElementStyles } from '@microsoft/fast-element';
import { FASTTabs, TabsOrientation } from '@microsoft/fast-foundation';
import { Tab } from '../index.js';
import { TabsAppearance, TabsSize } from './tabs.options.js';

export const TabTokenNames = {
  tabIndicatorOffset: '--tabIndicatorOffset',
  tabIndicatorScale: '--tabIndicatorScale',
} as const;

type TabData = Omit<DOMRect, 'top' | 'bottom' | 'left' | 'right' | 'toJSON'>;

/**
 * TabList extends FASTTabs and is used for constructing a fluent-tab-list custom html element.
 *
 * @class TabList component
 * @public
 */
export class Tabs extends FASTTabs {
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
   * clearAnimationProperties
   * resets animation values to defaults. removes the animated css class
   */
  private clearAnimationProperties(tab: Tab) {
    this.previousActiveTabData = { x: 0, y: 0, height: 0, width: 0 };
    this.activeTabOffset = 0;
    this.activeTabScale = 1;
    tab.classList.remove('animated');
  }

  /**
   * animationLoop
   * runs through all the operations required for setting the tab active indicator to its starting location, ending location, and applying the animated css class to the tab.
   * @param tab
   */
  private animationLoop(tab: Tab) {
    // If selected, set the animation properties.
    // get the offset for active indicator
    // the offset at the start of the animation will be at the location of the previously selected tab
    this.calculateAnimationProperties(tab);
    // set the active indicator offset and scale of the active indicator to css vars
    this.setTabScaleCSSVar();
    this.setTabOffsetCSSVar();

    // clear properties for next animation
    this.clearAnimationProperties(tab);
    this.previousActiveTabData = this.activeTabData;

    // add the animate css class if the calculated offset is 0 and scale is 1
    if (this.activeTabOffset === 0 && this.activeTabScale === 1) {
      this.calculateAnimationProperties(tab);
      tab.classList.add('animated');
      // update the css vars
      this.setTabScaleCSSVar();
      this.setTabOffsetCSSVar();
      // now when the css class is added the active indicator ::after element will animate
      // from the previous tab location to its starting location
    }
  }

  /**
   * setTabData
   * sets the data from the active tab onto the class. used for making all the animation calculations for the active tab indicator.
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

  private setTabOffsetCSSVar() {
    this.styles = css/**css*/ `
      :host {
        ${`${TabTokenNames.tabIndicatorOffset}: ${this.activeTabOffset.toString()}px`};
      }
    `;
    this.$fastController.addStyles(this.styles);
  }

  private setTabScaleCSSVar() {
    this.styles = css/**css*/ `
      :host {
        ${`${TabTokenNames.tabIndicatorScale}: ${this.activeTabScale.toString()}`};
      }
    `;
    this.$fastController.addStyles(this.styles);
  }

  public activeidChanged(oldValue: string, newValue: string) {
    super.activeidChanged(oldValue, newValue);
    this.setTabData();

    if (this.activetab) {
      this.animationLoop(this.activetab as Tab);
    }
  }

  public tabsChanged(): void {
    super.tabsChanged();
    this.setTabData();
  }
}
