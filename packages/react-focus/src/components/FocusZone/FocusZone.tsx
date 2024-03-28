import * as React from 'react';
import { FocusZoneDirection, FocusZoneTabbableElements } from './FocusZone.types';
import {
  KeyCodes,
  css,
  elementContains,
  getDocument,
  getElementIndexPath,
  getFocusableByIndexPath,
  getId,
  getNativeProps,
  getNextElement,
  getParent,
  getPreviousElement,
  getRTL,
  htmlElementProperties,
  initializeComponentRef,
  isElementFocusSubZone,
  isElementFocusZone,
  isElementTabbable,
  shouldWrapFocus,
  warnDeprecations,
  portalContainsElement,
  findScrollableParent,
  createMergedRef,
  isElementVisibleAndNotHidden,
  MergeStylesShadowRootContext,
} from '@fluentui/utilities';
import { mergeStyles } from '@fluentui/merge-styles';
import { getTheme } from '@fluentui/style-utilities';
import type { IFocusZone, IFocusZoneProps } from './FocusZone.types';
import type { Point } from '@fluentui/utilities';
import type { ITheme } from '@fluentui/style-utilities';

const IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
const IS_ENTER_DISABLED_ATTRIBUTE = 'data-disable-click-on-enter';
const FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';
const TABINDEX = 'tabindex';
const NO_VERTICAL_WRAP = 'data-no-vertical-wrap';
const NO_HORIZONTAL_WRAP = 'data-no-horizontal-wrap';
const LARGE_DISTANCE_FROM_CENTER = 999999999;
const LARGE_NEGATIVE_DISTANCE_FROM_CENTER = -999999999;

let focusZoneStyles: string;

const focusZoneClass: string = 'ms-FocusZone';

/**
 * Raises a click on a target element based on a keyboard event.
 */
function raiseClickFromKeyboardEvent(target: Element, ev?: React.KeyboardEvent<HTMLElement>): void {
  let event;
  if (typeof MouseEvent === 'function') {
    event = new MouseEvent('click', {
      ctrlKey: ev?.ctrlKey,
      metaKey: ev?.metaKey,
      shiftKey: ev?.shiftKey,
      altKey: ev?.altKey,
      bubbles: ev?.bubbles,
      cancelable: ev?.cancelable,
    });
  } else {
    // eslint-disable-next-line no-restricted-globals
    event = document.createEvent('MouseEvents');
    // eslint-disable-next-line deprecation/deprecation
    event.initMouseEvent(
      'click',
      ev ? ev.bubbles : false,
      ev ? ev.cancelable : false,
      // eslint-disable-next-line no-restricted-globals
      window, // not using getWindow() since this can only be run client side
      0, // detail
      0, // screen x
      0, // screen y
      0, // client x
      0, // client y
      ev ? ev.ctrlKey : false,
      ev ? ev.altKey : false,
      ev ? ev.shiftKey : false,
      ev ? ev.metaKey : false,
      0, // button
      null, // relatedTarget
    );
  }

  target.dispatchEvent(event);
}

// Helper function that will return a class for when the root is focused
function getRootClass(): string {
  if (!focusZoneStyles) {
    focusZoneStyles = mergeStyles(
      {
        selectors: {
          ':focus': {
            outline: 'none',
          },
        },
      },
      focusZoneClass,
    );
  }
  return focusZoneStyles;
}

const _allInstances: {
  [key: string]: FocusZone;
} = {};
const _outerZones: Set<FocusZone> = new Set();

const ALLOWED_INPUT_TYPES = ['text', 'number', 'password', 'email', 'tel', 'url', 'search', 'textarea'];

const ALLOW_VIRTUAL_ELEMENTS = false;

interface IFocusZonePropsWithTabster extends IFocusZoneProps {
  'data-tabster': string;
}

export class FocusZone extends React.Component<IFocusZoneProps> implements IFocusZone {
  public static contextType = MergeStylesShadowRootContext;

  public static defaultProps: IFocusZoneProps = {
    isCircularNavigation: false,
    direction: FocusZoneDirection.bidirectional,
    shouldRaiseClicks: true,
    // Hardcoding uncontrolled flag for proper interop with FluentUI V9.
    'data-tabster': '{"uncontrolled": {}}',
  } as IFocusZonePropsWithTabster;

  private _root: React.RefObject<HTMLElement> = React.createRef();
  private _mergedRef = createMergedRef<HTMLElement>();

  private _id: string;

  /** The most recently focused child element. */
  private _activeElement: HTMLElement | null;

  /**
   * The index path to the last focused child element.
   */
  private _lastIndexPath: number[] | undefined;

  /**
   * Flag to define when we've intentionally parked focus on the root element to temporarily
   * hold focus until items appear within the zone.
   */
  private _isParked: boolean;

  /** The child element with tabindex=0. */
  private _defaultFocusElement: HTMLElement | null;
  private _focusAlignment: Point;
  private _isInnerZone: boolean;
  private _parkedTabIndex: string | null | undefined;

  /** Used to allow moving to next focusable element even when we're focusing on a input element when pressing tab */
  private _processingTabKey: boolean;

  /** Provides granular control over `shouldRaiseClicks` and should be preferred over `props.shouldRaiseClicks`. */
  private _shouldRaiseClicksOnEnter: boolean;
  private _shouldRaiseClicksOnSpace: boolean;

  private _inShadowRoot: boolean;

  /** Used for testing purposes only. */
  public static getOuterZones(): number {
    return _outerZones.size;
  }

  /**
   * Handle global tab presses so that we can patch tabindexes on the fly.
   * HEADS UP: This must not be an arrow function in order to be referentially equal among instances
   * for ref counting to work correctly!
   */
  private static _onKeyDownCapture(ev: KeyboardEvent): void {
    // eslint-disable-next-line deprecation/deprecation, @fluentui/deprecated-keyboard-event-props
    if (ev.which === KeyCodes.tab) {
      _outerZones.forEach((zone: FocusZone) => zone._updateTabIndexes());
    }
  }

  constructor(props: IFocusZoneProps) {
    super(props);
    // Manage componentRef resolution.
    initializeComponentRef(this);

    if (process.env.NODE_ENV !== 'production') {
      warnDeprecations('FocusZone', props, {
        rootProps: undefined,
        allowTabKey: 'handleTabKey',
        elementType: 'as',
        ariaDescribedBy: 'aria-describedby',
        ariaLabelledBy: 'aria-labelledby',
      });
    }

    this._id = getId('FocusZone');

    this._focusAlignment = {
      left: 0,
      top: 0,
    };

    this._processingTabKey = false;

    const shouldRaiseClicksFallback = props.shouldRaiseClicks ?? FocusZone.defaultProps.shouldRaiseClicks ?? true;
    this._shouldRaiseClicksOnEnter = props.shouldRaiseClicksOnEnter ?? shouldRaiseClicksFallback;
    this._shouldRaiseClicksOnSpace = props.shouldRaiseClicksOnSpace ?? shouldRaiseClicksFallback;
  }

  public componentDidMount(): void {
    const { current: root } = this._root;

    this._inShadowRoot = !!this.context?.shadowRoot;

    _allInstances[this._id] = this;

    if (root) {
      let parentElement = getParent(root, ALLOW_VIRTUAL_ELEMENTS);

      while (parentElement && parentElement !== this._getDocument().body && parentElement.nodeType === 1) {
        if (isElementFocusZone(parentElement)) {
          this._isInnerZone = true;
          break;
        }
        parentElement = getParent(parentElement, ALLOW_VIRTUAL_ELEMENTS);
      }

      if (!this._isInnerZone) {
        _outerZones.add(this);

        this._root.current && this._root.current.addEventListener('keydown', FocusZone._onKeyDownCapture, true);
      }

      this._root.current && this._root.current.addEventListener('blur', this._onBlur, true);

      // Assign initial tab indexes so that we can set initial focus as appropriate.
      this._updateTabIndexes();

      if (this.props.defaultTabbableElement && typeof this.props.defaultTabbableElement === 'string') {
        this._activeElement = this._getDocument().querySelector(this.props.defaultTabbableElement) as HTMLElement;
        // eslint-disable-next-line deprecation/deprecation
      } else if (this.props.defaultActiveElement) {
        // eslint-disable-next-line deprecation/deprecation
        this._activeElement = this._getDocument().querySelector(this.props.defaultActiveElement) as HTMLElement;
      }

      if (this.props.shouldFocusOnMount) {
        this.focus();
      }
    }
  }

  public componentDidUpdate(): void {
    const { current: root } = this._root;
    const doc = this._getDocument();
    this._inShadowRoot = !!this.context?.shadowRoot;

    // If either _activeElement or _defaultFocusElement are no longer contained by _root,
    // reset those variables (and update tab indexes) to avoid memory leaks
    if (
      (this._activeElement && !elementContains(this._root.current, this._activeElement, ALLOW_VIRTUAL_ELEMENTS)) ||
      (this._defaultFocusElement &&
        !elementContains(this._root.current, this._defaultFocusElement, ALLOW_VIRTUAL_ELEMENTS))
    ) {
      this._activeElement = null;
      this._defaultFocusElement = null;
      this._updateTabIndexes();
    }

    if (
      !this.props.preventFocusRestoration &&
      doc &&
      this._lastIndexPath &&
      (doc.activeElement === doc.body || doc.activeElement === null || doc.activeElement === root)
    ) {
      // The element has been removed after the render, attempt to restore focus.
      const elementToFocus = getFocusableByIndexPath(root as HTMLElement, this._lastIndexPath);

      if (elementToFocus) {
        this._setActiveElement(elementToFocus, true);
        elementToFocus.focus();
        this._setParkedFocus(false);
      } else {
        // We had a focus path to restore, but now that path is unresolvable. Park focus
        // on the container until we can try again.
        this._setParkedFocus(true);
      }
    }
  }

  public componentWillUnmount(): void {
    delete _allInstances[this._id];

    if (!this._isInnerZone) {
      _outerZones.delete(this);

      this._root.current && this._root.current.removeEventListener('keydown', FocusZone._onKeyDownCapture, true);
    }

    if (this._root.current) {
      this._root.current.removeEventListener('blur', this._onBlur, true);
    }

    this._activeElement = null;
    this._defaultFocusElement = null;
  }

  public render(): React.ReactNode {
    // eslint-disable-next-line deprecation/deprecation
    const { as: tag, elementType, rootProps, ariaDescribedBy, ariaLabelledBy, className } = this.props;
    const divProps = getNativeProps(this.props, htmlElementProperties);

    const Tag = tag || elementType || 'div';

    // Note, right before rendering/reconciling proceeds, we need to record if focus
    // was in the zone before the update. This helper will track this and, if focus
    // was actually in the zone, what the index path to the element is at this time.
    // Then, later in componentDidUpdate, we can evaluate if we need to restore it in
    // the case the element was removed.
    this._evaluateFocusBeforeRender();

    // Only support RTL defined in global theme, not contextual theme/RTL.
    const theme: ITheme = getTheme();

    return (
      <Tag
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        {...divProps}
        {
          // root props has been deprecated and should get removed.
          // it needs to be marked as "any" since root props expects a div element, but really Tag can
          // be any native element so typescript rightly flags this as a problem.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(rootProps as any)
        }
        // Once the getClassName correctly memoizes inputs this should
        // be replaced so that className is passed to getRootClass and is included there so
        // the class names will always be in the same order.
        className={css(getRootClass(), className)}
        // eslint-disable-next-line deprecation/deprecation
        ref={this._mergedRef(this.props.elementRef, this._root)}
        data-focuszone-id={this._id}
        // eslint-disable-next-line react/jsx-no-bind
        onKeyDown={(ev: React.KeyboardEvent<HTMLElement>) => this._onKeyDown(ev, theme)}
        onFocus={this._onFocus}
        onMouseDownCapture={this._onMouseDown}
      >
        {this.props.children}
      </Tag>
    );
  }

  /**
   * Sets focus to the first tabbable item in the zone.
   * @param forceIntoFirstElement - If true, focus will be forced into the first element, even
   * if focus is already in the focus zone.
   * @param bypassHiddenElements - If true, focus will be not be set on hidden elements.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focus(forceIntoFirstElement: boolean = false, bypassHiddenElements: boolean = false): boolean {
    if (this._root.current) {
      if (
        !forceIntoFirstElement &&
        this._root.current.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' &&
        this._isInnerZone
      ) {
        const ownerZoneElement = this._getOwnerZone(this._root.current) as HTMLElement;

        if (ownerZoneElement !== this._root.current) {
          const ownerZone = _allInstances[ownerZoneElement.getAttribute(FOCUSZONE_ID_ATTRIBUTE) as string];

          return !!ownerZone && ownerZone.focusElement(this._root.current);
        }

        return false;
      } else if (
        !forceIntoFirstElement &&
        this._activeElement &&
        elementContains(this._root.current, this._activeElement) &&
        isElementTabbable(this._activeElement, undefined, this._inShadowRoot) &&
        (!bypassHiddenElements || isElementVisibleAndNotHidden(this._activeElement))
      ) {
        this._activeElement.focus();
        return true;
      } else {
        const firstChild = this._root.current.firstChild as HTMLElement;

        return this.focusElement(
          getNextElement(
            this._root.current,
            firstChild,
            true,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            bypassHiddenElements,
          ) as HTMLElement,
        );
      }
    }
    return false;
  }

  /**
   * Sets focus to the last tabbable item in the zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focusLast(): boolean {
    if (this._root.current) {
      const lastChild = this._root.current && (this._root.current.lastChild as HTMLElement | null);

      return this.focusElement(getPreviousElement(this._root.current, lastChild, true, true, true) as HTMLElement);
    }

    return false;
  }

  /**
   * Sets focus to a specific child element within the zone. This can be used in conjunction with
   * shouldReceiveFocus to create delayed focus scenarios (like animate the scroll position to the correct
   * location and then focus.)
   * @param element - The child element within the zone to focus.
   * @param forceAlignment - If true, focus alignment will be set according to the element provided.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focusElement(element: HTMLElement, forceAlignment?: boolean): boolean {
    // eslint-disable-next-line deprecation/deprecation
    const { onBeforeFocus, shouldReceiveFocus } = this.props;

    if ((shouldReceiveFocus && !shouldReceiveFocus(element)) || (onBeforeFocus && !onBeforeFocus(element))) {
      return false;
    }

    if (element) {
      // when we set focus to a specific child, we should recalculate the alignment depending on its position.
      this._setActiveElement(element, forceAlignment);
      if (this._activeElement) {
        this._activeElement.focus();
      }

      return true;
    }

    return false;
  }

  /**
   * Forces horizontal alignment in the context of vertical arrowing to use specific point as the reference,
   * rather than a center based on the last horizontal motion.
   * @param point - the new reference point.
   */
  public setFocusAlignment(point: Point): void {
    this._focusAlignment = point;
  }

  public get defaultFocusElement() {
    return this._defaultFocusElement;
  }

  public get activeElement() {
    return this._activeElement;
  }

  private _evaluateFocusBeforeRender(): void {
    const { current: root } = this._root;

    const doc = this._getDocument();
    if (doc) {
      const focusedElement = doc.activeElement as HTMLElement;

      // Only update the index path if we are not parked on the root.
      if (focusedElement !== root) {
        const shouldRestoreFocus = elementContains(root, focusedElement, false);
        this._lastIndexPath = shouldRestoreFocus ? getElementIndexPath(root as HTMLElement, focusedElement) : undefined;
      }
    }
  }

  private _onFocus = (ev: React.FocusEvent<HTMLElement>): void => {
    if (this._portalContainsElement(ev.target as HTMLElement)) {
      // If the event target is inside a portal do not process the event.
      return;
    }

    const {
      onActiveElementChanged,
      // eslint-disable-next-line deprecation/deprecation
      doNotAllowFocusEventToPropagate,
      stopFocusPropagation,
      // eslint-disable-next-line deprecation/deprecation
      onFocusNotification,
      onFocus,
      shouldFocusInnerElementWhenReceivedFocus,
      defaultTabbableElement,
    } = this.props;
    const isImmediateDescendant = this._isImmediateDescendantOfZone(ev.target as HTMLElement);
    let newActiveElement: HTMLElement | null | undefined;

    if (isImmediateDescendant) {
      newActiveElement = ev.target as HTMLElement;
    } else {
      let parentElement = ev.target as HTMLElement;

      while (parentElement && parentElement !== this._root.current) {
        if (
          isElementTabbable(parentElement, undefined, this._inShadowRoot) &&
          this._isImmediateDescendantOfZone(parentElement)
        ) {
          newActiveElement = parentElement;
          break;
        }
        parentElement = getParent(parentElement, ALLOW_VIRTUAL_ELEMENTS) as HTMLElement;
      }
    }

    // If an inner focusable element should be focused when FocusZone container receives focus
    if (shouldFocusInnerElementWhenReceivedFocus && ev.target === this._root.current) {
      const maybeElementToFocus =
        defaultTabbableElement &&
        typeof defaultTabbableElement === 'function' &&
        this._root.current &&
        defaultTabbableElement(this._root.current);

      // try to focus defaultTabbable element
      if (maybeElementToFocus && isElementTabbable(maybeElementToFocus, undefined, this._inShadowRoot)) {
        newActiveElement = maybeElementToFocus;
        maybeElementToFocus.focus();
      } else {
        // force focus on first focusable element
        this.focus(true);
        if (this._activeElement) {
          // set to null as new active element was handled in method above
          newActiveElement = null;
        }
      }
    }

    const initialElementFocused = !this._activeElement;

    // If the new active element is a child of this zone and received focus,
    // update alignment an immediate descendant
    if (newActiveElement && newActiveElement !== this._activeElement) {
      if (isImmediateDescendant || initialElementFocused) {
        this._setFocusAlignment(newActiveElement, true, true);
      }

      this._activeElement = newActiveElement;

      if (initialElementFocused) {
        this._updateTabIndexes();
      }
    }

    if (onActiveElementChanged) {
      onActiveElementChanged(this._activeElement as HTMLElement, ev);
    }

    if (stopFocusPropagation || doNotAllowFocusEventToPropagate) {
      ev.stopPropagation();
    }

    if (onFocus) {
      onFocus(ev);
    } else if (onFocusNotification) {
      onFocusNotification();
    }
  };

  /**
   * When focus is in the zone at render time but then all focusable elements are removed,
   * we "park" focus temporarily on the root. Once we update with focusable children, we restore
   * focus to the closest path from previous. If the user tabs away from the parked container,
   * we restore focusability to the pre-parked state.
   */
  private _setParkedFocus(isParked: boolean): void {
    const { current: root } = this._root;

    if (root && this._isParked !== isParked) {
      this._isParked = isParked;

      if (isParked) {
        if (!this.props.allowFocusRoot) {
          this._parkedTabIndex = root.getAttribute('tabindex');
          root.setAttribute('tabindex', '-1');
        }
        root.focus();
      } else if (!this.props.allowFocusRoot) {
        if (this._parkedTabIndex) {
          root.setAttribute('tabindex', this._parkedTabIndex);
          this._parkedTabIndex = undefined;
        } else {
          root.removeAttribute('tabindex');
        }
      }
    }
  }

  private _onBlur = (): void => {
    this._setParkedFocus(false);
  };

  private _onMouseDown = (ev: React.MouseEvent<HTMLElement>): void => {
    if (this._portalContainsElement(ev.target as HTMLElement)) {
      // If the event target is inside a portal do not process the event.
      return;
    }

    const { disabled } = this.props;

    if (disabled) {
      return;
    }

    let target = ev.target as HTMLElement;
    const path = [];

    while (target && target !== this._root.current) {
      path.push(target);
      target = getParent(target, ALLOW_VIRTUAL_ELEMENTS) as HTMLElement;
    }

    while (path.length) {
      target = path.pop() as HTMLElement;

      if (target && isElementTabbable(target, undefined, this._inShadowRoot)) {
        this._setActiveElement(target, true);
      }

      if (isElementFocusZone(target)) {
        // Stop here since the focus zone will take care of its own children.
        break;
      }
    }
  };

  private _setActiveElement(element: HTMLElement, forceAlignment?: boolean): void {
    const previousActiveElement = this._activeElement;

    this._activeElement = element;

    if (previousActiveElement) {
      if (isElementFocusZone(previousActiveElement)) {
        this._updateTabIndexes(previousActiveElement);
      }

      previousActiveElement.tabIndex = -1;
    }

    if (this._activeElement) {
      if (!this._focusAlignment || forceAlignment) {
        this._setFocusAlignment(element, true, true);
      }

      this._activeElement.tabIndex = 0;
    }
  }

  private _preventDefaultWhenHandled(ev: React.KeyboardEvent<HTMLElement>): void {
    this.props.preventDefaultWhenHandled && ev.preventDefault();
  }

  /**
   * Handle the keystrokes.
   */
  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>, theme: ITheme): boolean | undefined => {
    if (this._portalContainsElement(ev.target as HTMLElement)) {
      // If the event target is inside a portal do not process the event.
      return;
    }

    // eslint-disable-next-line deprecation/deprecation
    const { direction, disabled, isInnerZoneKeystroke, pagingSupportDisabled, shouldEnterInnerZone } = this.props;

    if (disabled) {
      return;
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
    }

    // If the default has been prevented, do not process keyboard events.
    if (ev.isDefaultPrevented()) {
      return;
    }

    if (this._getDocument().activeElement === this._root.current && this._isInnerZone) {
      // If this element has focus, it is being controlled by a parent.
      // Ignore the keystroke.
      return;
    }

    if (
      ((shouldEnterInnerZone && shouldEnterInnerZone(ev)) || (isInnerZoneKeystroke && isInnerZoneKeystroke(ev))) &&
      this._isImmediateDescendantOfZone(ev.target as HTMLElement)
    ) {
      // Try to focus
      const innerZone = this._getFirstInnerZone();

      if (innerZone) {
        if (!innerZone.focus(true)) {
          return;
        }
      } else if (isElementFocusSubZone(ev.target as HTMLElement)) {
        if (
          !this.focusElement(
            getNextElement(
              ev.target as HTMLElement,
              (ev.target as HTMLElement).firstChild as HTMLElement,
              true,
            ) as HTMLElement,
          )
        ) {
          return;
        }
      } else {
        return;
      }
    } else if (ev.altKey) {
      return;
    } else {
      // eslint-disable-next-line @fluentui/deprecated-keyboard-event-props, deprecation/deprecation
      switch (ev.which) {
        case KeyCodes.space:
          if (this._shouldRaiseClicksOnSpace && this._tryInvokeClickForFocusable(ev.target as HTMLElement, ev)) {
            break;
          }
          return;

        case KeyCodes.left:
          if (direction !== FocusZoneDirection.vertical) {
            this._preventDefaultWhenHandled(ev);
            if (this._moveFocusLeft(theme)) {
              break;
            }
          }
          return;

        case KeyCodes.right:
          if (direction !== FocusZoneDirection.vertical) {
            this._preventDefaultWhenHandled(ev);
            if (this._moveFocusRight(theme)) {
              break;
            }
          }
          return;

        case KeyCodes.up:
          if (direction !== FocusZoneDirection.horizontal) {
            this._preventDefaultWhenHandled(ev);
            if (this._moveFocusUp()) {
              break;
            }
          }
          return;

        case KeyCodes.down:
          if (direction !== FocusZoneDirection.horizontal) {
            this._preventDefaultWhenHandled(ev);
            if (this._moveFocusDown()) {
              break;
            }
          }
          return;
        case KeyCodes.pageDown:
          if (!pagingSupportDisabled && this._moveFocusPaging(true)) {
            break;
          }
          return;
        case KeyCodes.pageUp:
          if (!pagingSupportDisabled && this._moveFocusPaging(false)) {
            break;
          }
          return;

        case KeyCodes.tab:
          if (
            // eslint-disable-next-line deprecation/deprecation
            this.props.allowTabKey ||
            this.props.handleTabKey === FocusZoneTabbableElements.all ||
            (this.props.handleTabKey === FocusZoneTabbableElements.inputOnly &&
              this._isElementInput(ev.target as HTMLElement))
          ) {
            let focusChanged = false;
            this._processingTabKey = true;
            if (
              direction === FocusZoneDirection.vertical ||
              !this._shouldWrapFocus(this._activeElement as HTMLElement, NO_HORIZONTAL_WRAP)
            ) {
              focusChanged = ev.shiftKey ? this._moveFocusUp() : this._moveFocusDown();
            } else {
              const tabWithDirection = getRTL(theme) ? !ev.shiftKey : ev.shiftKey;
              focusChanged = tabWithDirection ? this._moveFocusLeft(theme) : this._moveFocusRight(theme);
            }
            this._processingTabKey = false;
            if (focusChanged) {
              break;
            } else if (this.props.shouldResetActiveElementWhenTabFromZone) {
              this._activeElement = null;
            }
          }
          return;

        case KeyCodes.home:
          if (
            this._isContentEditableElement(ev.target as HTMLElement) ||
            (this._isElementInput(ev.target as HTMLElement) &&
              !this._shouldInputLoseFocus(ev.target as HTMLInputElement, false))
          ) {
            return false;
          }
          const firstChild = this._root.current && (this._root.current.firstChild as HTMLElement | null);
          if (
            this._root.current &&
            firstChild &&
            this.focusElement(getNextElement(this._root.current, firstChild, true) as HTMLElement)
          ) {
            break;
          }
          return;

        case KeyCodes.end:
          if (
            this._isContentEditableElement(ev.target as HTMLElement) ||
            (this._isElementInput(ev.target as HTMLElement) &&
              !this._shouldInputLoseFocus(ev.target as HTMLInputElement, true))
          ) {
            return false;
          }

          const lastChild = this._root.current && (this._root.current.lastChild as HTMLElement | null);
          if (
            this._root.current &&
            this.focusElement(getPreviousElement(this._root.current, lastChild, true, true, true) as HTMLElement)
          ) {
            break;
          }
          return;

        case KeyCodes.enter:
          if (this._shouldRaiseClicksOnEnter && this._tryInvokeClickForFocusable(ev.target as HTMLElement, ev)) {
            break;
          }
          return;

        default:
          return;
      }
    }

    ev.preventDefault();
    ev.stopPropagation();
  };

  /**
   * Walk up the dom try to find a focusable element.
   */
  private _tryInvokeClickForFocusable(targetElement: HTMLElement, ev?: React.KeyboardEvent<HTMLElement>): boolean {
    let target = targetElement;
    if (target === this._root.current) {
      return false;
    }

    do {
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SUMMARY'
      ) {
        return false;
      }

      if (
        this._isImmediateDescendantOfZone(target) &&
        target.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' &&
        target.getAttribute(IS_ENTER_DISABLED_ATTRIBUTE) !== 'true'
      ) {
        raiseClickFromKeyboardEvent(target, ev);
        return true;
      }

      target = getParent(target, ALLOW_VIRTUAL_ELEMENTS) as HTMLElement;
    } while (target !== this._root.current);

    return false;
  }

  /**
   * Traverse to find first child zone.
   */
  private _getFirstInnerZone(rootElement?: HTMLElement | null): FocusZone | null {
    rootElement = rootElement || this._activeElement || this._root.current;

    if (!rootElement) {
      return null;
    }

    if (isElementFocusZone(rootElement)) {
      return _allInstances[rootElement.getAttribute(FOCUSZONE_ID_ATTRIBUTE) as string];
    }

    let child = rootElement.firstElementChild as HTMLElement | null;

    while (child) {
      if (isElementFocusZone(child)) {
        return _allInstances[child.getAttribute(FOCUSZONE_ID_ATTRIBUTE) as string];
      }
      const match = this._getFirstInnerZone(child);

      if (match) {
        return match;
      }

      child = child.nextElementSibling as HTMLElement | null;
    }

    return null;
  }

  private _moveFocus(
    isForward: boolean,
    // eslint-disable-next-line deprecation/deprecation
    getDistanceFromCenter: (activeRect: ClientRect, targetRect: ClientRect) => number,
    ev?: Event,
    useDefaultWrap: boolean = true,
  ): boolean {
    let element = this._activeElement;
    let candidateDistance = -1;
    let candidateElement: HTMLElement | undefined = undefined;
    let changedFocus = false;
    const isBidirectional = this.props.direction === FocusZoneDirection.bidirectional;

    if (!element || !this._root.current) {
      return false;
    }

    if (this._isElementInput(element)) {
      if (!this._shouldInputLoseFocus(element as HTMLInputElement, isForward)) {
        return false;
      }
    }

    const activeRect = isBidirectional ? element.getBoundingClientRect() : null;

    do {
      element = (
        isForward ? getNextElement(this._root.current, element) : getPreviousElement(this._root.current, element)
      ) as HTMLElement;

      if (isBidirectional) {
        if (element) {
          const targetRect = element.getBoundingClientRect();
          // eslint-disable-next-line deprecation/deprecation
          const elementDistance = getDistanceFromCenter(activeRect as ClientRect, targetRect);

          if (elementDistance === -1 && candidateDistance === -1) {
            candidateElement = element;
            break;
          }

          if (elementDistance > -1 && (candidateDistance === -1 || elementDistance < candidateDistance)) {
            candidateDistance = elementDistance;
            candidateElement = element;
          }

          if (candidateDistance >= 0 && elementDistance < 0) {
            break;
          }
        }
      } else {
        candidateElement = element;
        break;
      }
    } while (element);

    // Focus the closest candidate
    if (candidateElement && candidateElement !== this._activeElement) {
      changedFocus = true;
      this.focusElement(candidateElement);
    } else if (this.props.isCircularNavigation && useDefaultWrap) {
      if (isForward) {
        return this.focusElement(
          getNextElement(this._root.current, this._root.current.firstElementChild as HTMLElement, true) as HTMLElement,
        );
      } else {
        return this.focusElement(
          getPreviousElement(
            this._root.current,
            this._root.current.lastElementChild as HTMLElement,
            true,
            true,
            true,
          ) as HTMLElement,
        );
      }
    }

    return changedFocus;
  }

  private _moveFocusDown(): boolean {
    let targetTop = -1;
    // eslint-disable-next-line deprecation/deprecation
    const leftAlignment = this._focusAlignment.left || this._focusAlignment.x || 0;

    if (
      // eslint-disable-next-line deprecation/deprecation
      this._moveFocus(true, (activeRect: ClientRect, targetRect: ClientRect) => {
        let distance = -1;
        // ClientRect values can be floats that differ by very small fractions of a decimal.
        // If the difference between top and bottom are within a pixel then we should treat
        // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
        // but without Math.Floor they will be handled incorrectly.
        const targetRectTop = Math.floor(targetRect.top);
        const activeRectBottom = Math.floor(activeRect.bottom);

        if (targetRectTop < activeRectBottom) {
          if (!this._shouldWrapFocus(this._activeElement as HTMLElement, NO_VERTICAL_WRAP)) {
            return LARGE_NEGATIVE_DISTANCE_FROM_CENTER;
          }

          return LARGE_DISTANCE_FROM_CENTER;
        }

        if ((targetTop === -1 && targetRectTop >= activeRectBottom) || targetRectTop === targetTop) {
          targetTop = targetRectTop;
          if (leftAlignment >= targetRect.left && leftAlignment <= targetRect.left + targetRect.width) {
            distance = 0;
          } else {
            distance = Math.abs(targetRect.left + targetRect.width / 2 - leftAlignment);
          }
        }

        return distance;
      })
    ) {
      this._setFocusAlignment(this._activeElement as HTMLElement, false, true);
      return true;
    }

    return false;
  }

  private _moveFocusUp(): boolean {
    let targetTop = -1;
    // eslint-disable-next-line deprecation/deprecation
    const leftAlignment = this._focusAlignment.left || this._focusAlignment.x || 0;

    if (
      // eslint-disable-next-line deprecation/deprecation
      this._moveFocus(false, (activeRect: ClientRect, targetRect: ClientRect) => {
        let distance = -1;
        // ClientRect values can be floats that differ by very small fractions of a decimal.
        // If the difference between top and bottom are within a pixel then we should treat
        // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
        // but without Math.Floor they will be handled incorrectly.
        const targetRectBottom = Math.floor(targetRect.bottom);
        const targetRectTop = Math.floor(targetRect.top);
        const activeRectTop = Math.floor(activeRect.top);

        if (targetRectBottom > activeRectTop) {
          if (!this._shouldWrapFocus(this._activeElement as HTMLElement, NO_VERTICAL_WRAP)) {
            return LARGE_NEGATIVE_DISTANCE_FROM_CENTER;
          }
          return LARGE_DISTANCE_FROM_CENTER;
        }

        if ((targetTop === -1 && targetRectBottom <= activeRectTop) || targetRectTop === targetTop) {
          targetTop = targetRectTop;
          if (leftAlignment >= targetRect.left && leftAlignment <= targetRect.left + targetRect.width) {
            distance = 0;
          } else {
            distance = Math.abs(targetRect.left + targetRect.width / 2 - leftAlignment);
          }
        }

        return distance;
      })
    ) {
      this._setFocusAlignment(this._activeElement as HTMLElement, false, true);
      return true;
    }

    return false;
  }

  private _moveFocusLeft(theme: ITheme): boolean {
    const shouldWrap = this._shouldWrapFocus(this._activeElement as HTMLElement, NO_HORIZONTAL_WRAP);
    if (
      this._moveFocus(
        getRTL(theme),
        // eslint-disable-next-line deprecation/deprecation
        (activeRect: ClientRect, targetRect: ClientRect) => {
          let distance = -1;
          let topBottomComparison;

          if (getRTL(theme)) {
            // When in RTL, this comparison should be the same as the one in _moveFocusRight for LTR.
            // Going left at a leftmost rectangle will go down a line instead of up a line like in LTR.
            // This is important, because we want to be comparing the top of the target rect
            // with the bottom of the active rect.
            topBottomComparison = parseFloat(targetRect.top.toFixed(3)) < parseFloat(activeRect.bottom.toFixed(3));
          } else {
            topBottomComparison = parseFloat(targetRect.bottom.toFixed(3)) > parseFloat(activeRect.top.toFixed(3));
          }

          if (
            topBottomComparison &&
            targetRect.right <= activeRect.right &&
            this.props.direction !== FocusZoneDirection.vertical
          ) {
            distance = activeRect.right - targetRect.right;
          } else if (!shouldWrap) {
            distance = LARGE_NEGATIVE_DISTANCE_FROM_CENTER;
          }

          return distance;
        },
        undefined /*ev*/,
        shouldWrap,
      )
    ) {
      this._setFocusAlignment(this._activeElement as HTMLElement, true, false);
      return true;
    }

    return false;
  }

  private _moveFocusRight(theme: ITheme): boolean {
    const shouldWrap = this._shouldWrapFocus(this._activeElement as HTMLElement, NO_HORIZONTAL_WRAP);
    if (
      this._moveFocus(
        !getRTL(theme),
        // eslint-disable-next-line deprecation/deprecation
        (activeRect: ClientRect, targetRect: ClientRect) => {
          let distance = -1;
          let topBottomComparison;

          if (getRTL(theme)) {
            // When in RTL, this comparison should be the same as the one in _moveFocusLeft for LTR.
            // Going right at a rightmost rectangle will go up a line instead of down a line like in LTR.
            // This is important, because we want to be comparing the bottom of the target rect
            // with the top of the active rect.
            topBottomComparison = parseFloat(targetRect.bottom.toFixed(3)) > parseFloat(activeRect.top.toFixed(3));
          } else {
            topBottomComparison = parseFloat(targetRect.top.toFixed(3)) < parseFloat(activeRect.bottom.toFixed(3));
          }

          if (
            topBottomComparison &&
            targetRect.left >= activeRect.left &&
            this.props.direction !== FocusZoneDirection.vertical
          ) {
            distance = targetRect.left - activeRect.left;
          } else if (!shouldWrap) {
            distance = LARGE_NEGATIVE_DISTANCE_FROM_CENTER;
          }

          return distance;
        },
        undefined /*ev*/,
        shouldWrap,
      )
    ) {
      this._setFocusAlignment(this._activeElement as HTMLElement, true, false);
      return true;
    }

    return false;
  }

  private _getHorizontalDistanceFromCenter = (
    isForward: boolean,
    // eslint-disable-next-line deprecation/deprecation
    activeRect: ClientRect,
    // eslint-disable-next-line deprecation/deprecation
    targetRect: ClientRect,
  ): number => {
    // eslint-disable-next-line deprecation/deprecation
    const leftAlignment = this._focusAlignment.left || this._focusAlignment.x || 0;
    // ClientRect values can be floats that differ by very small fractions of a decimal.
    // If the difference between top and bottom are within a pixel then we should treat
    // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
    // but without Math.Floor they will be handled incorrectly.
    const targetRectTop = Math.floor(targetRect.top);
    const activeRectBottom = Math.floor(activeRect.bottom);
    const targetRectBottom = Math.floor(targetRect.bottom);
    const activeRectTop = Math.floor(activeRect.top);
    const isValidCandidateOnpagingDown = isForward && targetRectTop > activeRectBottom;
    const isValidCandidateOnpagingUp = !isForward && targetRectBottom < activeRectTop;

    if (isValidCandidateOnpagingDown || isValidCandidateOnpagingUp) {
      if (leftAlignment >= targetRect.left && leftAlignment <= targetRect.left + targetRect.width) {
        return 0;
      }
      return Math.abs(targetRect.left + targetRect.width / 2 - leftAlignment);
    }

    if (!this._shouldWrapFocus(this._activeElement as HTMLElement, NO_VERTICAL_WRAP)) {
      return LARGE_NEGATIVE_DISTANCE_FROM_CENTER;
    }
    return LARGE_DISTANCE_FROM_CENTER;
  };

  private _moveFocusPaging(isForward: boolean, useDefaultWrap: boolean = true): boolean {
    let element = this._activeElement;
    if (!element || !this._root.current) {
      return false;
    }
    if (this._isElementInput(element)) {
      if (!this._shouldInputLoseFocus(element as HTMLInputElement, isForward)) {
        return false;
      }
    }
    const scrollableParent = findScrollableParent(element);
    if (!scrollableParent) {
      return false;
    }
    let candidateDistance = -1;
    let candidateElement = undefined;
    let targetTop = -1;
    let targetBottom = -1;
    const pagesize = (scrollableParent as HTMLElement).clientHeight;
    const activeRect = element.getBoundingClientRect();
    do {
      element = isForward
        ? getNextElement(this._root.current, element)
        : getPreviousElement(this._root.current, element);
      if (element) {
        const targetRect = element.getBoundingClientRect();
        const targetRectTop = Math.floor(targetRect.top);
        const activeRectBottom = Math.floor(activeRect.bottom);
        const targetRectBottom = Math.floor(targetRect.bottom);
        const activeRectTop = Math.floor(activeRect.top);
        const elementDistance = this._getHorizontalDistanceFromCenter(isForward, activeRect, targetRect);
        const isElementPassedPageSizeOnPagingDown = isForward && targetRectTop > activeRectBottom + pagesize;
        const isElementPassedPageSizeOnPagingUp = !isForward && targetRectBottom < activeRectTop - pagesize;

        if (isElementPassedPageSizeOnPagingDown || isElementPassedPageSizeOnPagingUp) {
          break;
        }
        if (elementDistance > -1) {
          // for paging down
          if (isForward && targetRectTop > targetTop) {
            targetTop = targetRectTop;
            candidateDistance = elementDistance;
            candidateElement = element;
          } else if (!isForward && targetRectBottom < targetBottom) {
            // for paging up
            targetBottom = targetRectBottom;
            candidateDistance = elementDistance;
            candidateElement = element;
          } else if (candidateDistance === -1 || elementDistance <= candidateDistance) {
            candidateDistance = elementDistance;
            candidateElement = element;
          }
        }
      }
    } while (element);

    let changedFocus = false;
    // Focus the closest candidate
    if (candidateElement && candidateElement !== this._activeElement) {
      changedFocus = true;
      this.focusElement(candidateElement);
      this._setFocusAlignment(candidateElement as HTMLElement, false, true);
    } else if (this.props.isCircularNavigation && useDefaultWrap) {
      if (isForward) {
        return this.focusElement(
          getNextElement(this._root.current, this._root.current.firstElementChild as HTMLElement, true) as HTMLElement,
        );
      }
      return this.focusElement(
        getPreviousElement(
          this._root.current,
          this._root.current.lastElementChild as HTMLElement,
          true,
          true,
          true,
        ) as HTMLElement,
      );
    }
    return changedFocus;
  }

  private _setFocusAlignment(element: HTMLElement, isHorizontal?: boolean, isVertical?: boolean): void {
    if (
      this.props.direction === FocusZoneDirection.bidirectional &&
      (!this._focusAlignment || isHorizontal || isVertical)
    ) {
      const rect = element.getBoundingClientRect();
      const left = rect.left + rect.width / 2;
      const top = rect.top + rect.height / 2;

      if (!this._focusAlignment) {
        this._focusAlignment = { left, top };
      }

      if (isHorizontal) {
        this._focusAlignment.left = left;
      }

      if (isVertical) {
        this._focusAlignment.top = top;
      }
    }
  }

  private _isImmediateDescendantOfZone(element?: HTMLElement): boolean {
    return this._getOwnerZone(element) === this._root.current;
  }

  private _getOwnerZone(element?: HTMLElement): HTMLElement | null {
    let parentElement = getParent(element as HTMLElement, ALLOW_VIRTUAL_ELEMENTS);

    while (parentElement && parentElement !== this._root.current && parentElement !== this._getDocument().body) {
      if (isElementFocusZone(parentElement)) {
        return parentElement;
      }

      parentElement = getParent(parentElement, ALLOW_VIRTUAL_ELEMENTS);
    }

    return parentElement;
  }

  private _updateTabIndexes(element?: HTMLElement): void {
    if (
      !this._activeElement &&
      this.props.defaultTabbableElement &&
      typeof this.props.defaultTabbableElement === 'function'
    ) {
      this._activeElement = this.props.defaultTabbableElement(this._root.current as HTMLElement);
    }

    if (!element && this._root.current) {
      this._defaultFocusElement = null;
      element = this._root.current;
      if (this._activeElement && !elementContains(element, this._activeElement)) {
        this._activeElement = null;
      }
    }

    // If active element changes state to disabled, set it to null.
    // Otherwise, we lose keyboard accessibility to other elements in focus zone.
    if (this._activeElement && !isElementTabbable(this._activeElement, undefined, this._inShadowRoot)) {
      this._activeElement = null;
    }

    const childNodes = element && element.children;

    for (let childIndex = 0; childNodes && childIndex < childNodes.length; childIndex++) {
      const child = childNodes[childIndex] as HTMLElement;

      if (!isElementFocusZone(child)) {
        // If the item is explicitly set to not be focusable then TABINDEX needs to be set to -1.
        if (child.getAttribute && child.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'false') {
          child.setAttribute(TABINDEX, '-1');
        }

        if (isElementTabbable(child, undefined, this._inShadowRoot)) {
          if (this.props.disabled) {
            child.setAttribute(TABINDEX, '-1');
          } else if (
            !this._isInnerZone &&
            ((!this._activeElement && !this._defaultFocusElement) || this._activeElement === child)
          ) {
            this._defaultFocusElement = child;
            if (child.getAttribute(TABINDEX) !== '0') {
              child.setAttribute(TABINDEX, '0');
            }
          } else if (child.getAttribute(TABINDEX) !== '-1') {
            child.setAttribute(TABINDEX, '-1');
          }
        } else if (child.tagName === 'svg' && child.getAttribute('focusable') !== 'false') {
          // Disgusting IE hack. Sad face.
          child.setAttribute('focusable', 'false');
        }
      } else if (child.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true') {
        if (
          !this._isInnerZone &&
          ((!this._activeElement && !this._defaultFocusElement) || this._activeElement === child)
        ) {
          this._defaultFocusElement = child;
          if (child.getAttribute(TABINDEX) !== '0') {
            child.setAttribute(TABINDEX, '0');
          }
        } else if (child.getAttribute(TABINDEX) !== '-1') {
          child.setAttribute(TABINDEX, '-1');
        }
      }

      this._updateTabIndexes(child);
    }
  }

  private _isContentEditableElement(element: HTMLElement): boolean {
    return element && element.getAttribute('contenteditable') === 'true';
  }

  private _isElementInput(element: HTMLElement): boolean {
    if (
      element &&
      element.tagName &&
      (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea')
    ) {
      return true;
    }
    return false;
  }

  private _shouldInputLoseFocus(element: HTMLInputElement | HTMLTextAreaElement, isForward?: boolean): boolean {
    // If a tab was used, we want to focus on the next element.
    if (
      !this._processingTabKey &&
      element &&
      element.type &&
      ALLOWED_INPUT_TYPES.indexOf(element.type.toLowerCase()) > -1
    ) {
      const selectionStart = element.selectionStart;
      const selectionEnd = element.selectionEnd;
      const isRangeSelected = selectionStart !== selectionEnd;
      const inputValue = element.value;
      const isReadonly = element.readOnly;

      // We shouldn't lose focus in the following cases:
      // 1. There is range selected.
      // 2. When selection start is larger than 0 and it is backward and not readOnly.
      // 3. when selection start is not the end of length, it is forward and not readOnly.
      // 4. We press any of the arrow keys when our handleTabKey isn't none or undefined (only losing focus if we hit
      // tab) and if shouldInputLoseFocusOnArrowKey is defined, if scenario prefers to not loose the focus which is
      // determined by calling the callback shouldInputLoseFocusOnArrowKey
      if (
        isRangeSelected ||
        (selectionStart! > 0 && !isForward && !isReadonly) ||
        (selectionStart !== inputValue.length && isForward && !isReadonly) ||
        (!!this.props.handleTabKey &&
          !(this.props.shouldInputLoseFocusOnArrowKey && this.props.shouldInputLoseFocusOnArrowKey(element)))
      ) {
        return false;
      }
    }

    return true;
  }

  private _shouldWrapFocus(
    element: HTMLElement,
    noWrapDataAttribute: 'data-no-vertical-wrap' | 'data-no-horizontal-wrap',
  ): boolean {
    return this.props.checkForNoWrap ? shouldWrapFocus(element, noWrapDataAttribute) : true;
  }

  /**
   * Returns true if the element is a descendant of the FocusZone through a React portal.
   */
  private _portalContainsElement(element: HTMLElement): boolean {
    return element && !!this._root.current && portalContainsElement(element, this._root.current);
  }

  private _getDocument(): Document {
    return getDocument(this._root.current)!;
  }
}
