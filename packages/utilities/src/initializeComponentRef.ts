import * as React from 'react';
import { extendComponent } from './extendComponent';
import type { IBaseProps } from './BaseComponent.types';

/**
 * Helper to manage componentRef resolution. Internally appends logic to
 * lifetime methods to resolve componentRef to the passed in object.
 *
 * Usage: call initializeComponentRef(this) in the constructor,
 */
export function initializeComponentRef<TProps extends IBaseProps, TState>(obj: React.Component<TProps, TState>): void {
  extendComponent(obj, {
    componentDidMount: _onMount,
    componentDidUpdate: _onUpdate,
    componentWillUnmount: _onUnmount,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _onMount(this: any): void {
  _setComponentRef(this.props.componentRef, this);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _onUpdate(this: any, prevProps: IBaseProps): void {
  if (prevProps.componentRef !== this.props.componentRef) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _setComponentRef((prevProps as any).componentRef, null);
    _setComponentRef(this.props.componentRef, this);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _onUnmount(this: any): void {
  _setComponentRef(this.props.componentRef, null);
}

function _setComponentRef<TInterface>(componentRef: React.RefObject<TInterface>, value: TInterface | null): void {
  if (componentRef) {
    if (typeof componentRef === 'object') {
      (componentRef as { current: TInterface | null }).current = value;
    } else if (typeof componentRef === 'function') {
      (componentRef as Function)(value);
    }
  }
}
