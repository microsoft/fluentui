import * as React from 'react';
import Async from '../Async/Async';

export default function withContainsFocus<P, S>(ComposedComponent: any): any {

  return class WithContainsFocusComponent extends React.Component<P, any> {
    public refs: {
      [key: string]: React.ReactInstance,
      composed: any
    };

    private _async: Async;
    private _newContainsFocus: boolean;

    private _delayedSetContainsFocus: () => void;

    constructor() {
      super();

      this._async = new Async(this);
      this.state = {
        containsFocus: false
      };

      this._delayedSetContainsFocus = this._async.debounce(this._setContainsFocus, 20);
    }

    public componentWillUnmount() {
      this._async.dispose();
    }

    public render() {
      let { containsFocus } = this.state;

      return (
        <div ref='root' onFocus={ this._handleFocus.bind(this) } onBlur={ this._handleBlur.bind(this) }>
          <ComposedComponent ref='composed' containsFocus={ containsFocus } {...this.props} />
        </div>
      );
    }

    public forceUpdate() {
      this.refs.composed.forceUpdate();
    }

    private _handleFocus(ev) {
      this._newContainsFocus = true;
      this._delayedSetContainsFocus();
    }

    private _handleBlur(ev) {
      this._newContainsFocus = false;
      this._delayedSetContainsFocus();
    }

    private _setContainsFocus() {
      if (this.state.containsFocus !== this._newContainsFocus) {
        this.setState({ containsFocus: this._newContainsFocus });
      }
    }

  };

}
