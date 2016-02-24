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
  onLostFocus?: (ev: React.FocusEvent) => void;

  style?: { [key: string]: string };
  className?: string;
  ref?: string;
  children?: React.ReactElement<any>[];
  role?: string;
  ariaLabelledBy?: string;
  key?: string;
}

export interface IFocusZoneState {
  activeIndex: number;
  focusElements?: any[]
}

export default class FocusZone extends React.Component<IFocusZoneProps, IFocusZoneState> {
  public static defaultProps = {
    isEnabled: true,
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
    let { className, style, isEnabled, role, ariaLabelledBy } = this.props;
    let index = 0;
    let focusElements = [];
    let { activeIndex } = this.state;

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

    let newChildren = isEnabled ? _mapChildren(this.props.children) : this.props.children;

    // Assign the new state.
    this.state = {
      activeIndex: Math.max(0, Math.min(focusElements.length - 1, activeIndex)),
      focusElements: focusElements
    };

    return (
      <div ref='root' className={ className } style={ style } role={ role } aria-labelled-by={ ariaLabelledBy }>
        { newChildren }
      </div>
    );
  }

  public setActiveIndex(index: number) {
    console.log(index);

    if (index >= 0 && index < this.state.focusElements.length && index !== this.state.activeIndex) {
      this.setState({
        activeIndex: index
      });
    }
  }

  public focus() {
    if (this.state.activeIndex >= 0) {
      let el = ReactDOM.findDOMNode(this.refs[ this.state.activeIndex ]) as HTMLElement;

      el.focus();
    }
  }

  private _onFocus(ev) {
    let index = Number(ev.target.attributes['data-focus-zone'].value);

    this.setState({
      activeIndex: index
    });
  }

  private _onBlur(ev) {
    if (this.props.onLostFocus) {
      this.props.onLostFocus(ev);
    }
  }

  private _onClick() {

  }

  private _onKeyDown(ev: KeyboardEvent) {
    let eventTarget = ev.target as HTMLElement;
    let isInput = _isInputElement(eventTarget);
    let { direction } = this.props;
    let { activeIndex, focusElements } = this.state;
    let newActiveIndex = -1;

    // Ignore keyboard events if originating from INPUT elements or TEXTAREAs.
    if (isInput) {
      return true;
    }

    switch (ev.which) {
      case KeyCodes.up:
        if (direction === FocusZoneDirection.vertical) {
          newActiveIndex = Math.max(0, activeIndex - 1);
        }
        break;

      case KeyCodes.down:
        if (direction === FocusZoneDirection.vertical) {
          newActiveIndex = Math.min(focusElements.length - 1, activeIndex + 1);
        }
        break;

      case KeyCodes.left:
        if (direction === FocusZoneDirection.horizontal) {
          newActiveIndex = Math.max(0, activeIndex - 1);
        }
        break;

      case KeyCodes.right:
        if (direction === FocusZoneDirection.horizontal) {
          newActiveIndex = Math.min(focusElements.length - 1, activeIndex + 1);
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
        newActiveIndex = focusElements.length - 1;
        break;

      default:
        // Do nothing. Let the event bubble.
        return;
    }

    if (newActiveIndex >= 0) {
      this.setState({
        activeIndex: newActiveIndex
      }, () => this.focus());

      ev.stopPropagation();
      ev.preventDefault();
    }

  }

}

function _isInputElement(element: HTMLElement) {
  return !!element && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA');
}