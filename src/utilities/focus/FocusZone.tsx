import * as React from 'react';
import * as ReactDOM from 'react-dom';
import EventGroup from '../eventGroup/EventGroup';
import { findIndex } from '../array';
import KeyCodes from '../KeyCodes';
import { getRTL } from '../rtl';

const FOCUSABLE_ZONE_ENABLED_ATTRIBUTE = 'data-focus-zone-enabled';
const CONTAINS_FOCUSABLE_SUBCOMPONENT_ATTRIBUTE = 'data-contains-focusable-subcomponents';
const FOCUSABLE_CONTEXT_ATTRIBUTE = 'data-focusable-context';
const NESTED_CONTEXT_ATTRIBUTE = 'data-nested-context';
const IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
const TABINDEX = 'tabindex';

export enum FocusZoneDirection {
  vertical,
  horizontal,
  bidirectional
}

export interface IFocusZoneProps {
  direction?: FocusZoneDirection;
  isEnabled?: boolean;
  isCircularNavigation?: boolean;
  isChildZone?: boolean;
  isNestedZone?: boolean;
  onLostFocus?: (ev: React.FocusEvent) => void;

  style?: { [key: string]: string };
  className?: string;
  ref?: string;
  children?: React.ReactElement<any>[];
  role?: string;
  ariaLabelledBy?: string;
  focusNamespace?: string;
  nestedFocusNamespace?: string;
  key?: string;
}

export interface IFocusZoneState {
  activeIndex: number;
}

export default class FocusZone extends React.Component<IFocusZoneProps, IFocusZoneState> {
  public static defaultProps = {
    isEnabled: true,
    isCircularNavigation: false,
    isChildZone: false,
    isNestedZone: false,
    direction: FocusZoneDirection.vertical
  };

  private _events: EventGroup;
  private _children: HTMLElement[] = undefined;

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };

    this._events = new EventGroup(this);
  }

  public componentDidMount() {
    let { isChildZone, isNestedZone } = this.props;
    let element = (this.refs as any).root;

    this._events.onAll(element, {
      'keydown': this._onKeyDown
    });

    // Need to register these separately to use 'capture' boolean.
    this._events.on(element, 'focus', this._onFocus, true);
    this._events.on(element, 'blur', this._onBlur, true);

    if (!isChildZone) {
      this._children = this.getFocusableChildren();
      if (!isNestedZone && this.shouldEnableFirstElementForTabbing()) {
        this._children[0].setAttribute(TABINDEX, '0');
      }
    }
  }

  public componentDidUpdate() {
    let { isChildZone, isNestedZone } = this.props;

    if (!isChildZone) {
      this._children = this.getFocusableChildren();
      if (!isNestedZone && this.shouldEnableFirstElementForTabbing()) {
        this._children[0].setAttribute(TABINDEX, '0');
      }
    }
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render() {
    let { className, style, isEnabled, role, ariaLabelledBy, focusNamespace } = this.props;
    let index = 0;
    let { activeIndex } = this.state;

    function _mapChild(child) {
      let previousIsEnabled = isEnabled;

      if (child && child.props && child.props[FOCUSABLE_ZONE_ENABLED_ATTRIBUTE] !== undefined) {
        isEnabled = child.props[FOCUSABLE_ZONE_ENABLED_ATTRIBUTE];
      }

      // if there are nested components with focusable subcomponents
      if (child && child.props && child.props[CONTAINS_FOCUSABLE_SUBCOMPONENT_ATTRIBUTE] !== undefined) {
        if (child.props[CONTAINS_FOCUSABLE_SUBCOMPONENT_ATTRIBUTE] === true) {
          // Create a cloned version passing the current focusNamespace to the child
          let focusableElement = React.cloneElement(child, {
            ref: index,
            focusNamespace: child.props['focus-namespace'] || focusNamespace
          }, _mapChildren(child.props.children));

          // Return it to the map.
          index++;
          child = focusableElement;
        }
      }

      // if the child element exists and is an object
      if (isEnabled && child && typeof child !== 'string') {
        // if the child should be focusable
        if (_isFocusableElement(child)) {
          // if the focusable child element belongs to this focus zone
          if (_belongsToFocusZone(focusNamespace, child) ||
            _belongsToNestedZone(focusNamespace, child)) {
            // Create a cloned version with a ref and tabIndex.
            let focusableElement = React.cloneElement(child, {
              ref: index,
              tabIndex: -1,
            }, _mapChildren(child.props.children));

            // Return it to the map.
            index++;
            child = focusableElement;
          }
        } else {
          // If we don't return a clone, our potential sub element updates won't be noticed.
          child = React.cloneElement(child, null, _mapChildren(child.props.children));
        }
      }

      isEnabled = previousIsEnabled;

      return child;
    }

    function _mapChildren(children) {
      if (children && typeof(children) !== 'string') {
        return React.Children.map(children, child => _mapChild(child));
      } else {
        return children;
      }
    }

    // Get the children to be rendered
    let newChildren = isEnabled ? _mapChildren(this.props.children) : this.props.children;

    // Assign the new state.
    this.state = {
      activeIndex: Math.max(0, Math.min(this.getFocusableChildrenCount() - 1, activeIndex))
    };

    return (
      <div ref='root' className={ className } style={ style } role={ role } aria-labelled-by={ ariaLabelledBy }>
        { newChildren }
      </div>
    );
  }

  public focus(activeIndex?, currentElement?) {
    let ai = (activeIndex >= 0) ? activeIndex : this.state.activeIndex;
    let elementToFocus = this._children[ai];

    if (elementToFocus) {
      this.setState({
        activeIndex: ai
      },
        () => {
          elementToFocus.focus();
          if (currentElement) {
              currentElement.setAttribute(TABINDEX, '-1');
              if (!this.props.isNestedZone) {
                let previousIndex = this.getPreviousElementIndex();
                let nextIndex = this.getNextElementIndex();
                this._children[previousIndex].setAttribute(TABINDEX, '-1');
                this._children[nextIndex].setAttribute(TABINDEX, '-1');
                elementToFocus.setAttribute(TABINDEX, '0');
              }
          }
        }
      );
    }
  }

  private _onFocus(ev) {
    let { focusNamespace, isChildZone } = this.props;
    let index = 0;

    if (_belongsToFocusZone(focusNamespace, ev.target) && !isChildZone) {
      index = findIndex(this._children, (child => child === ev.target ));

      this.setState({
        activeIndex: index
      });
    }
  }

  private _onBlur(ev) {
    if (this.props.onLostFocus) {
      this.props.onLostFocus(ev);
    }
  }

  private shouldEnableFirstElementForTabbing() {
      if (this._children.length === 0) {
        return false;
      }

      for (let child of this._children) {
          if (child.getAttribute(TABINDEX) === '0') {
              return false;
          }
      }

      return true;
  }

  private getFocusableChildren() {
    let { focusNamespace } = this.props;
    let array = [];

    function _getChildren(element) {
      if (element && element.children) {
        for (let childIndex = 0; childIndex < element.children.length; childIndex++) {
          let child = element.children[childIndex];
          let e = child;

          if (e.tagName) {
            if (_isFocusableElement(e) &&
              (_belongsToFocusZone(focusNamespace, e) ||
              _belongsToNestedZone(focusNamespace, e))) {
              if (array.indexOf(e) === -1) {
                array.push(e);
              }
            }
            _getChildren(e);
          }
        }
      }
    }

    for (let ref in this.refs) {
      if (this.refs.hasOwnProperty(ref) && ref !== 'root') {
        let refElement = ReactDOM.findDOMNode(this.refs[ref]) as HTMLElement;

        if (refElement && _isFocusableElement(refElement) &&
          (_belongsToFocusZone(focusNamespace, refElement) ||
          _belongsToNestedZone(focusNamespace, refElement))) {
          if (array.indexOf(refElement) === -1) {
            array.push(refElement);
          }
        }
        if (refElement) {
          _getChildren(refElement);
        }
      }
    }

    return array;
  }

  private getFocusableChildrenCount() {
    if (this._children) {
        return this._children.length;
    }

    return 0;
  }

  private focusFirstNestedChild(currentElement) {
    let rootElement = (this.refs as any).root;
    let refElement = ReactDOM.findDOMNode(rootElement) as HTMLElement;
    let { nestedFocusNamespace } = this.props;

    function _getFirstChild(element) {
      for (let child of element.children) {
        let e = child;

        if (e.tagName) {
          if (_isFocusableElement(e) &&
            _belongsToFocusZone(nestedFocusNamespace, e)) {
            if (e === currentElement) { continue; }
            return e;
          }
          let tmp = _getFirstChild(e);

          if (tmp) { return tmp; }
        }
      }
      return null;
    }

    let e = _getFirstChild(refElement);

    if (e) {
        e.focus();
    }
  }

  private findNestedElementInParentZone() {
    if (!this._children || this._children.length === 0) {
      return -1;
    }

    let index = 0;

    for (let child of this._children) {
      if (child.getAttribute(NESTED_CONTEXT_ATTRIBUTE)) {
        return index;
      }
      index++;
    }

    return -1;
  }

  private getPreviousElementIndex(): number {
    let { activeIndex } = this.state;

    if (this.props.isCircularNavigation && activeIndex === 0) {
      return this.props.isChildZone ? -1 : this.getFocusableChildrenCount() - 1;
    } else {
      return Math.max(0, activeIndex - 1);
    }
  }

  private getNextElementIndex(): number {
    let { activeIndex } = this.state;
    let childCount = this.getFocusableChildrenCount();

    if (this.props.isCircularNavigation && activeIndex === childCount - 1) {
      return this.props.isChildZone ? -1 : 0;
    } else {
      return Math.min(childCount - 1, activeIndex + 1);
    }
  }

  private _onKeyDown(ev: KeyboardEvent) {
    let eventTarget = ev.target as HTMLElement;
    let isInput = _isInputElement(eventTarget);
    let { direction, isChildZone, nestedFocusNamespace, isNestedZone } = this.props;
    let newActiveIndex = -1;

    // Ignore keyboard events if originating from INPUT elements or TEXTAREAs.
    if (isInput || (isChildZone && !nestedFocusNamespace)) {
      return true;
    }

    let key = ev.which;

    // Respect RTL.
    if (getRTL()) {
      if (key === KeyCodes.left) {
        key = KeyCodes.right;
      } else if (key === KeyCodes.right) {
        key = KeyCodes.left;
      }
    }

    switch (key) {
      case KeyCodes.up:
        if (direction === FocusZoneDirection.vertical) {
          newActiveIndex = this.getPreviousElementIndex();
        }
        break;

      case KeyCodes.down:
        if (direction === FocusZoneDirection.vertical) {
          newActiveIndex = this.getNextElementIndex();
        } else if (nestedFocusNamespace) {
          newActiveIndex = -2;
          this.focusFirstNestedChild(ev.target);
        }
        break;

      case KeyCodes.left:
        if (direction === FocusZoneDirection.horizontal) {
          newActiveIndex = this.getPreviousElementIndex();
        }
        break;

      case KeyCodes.right:
        if (direction === FocusZoneDirection.horizontal) {
          newActiveIndex = this.getNextElementIndex();
        } else if (nestedFocusNamespace) {
          newActiveIndex = -2;
          this.focusFirstNestedChild(ev.target);
        }
        break;

      case KeyCodes.pageUp:
        break;

      case KeyCodes.pageDown:
        break;

      case KeyCodes.home:
        newActiveIndex = 0;
        break;

      case KeyCodes.end:
        newActiveIndex = this.getFocusableChildrenCount() - 1;
        break;

      case KeyCodes.tab:
        if (isNestedZone) {
          newActiveIndex = this.findNestedElementInParentZone();
          if (newActiveIndex >= 0) {
            setTimeout(() => {
              this._children[newActiveIndex].setAttribute(TABINDEX, '0');
            }, 300);
          }
        }
        return;

      default:
        // Do nothing. Let the event bubble.
        return;
    }

    if (!isChildZone) {
      if (newActiveIndex >= 0 ) {
        this.focus(newActiveIndex, ev.target);
      }
      if (newActiveIndex !== -1) {
        ev.stopPropagation();
      }
      ev.preventDefault();
    }

  }

}

function _isInputElement(element: HTMLElement) {
  return !!element && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA');
}

function _isFocusableElement(element) {
  // Element is HTMLElement
  if (element.tagName) {
    return element.getAttribute(IS_FOCUSABLE_ATTRIBUTE) ||
           element.tagName === 'BUTTON' ||
           element.tagName === 'A';
  }
  // Element is ReactElement
  return element.props[IS_FOCUSABLE_ATTRIBUTE] ||
         element.type === 'button' ||
         element.type === 'a';
}

function _belongsToFocusZone(focusNamespace: string, element) {
  // Element is HTMLElement
  if (element.tagName) {
    return (!focusNamespace && !element.getAttribute(FOCUSABLE_CONTEXT_ATTRIBUTE)) ||
      ((focusNamespace !== undefined && element.getAttribute(FOCUSABLE_CONTEXT_ATTRIBUTE)) &&
      (focusNamespace === element.getAttribute(FOCUSABLE_CONTEXT_ATTRIBUTE)));
  }
  // Element is ReactElement
  return (!focusNamespace && !element.props[FOCUSABLE_CONTEXT_ATTRIBUTE]) ||
    ((focusNamespace !== undefined && element.props[FOCUSABLE_CONTEXT_ATTRIBUTE]) &&
    (focusNamespace === element.props[FOCUSABLE_CONTEXT_ATTRIBUTE]));
}

function _belongsToNestedZone(focusNamespace: string, element) {
  // Element is HTMLElement
  if (element.tagName) {
    return  ((focusNamespace !== undefined && element.getAttribute(NESTED_CONTEXT_ATTRIBUTE)) &&
      (focusNamespace === element.getAttribute(NESTED_CONTEXT_ATTRIBUTE)));
  }
  // Element is ReactElement
  return ((focusNamespace !== undefined && element.props[NESTED_CONTEXT_ATTRIBUTE]) &&
    (focusNamespace === element.props[NESTED_CONTEXT_ATTRIBUTE]));
}