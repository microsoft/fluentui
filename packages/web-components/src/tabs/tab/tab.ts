import { attr } from '@microsoft/fast-element';
import { FASTTab } from '@microsoft/fast-foundation';
import { TabData } from '../index.js';

export const TAB_TOKEN_NAMES = {
  tabIndicatorOffset: '--tabIndicatorOffsetX',
  tabIndicatorScale: '--tabIndicatorScaleX',
};

export class Tab extends FASTTab {
  private _previousActiveTab: TabData = { id: '', x: 0, y: 0, height: 0, width: 0 };
  private _selectedTabX: number = 0;
  private _selectedTabWidth: number = 0;
  private _previousSelectedTabWidth: number = 0;
  private _previousSelectedTabX: number = 0;
  private _offsetX = 0;
  private _scale = 1;

  @attr 'aria-selected': string | null = 'false';
  'aria-selectedChanged'(oldVal: string, newVal: string) {
    if (newVal === 'true') {
      this.dataset.selected = 'true';
    } else {
      this.dataset.selected = 'false';
    }
  }

  @attr({ attribute: 'data-active-tab' })
  private dataActiveTab: string = '';

  // every time the data-active-tab attribute changes...
  private dataActiveTabChanged() {
    const dataActiveTab = this.dataset.activeTab;
    // is there an active tab in the data attribute?
    if (dataActiveTab) {
      // set the active tab on the class field
      const dataActiveTabObj: TabData = JSON.parse(dataActiveTab);
      // if there is not previous tab create a new one on the class field
      if (!this._previousActiveTab.id) {
        this._previousActiveTab = dataActiveTabObj;
      }

      // calc the tab positions and set the class fields above
      this.syncTabPositions();

      // if this tab is the active tab
      if (this.id === dataActiveTabObj.id) {
        console.log(
          'previous selected:',
          this._previousActiveTab.id,
          this._previousSelectedTabX,
          'currently selected:',
          this.id,
          this._selectedTabX,
        );

        // uncomment to see broken animations
        // this.setTabScaleCSS();
        // this.setTabOffsetCSS();

        if (this._offsetX === 0 && this._scale === 1) {
          this.setTabScaleCSS();
          this.setTabOffsetCSS();
        }
      } else {
        this.clearAnimationProperties();
      }
      this._previousActiveTab = JSON.parse(dataActiveTab);
    }
  }

  private clearAnimationProperties() {
    this._offsetX = 0;
    this._scale = 1;
  }

  private syncTabPositions(prevActiveTab?: TabData) {
    this._previousSelectedTabX = this.getPreviousSelectedTabPositionX();
    this._selectedTabX = this.getSelectedTabPosition();
    this._previousSelectedTabWidth = this.getPreviousTabWidth();
    this._selectedTabWidth = this.getSelectedTabWidth();

    this._offsetX = this._previousSelectedTabX - this._selectedTabX;
    this._scale = this._previousSelectedTabWidth / this._selectedTabWidth;
  }

  private getPreviousSelectedTabPositionX(): number {
    return this._previousActiveTab.x;
  }

  private getPreviousTabWidth(): number {
    return this._previousActiveTab.width;
  }

  private getSelectedTabPosition(): number {
    if (this['aria-selected'] === 'true' && this.parentElement) {
      return this.getBoundingClientRect().x - this.parentElement.getBoundingClientRect()?.x;
    }
    return this.getPreviousSelectedTabPositionX();
  }

  private getSelectedTabWidth(): number {
    if (this['aria-selected'] === 'true') {
      return this.getBoundingClientRect().width;
    }
    return this.getPreviousTabWidth();
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
