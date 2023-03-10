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
        this.syncTabPositions();
        this.setTabScaleCSS();
        this.setTabOffsetCSS();
        this.addCSSClasses();
      } else {
        // this.clearAnimationProperties();
      }

      this._previousActiveTab = this._activeTab;
      this.syncTabPositions();

      if (this._offsetX === 0 && this._scale === 1) {
        this.classList.add('animated');
        this.setTabScaleCSS();
        this.setTabOffsetCSS();
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
    this._offsetX = 0;
    this._scale = 1;
  }

  private addCSSClasses() {
    const orientation = this.parentElement?.getAttribute('orientation');
    if (orientation === 'horizontal') {
      this.classList.add('horizontal');
    } else {
      this.classList.add('vertical');
    }
  }

  private syncTabPositions() {
    const previousSelectedTabX = this._previousActiveTab.x;
    const selectedTabX = this.getSelectedTabPosition();
    const previousSelectedTabWidth = this._previousActiveTab.width;
    const selectedTabWidth = this.getSelectedTabWidth();

    this._offsetX = previousSelectedTabX - selectedTabX;
    this._scale = (previousSelectedTabWidth || 1) / (selectedTabWidth || 1);
  }

  private getSelectedTabPosition(): number {
    if (this.parentElement) {
      return this.getBoundingClientRect().x - this.parentElement.getBoundingClientRect()?.x;
    }
    return 0;
  }

  private getSelectedTabWidth(): number {
    if (this.id === this._activeTab.id) {
      return this.getBoundingClientRect().width;
    }
    return 0;
  }

  private setTabOffsetCSS(x?: number, y?: number) {
    const hasXandY = typeof x === 'number' && typeof y === 'number';
    document.documentElement.style.setProperty(
      TAB_TOKEN_NAMES.tabIndicatorOffset,
      `${hasXandY ? x - y : this._offsetX}px`,
    );
  }

  private setTabScaleCSS(newScale?: number) {
    document.documentElement.style.setProperty(TAB_TOKEN_NAMES.tabIndicatorScale, `${newScale || this._scale}`);
  }
}
