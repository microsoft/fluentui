
// import A11yElement from './A11yElement';
import BaseNavigationMode from './BaseNavigationMode';
import Focus from '../focus/Focus';
import Keyboard, { IKeyboardEvent } from '../keyboard/Keyboard';
import FocusTransition from '../focus/FocusTransition';

export default class IslandNavigation extends BaseNavigationMode {
  private _fallbackElement: HTMLElement | undefined;
  private _recallingFocus: boolean = false;

  public get name(): string {
    return 'Trap';
  }

  public get supportedSelectors(): string[] {
    return [];
  }

  protected _navigate(modeRoot: HTMLElement, event: IKeyboardEvent, currentElement: HTMLElement): HTMLElement | undefined {
    const focusables: HTMLElement[] = Focus.getFocusableDescendants(modeRoot);

    if (focusables.length > 0) {
      if (currentElement === focusables[0] && Keyboard.isShiftTab(event)) {
        return focusables[focusables.length - 1];
      } else if (currentElement === focusables[focusables.length - 1] && Keyboard.isTab(event)) {
        return focusables[0];
      }
    }

    // Otherwise use browser default
    return undefined;
  }

  protected _onInwardFocus(modeRoot: HTMLElement, focusTransition: FocusTransition): void {
    if (!this._recallingFocus) {
      this._fallbackElement = focusTransition.src;
    } else {
      this._recallingFocus = false;
    }
  }

  protected _onOutwardFocus(modeRoot: HTMLElement, focusTransition: FocusTransition): void {
    // this.manager.focusTo(focusTransition.src);
  }

  public exit(): void {

  }
}
