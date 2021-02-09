import * as React from 'react';
import { BaseDecorator } from './BaseDecorator';
import { Async } from '../../Utilities';

export function withContainsFocus<TProps extends { containsFocus?: boolean }, S>(
  ComposedComponent: new (props: TProps, ...args: any[]) => React.Component<TProps, S>,
): any {
  return class WithContainsFocusComponent extends BaseDecorator<
    TProps & { containsFocus?: boolean },
    { containsFocus?: boolean }
  > {
    private _newContainsFocus: boolean;
    private _delayedSetContainsFocus: () => void;
    private _async: Async;

    constructor(props: TProps) {
      super(props);

      this.state = {
        containsFocus: false,
      };

      this._async = new Async(this);
      this._delayedSetContainsFocus = this._async.debounce(this._setContainsFocus, 20);
      this._updateComposedComponentRef = this._updateComposedComponentRef.bind(this);
      this._handleFocus = this._handleFocus.bind(this);
      this._handleBlur = this._handleBlur.bind(this);
    }

    public componentWillUnmount(): void {
      this._async.dispose();
    }

    public render(): JSX.Element {
      const { containsFocus } = this.state;

      return (
        <div onFocus={this._handleFocus} onBlur={this._handleBlur}>
          <ComposedComponent
            ref={this._updateComposedComponentRef}
            containsFocus={containsFocus}
            {...(this.props as any)}
          />
        </div>
      );
    }

    public forceUpdate(): void {
      this._composedComponentInstance.forceUpdate();
    }

    private _handleFocus(ev: React.FocusEvent<HTMLDivElement>): void {
      this._newContainsFocus = true;
      this._delayedSetContainsFocus();
    }

    private _handleBlur(ev: React.FocusEvent<HTMLDivElement>): void {
      this._newContainsFocus = false;
      this._delayedSetContainsFocus();
    }

    private _setContainsFocus(): void {
      if (this.state.containsFocus !== this._newContainsFocus) {
        this.setState({ containsFocus: this._newContainsFocus });
      }
    }
  };
}
