import A11yElement from './A11yElement';
import BaseNavigationMode from './BaseNavigationMode';
import Keyboard, { IKeyboardEvent } from '../keyboard/Keyboard';
import FocusTransition from '../focus/FocusTransition';

export default class ArrowNavigation extends BaseNavigationMode {
  public get name(): string {
    return 'Arrow';
  }

  public get supportedSelectors(): string[] {
    return [];
  }

  protected _navigate(modeRoot: HTMLElement, event: IKeyboardEvent, currentElement: HTMLElement, params?: string[]): HTMLElement | undefined {
    const zone: A11yElement = this.manager.a11yElement(modeRoot);
    const current: A11yElement = this.manager.a11yElement(currentElement);
    let horizontal: boolean = !!params && params.map((p: string) => p.toLowerCase()).filter((p: string) => p === 'horizontal').length > 0;
    let vertical: boolean = !!params && params.map((p: string) => p.toLowerCase()).filter((p: string) => p === 'vertical').length > 0;

    if (!horizontal && !vertical) {
      // If none is specified, then support both by default
      horizontal = vertical = true;
    }

    if (Keyboard.isTab(event)) {
      return zone.focusTree.nextSibling.htmlElement;
    } else if (Keyboard.isShiftTab(event)) {
      return zone.focusTree.prevSibling.htmlElement;
    } else {
      switch (event.keyCode) {
        case 37: /* Left  */ return horizontal ? current.focusTree.scopeTo(modeRoot).prevSibling.htmlElement : undefined;
        case 39: /* Right */ return horizontal ? current.focusTree.scopeTo(modeRoot).nextSibling.htmlElement : undefined;
        case 38: /* Up    */ return vertical ? current.focusTree.scopeTo(modeRoot).prevSibling.htmlElement : undefined;
        case 40: /* Down  */ return vertical ? current.focusTree.scopeTo(modeRoot).nextSibling.htmlElement : undefined;
      }
    }

    return undefined;
  }

  protected _onInwardFocus(modeRoot: HTMLElement, focusTransition: FocusTransition): void {
    console.log(focusTransition);
    const lastFocused: HTMLElement | undefined = modeRoot.querySelector('.lastFocused') as HTMLElement || undefined;

    if (lastFocused) {
      this.manager.focusTo(lastFocused);
    }
  }

  protected _onOutwardFocus(modeRoot: HTMLElement, focusTransition: FocusTransition): void {
    // Clear the old ones
    const lastFocused: HTMLElement | undefined = modeRoot.querySelector('.lastFocused') as HTMLElement || undefined;
    if (lastFocused) {
      lastFocused.classList.remove('lastFocused');
    }

    // Mark the element losing focus
    if (focusTransition.src) {
      focusTransition.src.classList.add('lastFocused');
    }
  }
}
