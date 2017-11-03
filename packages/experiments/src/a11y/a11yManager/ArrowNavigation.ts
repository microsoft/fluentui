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

  protected _navigate(modeRoot: HTMLElement, event: IKeyboardEvent, currentElement: HTMLElement): HTMLElement | undefined {
    const zone: A11yElement = this.manager.a11yElement(modeRoot);
    const current: A11yElement = this.manager.a11yElement(currentElement);

    if (Keyboard.isTab(event)) {
      return zone.focusTree.nextSibling.htmlElement;
    } else if (Keyboard.isShiftTab(event)) {
      return zone.focusTree.prevSibling.htmlElement;
    } else {
      switch (event.keyCode) {
        case 37: /* Left  */ return current.focusTree.scopeTo(modeRoot).prevSibling.htmlElement;
        case 39: /* Right */ return current.focusTree.scopeTo(modeRoot).nextSibling.htmlElement;
        case 38: /* Up    */ return current.focusTree.scopeTo(modeRoot).nextSibling.htmlElement;
        case 40: /* Down  */ return current.focusTree.scopeTo(modeRoot).prevSibling.htmlElement;
      }
    }

    return undefined;
  }

  protected _onInwardFocus(modeRoot: HTMLElement, focusTransition: FocusTransition): void {
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
