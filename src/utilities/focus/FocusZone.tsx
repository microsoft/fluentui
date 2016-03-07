import * as React from 'react';
import * as ReactDOM from 'react-dom';
import EventGroup from '../eventGroup/EventGroup';
import KeyCodes from '../KeyCodes';

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
  onLostFocus?: (ev: React.FocusEvent) => void;

  style?: { [key: string]: string };
  className?: string;
  ref?: string;
  children?: React.ReactElement<any>[];
  role?: string;
  ariaLabelledBy?: string;
  focusNamespace?: string;
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
    direction: FocusZoneDirection.vertical,
    focusNamespace: undefined
  };

  private _events: EventGroup;

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };

    this._events = new EventGroup(this);
  }

  public componentDidMount() {
    let element = (this.refs as any).root;

    this._events.onAll(element, {
      'click': this._onClick,
      'keydown': this._onKeyDown
    });

    // Need to register these separately to use "capture" boolean.
    this._events.on(element, 'focus', this._onFocus, true);
    this._events.on(element, 'blur', this._onBlur, true);
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render() {
    let { className, style, isEnabled, role, ariaLabelledBy, focusNamespace, isChildZone } = this.props;
    let index = 0;
    let { activeIndex } = this.state;

    function _mapChild(child) {
      let previousIsEnabled = isEnabled;

      if (child && child.props && child.props['data-focus-zone-enabled'] !== undefined) {
        isEnabled = child.props['data-focus-zone-enabled'];
      }

      // if there are nested components with focusable subcomponents
      if (child && child.props && child.props['data-contains-focusable-subcomponents'] !== undefined){
        if(child.props['data-contains-focusable-subcomponents'] === true) {
          // Create a cloned version passing the current focusNamespace to the child
          let focusableElement = React.cloneElement(child, {
            ref: child.ref || index,
            focusNamespace: child.props['focusNamespace'] || focusNamespace
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
          if (_belongsToFocusZone(focusNamespace, child)) {
            // Create a cloned version with a ref and tabIndex.
            let focusableElement = React.cloneElement(child, {
              ref: index,
              'data-focus-zone': index,
              tabIndex: (index++ === activeIndex) ? 0 : -1,
            }, _mapChildren(child.props.children));

            // Return it to the map.
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
      activeIndex: Math.max(0, Math.min(this.getRefsCount() - 1, activeIndex))
    };

    return (
      <div ref='root' className={ className } style={ style } role={ role } aria-labelled-by={ ariaLabelledBy }>
        { newChildren }
      </div>
    );
  }

  public focus(activeIndex?) {
    let ai = (activeIndex >= 0) ? activeIndex : this.state.activeIndex;
    let el = ReactDOM.findDOMNode(this.refs[ai]) as HTMLElement;

    function _getFocusableInChildren(element) {
      for (var child in element.children) {
        if (_isFocusableElement(element.children[child])) {
          return element.children[child];
        } else {
          _getFocusableInChildren(element.children[child]);
        }
      }
      return element;
    }

    if (!_isFocusableElement(el)) {
      el = _getFocusableInChildren(el);
    }

    el.focus();

    this.setState({
      activeIndex: ai
    });
  }

  private _onFocus(ev) {
    let { focusNamespace } = this.props;
    let index = 0;

    function _scanInRefChildren(element) {
      for (var child in element.children) {
        if (element.children[child] === ev.target) {
          return true;
        } else {
          _scanInRefChildren(element.children[child]);
        }
      }
      return false;
    }

    if (_belongsToFocusZone(focusNamespace, ev.target)) {
      for (var ref in this.refs){
        var actualRef = ReactDOM.findDOMNode(this.refs[ref]) as HTMLElement;

        if (actualRef === ev.target) {
          break;
        } else if (_scanInRefChildren(actualRef)) {
          break;
        }

        index++;
      }

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

  private _onClick() {

  }

  private getRefsCount() {
    let count = 0;
    for (var ref in this.refs) {
      count++;
    }

    return count -1;
  }

  private previousElement() {
    let { activeIndex } = this.state;

    if (this.props.isCircularNavigation && activeIndex === 0)
    {
      return this.props.isChildZone ? -1 : this.getRefsCount() -1;
    }
    else
    {
      return Math.max(0, activeIndex - 1);
    }
  }

  private nextElement() {
    let { activeIndex } = this.state;
    let childCount = this.getRefsCount();

    if (this.props.isCircularNavigation && activeIndex === childCount - 1)
    {
      return this.props.isChildZone ? -1 : 0;
    }
    else
    {
      return Math.min(childCount - 1, activeIndex + 1);
    }
  }

  private _onKeyDown(ev: KeyboardEvent) {
    let eventTarget = ev.target as HTMLElement;
    let isInput = _isInputElement(eventTarget);
    let { direction, isChildZone } = this.props;
    let { activeIndex } = this.state;
    let newActiveIndex = -1;

    // Ignore keyboard events if originating from INPUT elements or TEXTAREAs.
    if (isInput) {
      return true;
    }

    switch (ev.which) {
      case KeyCodes.up:
        if (direction === FocusZoneDirection.vertical) {
          newActiveIndex = this.previousElement();
        }
        break;

      case KeyCodes.down:
        if (direction === FocusZoneDirection.vertical) {
          newActiveIndex = this.nextElement();
        }
        break;

      case KeyCodes.left:
        if (direction === FocusZoneDirection.horizontal) {
          newActiveIndex = this.previousElement();
        }
        break;

      case KeyCodes.right:
        if (direction === FocusZoneDirection.horizontal) {
          newActiveIndex = this.nextElement();
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
        newActiveIndex = this.getRefsCount() - 1;
        break;

      default:
        // Do nothing. Let the event bubble.
        return;
    }

    if (newActiveIndex >= 0 && !isChildZone) {
      this.focus(newActiveIndex);
      ev.stopPropagation();
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
    return element.getAttribute('data-is-focusable') ||
           element.tagName == "BUTTON" ||
           element.tagName == "A";
  }
  // Element is ReactElement
  return element.props['data-is-focusable'] ||
         element.type === 'button' ||
         element.type === 'a';
}

function _belongsToFocusZone(focusNamespace: string, element) {
  // Element is HTMLElement
  if (element.tagName){
    return (!focusNamespace && !element.target.getAttribute('data-focusable-context')) ||
      ((focusNamespace !== undefined && element.target.getAttribute('data-focusable-context')) &&
      (focusNamespace == element.target.getAttribute('data-focusable-context')));
  }
  // Element is ReactElement
  return (!focusNamespace && !element.props['data-focusable-context']) ||
    ((focusNamespace !== undefined && element.props['data-focusable-context']) &&
    (focusNamespace == element.props['data-focusable-context']));
}