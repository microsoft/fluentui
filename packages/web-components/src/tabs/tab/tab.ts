import { attr } from '@microsoft/fast-element';
import { FASTTab } from '@microsoft/fast-foundation';
import { TabData } from '../index.js';

export const TAB_TOKEN_NAMES = {
  tabIndicatorOffset: '--tabIndicatorOffsetX',
  tabIndicatorScale: '--tabIndicatorScaleX',
};

export class Tab extends FASTTab {
  private _tabsData: TabData[] = [];
  private _selectedTabX: number = 0;
  private _previousSelectedTabX: number = 0;
  private _selectedTabWidth: number = 0;
  private _previousSelectedTabWidth: number = 0;

  connectedCallback(): void {
    super.connectedCallback();

    // on load get the currently tab values and load them into the class
    // TODO: is this doing anything?
    this._tabsData = this.getTabsData() || [];
    // this.syncTabPositions();
  }

  @attr 'aria-selected': string | null = 'false';
  'aria-selectedChanged'(oldVal: string, newVal: string) {
    this._tabsData = this.getTabsData() || [];
    // if selected
    // console.log(this._tabsData);
    if (newVal === 'true') {
      // get the position of the previous active indicator
      // set the position of the active indicator to the location of the prev active indicator
      // render active indicator on the location of the previous active indicator
      this.syncTabPositions();
      // this.setTabOffsetCSS();
      this.setTabScaleCSS();

      this.dataset.selected = 'true';

      // animate the active indicator to it's base location
      // setTimeout(() => {
      this.setTabOffsetCSS(0, 0);
      // }, 20);
    } else {
      // instantly remove the previous active indicator
      this.dataset.selected = 'false';
    }
  }

  private syncTabPositions() {
    this._previousSelectedTabX = this.getPreviousSelectedTabPositionX();
    this._selectedTabX = this.getSelectedTabPosition();

    this._previousSelectedTabWidth = this.getPreviousTabWidth();
    this._selectedTabWidth = this.getSelectedTabWidth();
  }

  private getTabsData(): TabData[] {
    const tabData = this.parentElement?.dataset.tabs;
    if (tabData) {
      return JSON.parse(tabData) as TabData[];
    }
    return [];
  }

  private getPreviousSelectedTabPositionX(): number {
    const tabsData = this.getTabsData();
    console.log(tabsData[0]);
    const prevSelectedID = tabsData[0]?.prevSelected || undefined;
    return tabsData?.filter(tdata => tdata.id === prevSelectedID)[0]?.x || 0;
  }

  private getSelectedTabPosition(): number {
    const tabsData = this.getTabsData();
    return tabsData?.filter(tdata => tdata.id === this.id && tdata.selected)[0]?.x || 0;
  }

  private getPreviousTabWidth(): number {
    const tabsData = this.getTabsData();
    return tabsData?.filter(tdata => tdata.selected)[0]?.width || 0;
  }

  private getSelectedTabWidth(): number {
    const tabsData = this.getTabsData();
    return tabsData?.filter(tdata => tdata.id === this.id && tdata.selected)[0]?.width || 0;
  }

  private setTabOffsetCSS(x: number = this._previousSelectedTabX, y: number = this._selectedTabX) {
    document.documentElement.style.setProperty(TAB_TOKEN_NAMES.tabIndicatorOffset, `${x - y}px`);
  }

  private setTabScaleCSS() {
    // console.log(this._previousSelectedTabWidth, this._selectedTabWidth);
    document.documentElement.style.setProperty(
      TAB_TOKEN_NAMES.tabIndicatorScale,
      `${this._previousSelectedTabWidth / this._selectedTabWidth}`,
    );
  }
}
