import { attr } from '@microsoft/fast-element';
import { FASTTab } from '@microsoft/fast-foundation';
import { TabData } from '../index.js';

export const TAB_TOKEN_NAMES = {
  tabIndicatorOffset: '--tabIndicatorOffsetX',
  tabIndicatorScale: '--tabIndicatorScaleX',
};

export class Tab extends FASTTab {
  private _activeTab: TabData = { id: '', x: 0, y: 0, height: 0, width: 0 };
  private _previousActiveTab: TabData = { id: '', x: 0, y: 0, height: 0, width: 0 };
  private _offsetX = 0;
  private _scale = 1;

  @attr({ attribute: 'data-active-tab' })
  private dataActiveTab: string = '';
  private dataActiveTabChanged() {
    const dataActiveTab = this.dataset.activeTab;
    // is there an active tab in the data attribute?
    if (dataActiveTab) {
      // set the active tab on the class field

      this._activeTab = JSON.parse(dataActiveTab);
      // if there is not previous tab create a new one on the class field
      if (!this._previousActiveTab.id) {
        this._previousActiveTab = this._activeTab;
      }

      // if this tab is the active tab
      const isSelected = this.id === this._activeTab.id;
      this.setSelected(isSelected);
      if (isSelected) {
        this.syncAnimationProperties();
        this.setTabScaleCSSVar();
        this.setTabOffsetCSSVar();
      } else if (this.id === this._previousActiveTab.id) {
        this.clearAnimationProperties();
      }

      this._previousActiveTab = this._activeTab;
      this.syncAnimationProperties();

      if (this._offsetX === 0 && this._scale === 1) {
        this.classList.add('animated');
        this.setTabScaleCSSVar();
        this.setTabOffsetCSSVar();
      }
    }
  }

  private setSelected(isSelected: boolean) {
    if (isSelected) {
      this.dataset.selected = 'true';
    } else {
      this.dataset.selected = 'false';
    }
  }

  private clearAnimationProperties() {
    this._previousActiveTab = { id: '', x: 0, y: 0, height: 0, width: 0 };
    this._offsetX = 0;
    this._scale = 1;
    this.classList.remove('animated');
  }

  classListChanged() {
    console.log(this.classList);
  }
  private syncAnimationProperties() {
    const isHorizontal = this.classList.contains('horizontal');
    console.log(isHorizontal);
    const previousSelectedTabPosition = isHorizontal ? this._previousActiveTab.x : this._previousActiveTab.y;
    const selectedTabPosition = this.getSelectedTabPosition(isHorizontal);
    const previousSelectedTabSize = isHorizontal ? this._previousActiveTab.width : this._previousActiveTab.height;
    const selectedTabWidth = this.getSelectedTabSize(isHorizontal);

    this._offsetX = previousSelectedTabPosition - selectedTabPosition;
    this._scale = (previousSelectedTabSize || 1) / (selectedTabWidth || 1);
  }

  private getSelectedTabPosition(isHorizontal: boolean): number {
    if (this.parentElement) {
      if (isHorizontal) {
        return this.getBoundingClientRect().x - this.parentElement.getBoundingClientRect().x;
      } else return this.getBoundingClientRect().y - this.parentElement.getBoundingClientRect().y;
    }
    return 0;
  }

  private getSelectedTabSize(isHorizontal: boolean): number {
    if (this.id === this._activeTab.id) {
      if (isHorizontal) {
        return this.getBoundingClientRect().width;
      } else return this.getBoundingClientRect().y;
    }
    return 0;
  }

  private setTabOffsetCSSVar(x?: number, y?: number) {
    const hasXandY = typeof x === 'number' && typeof y === 'number';
    document.documentElement.style.setProperty(
      TAB_TOKEN_NAMES.tabIndicatorOffset,
      `${hasXandY ? x - y : this._offsetX}px`,
    );
  }

  private setTabScaleCSSVar(newScale?: number) {
    document.documentElement.style.setProperty(TAB_TOKEN_NAMES.tabIndicatorScale, `${newScale || this._scale}`);
  }
}
