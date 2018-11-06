import * as React from 'react';
import { IStateComponentProps } from '../Foundation';
import { IDisposable, IRefObject } from '../Utilities';

/**
 * BaseProps interface.
 *
 * @public
 */
// tslint:disable-next-line:no-any
export interface IBaseProps<T = any> {
  componentRef?: IRefObject<T>;
}

/**
 * BaseComponent class, which provides basic helpers for all components.
 *
 * @public
 */
export class BaseComponentMin<TComponentProps extends IBaseProps = {}, TViewProps = {}, TState = {}> extends React.Component<
  IStateComponentProps<TComponentProps, TViewProps>,
  TState
> {
  /**
   * Controls whether the componentRef prop will be resolved by this component instance. If you are
   * implementing a passthrough (higher-order component), you would set this to false and pass through
   * the props to the inner component, allowing it to resolve the componentRef.
   */
  protected _skipComponentRefResolution: boolean;

  // tslint:disable:variable-name
  private __disposables: IDisposable[] | null;
  private __resolves: { [name: string]: (ref: React.ReactNode) => React.ReactNode };
  // tslint:enable:variable-name

  /**
   * BaseComponent constructor
   * @param props - The props for the component.
   * @param context - The context for the component.
   */
  // tslint:disable-next-line:no-any
  constructor(props: IStateComponentProps<TComponentProps, TViewProps>, context?: any) {
    super(props, context);

    _makeAllSafe(this, BaseComponentMin.prototype, [
      'componentWillMount',
      'componentDidMount',
      'shouldComponentUpdate',
      'componentWillUpdate',
      'componentWillReceiveProps',
      'render',
      'componentDidUpdate',
      'componentWillUnmount'
    ]);
  }

  /**
   * When the component will receive props, make sure the componentRef is updated.
   */
  // tslint:disable-next-line:no-any
  public componentWillReceiveProps(newProps: Readonly<IStateComponentProps<TComponentProps, TViewProps>>, newContext: any): void {
    this._updateComponentRef(this.props, newProps);
  }

  /**
   * When the component has mounted, update the componentRef.
   */
  public componentDidMount(): void {
    this._setComponentRef(this.props.componentRef, this);
  }

  /**
   * If we have disposables, dispose them automatically on unmount.
   */
  public componentWillUnmount(): void {
    this._setComponentRef(this.props.componentRef, null);

    if (this.__disposables) {
      for (let i = 0, len = this._disposables.length; i < len; i++) {
        const disposable = this.__disposables[i];

        if (disposable.dispose) {
          disposable.dispose();
        }
      }
      this.__disposables = null;
    }
  }

  /**
   * Allows subclasses to push things to this._disposables to be auto disposed.
   */
  protected get _disposables(): IDisposable[] {
    if (!this.__disposables) {
      this.__disposables = [];
    }
    return this.__disposables;
  }

  /**
   * Helper to return a memoized ref resolver function.
   * @param refName - Name of the member to assign the ref to.
   * @returns A function instance keyed from the given refname.
   * @deprecated Use `createRef` from React.createRef.
   */
  protected _resolveRef(refName: string): (ref: React.ReactNode) => React.ReactNode {
    if (!this.__resolves) {
      this.__resolves = {};
    }

    if (!this.__resolves[refName]) {
      // tslint:disable-next-line:no-any
      this.__resolves[refName] = (ref: React.ReactNode) => {
        // tslint:disable-next-line:no-any
        return ((this as any)[refName] = ref);
      };
    }

    return this.__resolves[refName];
  }

  /**
   * Updates the componentRef (by calling it with "this" when necessary.)
   */
  protected _updateComponentRef(currentProps: IBaseProps, newProps: IBaseProps = {}): void {
    if (currentProps.componentRef !== newProps.componentRef) {
      this._setComponentRef(currentProps.componentRef, null);
      this._setComponentRef(newProps.componentRef, this);
    }
  }

  private _setComponentRef<TRefInterface>(ref: IRefObject<TRefInterface> | undefined, value: TRefInterface | null): void {
    if (!this._skipComponentRefResolution && ref) {
      if (typeof ref === 'function') {
        ref(value);
      }

      if (typeof ref === 'object') {
        // tslint:disable:no-any
        (ref as any).current = value;
      }
    }
  }
}

/**
 * Helper to override a given method with a wrapper method that can try/catch the original, but also
 * ensures that the BaseComponent's methods are called before the subclass's. This ensures that
 * componentWillUnmount in the base is called and that things in the _disposables array are disposed.
 */
function _makeAllSafe(obj: BaseComponentMin<{}, {}>, prototype: Object, methodNames: string[]): void {
  for (let i = 0, len = methodNames.length; i < len; i++) {
    _makeSafe(obj, prototype, methodNames[i]);
  }
}

function _makeSafe(obj: BaseComponentMin<{}, {}>, prototype: Object, methodName: string): void {
  // tslint:disable:no-any
  const classMethod = (obj as any)[methodName];
  const prototypeMethod = (prototype as any)[methodName];
  // tslint:enable:no-any

  if (classMethod || prototypeMethod) {
    // tslint:disable-next-line:no-any
    (obj as any)[methodName] = function(): any {
      let retVal;

      if (prototypeMethod) {
        retVal = prototypeMethod.apply(this, arguments);
      }
      if (classMethod !== prototypeMethod) {
        retVal = classMethod.apply(this, arguments);
      }

      return retVal;
    };
  }
}
