import * as React from 'react';
import Async from '../Async/Async';

export default function withContainsFocus<P, S>(ComposedComponent: any): any {

  return class WithContainsFocusComponent extends React.Component<P, any> {
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

    componentWillUnmount() {
      this._async.dispose();
    }

    public render() {
      let { containsFocus } = this.state;

      return (
        <div ref="root" onFocus={ this._handleFocus.bind(this) } onBlur={ this._handleBlur.bind(this) }>
          <ComposedComponent containsFocus={ containsFocus } {...this.props} />
        </div>
      );
    }

    private _handleFocus(ev) {
      //console.log('got focus', ev.target);

      this._newContainsFocus = true;
      this._delayedSetContainsFocus();
    }

    private _handleBlur(ev) {
      //console.log('got blur', ev.target);

      this._newContainsFocus = false;
      this._delayedSetContainsFocus();
    }

    private _setContainsFocus() {
      //console.log(this.state.containsFocus, this._newContainsFocus);

      if (this.state.containsFocus !== this._newContainsFocus) {
        this.setState({ containsFocus: this._newContainsFocus });
      }
    }

  }

}
