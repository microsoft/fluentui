import * as React from 'react';
import EventGroup from '../eventGroup/EventGroup';
import KeyCodes from '../KeyCodes';
import { getRTL } from '../rtl';
import { css } from '../css';
import { IFocusZoneProps, FocusZoneDirection } from './FocusZone.Props';

const IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
const IS_ENTER_DISABLED_ATTRIBUTE = 'data-disable-click-on-enter';
const FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';
const TABINDEX = 'tabindex';

let _instance = 0;
let _allInstances: {
  [key: string]: FocusZone
} = {};

interface IPoint {
  left: number;
  top: number;
}

export default class FocusZone extends React.Component<IFocusZoneProps, {}> {

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
  private _events: EventGroup;
  private _focusAlignment: IPoint;
  private _isInnerZone: boolean;

  constructor(props) {
    super(props);

    this._id = String(_instance++);
    _allInstances[this._id] = this;

    this._events = new EventGroup(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._updateTabIndexes = this._updateTabIndexes.bind(this);
  }

  public componentDidMount() {
    const windowElement = this.refs.root.ownerDocument.defaultView;

    let parentElement = this.refs.root.parentElement;

    while (parentElement && parentElement !== document.body) {
      if (this._isElementFocusZone(parentElement)) {
        this._isInnerZone = true;
        break;
      }
      parentElement = parentElement.parentElement;
    }

    this._events.on(windowElement, 'keydown', this._onKeyDownCapture, true);
  }

  public componentWillUnmount() {
    this._events.dispose();

    delete _allInstances[this._id];
  }

  public render() {
    let { className, ariaLabelledBy } = this.props;

    return (
      <div
        { ...this.props as any }
        className={ css('ms-FocusZone', className) }
        ref='root'
        data-focuszone-id={ this._id }
        aria-labelledby={ ariaLabelledBy }
        onMouseDownCapture={ this._onMouseDown }
        onKeyDown={ this._onKeyDown }
        onFocus={ this._onFocus } >
        { this.props.children }
      </div>
    );
  }

  /** Sets focus to the first tabbable item in the zone. */
  public focus(): boolean {
    const firstChild = this.refs.root.firstChild as HTMLElement;

    return this._focusElement(this._getNextElement(firstChild, true));
  }

  private _onFocus(ev: React.FocusEvent) {
    let { onActiveElementChanged } = this.props;

    if (this._isImmediateDescendantOfZone(ev.target as HTMLElement)) {
      this._activeElement = ev.target as HTMLElement;
      this._setFocusAlignment(this._activeElement);
    } else {
      let parentElement = ev.target as HTMLElement;

      while (parentElement && parentElement !== this.refs.root) {
        if (this._isElementTabbable(parentElement) && this._isImmediateDescendantOfZone(parentElement)) {
          this._activeElement = parentElement;
          break;
        }
        parentElement = parentElement.parentElement;
      }
    }
    if (onActiveElementChanged) {
      onActiveElementChanged(this._activeElement, ev);
    }
  }

  /** Handle global tab presses so that we can patch tabindexes on the fly. */
  private _onKeyDownCapture(ev: React.KeyboardEvent) {
    if (ev.which === KeyCodes.tab) {
      this._updateTabIndexes();
    }
  }

  private _onMouseDown(ev: React.MouseEvent) {
    let target = ev.target as HTMLElement;
    const path = [];

    while (target && target !== this.refs.root) {
      path.push(target);
      target = target.parentElement;
    }

    while (path.length) {
      target = path.pop();

      if (this._isElementFocusZone(target)) {
        break;
      } else if (target && this._isElementTabbable(target)) {
        target.tabIndex = 0;
        this._setFocusAlignment(target, true, true);
      }
    }
  }

  /** Handle the keystrokes. */
  private _onKeyDown(ev: React.KeyboardEvent) {
    const { direction, isInnerZoneKeystroke } = this.props;

    if (
      isInnerZoneKeystroke &&
      this._isImmediateDescendantOfZone(ev.target as HTMLElement) &&
      isInnerZoneKeystroke(ev)) {
      // Try to focus
      let innerZone = this._getFirstInnerZone();

      if (!innerZone || !innerZone.focus()) {
        return;
      }
    } else {
      switch (ev.which) {
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
          if (this._focusElement(this._getNextElement(firstChild, true))) {
            break;
          }
          return;

        case KeyCodes.end:
          const lastChild = this.refs.root.lastChild as HTMLElement;
          if (this._focusElement(this._getPreviousElement(lastChild, true, true, true))) {
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

  /** Walk up the dom try to find a focusable element. */
  private _tryInvokeClickForFocusable(target: HTMLElement): boolean {
    do {
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        return false;
      }

      if (
        this._isImmediateDescendantOfZone(target) &&
        target.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' &&
        target.getAttribute(IS_ENTER_DISABLED_ATTRIBUTE) !== 'true') {
        EventGroup.raise(target, 'click', null, true);

        return true;
      }

      target = target.parentElement;
    } while (target !== this.refs.root);

    return false;
  }

  /** Traverse to find first child zone. */
  private _getFirstInnerZone(rootElement?: HTMLElement): FocusZone {
    rootElement = rootElement || this._activeElement || this.refs.root;

    let child: HTMLElement = rootElement.firstElementChild as HTMLElement;

    while (child) {
      if (this._isElementFocusZone(child)) {
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

  /** Traverse to find the previous element. */
  private _getPreviousElement(
    currentElement: HTMLElement,
    checkNode?: boolean,
    suppressParentTraversal?: boolean,
    traverseChildren?: boolean): HTMLElement {

    if (!currentElement ||
      currentElement === this.refs.root) {
      return null;
    }

    let isCurrentElementVisible = this._isElementVisible(currentElement);

    // Check its children.
    if (traverseChildren && !this._isElementFocusZone(currentElement) && isCurrentElementVisible) {
      const childMatch = this._getPreviousElement(currentElement.lastElementChild as HTMLElement, true, true, true);

      if (childMatch) {
        return childMatch;
      }
    }

    // Check the current node, if it's not the first traversal.
    if (checkNode && isCurrentElementVisible && this._isElementTabbable(currentElement)) {
      return currentElement;
    }

    // Check its previous sibling.
    const siblingMatch = this._getPreviousElement(currentElement.previousElementSibling as HTMLElement, true, true, true);

    if (siblingMatch) {
      return siblingMatch;
    }

    // Check its parent.
    if (!suppressParentTraversal) {
      return this._getPreviousElement(currentElement.parentElement, true, false, false);
    }

    return null;
  }

  /** Traverse to find the next focusable element. */
  private _getNextElement(
    currentElement: HTMLElement,
    checkNode?: boolean,
    suppressParentTraversal?: boolean,
    suppressChildTraversal?: boolean): HTMLElement {

    if (
      !currentElement ||
      (currentElement === this.refs.root && suppressChildTraversal)) {
      return null;
    }

    let isCurrentElementVisible = this._isElementVisible(currentElement);

    // Check the current node, if it's not the first traversal.
    if (checkNode && isCurrentElementVisible && this._isElementTabbable(currentElement) ) {
      return currentElement;
    }

    // Check its children.
    if (!suppressChildTraversal && isCurrentElementVisible && !this._isElementFocusZone(currentElement)) {
      const childMatch = this._getNextElement(currentElement.firstElementChild as HTMLElement, true, true, false);

      if (childMatch) {
        return childMatch;
      }
    }

    if (currentElement === this.refs.root) {
      return null;
    }

    // Check its sibling.
    const siblingMatch = this._getNextElement(currentElement.nextElementSibling as HTMLElement, true, true, false);

    if (siblingMatch) {
      return siblingMatch;
    }

    if (!suppressParentTraversal) {
      return this._getNextElement(currentElement.parentElement, false, false, true);
    }

    return null;
  }

  private _moveFocus(
    isForward: boolean,
    getDistanceFromCenter: (activeRect: ClientRect, targetRect: ClientRect) => number,
    ev?: Event): boolean {

    let element = this._activeElement;
    let startingElement = element;
    let candidateDistance = -1;
    let candidateElement: HTMLElement;
    let changedFocus = false;

    if (!this._activeElement) {
      return;
    }

    const activeRect = this._activeElement.getBoundingClientRect();

    do {
      element = isForward ?
        this._getNextElement(element) :
        this._getPreviousElement(element);

      startingElement = startingElement || element;

      if (element) {
        const targetRect = element.getBoundingClientRect();
        const elementDistance = getDistanceFromCenter(activeRect, targetRect);

        if (elementDistance > -1 && (candidateDistance === -1 || elementDistance < candidateDistance)) {
          candidateDistance = elementDistance;
          candidateElement = element;
        }

        if (candidateDistance >= 0 && elementDistance < 0) {
          break;
        }
      }
    } while (element);

    // Focus the closest candidate
    if (candidateElement && candidateElement !== this._activeElement) {
      changedFocus = true;
      this._focusElement(candidateElement);
    } else if (this.props.isCircularNavigation) {
      if (isForward) {
        return this._focusElement(this._getNextElement(this.refs.root.firstElementChild as HTMLElement, true));
      } else {
        return this._focusElement(this._getPreviousElement(this.refs.root.lastElementChild as HTMLElement, true, true, true));
      }
    }

    return changedFocus;
  }

  private _moveFocusDown(): boolean {
    let targetTop = -1;
    const leftAlignment = this._focusAlignment.left;

    if (this._moveFocus(true, (activeRect: ClientRect, targetRect: ClientRect) => {
      let distance = -1;

      if ((targetTop === -1 && targetRect.top >= activeRect.bottom) ||
        (targetRect.top === targetTop)) {

        targetTop = targetRect.top;
        distance = (leftAlignment >= targetRect.left && leftAlignment <= targetRect.right) ?
          0 : Math.abs((targetRect.left + (targetRect.width / 2)) - leftAlignment);
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

      if ((targetTop === -1 && targetRect.bottom <= activeRect.top) ||
      (targetRect.top === targetTop)) {
        targetTop = targetRect.top;
        distance = (leftAlignment >= targetRect.left && leftAlignment <= targetRect.right) ?
          0 : Math.abs((targetRect.left + (targetRect.width / 2)) - leftAlignment);
      }

      return distance;
    })) {
      this._setFocusAlignment(this._activeElement, false, true);
      return true;
    }

    return false;
  }

  private _moveFocusLeft(): boolean {
    let targetTop = -1;
    const topAlignment = this._focusAlignment.top;

    if (this._moveFocus(getRTL(), (activeRect: ClientRect, targetRect: ClientRect) => {
      let distance = -1;

      if ((
        targetTop === -1 &&
        targetRect.right <= activeRect.left &&
        (this.props.direction === FocusZoneDirection.horizontal || targetRect.top === activeRect.top)) ||
        (targetRect.top === targetTop)) {

        targetTop = targetRect.top;
        distance = (topAlignment >= targetRect.top && topAlignment <= targetRect.bottom) ?
          0 :  Math.abs((targetRect.top + (targetRect.height / 2)) - topAlignment);
      }

      return distance;
    })) {
      this._setFocusAlignment(this._activeElement, true, false);
      return true;
    }

    return false;
  }

  private _moveFocusRight(): boolean {
    let targetTop = -1;
    const topAlignment = this._focusAlignment.top;

    if (this._moveFocus(!getRTL(), (activeRect: ClientRect, targetRect: ClientRect) => {
      let distance = -1;

      if ((
        targetTop === -1 &&
        targetRect.left >= activeRect.right &&
        (this.props.direction === FocusZoneDirection.horizontal || targetRect.top === activeRect.top)) ||
        (targetRect.top === targetTop)) {

        targetTop = targetRect.top;
        distance = (topAlignment >= targetRect.top && topAlignment <= targetRect.bottom) ?
          0 : Math.abs((targetRect.top + (targetRect.height / 2)) - topAlignment);
      }

      return distance;
    })) {
      this._setFocusAlignment(this._activeElement, true, false);
      return true;
    }

    return false;
  }

  private _focusElement(element: HTMLElement): boolean {
    if (element) {
      if (this._activeElement) {
        this._activeElement.tabIndex = -1;
      }

      this._activeElement = element;

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

  private _setFocusAlignment(element: HTMLElement, isHorizontal?: boolean, isVertical?: boolean) {
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

  private _isElementVisible(element: HTMLElement): boolean {
    return (
      !!element &&
      element.tagName !== 'svg' &&
      (element.offsetParent !== null ||
      (element as any).isVisible === true) // used as a workaround for testing.
    );
  }

  private _isElementTabbable(element: HTMLElement): boolean {
    return (
      !!element &&
      (element.tagName === 'A' ||
        (element.tagName === 'BUTTON' && !(element as HTMLButtonElement).disabled) ||
        (element.getAttribute && element.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true')));
  }

  private _isElementFocusZone(element?: HTMLElement): boolean {
    return element && !!element.getAttribute(FOCUSZONE_ID_ATTRIBUTE);
  }

  private _isImmediateDescendantOfZone(element?: HTMLElement): boolean {
    let parentElement = element.parentElement;

    while (parentElement && parentElement !== this.refs.root && parentElement !== document.body) {
      if (this._isElementFocusZone(parentElement)) {
        return false;
      }

      parentElement = parentElement.parentElement;
    }

    return true;
  }

  private _updateTabIndexes(element?: HTMLElement) {
    if (!element) {
      element = this.refs.root;
      if (this._activeElement && !element.contains(this._activeElement)) {
        this._activeElement = null;
      }
    }

    const childNodes = element.children;

    for (let childIndex = 0; childNodes && childIndex < childNodes.length; childIndex++) {
      const child = childNodes[childIndex] as HTMLElement;

      if (!this._isElementFocusZone(child)) {
        if (this._isElementTabbable(child)) {
          if (!this._isInnerZone && (!this._activeElement || this._activeElement === child)) {
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

        this._updateTabIndexes(child);
      }
    }

  }

}