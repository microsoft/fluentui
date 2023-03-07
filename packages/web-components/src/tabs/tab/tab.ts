import { observable, attr, booleanConverter } from '@microsoft/fast-element';
import { FASTTab } from '@microsoft/fast-foundation';

export const TAB_TOKEN_NAMES = {
  prevSelectedTabX: '--previousSelectedTabX',
  selectedTabX: '--selectedTabX',
  tabIndicatorOffset: '--tabIndicatorOffsetX',
  prevSelectedTabScaleX: '--previousSelectedTabScaleX',
  tabSelectedScaleX: '--selectedTabScaleX',
  tabIndicatorScale: '--tabIndicatorScaleX',
};

export class Tab extends FASTTab {
  private _selectedTabX: number = 0;
  private _previousSelectedTabX: number = 0;

  private _selectedTabScale: number = 1;
  private _previousSelectedTabScale: number = 1;

  constructor() {
    super();

    this.addEventListener('click', () => {
      this.handleClick();
    });
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.refreshTabPositions();
    this.setTabCssVars();
  }

  @attr ariaSelected: string | null = 'false';
  ariaSelectedChanged() {
    //   attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    //     super.attributeChangedCallback(name, oldValue, newValue);

    console.log(this.ariaSelected);
    if (this.ariaSelected) {
      //   this.dataset.selected = 'true';
    } else {
      this.dataset.selected = 'false';
    }
  }

  private refreshTabPositions() {
    this._selectedTabX = this.getSelectedTabPosition();
    this._previousSelectedTabX = this.getPreviousTabPositionX();
    this._previousSelectedTabScale = this.getPreviousPositionScaleX();
    this._selectedTabScale = this.getTabPositionScaleX();
  }

  private getSelectedTabPosition(): number {
    if (this.ariaSelected) {
      return this.getTabPositionX();
    }
    return 0;
  }

  private getTabPositionX(): number {
    return this.getBoundingClientRect().x;
  }

  private getPreviousTabPositionX() {
    return Number(
      document.documentElement.style.getPropertyValue(TAB_TOKEN_NAMES.prevSelectedTabX) || this.getTabPositionX(),
    );
  }

  private getTabPositionScaleX(): number {
    return this.getBoundingClientRect().height;
  }

  private getPreviousPositionScaleX(): number {
    return Number(document.documentElement.style.getPropertyValue(TAB_TOKEN_NAMES.prevSelectedTabScaleX));
  }

  private setSelectedTabXCSS() {
    document.documentElement.style.setProperty(TAB_TOKEN_NAMES.selectedTabX, this._selectedTabX.toString());
  }

  private setPrevSelectedTabXCSS() {
    document.documentElement.style.setProperty(TAB_TOKEN_NAMES.prevSelectedTabX, this._previousSelectedTabX.toString());
  }

  private setTabOffsetCSS() {
    document.documentElement.style.setProperty(
      TAB_TOKEN_NAMES.tabIndicatorOffset,
      `${this._previousSelectedTabX - this._selectedTabX}px`,
    );
  }

  private setTabCssVars() {
    // set positionX
    this.setSelectedTabXCSS();
    this.setPrevSelectedTabXCSS();
    this.setTabOffsetCSS();

    document.documentElement.style.setProperty(TAB_TOKEN_NAMES.tabIndicatorScale, '1');
  }

  protected handleClick() {
    if (this.ariaSelected) {
      this.parentElement?.querySelectorAll('fluent-tab').forEach(el => {
        const element: unknown = el;
        const htmlEl = element as HTMLElement;
        htmlEl.dataset.selected = 'false';
      });

      setTimeout(() => {
        this.dataset.selected = 'true';
      }, 1000);
      this.refreshTabPositions();
      this.setTabCssVars();

      //   console.log(
      //     '--tabIndicatorOffsetX',
      //     this._previousSelectedTabX - this._selectedTabX,
      //     document.documentElement.style.getPropertyValue(TAB_TOKEN_NAMES.tabIndicatorOffset),
      //   );
      //   console.log(
      //     TAB_TOKEN_NAMES.tabIndicatorScale,
      //     this._previousSelectedTabScale - this._selectedTabScale,
      //     document.documentElement.style.getPropertyValue(TAB_TOKEN_NAMES.tabIndicatorScale),
      //   );
    }
  }
}
