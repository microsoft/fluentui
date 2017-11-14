import A11yManager from './A11yManager';
import { IKeyboardEvent } from '../keyboard/Keyboard';
import FocusTransition from '../focus/FocusTransition';

abstract class BaseNavigationMode {
  private _manager: A11yManager;

  constructor(manager: A11yManager) {
    this._manager = manager;
  }

  public get manager(): A11yManager {
    return this._manager;
  }

  /**
   * The name for navigation mode. The name is used in the declarative language for specifying the mode.
   *
   * Example:
   *
   * If the name is HierarchicalNavigation, then it can be used like this:
   * <div data-prefix-mode-hierarchicalnavigation>...</div>
   *
   * Note that HTML attributes are case insensitive.
   */
  public abstract get name(): string;

  /**
   * Navigates a keyboard event inside the managed DOM tree from the currently focused element.
   *
   * @returns the element that the focus should go to based on the given keyboard event and the current element
   *
   * @param event - the keyboard event to navigate
   * @param currentElement - the currently focused element. Can be used for testing. Defaults to document.activeElement
   */
  public navigate(modeRoot: HTMLElement, event: IKeyboardEvent, currentElement?: HTMLElement, params?: string[]): HTMLElement | undefined {
    currentElement = currentElement || document.activeElement as HTMLElement;
    return this._navigate(modeRoot ? modeRoot : this.manager.root, event, currentElement, params);
  }

  /**
   * Finds an element by Navigation Selector. Navigation Selectors are string keys that navigation modes can define to
   * be declaratively used inside their managed DOM trees. A selector finds a target element based on a source element
   * and is used in multiple types of A11yAttribute.
   *
   * Example: In Hierarchial Navigation 'next' selector refers to the next focusable sibling. We can use it in a
   * NavigateOnKey attribute like this:
   *
   * <div tabindex='0' id='div1' data-prefix-navigateonkey-39='$next'>
   *  <div tabindex='0' id='div1child1'></div>
   * </div>
   * <div tabindex='0' id='div2'></div>
   *
   * In this example, pressing right arrow (keyCode=39) on #div1 will take the focus to #div2 (and not #div1child1).
   * This behavior is defined in the `select` method of HierarchicalNavigation class.
   *
   * @param selector - the selector string e.g. 'prev', 'next'
   * @param element - the source element i.e. the marked up element
   */
  public select(modeRoot: HTMLElement, selector: string, element: HTMLElement): HTMLElement | undefined {
    if (!this.supports(selector)) {
      throw new Error(`Selector '${selector}' is not supported by navigation mode '${this.name}'`);
    }

    return this._select(modeRoot, selector, element);
  }

  public supports(selector: string): boolean {
    return this.supportedSelectors.indexOf(selector) >= 0;
  }

  public onInwardFocus(modeRoot: HTMLElement, focusTransition: FocusTransition): void {
    this._onInwardFocus(modeRoot, focusTransition);
  }

  public onOutwardFocus(modeRoot: HTMLElement, focusTransition: FocusTransition): void {
    this._onOutwardFocus(modeRoot, focusTransition);
  }

  protected abstract _navigate(modeRoot: HTMLElement, event: IKeyboardEvent, currentElement: HTMLElement, params?: string[]): HTMLElement | undefined;

  protected _select(modeRoot: HTMLElement, selector: string, currentElement: HTMLElement): HTMLElement | undefined {
    return undefined;
  };

  protected _onInwardFocus(modeRoot: HTMLElement, focusTransition: FocusTransition): void {
    // Do nothing
  }

  protected _onOutwardFocus(modeRoot: HTMLElement, focusTransition: FocusTransition): void {
    // Do nothing
  }

  protected get supportedSelectors(): string[] {
    return [];
  }
}

export default BaseNavigationMode;
