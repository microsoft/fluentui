import * as React from 'react';
import { css, EventGroup } from '../../utilities/index';
import KeyCodes from '../../utilities/KeyCodes';
import './Fabric.scss';

const DIRECTIONAL_KEY_CODES = [
  KeyCodes.up,
  KeyCodes.down,
  KeyCodes.left,
  KeyCodes.right,
  KeyCodes.home,
  KeyCodes.end,
  KeyCodes.tab,
  KeyCodes.pageUp,
  KeyCodes.pageDown
];

const STATIONARY_DETECTION_DELAY = 100;

export interface IFabricProps {
  className?: string;
  children?: any[];
}

export interface IFabricState {
  isFocusVisible?: boolean;
  isStationary?: boolean;
}

export default class Fabric extends React.Component<IFabricProps, IFabricState> {
  private _events: EventGroup;
  private _scrollTimerId: number;

  constructor() {
    super();

    this.state = {
      isFocusVisible: false,
      isStationary: true
    };

    this._events = new EventGroup(this);
    this._onScrollEnd = this._onScrollEnd.bind(this);
  }

  public componentDidMount() {
    this._events.on(document.body, 'mousedown', this._onMouseDown, true);
    this._events.on(document.body, 'keydown', this._onKeyDown, true);
    this._events.on(window, 'scroll', this._onScroll);
  }

  public componentWillUnmount() {
    this._events.dispose();
    clearTimeout(this._scrollTimerId);
  }

  public render() {
    const { children } = this.props;
    const { isFocusVisible, isStationary } = this.state;
    const rootClass = css('ms-Fabric ms-font-m', this.props.className, {
      'is-focusVisible': isFocusVisible,
      'is-stationary': isStationary,
      'is-scrolling': !isStationary
    });

    return (
      <div className={ rootClass }>
        { this.props.children }
      </div>
    );
  }

  private _onMouseDown() {
    if (this.state.isFocusVisible) {
      this.setState({
        isFocusVisible: false
      });
    }
  }

  private _onKeyDown(ev: KeyboardEvent) {
    if (!this.state.isFocusVisible && DIRECTIONAL_KEY_CODES.indexOf(ev.which) > -1) {
      this.setState({
        isFocusVisible: true
      });
    }
  }

  private _onScroll() {
    let { isStationary } = this.state;

    clearTimeout(this._scrollTimerId);
    if (isStationary) {
      this.setState({
        isStationary: false
      });
    }
    this._scrollTimerId = setTimeout(this._onScrollEnd, STATIONARY_DETECTION_DELAY);
  }

  private _onScrollEnd() {
    this.setState({
      isStationary: true
    });
  }
}
