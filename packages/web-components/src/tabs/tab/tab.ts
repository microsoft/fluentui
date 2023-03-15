import { attr } from '@microsoft/fast-element';
import { FASTTab } from '@microsoft/fast-foundation';
import { TabData } from '../index.js';

export const TAB_TOKEN_NAMES = {
  tabIndicatorOffset: '--tabIndicatorOffsetX',
  tabIndicatorScale: '--tabIndicatorScaleX',
};

/**
 * Tab extends the FASTTab and is a child of the TabList
 */
export class Tab extends FASTTab {
  private _isHorizontal: boolean = false;
  @attr private _activeTab: TabData = { id: '', x: 0, y: 0, height: 0, width: 0 };
  private _previousActiveTab: TabData = { id: '', x: 0, y: 0, height: 0, width: 0 };
  private _parentX = 0;
  private _parentY = 0;
  private offset = 0;
  private scale = 1;

  public set isHorizontal(isHorizontal: boolean) {
    this._isHorizontal = isHorizontal;
  }

  public set activeTab(newActiveTab: TabData) {
    this._activeTab = newActiveTab;
  }

  public set previousActiveTab(newActiveTab: TabData) {
    this._previousActiveTab = newActiveTab;
  }

  public set parentX(newParentX: number) {
    this._parentX = newParentX;
  }

  public set parentY(newParentY: number) {
    this._parentY = newParentY;
  }

  /**
   * activeTabChanged
   *
   * syncs the values of the activeTab to the local class
   * calculates the active indicator position
   * and runs the animation loop
   */
  private _activeTabChanged() {
    // const dataActiveTab = this.dataset.activeTab;
    // if (dataActiveTab) {
    if (this._activeTab) {
      // if there is not previous tab create a new one on the class field
      if (!this._previousActiveTab?.id) {
        this._previousActiveTab = this._activeTab;
      }
      this.animationLoop();
    }
  }

  /**
   * animationLoop
   *
   * adds the css animation class and updates CSS variables to control the
   * active indicator css ::after pseudo element
   */
  private animationLoop() {
    // If selected, set the animation properties.
    if (this.ariaSelected === 'true') {
      // get the offset for active indicator
      // the offset at the start of the animation will be at the location of the previously selected tab
      this.syncAnimationProperties();
      // set the active indicator offset and scale of the active indicator to css vars
      this.setTabScaleCSSVar();
      this.setTabOffsetCSSVar();
    } else if (this.id === this._previousActiveTab.id) {
      // If the id of this tab is equal to the previousActive tab, reset to the animation defaults.
      // Now, the animation will still run if the same two previous tabs are clicked one after the other
      this.clearAnimationProperties();
    }

    this._previousActiveTab = this._activeTab;
    this.syncAnimationProperties();

    // add the animate css class if the calculated offset is 0 and scale is 1
    if (this.offset === 0 && this.scale === 1) {
      this.classList.add('animated');
      // update the css vars
      this.setTabScaleCSSVar();
      this.setTabOffsetCSSVar();
      // now when the css class is added the active indicator ::after element will animate
      // from the previous tab location to its starting location
    }
  }

  /**
   * clearAnimationProperties
   *
   * resets animation values to defaults. removes the animated css class
   */
  private clearAnimationProperties() {
    this._previousActiveTab = { id: '', x: 0, y: 0, height: 0, width: 0 };
    this.offset = 0;
    this.scale = 1;
    this.classList.remove('animated');
  }

  /**
   * syncAnimationProperties
   *
   * Recalculates the local offset and scale.
   * These values will be applied to css variables that control the tab active indicator position animations
   */
  private syncAnimationProperties() {
    const previousSelectedTabPosition = this._isHorizontal ? this._previousActiveTab.x : this._previousActiveTab.y;
    const selectedTabPosition = this.getSelectedTabPosition(this._isHorizontal);
    const previousSelectedTabScale = this._isHorizontal
      ? this._previousActiveTab.width
      : this._previousActiveTab.height;
    const selectedTabScale = this.getSelectedTabScale(this._isHorizontal);

    this.offset = previousSelectedTabPosition - selectedTabPosition;
    this.scale = (previousSelectedTabScale || 1) / (selectedTabScale || 1);
  }

  private getSelectedTabPosition(isHorizontal: boolean): number {
    if (isHorizontal) {
      return this.getBoundingClientRect().x - this._parentX;
    } else return this.getBoundingClientRect().y - this._parentY;
    return 0;
  }

  private getSelectedTabScale(isHorizontal: boolean): number {
    if (this.id === this._activeTab.id) {
      if (isHorizontal) {
        return this.getBoundingClientRect().width;
      } else return this.getBoundingClientRect().height;
    }
    return 1;
  }

  private setTabOffsetCSSVar() {
    document.documentElement.style.setProperty(TAB_TOKEN_NAMES.tabIndicatorOffset, `${this.offset}px`);
  }

  private setTabScaleCSSVar(newScale?: number) {
    document.documentElement.style.setProperty(TAB_TOKEN_NAMES.tabIndicatorScale, `${newScale || this.scale}`);
  }
}
