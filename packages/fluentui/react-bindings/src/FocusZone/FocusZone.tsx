import {
  FocusZoneDirection,
  FocusZoneTabbableElements,
  IS_ENTER_DISABLED_ATTRIBUTE,
  IS_FOCUSABLE_ATTRIBUTE,
  getCode,
  keyboardKey,
  SpacebarKey,
} from '@fluentui/accessibility';
import * as React from 'react';
import cx from 'classnames';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';

import { getDocument } from '../utils/getDocument';
import { getWindow } from '../utils/getWindow';
import { findScrollableParent } from '../utils/findScrollableParent';
import { shouldWrapFocus } from '../utils/shouldWrapFocus';

import { elementContains, getParent } from '@fluentui/dom-utilities';

import { getElementType } from '../utils/getElementType';
import { getUnhandledProps } from '../utils/getUnhandledProps';
import { FocusZoneProps, IFocusZone } from './FocusZone.types';
import {
  getNextElement,
  getPreviousElement,
  isElementFocusZone,
  isElementFocusSubZone,
  isElementTabbable,
  getElementIndexPath,
  getFocusableByIndexPath,
  FOCUSZONE_ID_ATTRIBUTE,
} from './focusUtilities';
import { handleRef } from '@fluentui/react-component-ref';

const TABINDEX = 'tabindex';
const NO_VERTICAL_WRAP = 'data-no-vertical-wrap';
const NO_HORIZONTAL_WRAP = 'data-no-horizontal-wrap';
const LARGE_DISTANCE_FROM_CENTER = 999999999;
const LARGE_NEGATIVE_DISTANCE_FROM_CENTER = -999999999;

const _allInstances: {
  [key: string]: FocusZone;
} = {};

const outerZones = {
  _windowToOuterZoneMap: new Map<Window, Set<FocusZone>>(),
  register(window: Window, FZ: FocusZone) {
    if (this._windowToOuterZoneMap.get(window)) {
      this._windowToOuterZoneMap.get(window)?.add(FZ);
    } else {
      this._windowToOuterZoneMap.set(window, new Set([FZ]));
    }

    return this._windowToOuterZoneMap.get(window)?.size;
  },
  unregister(window: Window, FZ: FocusZone) {
    this._windowToOuterZoneMap.get(window)?.delete(FZ);
    if (this._windowToOuterZoneMap.get(window)?.size === 0) {
      this._windowToOuterZoneMap.delete(window);
    }
  },
  getOutZone(window: Window) {
    return this._windowToOuterZoneMap.get(window);
  },
};

interface Point {
  left: number;
  top: number;
}
const ALLOWED_INPUT_TYPES = ['text', 'number', 'password', 'email', 'tel', 'url', 'search'];

const ALLOW_VIRTUAL_ELEMENTS = false;

/**
 * Raises a click on a target element based on a keyboard event.
 */
function _raiseClickFromKeyboardEvent(target: Element, ev?: React.KeyboardEvent<HTMLElement>): void {
  const event = new MouseEvent('click', {
    ctrlKey: ev?.ctrlKey,
    metaKey: ev?.metaKey,
    shiftKey: ev?.shiftKey,
    altKey: ev?.altKey,
    bubbles: ev?.bubbles,
    cancelable: ev?.cancelable,
  });

  target.dispatchEvent(event);
}

/**
 * Handle global tab presses so that we can patch tabindexes on the fly.
 */
function _onKeyDownCapture(ev: KeyboardEvent) {
  if (getCode(ev) === keyboardKey.Tab) {
    outerZones.getOutZone(getWindow(ev.target as Element)!)?.forEach(zone => zone.updateTabIndexes());
  }
}

export class FocusZone extends React.Component<FocusZoneProps> implements IFocusZone {
  static propTypes = {
    className: PropTypes.string,
    direction: PropTypes.number,
    defaultTabbableElement: PropTypes.func,
    shouldFocusOnMount: PropTypes.bool,
    shouldResetActiveElementWhenTabFromZone: PropTypes.bool,
    shouldRaiseClicks: PropTypes.bool,
    shouldFocusInnerElementWhenReceivedFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    as: PropTypes.elementType as PropTypes.Requireable<React.ElementType>,
    isCircularNavigation: PropTypes.bool,
    shouldEnterInnerZone: PropTypes.func,
    onActiveElementChanged: PropTypes.func,
    shouldReceiveFocus: PropTypes.func,
    handleTabKey: PropTypes.number,
    shouldInputLoseFocusOnArrowKey: PropTypes.func,
    stopFocusPropagation: PropTypes.bool,
    onFocus: PropTypes.func,
    preventDefaultWhenHandled: PropTypes.bool,
    isRtl: PropTypes.bool,
    preventFocusRestoration: PropTypes.bool,
    pagingSupportDisabled: PropTypes.bool,
    shouldIgnoreNotFocusable: PropTypes.bool,
    innerRef: PropTypes.any,
  };

  static defaultProps: FocusZoneProps = {
    isCircularNavigation: false,
    direction: FocusZoneDirection.bidirectional,
    as: 'div',
    preventDefaultWhenHandled: true,
    shouldRaiseClicks: false,
  };

  static displayName = 'FocusZone';
  static className = 'ms-FocusZone';

  static outerZones = outerZones;

  _root: { current: HTMLElement | null } = { current: null };
  _id: string;
  /** The most recently focused child element. */
  _activeElement: HTMLElement | null;

  /**
   * The index path to the last focused child element.
   */
  _lastIndexPath: number[] | undefined;

  /**
   * Flag to define when we've intentionally parked focus on the root element to temporarily
   * hold focus until items appear within the zone.
   */
  _isParked: boolean = false;
  _parkedTabIndex: string | null | undefined;

  /** The child element with tabindex=0. */
  _defaultFocusElement: HTMLElement | null;
  _focusAlignment: Point;
  _isInnerZone: boolean;

  /** Used to allow us to move to next focusable element even when we're focusing on a input element when pressing tab */
  _processingTabKey: boolean;

  windowElement: Window | null;

  constructor(props: FocusZoneProps) {
    super(props);

    this._id = _.uniqueId('FocusZone');

    this._focusAlignment = {
      left: 0,
      top: 0,
    };

    this._processingTabKey = false;
  }

  componentDidMount(): void {
    _allInstances[this._id] = this;

    if (!this._root.current) {
      return;
    }

    // @ts-ignore
    this.windowElement = getWindow(this._root.current);
    let parentElement = getParent(this._root.current, ALLOW_VIRTUAL_ELEMENTS);
    const doc = getDocument(this._root.current);

    // @ts-ignore
    while (parentElement && parentElement !== doc.body && parentElement.nodeType === 1) {
      if (isElementFocusZone(parentElement)) {
        this._isInnerZone = true;
        break;
      }
      parentElement = getParent(parentElement, ALLOW_VIRTUAL_ELEMENTS);
    }

    if (!this._isInnerZone && this.windowElement) {
      outerZones.register(this.windowElement, this);

      if (outerZones.getOutZone(this.windowElement)?.size === 1) {
        this.windowElement.addEventListener('keydown', _onKeyDownCapture, true);
      }
    }

    this._root.current.addEventListener('blur', this._onBlur, true);

    // Assign initial tab indexes so that we can set initial focus as appropriate.
    this.updateTabIndexes();

    if (this.props.defaultTabbableElement && typeof this.props.defaultTabbableElement === 'string') {
      this._activeElement = this.getDocument().querySelector(this.props.defaultTabbableElement) as HTMLElement;
    }

    if (this.props.shouldFocusOnMount) {
      this.focus();
    }
  }

  componentDidUpdate(): void {
    if (!this._root.current) {
      return;
    }
    const doc = getDocument(this._root.current);

    if (
      !this.props.preventFocusRestoration &&
      doc &&
      this._lastIndexPath &&
      (doc.activeElement === doc.body || doc.activeElement === null || doc.activeElement === this._root.current)
    ) {
      // The element has been removed after the render, attempt to restore focus.
      const elementToFocus = getFocusableByIndexPath(this._root.current as HTMLElement, this._lastIndexPath);

      if (elementToFocus) {
        this.setActiveElement(elementToFocus, true);
        elementToFocus.focus();
        this.setParkedFocus(false);
      } else {
        // We had a focus path to restore, but now that path is unresolvable. Park focus
        // on the container until we can try again.
        this.setParkedFocus(true);
      }
    }
  }

  componentWillUnmount() {
    delete _allInstances[this._id];
    outerZones.unregister(this.windowElement!, this);

    if (!this._isInnerZone) {
      if (this.windowElement && !outerZones.getOutZone(this.windowElement)) {
        this.windowElement.removeEventListener('keydown', _onKeyDownCapture, true);
      }
    }

    if (this._root.current) {
      this._root.current.removeEventListener('blur', this._onBlur, true);
    }

    this._activeElement = null;
    this._defaultFocusElement = null;
  }

  render() {
    const { className } = this.props;

    const ElementType = getElementType(this.props);
    const unhandledProps = getUnhandledProps(_.keys(FocusZone.propTypes) as any, this.props);

    // Note, right before rendering/reconciling proceeds, we need to record if focus
    // was in the zone before the update. This helper will track this and, if focus
    // was actually in the zone, what the index path to the element is at this time.
    // Then, later in componentDidUpdate, we can evaluate if we need to restore it in
    // the case the element was removed.
    this.evaluateFocusBeforeRender();
    return (
      <ElementType
        {...unhandledProps}
        ref={this.setRef}
        className={cx(FocusZone.className, className)}
        data-focuszone-id={this._id}
        onKeyDown={this._onKeyDown}
        onFocus={this._onFocus}
        onMouseDownCapture={this._onMouseDown}
      >
        {this.props.children}
      </ElementType>
    );
  }

  /**
   * Sets focus to the first tabbable item in the zone.
   * @param forceIntoFirstElement - If true, focus will be forced into the first element, even if focus is already in the focus zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focus(forceIntoFirstElement: boolean = false): boolean {
    if (this._root.current) {
      if (
        !forceIntoFirstElement &&
        this._root.current.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' &&
        this._isInnerZone
      ) {
        const ownerZoneElement = this.getOwnerZone(this._root.current) as HTMLElement;

        if (ownerZoneElement !== this._root.current) {
          const ownerZone = _allInstances[ownerZoneElement.getAttribute(FOCUSZONE_ID_ATTRIBUTE) as string];

          return !!ownerZone && ownerZone.focusElement(this._root.current);
        }

        return false;
      }
      if (
        !forceIntoFirstElement &&
        this._activeElement &&
        elementContains(this._root.current, this._activeElement, ALLOW_VIRTUAL_ELEMENTS) &&
        isElementTabbable(this._activeElement)
      ) {
        this._activeElement.focus();
        return true;
      }

      const firstChild = this._root.current.firstChild as HTMLElement;

      return this.focusElement(getNextElement(this._root.current, firstChild, true) as HTMLElement);
    }
    return false;
  }

  /**
   * Sets focus to the last tabbable item in the zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focusLast(): boolean {
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
  focusElement(element: HTMLElement, forceAlignment?: boolean): boolean {
    const { shouldReceiveFocus } = this.props;

    if (shouldReceiveFocus && !shouldReceiveFocus(element)) {
      return false;
    }

    if (element) {
      this.setActiveElement(element, forceAlignment);
      if (this._activeElement) {
        this._activeElement.focus();
      }

      return true;
    }

    return false;
  }

  setRef = (elem: HTMLElement): void => {
    this._root.current = elem;
    handleRef(this.props.innerRef, elem);
    if (process.env.NODE_ENV !== 'production') {
      if (elem !== null && !(elem?.nodeType === 1)) {
        throw new Error(
          'FocusZone: we expect that ElementType ("as" prop) will be a plain element (div, span, etc.) or an element that supports ref forwarding (React.forwardRef())',
        );
      }
    }
  };

  // Record if focus was in the zone, what the index path to the element is at this time.
  evaluateFocusBeforeRender(): void {
    if (!this._root.current) {
      return;
    }
    const doc = getDocument(this._root.current);

    if (!doc) {
      return;
    }

    const focusedElement = doc.activeElement as HTMLElement;

    // Only update the index path if we are not parked on the root.
    if (focusedElement !== this._root.current) {
      const shouldRestoreFocus = elementContains(this._root.current, focusedElement, ALLOW_VIRTUAL_ELEMENTS);

      this._lastIndexPath = shouldRestoreFocus
        ? getElementIndexPath(this._root.current as HTMLElement, doc.activeElement as HTMLElement)
        : undefined;
    }
  }

  /**
   * When focus is in the zone at render time but then all focusable elements are removed,
   * we "park" focus temporarily on the root. Once we update with focusable children, we restore
   * focus to the closest path from previous. If the user tabs away from the parked container,
   * we restore focusability to the pre-parked state.
   */
  setParkedFocus(isParked: boolean): void {
    if (this._root.current && this._isParked !== isParked) {
      this._isParked = isParked;

      if (isParked) {
        if (!this.props.allowFocusRoot) {
          this._parkedTabIndex = this._root.current.getAttribute('tabindex');
          this._root.current.setAttribute('tabindex', '-1');
        }
        this._root.current.focus();
      } else if (!this.props.allowFocusRoot) {
        if (this._parkedTabIndex) {
          this._root.current.setAttribute('tabindex', this._parkedTabIndex);
          this._parkedTabIndex = undefined;
        } else {
          this._root.current.removeAttribute('tabindex');
        }
      }
    }
  }

  _onBlur = () => {
    this.setParkedFocus(false);
  };

  _onFocus = (ev: React.FocusEvent<HTMLElement>): void => {
    const {
      onActiveElementChanged,
      stopFocusPropagation,
      shouldFocusInnerElementWhenReceivedFocus,
      defaultTabbableElement,
      shouldIgnoreNotFocusable,
    } = this.props;

    if (shouldIgnoreNotFocusable && ev.target?.dataset.isFocusable === 'false') {
      return;
    }

    let newActiveElement: HTMLElement | null | undefined;
    const isImmediateDescendant = this.isImmediateDescendantOfZone(ev.target as HTMLElement);

    if (isImmediateDescendant) {
      newActiveElement = ev.target as HTMLElement;
    } else {
      let parentElement = ev.target as HTMLElement;

      while (parentElement && parentElement !== this._root.current) {
        if (isElementTabbable(parentElement) && this.isImmediateDescendantOfZone(parentElement)) {
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
      if (maybeElementToFocus && isElementTabbable(maybeElementToFocus)) {
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

    if (newActiveElement && newActiveElement !== this._activeElement) {
      this._activeElement = newActiveElement;

      if (isImmediateDescendant) {
        this.setFocusAlignment(this._activeElement);
        this.updateTabIndexes();
      }
    }

    if (onActiveElementChanged) {
      onActiveElementChanged(this._activeElement as HTMLElement, ev);
    }

    if (stopFocusPropagation) {
      ev.stopPropagation();
    }

    _.invoke(this.props, 'onFocus', ev);
  };

  _onMouseDown = (ev: React.MouseEvent<HTMLElement>): void => {
    const { disabled } = this.props;

    if (disabled) {
      return;
    }

    let target = ev.target as HTMLElement;
    const path: HTMLElement[] = [];

    while (target && target !== this._root.current) {
      path.push(target);
      target = getParent(target, ALLOW_VIRTUAL_ELEMENTS) as HTMLElement;
    }

    while (path.length) {
      target = path.pop() as HTMLElement;

      if (target && isElementTabbable(target)) {
        this.setActiveElement(target, true);
      }

      if (isElementFocusZone(target)) {
        // Stop here since the focus zone will take care of its own children.
        break;
      }
    }
  };

  setActiveElement(element: HTMLElement, forceAlignment?: boolean): void {
    const previousActiveElement = this._activeElement;

    this._activeElement = element;

    if (previousActiveElement) {
      if (isElementFocusZone(previousActiveElement)) {
        this.updateTabIndexes(previousActiveElement);
      }

      previousActiveElement.tabIndex = -1;
    }

    if (this._activeElement) {
      if (!this._focusAlignment || forceAlignment) {
        this.setFocusAlignment(element, true, true);
      }

      this._activeElement.tabIndex = 0;
    }
  }

  preventDefaultWhenHandled(ev: React.KeyboardEvent<HTMLElement>): void {
    this.props.preventDefaultWhenHandled && ev.preventDefault();
  }

  /**
   * Handle the keystrokes.
   */
  _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): boolean | undefined => {
    const { direction, disabled, shouldEnterInnerZone, pagingSupportDisabled } = this.props;

    if (disabled) {
      return undefined;
    }

    const doc = getDocument(this._root.current);

    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
    }

    // @ts-ignore
    if (doc.activeElement === this._root.current && this._isInnerZone) {
      // If this element has focus, it is being controlled by a parent.
      // Ignore the keystroke.
      return undefined;
    }

    // If the default has been prevented, do not process keyboard events.
    if (ev.isDefaultPrevented()) {
      return undefined;
    }

    if (
      shouldEnterInnerZone &&
      shouldEnterInnerZone(ev) &&
      this.isImmediateDescendantOfZone(ev.target as HTMLElement)
    ) {
      // Try to focus
      const innerZone = this.getFirstInnerZone();

      if (innerZone) {
        if (!innerZone.focus(true)) {
          return undefined;
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
          return undefined;
        }
      } else {
        return undefined;
      }
    } else if (ev.altKey) {
      return undefined;
    } else {
      switch (getCode(ev)) {
        case SpacebarKey:
          // @ts-ignore
          if (this.tryInvokeClickForFocusable(ev.target as HTMLElement, ev)) {
            break;
          }
          return undefined;

        case keyboardKey.ArrowLeft:
          if (direction !== FocusZoneDirection.vertical) {
            this.preventDefaultWhenHandled(ev);
            if (this.moveFocusLeft()) {
              break;
            }
          }
          return undefined;

        case keyboardKey.ArrowRight:
          if (direction !== FocusZoneDirection.vertical) {
            this.preventDefaultWhenHandled(ev);
            if (this.moveFocusRight()) {
              break;
            }
          }
          return undefined;

        case keyboardKey.ArrowUp:
          if (direction !== FocusZoneDirection.horizontal) {
            this.preventDefaultWhenHandled(ev);
            if (this.moveFocusUp()) {
              break;
            }
          }
          return undefined;

        case keyboardKey.ArrowDown:
          if (direction !== FocusZoneDirection.horizontal) {
            this.preventDefaultWhenHandled(ev);
            if (this.moveFocusDown()) {
              break;
            }
          }
          return undefined;

        case keyboardKey.PageDown:
          if (!pagingSupportDisabled && this.moveFocusPaging(true)) {
            break;
          }
          return undefined;

        case keyboardKey.PageUp:
          if (!pagingSupportDisabled && this.moveFocusPaging(false)) {
            break;
          }
          return undefined;

        case keyboardKey.Tab:
          if (
            this.props.handleTabKey === FocusZoneTabbableElements.all ||
            (this.props.handleTabKey === FocusZoneTabbableElements.inputOnly &&
              this.isElementInput(ev.target as HTMLElement))
          ) {
            let focusChanged = false;
            this._processingTabKey = true;
            if (
              direction === FocusZoneDirection.vertical ||
              !this.shouldWrapFocus(this._activeElement as HTMLElement, NO_HORIZONTAL_WRAP)
            ) {
              focusChanged = ev.shiftKey ? this.moveFocusUp() : this.moveFocusDown();
            } else {
              const tabWithDirection = this.props.isRtl ? !ev.shiftKey : ev.shiftKey;
              focusChanged = tabWithDirection ? this.moveFocusLeft() : this.moveFocusRight();
            }
            this._processingTabKey = false;
            if (focusChanged) {
              break;
            }
          } else if (this.props.shouldResetActiveElementWhenTabFromZone) {
            this._activeElement = null;
          }
          return undefined;

        case keyboardKey.Home:
          if (
            this.isContentEditableElement(ev.target as HTMLElement) ||
            (this.isElementInput(ev.target as HTMLElement) &&
              !this.shouldInputLoseFocus(ev.target as HTMLInputElement, false))
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
          return undefined;

        case keyboardKey.End:
          if (
            this.isContentEditableElement(ev.target as HTMLElement) ||
            (this.isElementInput(ev.target as HTMLElement) &&
              !this.shouldInputLoseFocus(ev.target as HTMLInputElement, false))
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
          return undefined;

        case keyboardKey.Enter:
          // @ts-ignore
          if (this.tryInvokeClickForFocusable(ev.target as HTMLElement, ev)) {
            break;
          }
          return undefined;

        default:
          return undefined;
      }
    }

    ev.preventDefault();
    ev.stopPropagation();

    return undefined;
  };

  /**
   * Walk up the dom try to find a focusable element.
   */
  tryInvokeClickForFocusable(targetElement: HTMLElement, ev?: React.KeyboardEvent<HTMLElement>): boolean {
    let target = targetElement;

    if (target === this._root.current || !this.props.shouldRaiseClicks) {
      return false;
    }

    do {
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        return false;
      }

      if (
        this.isImmediateDescendantOfZone(target) &&
        target.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' &&
        target.getAttribute(IS_ENTER_DISABLED_ATTRIBUTE) !== 'true'
      ) {
        _raiseClickFromKeyboardEvent(target, ev);
        return true;
      }

      target = getParent(target, ALLOW_VIRTUAL_ELEMENTS) as HTMLElement;
    } while (target !== this._root.current);

    return false;
  }

  /**
   * Traverse to find first child zone.
   */
  getFirstInnerZone(forRootElement?: HTMLElement | null): FocusZone | null {
    const rootElement = forRootElement || this._activeElement || this._root.current;

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
      const match = this.getFirstInnerZone(child);

      if (match) {
        return match;
      }

      child = child.nextElementSibling as HTMLElement | null;
    }

    return null;
  }

  moveFocus(
    isForward: boolean,
    getDistanceFromCenter: (activeRect: ClientRect, targetRect: ClientRect) => number,
    // @ts-ignore
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

    if (this.isElementInput(element)) {
      if (!this.shouldInputLoseFocus(element as HTMLInputElement, isForward)) {
        return false;
      }
    }

    const activeRect = isBidirectional ? element.getBoundingClientRect() : null;

    do {
      element = (isForward
        ? getNextElement(this._root.current, element)
        : getPreviousElement(this._root.current, element)) as HTMLElement;

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

  moveFocusDown(): boolean {
    let targetTop = -1;
    const leftAlignment = this._focusAlignment.left;

    if (
      this.moveFocus(true, (activeRect: ClientRect, targetRect: ClientRect) => {
        let distance = -1;
        // ClientRect values can be floats that differ by very small fractions of a decimal.
        // If the difference between top and bottom are within a pixel then we should treat
        // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
        // but without Math.Floor they will be handled incorrectly.
        const targetRectTop = Math.floor(targetRect.top);
        const activeRectBottom = Math.floor(activeRect.bottom);

        if (targetRectTop < activeRectBottom) {
          if (!this.shouldWrapFocus(this._activeElement as HTMLElement, NO_VERTICAL_WRAP)) {
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
      this.setFocusAlignment(this._activeElement as HTMLElement, true, true);
      return true;
    }

    return false;
  }

  moveFocusUp(): boolean {
    let targetTop = -1;
    const leftAlignment = this._focusAlignment.left;

    if (
      this.moveFocus(false, (activeRect: ClientRect, targetRect: ClientRect) => {
        let distance = -1;
        // ClientRect values can be floats that differ by very small fractions of a decimal.
        // If the difference between top and bottom are within a pixel then we should treat
        // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
        // but without Math.Floor they will be handled incorrectly.
        const targetRectBottom = Math.floor(targetRect.bottom);
        const targetRectTop = Math.floor(targetRect.top);
        const activeRectTop = Math.floor(activeRect.top);

        if (targetRectBottom > activeRectTop) {
          if (!this.shouldWrapFocus(this._activeElement as HTMLElement, NO_VERTICAL_WRAP)) {
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
      this.setFocusAlignment(this._activeElement as HTMLElement, true, true);
      return true;
    }

    return false;
  }

  moveFocusLeft(): boolean {
    const shouldWrap = this.shouldWrapFocus(this._activeElement as HTMLElement, NO_HORIZONTAL_WRAP);
    if (
      this.moveFocus(
        // @ts-ignore
        this.props.isRtl,
        (activeRect: ClientRect, targetRect: ClientRect) => {
          let distance = -1;
          let topBottomComparison;

          if (this.props.isRtl) {
            // When in RTL, this comparison should be the same as the one in moveFocusRight for LTR.
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
        undefined /* ev */,
        shouldWrap,
      )
    ) {
      this.setFocusAlignment(this._activeElement as HTMLElement, true, false);
      return true;
    }

    return false;
  }

  moveFocusRight(): boolean {
    const shouldWrap = this.shouldWrapFocus(this._activeElement as HTMLElement, NO_HORIZONTAL_WRAP);
    if (
      this.moveFocus(
        !this.props.isRtl,
        (activeRect: ClientRect, targetRect: ClientRect) => {
          let distance = -1;
          let topBottomComparison;

          if (this.props.isRtl) {
            // When in RTL, this comparison should be the same as the one in moveFocusLeft for LTR.
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
        undefined /* ev */,
        shouldWrap,
      )
    ) {
      this.setFocusAlignment(this._activeElement as HTMLElement, true, false);
      return true;
    }

    return false;
  }

  getHorizontalDistanceFromCenter = (isForward: boolean, activeRect: ClientRect, targetRect: ClientRect): number => {
    const leftAlignment = this._focusAlignment.left;
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

    if (!this.shouldWrapFocus(this._activeElement as HTMLElement, NO_VERTICAL_WRAP)) {
      return LARGE_NEGATIVE_DISTANCE_FROM_CENTER;
    }
    return LARGE_DISTANCE_FROM_CENTER;
  };

  moveFocusPaging(isForward: boolean, useDefaultWrap: boolean = true): boolean {
    let element = this._activeElement;
    if (!element || !this._root.current) {
      return false;
    }
    if (this.isElementInput(element)) {
      if (!this.shouldInputLoseFocus(element as HTMLInputElement, isForward)) {
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
        const elementDistance = this.getHorizontalDistanceFromCenter(isForward, activeRect, targetRect);
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
      this.setFocusAlignment(candidateElement as HTMLElement, false, true);
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

  setFocusAlignment(element: HTMLElement, isHorizontal?: boolean, isVertical?: boolean) {
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

  isImmediateDescendantOfZone(element?: HTMLElement): boolean {
    return this.getOwnerZone(element) === this._root.current;
  }

  getOwnerZone(element?: HTMLElement): HTMLElement | null {
    const doc = getDocument(this._root.current);
    let parentElement = getParent(element as HTMLElement, ALLOW_VIRTUAL_ELEMENTS);

    // @ts-ignore
    while (parentElement && parentElement !== this._root.current && parentElement !== doc.body) {
      if (isElementFocusZone(parentElement)) {
        return parentElement;
      }

      parentElement = getParent(parentElement, ALLOW_VIRTUAL_ELEMENTS);
    }

    return this._root.current;
  }

  updateTabIndexes(onElement?: HTMLElement) {
    let element = onElement;

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
      if (this._activeElement && !elementContains(element, this._activeElement, ALLOW_VIRTUAL_ELEMENTS)) {
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

      this.updateTabIndexes(child);
    }
  }

  isContentEditableElement(element: HTMLElement): boolean {
    return element && element.getAttribute('contenteditable') === 'true';
  }

  isElementInput(element: HTMLElement): boolean {
    if (
      element &&
      element.tagName &&
      (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea')
    ) {
      return true;
    }
    return false;
  }

  shouldInputLoseFocus(element: HTMLInputElement, isForward?: boolean) {
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
      // 3. when selection start is not the end of length and it is forward and not readOnly.
      // 4. We press any of the arrow keys when our handleTabKey isn't none or undefined (only losing focus if we hit tab)
      // and if shouldInputLoseFocusOnArrowKey is defined, if scenario prefers to not loose the focus which is determined by calling the
      // callback shouldInputLoseFocusOnArrowKey
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

  shouldWrapFocus(
    element: HTMLElement,
    noWrapDataAttribute: 'data-no-vertical-wrap' | 'data-no-horizontal-wrap',
  ): boolean {
    return !!this.props.checkForNoWrap ? shouldWrapFocus(element, noWrapDataAttribute) : true;
  }

  getDocument(): Document {
    return getDocument(this._root.current)!;
  }
}
