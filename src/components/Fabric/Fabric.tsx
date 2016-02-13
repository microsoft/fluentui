import * as React from 'react';
import { css, EventGroup } from '../../utilities';

export interface IFabricProps {
  className?: string;
  children?: any[];
}

export interface IFabricState {
  isFocusVisible: boolean;
}

export default class Fabric extends React.Component<IFabricProps, IFabricState> {
  private _events: EventGroup;

  constructor() {
    super();

    this.state = {
      isFocusVisible: false
    };
    this._events = new EventGroup(this);
  }

  public componentDidMount() {
    this._events.on(document.body, 'mousedown', this._onMouseDown, true);
    this._events.on(document.body, 'keydown', this._onKeyDown, true);
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render() {
    const { children } = this.props;
    const { isFocusVisible } = this.state;
    const rootClass = css('ms-Fabric ms-font-m', this.props.className, {
      'is-focusVisible': isFocusVisible
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
    if (!this.state.isFocusVisible) {
      this.setState({
        isFocusVisible: true
      });
    }
  }
}
