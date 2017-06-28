import * as React from 'react';
import {
  FocusZoneDirection,
  IFocusZone,
  IFocusZoneProps
} from './FocusZone.Props';
import {
  BaseComponent,
  EventGroup,
  KeyCodes,
  autobind,
  css,
  divProperties,
  elementContains,
  getDocument,
  getId,
  getNextElement,
  getNativeProps,
  getParent,
  getPreviousElement,
  getRTL,
  isElementFocusZone,
  isElementFocusSubZone,
  isElementTabbable
} from '../../Utilities';

const IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
const IS_ENTER_DISABLED_ATTRIBUTE = 'data-disable-click-on-enter';
const FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';
const TABINDEX = 'tabindex';

let _allInstances: {
  [key: string]: FocusZone
} = {};

interface IPoint {
  left: number;
  top: number;
}
const ALLOWED_INPUT_TYPES = ['text', 'number', 'password', 'email', 'tel', 'url', 'search'];

export class FocusZone extends BaseComponent<IFocusZoneProps, {}> implements IFocusZone {

  public static defaultProps: IFocusZoneProps = {
    isCircularNavigation: false,
    direction: FocusZoneDirection.bidirectional
  };

  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement
  };

  private _id: string;
  private _activeElement: HTMLElement;
  private _focusAlignment: IPoint;
  private _isInnerZone: boolean;

  constructor(props) {
    super(props);

    this._warnDeprecations({ rootProps: null });

    this._id = getId('FocusZone');
    _allInstances[this._id] = this;

    this._focusAlignment = {
      left: 0,
      top: 0
    };
  }

  public componentDidMount() {
    const windowElement = this.refs.root.ownerDocument.defaultView;

    let parentElement = getParent(this.refs.root);

    while (
      parentElement &&
      parentElement !== document.body &&
      parentElement.nodeType === 1
    ) {
      if (isElementFocusZone(parentElement)) {
        this._isInnerZone = true;
        break;
      }
      parentElement = getParent(parentElement);
    }

    if (!this._isInnerZone) {
      this._events.on(windowElement, 'keydown', this._onKeyDownCapture, true);
    }

    // Assign initial tab indexes so that we can set initial focus as appropriate.
    this._updateTabIndexes();

    if (this.props.defaultActiveElement) {
      this._activeElement = getDocument().querySelector(this.props.defaultActiveElement) as HTMLElement;
      this.focus();
    }
  }

  public componentWillUnmount() {
    delete _allInstances[this._id];
  }

  public render() {
    let { rootProps, ariaDescribedBy, ariaLabelledBy, className } = this.props;
    let divProps = getNativeProps(this.props, divProperties);

    return (
      <div
        role='presentation'
        { ...divProps }
        { ...rootProps }
        className={ css('ms-FocusZone', className) }
        ref='root'
        data-focuszone-id={ this._id }
        aria-labelledby={ ariaLabelledBy }
        aria-describedby={ ariaDescribedBy }
        onKeyDown={ this._onKeyDown }
        onFocus={ this._onFocus }
        { ...{ onMouseDownCapture: this._onMouseDown } }
      >
        { this.props.children }
      </div>
    );
  }

  /**
   * Sets focus to the first tabbable item in the zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focus(forceIntoFirstElement: boolean = false): boolean {
    if (!forceIntoFirstElement && this.refs.root.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' && this._isInnerZone) {
      const ownerZoneElement = this._getOwnerZone(this.refs.root);

      if (ownerZoneElement !== this.refs.root) {
        const ownerZone = _allInstances[ownerZoneElement.getAttribute(FOCUSZONE_ID_ATTRIBUTE)];

        return !!ownerZone && ownerZone.focusElement(this.refs.root);
      }

      return false;
    } else if (this._activeElement && elementContains(this.refs.root, this._activeElement)
      && isElementTabbable(this._activeElement)) {
      this._activeElement.focus();
      return true;
    } else {
      const firstChild = this.refs.root.firstChild as HTMLElement;

      return this.focusElement(getNextElement(this.refs.root, firstChild, true));
    }
  }

  /**
   * Sets focus to a specific child element within the zone. This can be used in conjunction with
   * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
   * location and then focus.)
   * @param {HTMLElement} element The child element within the zone to focus.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focusElement(element: HTMLElement): boolean {
    let { onBeforeFocus } = this.props;

    if (onBeforeFocus && !onBeforeFocus(element)) {
      return false;
    }

    if (element) {
      const previousActiveElement = this._activeElement;

      this._activeElement = element;

      if (previousActiveElement) {
        if (isElementFocusZone(previousActiveElement)) {
          this._updateTabIndexes(previousActiveElement);
        }

        previousActiveElement.tabIndex = -1;
      }

      if (element) {
        if (!this._focusAlignment) {
          this._setFocusAlignment(element, true, true);
        }

        this._activeElement.tabIndex = 0;
        element.focus();

        return true;
      }
    }

    return false;
  }

  @autobind
  private _onFocus(ev: React.FocusEvent<HTMLElement>) {
    let { onActiveElementChanged } = this.props;

    if (this._isImmediateDescendantOfZone(ev.target as HTMLElement)) {
      this._activeElement = ev.target as HTMLElement;
      this._setFocusAlignment(this._activeElement);
    } else {
      let parentElement = ev.target as HTMLElement;

      while (parentElement && parentElement !== this.refs.root) {
        if (isElementTabbable(parentElement) && this._isImmediateDescendantOfZone(parentElement)) {
          this._activeElement = parentElement;
          break;
        }
        parentElement = getParent(parentElement);
      }
    }
    if (onActiveElementChanged) {
      onActiveElementChanged(this._activeElement, ev);
    }
  }

  /**
   * Handle global tab presses so that we can patch tabindexes on the fly.
   */
  private _onKeyDownCapture(ev: KeyboardEvent) {
    if (ev.which === KeyCodes.tab) {
      this._updateTabIndexes();
    }
  }

  @autobind
  private _onMouseDown(ev: React.MouseEvent<HTMLElement>) {
    const { disabled } = this.props;

    if (disabled) {
      return;
    }

    let target = ev.target as HTMLElement;
    const path = [];

    while (target && target !== this.refs.root) {
      path.push(target);
      target = getParent(target);
    }

    while (path.length) {
      target = path.pop();

      if (target && isElementTabbable(target)) {
        target.tabIndex = 0;
        this._setFocusAlignment(target, true, true);
      }

      if (isElementFocusZone(target)) {
        // Stop here since the focus zone will take care of its own children.
        break;
      }
    }
  }

  /**
   * Handle the keystrokes.
   */
  @autobind
  private _onKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    const { direction, disabled, isInnerZoneKeystroke } = this.props;

    if (disabled) {
      return;
    }

    if (document.activeElement === this.refs.root && this._isInnerZone) {
      // If this element has focus, it is being controlled by a parent.
      // Ignore the keystroke.
      return;
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);

      if (ev.isDefaultPrevented()) {
        return;
      }
    }

    if (
      isInnerZoneKeystroke &&
      isInnerZoneKeystroke(ev) &&
      this._isImmediateDescendantOfZone(ev.target as HTMLElement)) {

      // Try to focus
      let innerZone = this._getFirstInnerZone();

      if (innerZone) {
        if (!innerZone.focus(true)) {
          return;
        }
      } else if (isElementFocusSubZone(ev.target as HTMLElement)) {
        if (!this.focusElement(getNextElement(ev.target as HTMLElement, (ev.target as HTMLElement).firstChild as HTMLElement, true))) {
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

        case KeyCodes.home:
          const firstChild = this.refs.root.firstChild as HTMLElement;
          if (this.focusElement(getNextElement(this.refs.root, firstChild, true))) {
            break;
          }
          return;

        case KeyCodes.end:
          const lastChild = this.refs.root.lastChild as HTMLElement;
          if (this.focusElement(getPreviousElement(this.refs.root, lastChild, true, true, true))) {
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
  }

  /**
   * Walk up the dom try to find a focusable element.
   */
  private _tryInvokeClickForFocusable(target: HTMLElement): boolean {
    if (target === this.refs.root) {
      return false;
    }

    do {
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return false;
      }

      if (
        this._isImmediateDescendantOfZone(target) &&
        target.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' &&
        target.getAttribute(IS_ENTER_DISABLED_ATTRIBUTE) !== 'true') {
        EventGroup.raise(target, 'click', null, true);

        return true;
      }

      target = getParent(target);
    } while (target !== this.refs.root);

    return false;
  }

  /**
   * Traverse to find first child zone.
   */
  private _getFirstInnerZone(rootElement?: HTMLElement): FocusZone {
    rootElement = rootElement || this._activeElement || this.refs.root;

    if (isElementFocusZone(rootElement)) {
      return _allInstances[rootElement.getAttribute(FOCUSZONE_ID_ATTRIBUTE)];
    }

    let child: HTMLElement = rootElement.firstElementChild as HTMLElement;

    while (child) {
      if (isElementFocusZone(child)) {
        return _allInstances[child.getAttribute(FOCUSZONE_ID_ATTRIBUTE)];
      }
      let match = this._getFirstInnerZone(child);

      if (match) {
        return match;
      }

      child = child.nextElementSibling as HTMLElement;
    }

    return null;
  }

  private _moveFocus(
    isForward: boolean,
    getDistanceFromCenter: (activeRect: ClientRect, targetRect: ClientRect) => number,
    ev?: Event): boolean {

    let element = this._activeElement;
    let candidateDistance = -1;
    let candidateElement: HTMLElement;
    let changedFocus = false;
    let isBidirectional = this.props.direction === FocusZoneDirection.bidirectional;

    if (!element) {
      return false;
    }

    if (this._isElementInput(element)) {
      if (!this._shouldInputLoseFocus(element as HTMLInputElement, isForward)) {
        return false;
      }
    }

    const activeRect = isBidirectional ? element.getBoundingClientRect() : null;

    do {
      element = isForward ?
        getNextElement(this.refs.root, element, undefined, undefined, undefined, undefined, true) :
        getPreviousElement(this.refs.root, element, undefined, undefined, undefined, undefined, true);

      if (isBidirectional) {
        if (element) {
          const targetRect = element.getBoundingClientRect();
          const elementDistance = getDistanceFromCenter(activeRect, targetRect);

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
    } else if (this.props.isCircularNavigation) {
      if (isForward) {
        return this.focusElement(getNextElement(this.refs.root, this.refs.root.firstElementChild as HTMLElement, true));
      } else {
        return this.focusElement(getPreviousElement(this.refs.root, this.refs.root.lastElementChild as HTMLElement, true, true, true));
      }
    }

    return changedFocus;
  }

  private _moveFocusDown(): boolean {
    let targetTop = -1;
    const leftAlignment = this._focusAlignment.left;

    if (this._moveFocus(true, (activeRect: ClientRect, targetRect: ClientRect) => {
      let distance = -1;
      // ClientRect values can be floats that differ by very small fractions of a decimal.
      // If the difference between top and bottom are within a pixel then we should treat
      // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
      // but without Math.Floor they will be handled incorrectly.
      let targetRectTop = Math.floor(targetRect.top);
      let activeRectBottom = Math.floor(activeRect.bottom);

      if (targetRectTop < activeRectBottom) {
        return 999999999;
      }

      if ((targetTop === -1 && targetRectTop >= activeRectBottom) ||
        (targetRectTop === targetTop)) {
        targetTop = targetRectTop;
        if (leftAlignment >= targetRect.left && leftAlignment <= (targetRect.left + targetRect.width)) {
          distance = 0;
        } else {
          distance = Math.abs((targetRect.left + (targetRect.width / 2)) - leftAlignment);
        }
      }

      return distance;
    })) {
      this._setFocusAlignment(this._activeElement, false, true);
      return true;
    }

    return false;
  }

  private _moveFocusUp(): boolean {
    let targetTop = -1;
    const leftAlignment = this._focusAlignment.left;

    if (this._moveFocus(false, (activeRect: ClientRect, targetRect: ClientRect) => {
      let distance = -1;
      // ClientRect values can be floats that differ by very small fractions of a decimal.
      // If the difference between top and bottom are within a pixel then we should treat
      // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
      // but without Math.Floor they will be handled incorrectly.
      let targetRectBottom = Math.floor(targetRect.bottom);
      let targetRectTop = Math.floor(targetRect.top);
      let activeRectTop = Math.floor(activeRect.top);

      if (targetRectBottom > activeRectTop) {
        return 999999999;
      }

      if ((targetTop === -1 && targetRectBottom <= activeRectTop) ||
        (targetRectTop === targetTop)) {
        targetTop = targetRectTop;
        if (leftAlignment >= targetRect.left && leftAlignment <= (targetRect.left + targetRect.width)) {
          distance = 0;
        } else {
          distance = Math.abs((targetRect.left + (targetRect.width / 2)) - leftAlignment);
        }
      }

      return distance;
    })) {
      this._setFocusAlignment(this._activeElement, false, true);
      return true;
    }

    return false;
  }

  private _moveFocusLeft(): boolean {
    const topAlignment = this._focusAlignment.top;

    if (this._moveFocus(getRTL(), (activeRect: ClientRect, targetRect: ClientRect) => {
      let distance = -1;

      if (
        targetRect.bottom > activeRect.top &&
        targetRect.right <= activeRect.right &&
        this.props.direction !== FocusZoneDirection.vertical
      ) {

        distance = activeRect.right - targetRect.right;
      }

      return distance;
    })) {
      this._setFocusAlignment(this._activeElement, true, false);
      return true;
    }

    return false;
  }

  private _moveFocusRight(): boolean {
    const topAlignment = this._focusAlignment.top;

    if (this._moveFocus(!getRTL(), (activeRect: ClientRect, targetRect: ClientRect) => {
      let distance = -1;

      if (
        targetRect.top < activeRect.bottom &&
        targetRect.left >= activeRect.left &&
        this.props.direction !== FocusZoneDirection.vertical
      ) {

        distance = targetRect.left - activeRect.left;
      }

      return distance;
    })) {
      this._setFocusAlignment(this._activeElement, true, false);
      return true;
    }

    return false;
  }

  private _setFocusAlignment(element: HTMLElement, isHorizontal?: boolean, isVertical?: boolean) {
    if (this.props.direction === FocusZoneDirection.bidirectional &&
      (!this._focusAlignment || isHorizontal || isVertical)) {

      const rect = element.getBoundingClientRect();
      const left = rect.left + (rect.width / 2);
      const top = rect.top + (rect.height / 2);

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
    return this._getOwnerZone(element) === this.refs.root;
  }

  private _getOwnerZone(element?: HTMLElement): HTMLElement {
    let parentElement = getParent(element);

    while (parentElement && parentElement !== this.refs.root && parentElement !== document.body) {
      if (isElementFocusZone(parentElement)) {
        return parentElement;
      }

      parentElement = getParent(parentElement);
    }

    return this.refs.root;
  }

  private _updateTabIndexes(element?: HTMLElement) {
    if (!element) {
      element = this.refs.root;
      if (this._activeElement && !elementContains(element, this._activeElement)) {
        this._activeElement = null;
      }
    }

    // If active element changes state to disabled, set it to null.
    // Otherwise, we lose keyboard accessibility to other elements in focus zone.
    if (this._activeElement && !isElementTabbable(this._activeElement)) {
      this._activeElement = null;
    }

    const childNodes = element.children;

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
          } else if (!this._isInnerZone && (!this._activeElement || this._activeElement === child)) {
            this._activeElement = child;
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
        if (!this._isInnerZone && (!this._activeElement || this._activeElement === child)) {
          this._activeElement = child;
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
    if (element &&
      element.type &&
      ALLOWED_INPUT_TYPES.indexOf(element.type.toLowerCase()) > -1) {
      let selectionStart = element.selectionStart;
      let selectionEnd = element.selectionEnd;
      let isRangeSelected = selectionStart !== selectionEnd;
      let inputValue = element.value;

      // We shouldn't lose focus in the following cases:
      // 1. There is range selected.
      // 2. When selection start is larger than 0 and it is backward.
      // 3. when selection start is not the end of lenght and it is forward.
      if (isRangeSelected ||
        (selectionStart > 0 && !isForward) ||
        (selectionStart !== inputValue.length && isForward)) {
        return false;
      }
    }

    return true;
  }

}
