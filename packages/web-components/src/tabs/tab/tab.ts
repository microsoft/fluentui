import { attr, observable } from '@microsoft/fast-element';
import { FASTTab } from '@microsoft/fast-foundation';
import { TabData } from '../index.js';

export const TAB_TOKEN_NAMES = {
  tabIndicatorOffset: '--tabIndicatorOffsetX',
  tabIndicatorScale: '--tabIndicatorScaleX',
};

export class Tab extends FASTTab {
  private _activeTab: TabData = { id: '', x: 0, y: 0, height: 0, width: 0 };
  private _selectedTabX: number = 0;
  private _selectedTabWidth: number = 0;
  private _previousSelectedTabWidth: number = 0;
  private _offsetX = 0;
  private _scale = 1;

  @observable private _previousSelectedTabX: number = 0;
  private _previousSelectedTabXChanged() {
    this.recalcTabPositionsIf(this._activeTab.id, this.id);
    console.log({ offset: this._offsetX, scale: this._scale });
  }

  private recalcTabPositionsIf(lastAnimatedFromID: string, previousAnimatedFromID: string) {
    if (lastAnimatedFromID !== previousAnimatedFromID) {
      this.syncTabPositions();
      this.setTabOffsetCSS(0, 0);
      this.setTabScaleCSS(1);
    }
  }

  @attr 'aria-selected': string | null = 'false';
  'aria-selectedChanged'(oldVal: string, newVal: string) {
    this.syncTabPositions();
    if (newVal === 'true') {
      this.dataset.selected = 'true';
      if (this._offsetX === 0 && this._scale === 1) {
        setTimeout(() => {
          this.setTabOffsetCSS();
          this.setTabScaleCSS();
        }, 300);
      }
    } else {
      this.dataset.selected = 'false';
    }
  }

  @attr({ attribute: 'data-active-tab' })
  private dataActiveTab: string = '';
  private dataActiveTabChanged() {
    if (this.dataset.activeTab) {
      this._activeTab = JSON.parse(this.dataset.activeTab);
    }
    this.syncTabPositions();
  }

  private syncTabPositions() {
    // get activeTabData first
    this._previousSelectedTabX = this.getPreviousSelectedTabPositionX();
    this._selectedTabX = this.getSelectedTabPosition();

    this._previousSelectedTabWidth = this.getPreviousTabWidth();
    this._selectedTabWidth = this.getSelectedTabWidth();

    this._offsetX = this._previousSelectedTabX - this._selectedTabX;
    this._scale = this._previousSelectedTabWidth / this._selectedTabWidth;
  }

  private getPreviousSelectedTabPositionX(): number {
    return this._activeTab.x;
  }

  private getPreviousTabWidth(): number {
    return this._activeTab.width;
  }

  private getSelectedTabPosition(): number {
    if (this['aria-selected'] === 'true' && this.parentElement) {
      return this.getBoundingClientRect().x - this.parentElement.getBoundingClientRect()?.x;
    }
    // if not selected return previous x
    return this.getPreviousSelectedTabPositionX();
  }

  private getSelectedTabWidth(): number {
    if (this['aria-selected'] === 'true') {
      return this.getBoundingClientRect().width;
    }
    // if not selected return previous width
    return this.getPreviousTabWidth();
  }

  private setTabOffsetCSS(x?: number, y?: number) {
    document.documentElement.style.setProperty(
      TAB_TOKEN_NAMES.tabIndicatorOffset,
      `${x && y ? x - y : this._offsetX}px`,
    );
  }

  private setTabScaleCSS(newScale?: number) {
    document.documentElement.style.setProperty(TAB_TOKEN_NAMES.tabIndicatorScale, `${newScale || this._scale}`);
  }
}
