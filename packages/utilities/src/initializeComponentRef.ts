import { IBaseProps } from './BaseComponent.types';
import { extendComponent } from './extendComponent';

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
    componentWillUnmount: _onUnmount
  });
}

function _onMount(): void {
  _setComponentRef(this.props.componentRef, this);
}

function _onUpdate(prevProps: IBaseProps): void {
  if (prevProps.componentRef !== this.props.componentRef) {
    // tslint:disable-next-line:no-any
    _setComponentRef((prevProps as any).componentRef, null);
    _setComponentRef(this.props.componentRef, this);
  }
}

function _onUnmount(): void {
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
