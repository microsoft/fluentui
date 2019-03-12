import * as React from 'react';
import { FocusZoneDirection, FocusZoneTabbableElements, IFocusZone, IFocusZoneProps } from './FocusZone.types';
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
  on,
  raiseClick,
  shouldWrapFocus,
  warnDeprecations
} from '../../Utilities';

const IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
const IS_ENTER_DISABLED_ATTRIBUTE = 'data-disable-click-on-enter';
const FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';
const TABINDEX = 'tabindex';
const NO_VERTICAL_WRAP = 'data-no-vertical-wrap';
const NO_HORIZONTAL_WRAP = 'data-no-horizontal-wrap';
const LARGE_DISTANCE_FROM_CENTER = 999999999;
const LARGE_NEGATIVE_DISTANCE_FROM_CENTER = -999999999;

const _allInstances: {
  [key: string]: FocusZone;
} = {};

interface IPoint {
  left: number;
  top: number;
}
const ALLOWED_INPUT_TYPES = ['text', 'number', 'password', 'email', 'tel', 'url', 'search'];

const ALLOW_VIRTUAL_ELEMENTS = false;

export class FocusZone extends React.Component<IFocusZoneProps, {}> implements IFocusZone {
  public static defaultProps: IFocusZoneProps = {
    isCircularNavigation: false,
    direction: FocusZoneDirection.bidirectional
  };

  private _disposables: Function[] = [];
  private _root = React.createRef<HTMLElement>();
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
  private _focusAlignment: IPoint;
  private _isInnerZone: boolean;
  private _parkedTabIndex: string | null | undefined;

  /** Used to allow us to move to next focusable element even when we're focusing on a input element when pressing tab */
  private _processingTabKey: boolean;

  constructor(props: IFocusZoneProps) {
    super(props);

    // Manage componentRef resolution.
    initializeComponentRef(this);

    if (process.env.NODE_ENV !== 'production') {
      warnDeprecations('FocusZone', props, {
        rootProps: undefined,
        allowTabKey: 'handleTabKey',
        elementType: 'as'
      });
    }

    this._id = getId('FocusZone');

    this._focusAlignment = {
      left: 0,
      top: 0
    };

    this._processingTabKey = false;
  }

  public componentDidMount(): void {
    const { current: root } = this._root;

    _allInstances[this._id] = this;

    if (root) {
      const windowElement = root.ownerDocument!.defaultView;

      let parentElement = getParent(root, ALLOW_VIRTUAL_ELEMENTS);

      while (parentElement && parentElement !== document.body && parentElement.nodeType === 1) {
        if (isElementFocusZone(parentElement)) {
          this._isInnerZone = true;
          break;
        }
        parentElement = getParent(parentElement, ALLOW_VIRTUAL_ELEMENTS);
      }

      if (!this._isInnerZone) {
        this._disposables.push(on(windowElement, 'keydown', this._onKeyDownCapture, true), on(root, 'blur', this._onBlur, true));
      }

      // Assign initial tab indexes so that we can set initial focus as appropriate.
      this._updateTabIndexes();

      if (this.props.defaultActiveElement) {
        this._activeElement = getDocument()!.querySelector(this.props.defaultActiveElement) as HTMLElement;
        this.focus();
      }
    }
  }

  public componentDidUpdate(): void {
    const { current: root } = this._root;
    const doc = getDocument(root);

    if (doc && this._lastIndexPath && (doc.activeElement === doc.body || doc.activeElement === root)) {
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

  public componentWillUnmount() {
    delete _allInstances[this._id];

    // Dispose all events.
    this._disposables.forEach(d => d());
  }

  public render() {
    const { rootProps, ariaDescribedBy, ariaLabelledBy, className } = this.props;
    const divProps = getNativeProps(this.props, htmlElementProperties);

    const Tag = this.props.as || this.props.elementType || 'div';

    // Note, right before rendering/reconciling proceeds, we need to record if focus
    // was in the zone before the update. This helper will track this and, if focus
    // was actually in the zone, what the index path to the element is at this time.
    // Then, later in componentDidUpdate, we can evaluate if we need to restore it in
    // the case the element was removed.
    this._evaluateFocusBeforeRender();

    return (
      <Tag
        role="presentation"
        {...divProps}
        {
          // root props has been deprecated and should get removed.
          // it needs to be marked as "any" since root props expects a div element, but really Tag can
          // be any native element so typescript rightly flags this as a problem.
          ...rootProps as any
        }
        className={css('ms-FocusZone', className)}
        ref={this._root}
        data-focuszone-id={this._id}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        onKeyDown={this._onKeyDown}
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
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focus(forceIntoFirstElement: boolean = false): boolean {
    if (this._root.current) {
      if (!forceIntoFirstElement && this._root.current.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' && this._isInnerZone) {
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
        isElementTabbable(this._activeElement)
      ) {
        this._activeElement.focus();
        return true;
      } else {
        const firstChild = this._root.current.firstChild as HTMLElement;

        return this.focusElement(getNextElement(this._root.current, firstChild, true) as HTMLElement);
      }
    }
    return false;
  }

  /**
   * Sets focus to a specific child element within the zone. This can be used in conjunction with
   * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
   * location and then focus.)
   * @param element - The child element within the zone to focus.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focusElement(element: HTMLElement): boolean {
    const { onBeforeFocus } = this.props;

    if (onBeforeFocus && !onBeforeFocus(element)) {
      return false;
    }

    if (element) {
      this._setActiveElement(element);
      if (this._activeElement) {
        this._activeElement.focus();
      }

      return true;
    }

    return false;
  }

  private _evaluateFocusBeforeRender(): void {
    const { current: root } = this._root;
    const doc = getDocument(root);

    if (doc) {
      const focusedElement = doc.activeElement as HTMLElement;

      // Only update the index path if we are not parked on the root.
      if (focusedElement !== root) {
        const shouldRestoreFocus = elementContains(root, focusedElement);

        this._lastIndexPath = shouldRestoreFocus ? getElementIndexPath(root as HTMLElement, doc.activeElement as HTMLElement) : undefined;
      }
    }
  }

  private _onFocus = (ev: React.FocusEvent<HTMLElement>): void => {
    const { onActiveElementChanged, doNotAllowFocusEventToPropagate, onFocusNotification } = this.props;
    const isImmediateDescendant = this._isImmediateDescendantOfZone(ev.target as HTMLElement);
    let newActiveElement: HTMLElement | undefined;

    if (onFocusNotification) {
      onFocusNotification();
    }

    if (isImmediateDescendant) {
      newActiveElement = ev.target as HTMLElement;
    } else {
      let parentElement = ev.target as HTMLElement;

      while (parentElement && parentElement !== this._root.current) {
        if (isElementTabbable(parentElement) && this._isImmediateDescendantOfZone(parentElement)) {
          newActiveElement = parentElement;
          break;
        }
        parentElement = getParent(parentElement, ALLOW_VIRTUAL_ELEMENTS) as HTMLElement;
      }
    }

    if (newActiveElement && newActiveElement !== this._activeElement) {
      this._activeElement = newActiveElement;

      if (isImmediateDescendant) {
        this._setFocusAlignment(this._activeElement);
      }
    }

    if (onActiveElementChanged) {
      onActiveElementChanged(this._activeElement as HTMLElement, ev);
    }

    if (doNotAllowFocusEventToPropagate) {
      ev.stopPropagation();
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
      } else {
        if (!this.props.allowFocusRoot) {
          if (this._parkedTabIndex) {
            root.setAttribute('tabindex', this._parkedTabIndex);
            this._parkedTabIndex = undefined;
          } else {
            root.removeAttribute('tabindex');
          }
        }
      }
    }
  }

  private _onBlur = (): void => {
    this._setParkedFocus(false);
  };

  /**
   * Handle global tab presses so that we can patch tabindexes on the fly.
   */
  private _onKeyDownCapture = (ev: KeyboardEvent): void => {
    if (ev.which === KeyCodes.tab) {
      this._updateTabIndexes();
    }
  };

  private _onMouseDown = (ev: React.MouseEvent<HTMLElement>): void => {
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

      if (target && isElementTabbable(target)) {
        this._setActiveElement(target, true);
      }

      if (isElementFocusZone(target)) {
        // Stop here since the focus zone will take care of its own children.
        break;
      }
    }
  };

  private _setActiveElement(element: HTMLElement, forceAlignemnt?: boolean): void {
    const previousActiveElement = this._activeElement;

    this._activeElement = element;

    if (previousActiveElement) {
      if (isElementFocusZone(previousActiveElement)) {
        this._updateTabIndexes(previousActiveElement);
      }

      previousActiveElement.tabIndex = -1;
    }

    if (this._activeElement) {
      if (!this._focusAlignment || forceAlignemnt) {
        this._setFocusAlignment(element, true, true);
      }

      this._activeElement.tabIndex = 0;
    }
  }

  /**
   * Handle the keystrokes.
   */
  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): boolean | undefined => {
    const { direction, disabled, isInnerZoneKeystroke } = this.props;

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

    if (document.activeElement === this._root.current && this._isInnerZone) {
      // If this element has focus, it is being controlled by a parent.
      // Ignore the keystroke.
      return;
    }

    if (isInnerZoneKeystroke && isInnerZoneKeystroke(ev) && this._isImmediateDescendantOfZone(ev.target as HTMLElement)) {
      // Try to focus
      const innerZone = this._getFirstInnerZone();

      if (innerZone) {
        if (!innerZone.focus(true)) {
          return;
        }
      } else if (isElementFocusSubZone(ev.target as HTMLElement)) {
        if (
          !this.focusElement(getNextElement(
            ev.target as HTMLElement,
            (ev.target as HTMLElement).firstChild as HTMLElement,
            true
          ) as HTMLElement)
        ) {
          return;
        }
      } else {
        return;
      }
    } else if (ev.altKey) {
      return;
    } else {
      switch (ev.which) {
        case KeyCodes.space:
          if (this._tryInvokeClickForFocusable(ev.target as HTMLElement)) {
            break;
          }
          return;

        case KeyCodes.left:
          if (direction !== FocusZoneDirection.vertical && this._moveFocusLeft()) {
            break;
          }
          return;

        case KeyCodes.right:
          if (direction !== FocusZoneDirection.vertical && this._moveFocusRight()) {
            break;
          }
          return;

        case KeyCodes.up:
          if (direction !== FocusZoneDirection.horizontal && this._moveFocusUp()) {
            break;
          }
          return;

        case KeyCodes.down:
          if (direction !== FocusZoneDirection.horizontal && this._moveFocusDown()) {
            break;
          }
          return;

        case KeyCodes.tab:
          if (
            this.props.allowTabKey ||
            this.props.handleTabKey === FocusZoneTabbableElements.all ||
            (this.props.handleTabKey === FocusZoneTabbableElements.inputOnly && this._isElementInput(ev.target as HTMLElement))
          ) {
            let focusChanged = false;
            this._processingTabKey = true;
            if (
              direction === FocusZoneDirection.vertical ||
              !this._shouldWrapFocus(this._activeElement as HTMLElement, NO_HORIZONTAL_WRAP)
            ) {
              focusChanged = ev.shiftKey ? this._moveFocusUp() : this._moveFocusDown();
            } else if (direction === FocusZoneDirection.horizontal || direction === FocusZoneDirection.bidirectional) {
              const tabWithDirection = getRTL() ? !ev.shiftKey : ev.shiftKey;
              focusChanged = tabWithDirection ? this._moveFocusLeft() : this._moveFocusRight();
            }
            this._processingTabKey = false;
            if (focusChanged) {
              break;
            }
          }
          return;

        case KeyCodes.home:
          if (this._isElementInput(ev.target as HTMLElement) && !this._shouldInputLoseFocus(ev.target as HTMLInputElement, false)) {
            return false;
          }
          const firstChild = this._root.current && (this._root.current.firstChild as HTMLElement | null);
          if (this._root.current && firstChild && this.focusElement(getNextElement(this._root.current, firstChild, true) as HTMLElement)) {
            break;
          }
          return;

        case KeyCodes.end:
          if (this._isElementInput(ev.target as HTMLElement) && !this._shouldInputLoseFocus(ev.target as HTMLInputElement, true)) {
            return false;
          }

          const lastChild = this._root.current && (this._root.current.lastChild as HTMLElement | null);
          if (this._root.current && this.focusElement(getPreviousElement(this._root.current, lastChild, true, true, true) as HTMLElement)) {
            break;
          }
          return;

        case KeyCodes.enter:
          if (this._tryInvokeClickForFocusable(ev.target as HTMLElement)) {
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
  private _tryInvokeClickForFocusable(target: HTMLElement): boolean {
    if (target === this._root.current) {
      return false;
    }

    do {
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return false;
      }

      if (
        this._isImmediateDescendantOfZone(target) &&
        target.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' &&
        target.getAttribute(IS_ENTER_DISABLED_ATTRIBUTE) !== 'true'
      ) {
        raiseClick(target);
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
    getDistanceFromCenter: (activeRect: ClientRect, targetRect: ClientRect) => number,
    ev?: Event,
    useDefaultWrap: boolean = true
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
      element = (isForward ? getNextElement(this._root.current, element) : getPreviousElement(this._root.current, element)) as HTMLElement;

      if (isBidirectional) {
        if (element) {
          const targetRect = element.getBoundingClientRect();
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
        return this.focusElement(getNextElement(
          this._root.current,
          this._root.current.firstElementChild as HTMLElement,
          true
        ) as HTMLElement);
      } else {
        return this.focusElement(getPreviousElement(
          this._root.current,
          this._root.current.lastElementChild as HTMLElement,
          true,
          true,
          true
        ) as HTMLElement);
      }
    }

    return changedFocus;
  }

  private _moveFocusDown(): boolean {
    let targetTop = -1;
    const leftAlignment = this._focusAlignment.left;

    if (
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
    const leftAlignment = this._focusAlignment.left;

    if (
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

  private _moveFocusLeft(): boolean {
    const shouldWrap = this._shouldWrapFocus(this._activeElement as HTMLElement, NO_HORIZONTAL_WRAP);
    if (
      this._moveFocus(
        getRTL(),
        (activeRect: ClientRect, targetRect: ClientRect) => {
          let distance = -1;
          let topBottomComparison;

          if (getRTL()) {
            // When in RTL, this comparison should be the same as the one in _moveFocusRight for LTR.
            // Going left at a leftmost rectangle will go down a line instead of up a line like in LTR.
            // This is important, because we want to be comparing the top of the target rect
            // with the bottom of the active rect.
            topBottomComparison = targetRect.top.toFixed(3) < activeRect.bottom.toFixed(3);
          } else {
            topBottomComparison = targetRect.bottom.toFixed(3) > activeRect.top.toFixed(3);
          }

          if (topBottomComparison && targetRect.right <= activeRect.right && this.props.direction !== FocusZoneDirection.vertical) {
            distance = activeRect.right - targetRect.right;
          } else {
            if (!shouldWrap) {
              distance = LARGE_NEGATIVE_DISTANCE_FROM_CENTER;
            }
          }

          return distance;
        },
        undefined /*ev*/,
        shouldWrap
      )
    ) {
      this._setFocusAlignment(this._activeElement as HTMLElement, true, false);
      return true;
    }

    return false;
  }

  private _moveFocusRight(): boolean {
    const shouldWrap = this._shouldWrapFocus(this._activeElement as HTMLElement, NO_HORIZONTAL_WRAP);
    if (
      this._moveFocus(
        !getRTL(),
        (activeRect: ClientRect, targetRect: ClientRect) => {
          let distance = -1;
          let topBottomComparison;

          if (getRTL()) {
            // When in RTL, this comparison should be the same as the one in _moveFocusLeft for LTR.
            // Going right at a rightmost rectangle will go up a line instead of down a line like in LTR.
            // This is important, because we want to be comparing the bottom of the target rect
            // with the top of the active rect.
            topBottomComparison = targetRect.bottom.toFixed(3) > activeRect.top.toFixed(3);
          } else {
            topBottomComparison = targetRect.top.toFixed(3) < activeRect.bottom.toFixed(3);
          }

          if (topBottomComparison && targetRect.left >= activeRect.left && this.props.direction !== FocusZoneDirection.vertical) {
            distance = targetRect.left - activeRect.left;
          } else if (!shouldWrap) {
            distance = LARGE_NEGATIVE_DISTANCE_FROM_CENTER;
          }

          return distance;
        },
        undefined /*ev*/,
        shouldWrap
      )
    ) {
      this._setFocusAlignment(this._activeElement as HTMLElement, true, false);
      return true;
    }

    return false;
  }

  private _setFocusAlignment(element: HTMLElement, isHorizontal?: boolean, isVertical?: boolean) {
    if (this.props.direction === FocusZoneDirection.bidirectional && (!this._focusAlignment || isHorizontal || isVertical)) {
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

    while (parentElement && parentElement !== this._root.current && parentElement !== document.body) {
      if (isElementFocusZone(parentElement)) {
        return parentElement;
      }

      parentElement = getParent(parentElement, ALLOW_VIRTUAL_ELEMENTS);
    }

    return this._root.current;
  }

  private _updateTabIndexes(element?: HTMLElement) {
    if (!element && this._root.current) {
      this._defaultFocusElement = null;
      element = this._root.current;
      if (this._activeElement && !elementContains(element, this._activeElement)) {
        this._activeElement = null;
      }
    }

    // If active element changes state to disabled, set it to null.
    // Otherwise, we lose keyboard accessibility to other elements in focus zone.
    if (this._activeElement && !isElementTabbable(this._activeElement)) {
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

        if (isElementTabbable(child)) {
          if (this.props.disabled) {
            child.setAttribute(TABINDEX, '-1');
          } else if (!this._isInnerZone && ((!this._activeElement && !this._defaultFocusElement) || this._activeElement === child)) {
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
        if (!this._isInnerZone && ((!this._activeElement && !this._defaultFocusElement) || this._activeElement === child)) {
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

  private _isElementInput(element: HTMLElement): boolean {
    if (element && element.tagName && (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea')) {
      return true;
    }
    return false;
  }

  private _shouldInputLoseFocus(element: HTMLInputElement, isForward?: boolean) {
    // If a tab was used, we want to focus on the next element.
    if (!this._processingTabKey && element && element.type && ALLOWED_INPUT_TYPES.indexOf(element.type.toLowerCase()) > -1) {
      const selectionStart = element.selectionStart;
      const selectionEnd = element.selectionEnd;
      const isRangeSelected = selectionStart !== selectionEnd;
      const inputValue = element.value;

      // We shouldn't lose focus in the following cases:
      // 1. There is range selected.
      // 2. When selection start is larger than 0 and it is backward.
      // 3. when selection start is not the end of length and it is forward.
      // 4. We press any of the arrow keys when our handleTabKey isn't none or undefined (only losing focus if we hit tab)
      // and if shouldInputLoseFocusOnArrowKey is defined, if scenario prefers to not loose the focus which is determined by calling the
      // callback shouldInputLoseFocusOnArrowKey
      if (
        isRangeSelected ||
        (selectionStart! > 0 && !isForward) ||
        (selectionStart !== inputValue.length && isForward) ||
        (!!this.props.handleTabKey && !(this.props.shouldInputLoseFocusOnArrowKey && this.props.shouldInputLoseFocusOnArrowKey(element)))
      ) {
        return false;
      }
    }

    return true;
  }

  private _shouldWrapFocus(element: HTMLElement, noWrapDataAttribute: 'data-no-vertical-wrap' | 'data-no-horizontal-wrap'): boolean {
    return !!this.props.checkForNoWrap ? shouldWrapFocus(element, noWrapDataAttribute) : true;
  }
}
