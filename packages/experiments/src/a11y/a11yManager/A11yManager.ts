import A11yAttribute, { A11yAttributeType } from './A11yAttribute';
import A11yElement from './A11yElement';
import BaseNavigationMode from './BaseNavigationMode';
import DomTraversal from '../dom/DomTraversal';
import Focus from '../focus/Focus';
import FocusTransition from '../focus/FocusTransition';
import HierarchicalNavigation from './HierarchicalNavigation';
import Keyboard, { IKeyboardEvent } from '../keyboard/Keyboard';
import ScreenReader from '../screenReader/ScreenReader';

interface IFocusListener {
  id: number;
  element: HTMLElement;
  direction: string;
  handler: (ft: FocusTransition) => void;
}

/**
 * @public
 */
export interface IA11yManagerConfig {
  prefix?: string;
  debug?: boolean;
  useHierarchicalNavigation?: boolean;
}

/**
 * Accessibility Manager class that can attach to a DOM Element and listens to keydown and focus events to managed
 * a11y related events and provides utilities to handle keyboard navigation and screen reader easily and reliably.
 *
 * Features:
 * - Hierarchical Naigation: Instead of depth-first tab order that is browsers default behavior, tab and shift tab
 *  will only navigate through focusable siblings. Pressing Enter takes the focus to the first focusable child
 *  and pressing Escape takes the focus to focusable parent. This is very useful when the HTML structure of the app
 *  represents a logical layout and order of the elements which is easily achievable using HTML5. This feature can
 *  be enabled for the whole managed tree using the configuration parameter useHierarchicalNavigation. If it is not
 *  enabled by configuration, it can be enabled using A11yAttribute of type NavigateByHierarchy.
 *  For more details refer to A11yAttributeType.NavigateByHierarchy
 *
 * - A11y Attributes: Specific data attributes can be added to the html mark up inside the managed tree to
 *  define some a11y-related behavior declaratively. These includes both keyboard navigation and screen reader
 *  utilities. For more details refer to A11yAttribute.
 *
 * - Focus Transition: There is no concept of focus transition in native JavaScript and it's difficult to track
 *  focus inside an application because any element on the page can claim focus by calling .focus() method.
 *  This sometimes leads to a chaotic state that makes focus management extremely difficult, makes the code
 *  fragile and makes debugging the code very cumbersome. By centralizing focus management and observing all
 *  focus transitions inside the managed tree, it is very easy to trace everything. A11yManager provides
 *  a number of focus management utilities to faciliate this. Developers should be restrained from using direct
 *  calls to the native .focus() and use the A11yManager for handling all focus transitions to get the full
 *  benefit of A11yManager.
 *
 * - Screen reader: Despite a lot of recent efforts, screen readers are not very standarized yet and there are
 *  no reliable APIs that guarantees how they will read and interact with your app. Aria tags are useful but not
 *  comperehensive and different screen readers interpret them in different ways. A11yManagers provides a few ways
 *  to alert the screen reader directly or hooking screen reader alerts to specific focus transitions.
 *
 * - Debug Mode: Because A11yManager has a good view of all focus transitions inside its managed tree, it can also
 *  provide insights on how the focus is transitioning or when the screen reader is being alerted. Using the debug
 *  mode through configuration can make the debugging in the console a lot easier.
 *
 * @public
 */
export default class A11yManager {
  /**
   * Focus detection delay is the time that we wait after a focusout event to see a focusin event and pair them
   * as a focus transition. If the timer expires, the destination is considered to be an external element.
   * The value is experminental and should be tested across browsers. Initially it's tested using the demo of
   * sp-a11y project on supported browsers.
   *
   * @internalremarks If there is any need to change this value or make it environment-dependent, document the reason
   * and testing methodology.
   */
  private static readonly _focusDetectionDelay: number = 50; // tslint:disable-line:no-inferrable-types
  private static _focusListenerIdCounter: number = 0;  // tslint:disable-line:no-inferrable-types
  private static _instances: Map<string, A11yManager> = new Map<string, A11yManager>();

  private _activeElement: HTMLElement;
  private _id: string;
  private _config: IA11yManagerConfig;
  private _lastActiveElement: HTMLElement;
  private _lastFocusInEvent: FocusEvent | undefined;
  private _lastFocusInEventTime: number;
  private _lastFocusOutEvent: FocusEvent | undefined;
  private _lastFocusOutEventTime: number;
  private _focusDetectionTimer: number;
  private _rootElement: HTMLElement;
  private _savedFocusMap: Map<string, HTMLElement>;
  private _focusListeners: Map<number, IFocusListener>;
  private _navigationModes: Map<string, BaseNavigationMode>;

  /**
   * Creates a new instance with the given element as its root element.
   * The given DOM element should not be managed by an existing A11yManager on the page.
   *
   * @param domElement - The DOM element to find or create an A11yManager for
   * @param config - The configuration of the new instance of A11yManager. Has no effect if an existing
   *  instance of A11yManager is returned.
   */
  public static create(domElement: HTMLElement, config?: IA11yManagerConfig): A11yManager {
    if (A11yManager._findInstanceForElement(domElement)) {
      // VSO #372695: Localize sp-a11y errors
      console.warn('Creating an A11yManager on an element already managed by a parent A11yManager is not supported' +
        ' and may result in unexpected behavior. Inseatd you should use getInsanceById to get the existing manager.');
    }

    const instance: A11yManager = new A11yManager(domElement, config);
    this._instances.set(instance.id, instance);

    return instance;
  }

  /**
   * Gets the A11yManager by the id passed in the configuration
   */
  public static getInstanceById(id: string): A11yManager | undefined {
    return this._instances.get(id);
  }

  /**
   * Checks if a given element is managed by any A11yManager instance on the page
   */
  public static isElementManaged(domElement: HTMLElement): boolean {
    return !!this._findInstanceForElement(domElement);
  }

  /**
   * Gets the A11yManager for the given DOM element. Returns undefined if the element is not managed.
   */
  private static _findInstanceForElement(domElement: HTMLElement): A11yManager | undefined {
    if (!domElement) {
      return undefined;
    }

    A11yManager._instances.forEach((manager: A11yManager) => {
      if (manager.manages(domElement)) {
        return manager;
      }
    });

    return undefined;
  }

  private get _skipEventFlag(): string {
    return this.prefix + 'skip-event';
  }

  /**
   * A11yManager instance unique id
   */
  public get id(): string {
    return this._id;
  }

  /**
   * The root element of the managed tree
   */
  public get root(): HTMLElement {
    return this._rootElement;
  }

  /**
   * The configuration of the manager
   */
  public get config(): IA11yManagerConfig {
    return this._config;
  }

  /**
   * The prefix used by all data attributes managed by this manager
   */
  public get prefix(): string {
    const prefixToken: string = this.config.prefix && typeof this.config.prefix === 'string' ? this.config.prefix : 'a11y';
    return `data-${prefixToken}-`;
  }

  public a11yElement(htmlElement: HTMLElement): A11yElement {
    return new A11yElement(htmlElement, this);
  }

  /**
   * Set an event handler for when the focus goes inside and/or outside of the given element.
   * The event is fired only if the focus is entering the element (going from outside of the element to inside)
   * or in the opposite direction. If the focus stays within the element or outside it, the event is not fired.
   *
   * @param element - The element to attach the listener to
   * @param direction - The direction of the focus transition
   * @param handler - The event handler
   */
  public addFocusListener(
    element: HTMLElement,
    direction: 'inward' | 'outward',
    handler: (focusTransition: FocusTransition) => void
  ): number {
    const listener: IFocusListener = {
      element,
      direction,
      handler,
      id: A11yManager._focusListenerIdCounter++
    };
    this._focusListeners.set(listener.id, listener);
    return listener.id;
  }

  /**
   * Removes the event handler added using addFocusListener
   *
   * @param element - The element to remove the listener from
   * @param direction - The direction of the listener to be removed
   */
  public removeFocusListener(id: number): void {
    if (this._focusListeners.has(id)) {
      this._focusListeners.delete(id);
    }
  }

  /**
   * Creates an A11yAttribute usable by elements managed by this instance of A11yManager
   */
  public createA11yAttribute(type: A11yAttributeType, params?: string[], value?: string): A11yAttribute {
    return new A11yAttribute(this.prefix, type, params, value);
  }

  /**
   * Sets the given attributes on the given DOM element
   */
  public setA11yAttributesOnElement(attributes: A11yAttribute[], element: HTMLElement): void {
    for (const attr of attributes) {
      attr.setOnElement(element);
    }
  }

  /**
   * Alerts the screen reader with the given message
   */
  public alert(msg: string): void {
    ScreenReader.alert(this._id, msg, false);
    if (this.config.debug) {
      console.log(`${this._id} A11y Log: Alerted '${msg}'`);
    }
  }

  /**
   * Sets the focus on the first focusable child of the given element
   *
   * @returns true if there was an eligible element to set focus to
   */
  public focusInside(element: HTMLElement): boolean {
    return Focus.focusInside(element);
  }

  /**
   * Sets the focus on the element if it's focusable, otherwise on the first focusable child of the given element
   *
   * @returns true if there was an eligible element to set focus to
   */
  public focusTo(element: HTMLElement): boolean {
    const done: boolean = Focus.focusTo(element);
    return done;
  }

  /**
   * Sets the focus to or inside the element specified by its a11y id attribute value.
   *
   * @returns true if there was an eligible element to set focus to
   */
  public focusById(id: string): boolean {
    const nextElement: HTMLElement | undefined = this.getElementByA11yId(id);
    return nextElement ? this.focusTo(nextElement) : false;
  }

  /**
   * Sets the focus on the first focusable parent of the given element
   *
   * @returns true if there was an eligible element to set focus to
   */
  public focusOutOf(element: HTMLElement): void {
    Focus.focusOutOf(element, this._rootElement);
  }

  /**
   * Set the focus to element that was focused before the current active element
   */
  public undoFocus(): boolean {
    return this.focusTo(this._lastActiveElement);
  }

  /**
   * Save the current active element with a given string key
   */
  public saveActiveElementAs(key: string): void {
    this._savedFocusMap.set(key, this._activeElement);
  }

  /**
   * Clear the saved active element from internal memory.
   *
   * @remarks
   * As a good practice, use this when you don't need the saved element anymore to free up memory.
   *
   * @param key - The string key used to save the active element
   */
  public forgetSavedActiveElement(key: string): void {
    this._savedFocusMap.delete(key);
  }

  /**
   * Save the last active element with a given string key
   */
  public saveLastActiveElementAs(key: string): void {
    this._savedFocusMap.set(key, this._lastActiveElement);
  }

  /**
   * Get the saved active element by its string key
   */
  public getSavedActiveElement(key: string): HTMLElement | undefined {
    return this._savedFocusMap.get(key);
  }

  /**
   * Restore focus to a saved element by its key
   */
  public restoreFocus(key: string): boolean {
    const element: HTMLElement | undefined = this.getSavedActiveElement(key);
    return element ? this.focusTo(element) : false;
  }

  /**
   * If the focus is inside the managed tree
   */
  public hasFocus(): boolean {
    return this.manages(document.activeElement as HTMLElement);
  }

  /**
   * If the given element is inside the managed tree
   */
  public manages(element: HTMLElement): boolean {
    return element === this.root || DomTraversal.contains(this.root, element);
  }

  /**
   * Mark an event object to be skipped by the manager. Since A11yManager only works with bubbled up events,
   * child components can use this method to mark an event to be skipped by the A11yManager. This is useful
   * where the event should bubble up to the browser without the manager taking any action on it.
   */
  public skipEvent(e: IKeyboardEvent): void {
    (e as any)[this._skipEventFlag] = true; // tslint:disable-line:no-any
  }

  /**
   * Gets an element by its id A11yAttribute
   */
  public getElementByA11yId(id: string, root?: HTMLElement): HTMLElement | undefined {
    if (!id) {
      return undefined;
    }

    root = root || this._rootElement;
    const idAttribute: string = A11yAttribute.getPrefix(this.prefix, A11yAttributeType.Id);
    return root.querySelector(`[${idAttribute}='${id}']`) as HTMLElement;
  }

  /**
   * Gets an element by its class A11yAttribute
   */
  public getElementsByA11yClass(className: string, root?: HTMLElement): HTMLElement[] {
    if (!className) {
      return [];
    }

    root = root || this._rootElement;
    const classAttribute: string = A11yAttribute.getPrefix(this.prefix, A11yAttributeType.Class);
    const nodeList: NodeList = root.querySelectorAll(`[${classAttribute}='${className}']`);
    // Convert nodelist to an array using slice method
    return Array.prototype.slice.call(nodeList) as HTMLElement[];
  }

  public registerNavigationMode(navigationModeClass: new (manager: A11yManager) => BaseNavigationMode): void {
    const mode: BaseNavigationMode = new navigationModeClass(this);
    if (!mode.name || typeof mode.name !== 'string') {
      throw Error(`Navigation modes should have non- empty string names`);
    } else {
      this._navigationModes.set(mode.name.toLowerCase(), mode);
    }
  }

  public unregisterNavigationMode(modeName: string): void {
    this._navigationModes.delete(modeName.toLowerCase());
  }

  private constructor(rootElement: HTMLElement, config?: IA11yManagerConfig) {
    if (!rootElement) {
      // VSO #372695: Localize sp-a11y errors
      throw Error('Invalid root element for constructing A11yManager');
    }

    const count: number = A11yManager._instances.size;
    const id = `A11yManager${count} `;

    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleFocusIn = this._handleFocusIn.bind(this);
    this._handleFocusOut = this._handleFocusOut.bind(this);
    this._checkFocusTransition = this._checkFocusTransition.bind(this);
    this._onFocusTransition = this._onFocusTransition.bind(this);

    this._rootElement = rootElement;
    this._id = id;
    this._config = config || {};
    this._savedFocusMap = new Map<string, HTMLElement>();
    this._focusListeners = new Map<number, IFocusListener>();
    this._navigationModes = new Map<string, BaseNavigationMode>();

    this._rootElement.addEventListener('keydown', this._handleKeyDown);
    this._rootElement.addEventListener('focusin', this._handleFocusIn);
    this._rootElement.addEventListener('focusout', this._handleFocusOut);

    this.registerNavigationMode(HierarchicalNavigation);

    // Set hierarchical navigation attribute on root element if configured
    if (this.config.useHierarchicalNavigation) {
      const attr: A11yAttribute = new A11yAttribute(this.prefix, A11yAttributeType.NavigateByHierarchy);
      attr.setOnElement(this._rootElement);
    }
  }

  private _getNavigationMode(modeName: string): BaseNavigationMode | undefined {
    return this._navigationModes.get(modeName.toLowerCase());
  }

  private _getElementFocusListeners(element: HTMLElement): IFocusListener[] {
    const listeners: IFocusListener[] = [];
    this._focusListeners.forEach((fl: IFocusListener) => {
      if (fl.element === element) {
        listeners.push(fl);
      }
    });
    return listeners;
  }

  /**
   * If the element is marked to have the given keyCode skipped inside it
   */
  private _hasSkipKeyAttribute(keyCode: number, element: HTMLElement): boolean {
    const skipAttr: A11yAttribute | undefined = A11yAttribute.getAllFromElement(this.prefix, element)
      .filter((attr: A11yAttribute) => attr.type === A11yAttributeType.SkipKeys)[0];

    if (skipAttr && skipAttr.value) {
      if (
        skipAttr.value === 'all' ||
        skipAttr.value.split(',').filter((keyCodeStr: string) => parseInt(keyCodeStr, 10) === keyCode).length > 0
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * If the keyCode should be skipped on the element. Considers all parents.
   */
  private _shouldSkipKey(keyCode: number, element: HTMLElement): boolean {
    const markedElement: HTMLElement | undefined =
      DomTraversal.getFirstMatchingParent(
        element,
        (e: HTMLElement) => this._hasSkipKeyAttribute(keyCode, e),
        this._rootElement
      );

    return markedElement !== undefined;
  }

  /**
   * If the element is marked to have the given keyCode stopped inside it
   */
  private _hasStopKeyAttribute(keyCode: number, element: HTMLElement): boolean {
    const stopAttr: A11yAttribute | undefined = A11yAttribute.getAllFromElement(this.prefix, element)
      .filter((attr: A11yAttribute) => attr.type === A11yAttributeType.StopKeys)[0];

    if (stopAttr && stopAttr.value) {
      if (
        stopAttr.value === 'all' ||
        stopAttr.value.split(',').filter((keyCodeStr: string) => parseInt(keyCodeStr, 10) === keyCode).length > 0) {
        return true;
      }
    }
    return false;
  }

  /**
   * If the keyCode should be skipped on the element. Considers all parents.
   */
  private _shouldStopKey(keyCode: number, element: HTMLElement): boolean {
    const markedElement: HTMLElement | undefined =
      DomTraversal.getFirstMatchingParent(
        element,
        (e: HTMLElement) => this._hasStopKeyAttribute(keyCode, e),
        this._rootElement
      );

    return markedElement !== undefined;
  }

  /**
   * Checks if the event should be skipped by manager and bubble up to browser for default action
   */
  private _shouldSkipEvent(evt: IKeyboardEvent): boolean {
    if ((evt as any)[this._skipEventFlag]) {  // tslint:disable-line:no-any
      return true;
    } else {
      return this._shouldSkipKey(evt.keyCode, evt.target as HTMLElement);
    }
  }

  /**
   * Checks if the event should be prevented and stopped from propagation
   */
  private _shouldStopEvent(evt: IKeyboardEvent): boolean {
    return this._shouldStopKey(evt.keyCode, evt.target as HTMLElement);
  }

  private _navigateByDeclarations(evt: IKeyboardEvent): HTMLElement | undefined {
    let path: HTMLElement[] | undefined = this._getElementPath(this._rootElement, evt.target as HTMLElement);

    if (path) {
      // Take a path from the event target to the root element and look for navigation attibutes
      path = path.reverse();
      for (const elem of path) {
        // Check if there is a NavigateOnKey attribute on path element
        const navOnKeyAttrs: A11yAttribute[] = A11yAttribute.getFromElementByType(
          this.prefix,
          elem,
          A11yAttributeType.NavigateOnKey
        );

        for (const navAttr of navOnKeyAttrs) {
          if (navAttr.value && navAttr.params) {
            // Check if the key event key matches the attribute key specification
            const keyCode: number = parseInt(navAttr.params[0], 10);
            const alt: boolean = navAttr.params.indexOf('a') > 0;
            const ctrl: boolean = navAttr.params.indexOf('c') > 0;
            const shift: boolean = navAttr.params.indexOf('s') > 0;

            if (Keyboard.isKey(keyCode, evt, { alt, ctrl, shift })) {
              // Parse the attribute value and find the target of navigation
              const value: string = navAttr.value.trim();
              const token: string = value[0];
              const selector: string = value.substr(1);

              // Note: Id should be searched in the whole tree, but class should be searched in the marked up element
              let nextElement: HTMLElement | undefined;
              switch (token) {
                case '#':
                  nextElement = this.getElementByA11yId(selector, this._rootElement);
                  break;

                case '.':
                  const elems: HTMLElement[] = this.getElementsByA11yClass(selector, elem);
                  nextElement = elems && elems.length > 0 ? elems[0] : undefined;
                  break;

                case '$':
                  // nextElement = this._hierarchicalNavigation.select(selector, elem);
                  nextElement = this._selectByNavigationMode(selector, elem);
                  break;

                default:
                  nextElement = undefined;
              }

              return nextElement;
            }
          }
        }

        // Check for navigation mode
        const modeAttrs: A11yAttribute[] = A11yAttribute.getFromElementByType(
          this.prefix,
          elem,
          A11yAttributeType.NavigationMode
        );

        if (modeAttrs && modeAttrs.length > 0 && modeAttrs[0].value) {
          const mode: BaseNavigationMode | undefined = this._getNavigationMode(modeAttrs[0].value!);
          if (mode) {
            return mode.navigate(elem, evt, evt.target as HTMLElement);
          }
        }
      }
    }

    return undefined;
  }

  private _selectByNavigationMode(selector: string, element: HTMLElement): HTMLElement | undefined {
    let path: HTMLElement[] | undefined = this._getElementPath(this.root, element);
    if (path) {
      path = path.reverse();
      for (const ancestor of path) {
        const modeAttrs: A11yAttribute[] = A11yAttribute.getFromElementByType(
          this.prefix,
          ancestor,
          A11yAttributeType.NavigationMode
        );

        if (modeAttrs && modeAttrs.length > 0 && modeAttrs[0].value) {
          const mode: BaseNavigationMode | undefined = this._getNavigationMode(modeAttrs[0].value!);
          if (mode && mode.supports(selector)) {
            return mode.select(ancestor, selector, element);
          }
        }
      }
    }
  }

  private _getElementPath(higher: HTMLElement, lower: HTMLElement): HTMLElement[] | undefined {
    return DomTraversal.getElementPath(higher, lower, this._rootElement);
  }

  private _handleKeyDown(evt: IKeyboardEvent): void {
    if (this._shouldStopEvent(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      return;
    }

    if (this._shouldSkipEvent(evt)) {
      return;
    }

    let elementToGo: HTMLElement | undefined = this._navigateByDeclarations(evt);

    if (elementToGo) {
      this.focusTo(elementToGo);
      evt.preventDefault();
      evt.stopPropagation();
    }
  }

  private _handleFocusIn(evt: FocusEvent): void {
    this._lastFocusInEvent = evt;
    this._lastFocusInEventTime = Date.now();
    this._activeElement = evt.target as HTMLElement;

    this._checkFocusTransition();
  }

  private _handleFocusOut(evt: FocusEvent): void {
    this._lastFocusInEvent = undefined;
    this._lastFocusOutEvent = evt;
    this._lastFocusOutEventTime = Date.now();
    if (this._lastActiveElement !== evt.target) {
      this._lastActiveElement = evt.target as HTMLElement;
    }

    // To capture focus losses we need to have this check
    this._focusDetectionTimer = window.setTimeout(this._checkFocusTransition, A11yManager._focusDetectionDelay);
  }

  private _checkFocusTransition(): void {
    window.clearTimeout(this._focusDetectionTimer);

    if (this._lastFocusInEvent || this._lastFocusOutEvent) {
      this._onFocusTransition(
        this._lastFocusOutEvent ? this._lastFocusOutEvent.target as HTMLElement : undefined,
        this._lastFocusInEvent ? this._lastFocusInEvent.target as HTMLElement : undefined
      );
    }
    this._lastFocusInEvent = undefined;
    this._lastFocusOutEvent = undefined;
  }

  private _onFocusTransition(src: HTMLElement | undefined, dest: HTMLElement | undefined): void {
    if (!src && !dest) {
      return;
    }

    const transition: FocusTransition = new FocusTransition(src, dest, this.root);

    if (this.config.debug) {
      console.log(`${this.id} A11y Log: Focus transition: `);
      console.log({
        from: transition.src || 'external element',
        to: transition.dest || 'external element'
      });
    }

    const messages: string[] = [];
    transition.forEachElementInPath(
      (element: HTMLElement, isOutward: boolean) => {
        // Message aggregator
        const attr: A11yAttribute = A11yAttribute.getFromElementByType(
          this.prefix,
          element,
          isOutward ? A11yAttributeType.AlertOnFocusOut : A11yAttributeType.AlertOnFocusIn
        )[0];
        if (attr && attr.value) {
          messages.push(attr.value);
        }

        // Check for navigation mode
        const modeAttrs: A11yAttribute[] = A11yAttribute.getFromElementByType(
          this.prefix,
          element,
          A11yAttributeType.NavigationMode
        );

        if (modeAttrs && modeAttrs.length > 0 && modeAttrs[0].value) {
          const mode: BaseNavigationMode | undefined = this._getNavigationMode(modeAttrs[0].value!);
          if (mode) {
            if (isOutward) {
              mode.onOutwardFocus(element, transition);
            } else {
              mode.onInwardFocus(element, transition);
            }
          }
        }

        // Check if there are listeners for that element
        const elementFocusListeners: IFocusListener[] = this._getElementFocusListeners(element);
        for (const listener of elementFocusListeners) {
          if (
            (listener.direction === 'outward' && isOutward) ||
            (listener.direction === 'inward' && !isOutward)
          ) {
            const handler: (t: FocusTransition) => void = listener.handler;
            if (handler) {
              handler(transition);
            }
          }
        }
      }
    );

    if (messages && messages.length > 0) {
      const msg: string = messages.join(' ');
      this.alert(msg);
    }
  }
}
