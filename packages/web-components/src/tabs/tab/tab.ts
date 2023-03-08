import { attr } from '@microsoft/fast-element';
import { FASTTab } from '@microsoft/fast-foundation';

export const TAB_TOKEN_NAMES = {
  prevSelectedTabX: '--previousSelectedTabX',
  selectedTabX: '--selectedTabX',
  prevSelectedTabWidth: '--previousSelectedTabWidth',
  tabSelectedWidth: '--selectedTabWidth',

  tabIndicatorOffset: '--tabIndicatorOffsetX',
  tabIndicatorScale: '--tabIndicatorScaleX',
};

export class Tab extends FASTTab {
  private _selectedTabX: number = 0;
  private _previousSelectedTabX: number = 0;
  private _selectedTabWidth: number = 0;
  private _previousSelectedTabWidth: number = 0;

  connectedCallback(): void {
    super.connectedCallback();

    // on load get the currently tab values and load them into the class
    this.syncTabPositions();
    // this.setPrevSelectedTabWidthCSS();
    // this.setTabScaleCSS();
    this.setTabOffsetCSS();

    // when does the new x value need to be loaded?
    // anytime a new tab is selected all other tabs need to re-render their indicators (even if translucent)
  }

  @attr 'aria-selected': string | null = 'false';
  'aria-selectedChanged'(oldVal: string, newVal: string) {
    // if selected
    if (newVal === 'true') {
      // get the position of the previous active indicator
      this.syncTabPositions();
      // set the position of the active indicator to the location of the prev active indicator
      this.setTabScaleCSS();
      // render active indicator on the location of the previous active indicator
      this.setSelectedTabCSS();
      this.setTabOffsetCSS();

      this.dataset.selected = 'true';

      // animate the active indicator to it's base location
      setTimeout(() => {
        this.setTabOffsetCSS(0, 0);
        this.setPrevSelectedTabCSS();
        this.setPrevSelectedTabWidthCSS();
      }, 20);
    } else {
      // instantly remove the previous active indicator
      this.dataset.selected = 'false';
    }
  }

  private syncTabPositions() {
    this._previousSelectedTabX = this.getPreviousTabPositionX();
    this._selectedTabX = this.getSelectedTabPosition();

    this._previousSelectedTabWidth = this.getPreviousTabWidth();
    this._selectedTabWidth = this.getSelectedTabWidth();
  }

  private getPreviousTabPositionX(): number {
    const prevPosition = Number(document.documentElement.style.getPropertyValue(TAB_TOKEN_NAMES.prevSelectedTabX));
    return prevPosition || this.getSelectedTabPosition();
  }

  private getSelectedTabPosition(): number {
    if (this['aria-selected'] === 'true') {
      return this.getBoundingClientRect().x;
    }
    return 0;
  }

  private getPreviousTabWidth(): number {
    return (
      Number(document.documentElement.style.getPropertyValue(TAB_TOKEN_NAMES.prevSelectedTabWidth)) ||
      this.getSelectedTabWidth()
    );
  }

  private getSelectedTabWidth(): number {
    if (this['aria-selected'] === 'true') {
      return this.getBoundingClientRect().width;
    }
    return this.getPreviousTabWidth();
  }

  /**
   * setSelectedTabCSS
   *
   * sets the css variable for the currently selected tab if this tab is selected
   */
  private setSelectedTabCSS() {
    document.documentElement.style.setProperty(TAB_TOKEN_NAMES.selectedTabX, this._selectedTabX.toString());
  }

  /**
   * setPrevSelectedTabCSS
   *
   * sets the css variable for the previously selected tab as the currently selected tab. should only be called if the current tab (this tab) is active/selected and after animations have completed
   */
  private setPrevSelectedTabCSS() {
    document.documentElement.style.setProperty(TAB_TOKEN_NAMES.prevSelectedTabX, this._selectedTabX.toString());
  }

  private setPrevSelectedTabWidthCSS() {
    document.documentElement.style.setProperty(TAB_TOKEN_NAMES.prevSelectedTabWidth, this._selectedTabWidth.toString());
  }

  private setTabOffsetCSS(x: number = this._previousSelectedTabX, y: number = this._selectedTabX) {
    document.documentElement.style.setProperty(TAB_TOKEN_NAMES.tabIndicatorOffset, `${x - y}px`);
  }

  private setTabScaleCSS() {
    console.log(this._previousSelectedTabWidth, this._selectedTabWidth);
    document.documentElement.style.setProperty(
      TAB_TOKEN_NAMES.tabIndicatorScale,
      `${this._previousSelectedTabWidth / this._selectedTabWidth}`,
    );
  }
}
