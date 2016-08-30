import * as React from 'react';
import { Async } from '../Async/Async';
import { hoistMethods, unhoistMethods } from '../hoist';

export function withContainsFocus<P, S>(ComposedComponent: any): any {

  return class WithContainsFocusComponent extends React.Component<P, any> {
    public refs: {
      [key: string]: React.ReactInstance,
      /** @deprecated */
      composed: any
    };

    private _async: Async;
    private _composedComponentInstance: any;
    private _hoisted: string[];
    private _newContainsFocus: boolean;

    private _delayedSetContainsFocus: () => void;

    constructor() {
      super();

      this._async = new Async(this);
      this.state = {
        containsFocus: false
      };

      this._delayedSetContainsFocus = this._async.debounce(this._setContainsFocus, 20);
      this._updateChildRef = this._updateChildRef.bind(this);
    }

    public componentWillUnmount() {
      this._async.dispose();
    }

    public render() {
      let { containsFocus } = this.state;

      return (
        <div ref='root' onFocus={ this._handleFocus.bind(this) } onBlur={ this._handleBlur.bind(this) }>
          <ComposedComponent ref={ this._updateChildRef } containsFocus={ containsFocus } {...this.props} />
        </div>
      );
    }

    public forceUpdate() {
      this._composedComponentInstance.forceUpdate();
    }

    private _updateChildRef(composedComponentInstance: any) {
      this.refs.composed = composedComponentInstance;
      this._composedComponentInstance = composedComponentInstance;
      if (composedComponentInstance) {
        this._hoisted = hoistMethods(this, composedComponentInstance);
      } else if (this._hoisted) {
        this.refs.composed = null;
        unhoistMethods(this, this._hoisted);
      }
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
