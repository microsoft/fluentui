import A11yManager from './A11yManager';
import { IKeyboardEvent } from '../keyboard/Keyboard';

abstract class BaseNavigationMode {
  private _manager: A11yManager;

  constructor (manager: A11yManager) {
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
  public navigate(event: IKeyboardEvent, modeRoot: HTMLElement, currentElement?: HTMLElement): HTMLElement | undefined {
    currentElement = currentElement || document.activeElement as HTMLElement;
    return this._navigate(event, modeRoot ? modeRoot : this.manager.root, currentElement);
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
  public select(selector: string, element: HTMLElement): HTMLElement | undefined {
    if (!this.supports(selector)) {
      throw new Error(`Selector '${selector}' is not supported by navigation mode '${this.name}'`);
    }

    return this._select(selector, element);
  }

  public supports(selector: string): boolean {
    return this.supportedSelectors.indexOf(selector) >= 0;
  }

  protected abstract _navigate(event: IKeyboardEvent, modeRoot: HTMLElement, currentElement: HTMLElement): HTMLElement | undefined;

  protected abstract _select(selector: string, element: HTMLElement): HTMLElement | undefined;

  protected get supportedSelectors(): string[] {
    return [];
  }
}

export default BaseNavigationMode;
