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
  children?: React.ReactElement<any>[];
  className?: string;
  style?: { [key: string]: string };
  direction?: FocusZoneDirection;
}

export interface IFocusZoneState {
  activeIndex: number;
  focusElements?: any[]
}

export default class FocusZone extends React.Component<IFocusZoneProps, IFocusZoneState> {
  public static defaultProps = {
    direction: FocusZoneDirection.vertical
  };

  private _events: EventGroup;

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      focusElements: []
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
    let { className, style } = this.props;
    let index = 0;
    let focusElements = [];
    let { activeIndex } = this.state;

    let isEnabled = true;

    function _mapChild(child) {
      let previousIsEnabled = isEnabled;

      if (child && child.props && child.props['data-focus-zone-enabled'] !== undefined) {
        isEnabled = child.props['data-focus-zone-enabled'];
      }

      if (isEnabled && child && typeof child !== 'string') {
        if (
          child.type === 'a' ||
          child.type === 'button' ||
          (child.props && child.props['data-is-focusable'])) {

          // Create a cloned version with a ref and tabIndex.
          let focusableElement = React.cloneElement(child, {
            ref: index,
            'data-focus-zone': index,
            tabIndex: (index++ === activeIndex) ? 0 : -1,
          }, _mapChildren(child.props.children));

          // Push it to the collection to track.
          focusElements.push(focusableElement);

          // Return it to the map.
          child = focusableElement;
        }
        else {
          // If we don'e return a clone, our potential sub element updates won't be noticed.
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

    let newChildren = _mapChildren(this.props.children);

    // Assign the new state.
    this.state ={
      activeIndex: Math.max(0, Math.min(focusElements.length - 1, activeIndex)),
      focusElements: focusElements
    };

    return (
      <div ref='root' className={ className } style={ style }>
        { newChildren }
      </div>
    );
  }

  private _onFocus(ev) {
    let index = Number(ev.target.attributes['data-focus-zone'].value);

    this.setState({
      activeIndex: index
    });
  }

  private _onBlur(ev) {

  }

  private _onClick() {

  }

  private _onKeyDown(ev: KeyboardEvent) {
    let eventTarget = ev.target as HTMLElement;
    let isInput = _isInputElement(eventTarget);
    let { direction } = this.props;
    let { activeIndex, focusElements } = this.state;

    // Ignore keyboard events if originating from INPUT elements or TEXTAREAs.
    if (isInput) {
      return true;
    }

    let isHandled = false;

    switch (ev.which) {
      case KeyCodes.up:
        if (direction === FocusZoneDirection.vertical) {
          this.setState({
            activeIndex: Math.max(0, activeIndex - 1)
          });
          isHandled = true;
        }
        break;

      case KeyCodes.down:
        if (direction === FocusZoneDirection.vertical) {
          this.setState({
            activeIndex: Math.min(focusElements.length - 1, activeIndex + 1)
          });
          isHandled = true;
        }
        break;

      case KeyCodes.left:
        if (direction === FocusZoneDirection.horizontal) {
          this.setState({
            activeIndex: Math.max(0, activeIndex - 1)
          });
          isHandled = true;
        }
        break;

      case KeyCodes.right:
        if (direction === FocusZoneDirection.horizontal) {
          this.setState({
            activeIndex: Math.min(focusElements.length - 1, activeIndex + 1)
          });
          isHandled = true;
        }
        break;

      case KeyCodes.pageUp:
        break;

      case KeyCodes.pageDown:
        break;

      case KeyCodes.home:
        this.setState({
          activeIndex: 0
        });
        isHandled = true;
        break;

      case KeyCodes.end:
        this.setState({
          activeIndex: focusElements.length - 1
        });
        isHandled = true;
        break;

      default:
        // Do nothing. Let the event bubble.
        return;
    }

    let el = ReactDOM.findDOMNode(this.refs[ this.state.activeIndex ]) as HTMLElement;

    el.focus();

    if (isHandled) {
      ev.stopPropagation();
      ev.preventDefault();
    }
  }

}


function _processChildren(children: any, state: IFocusZoneState, currentIndex = 0) {
  let nodes = _getFocusableChildren(children);

  // Update the latest focusElements in state.
  state.focusElements = nodes;

  // Update each focus element's tabIndex.
  nodes.forEach((node, index) => {
    node.props = Object.assign({}, node.props, {
      tabIndex: (state.activeIndex === index) ? 0 : -1
    });
  });

  return children;
}

function _getFocusableChildren(element: any, children = []) {
  let tabbableTypes = ['a', 'button', 'input', 'textarea'];

  if (Array.isArray(element)) {
    element.forEach(el => _getFocusableChildren(el, children));
  } else {
    if (element) {
      if (tabbableTypes.indexOf(element.type) > -1) {
      children.push(element);
      }
      if (element.props && element.props.children) {
        _getFocusableChildren(element.props.children, children);
      }
    }
  }
  return children;
}


function _isInputElement(element: HTMLElement) {
  return !!element && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA');
}