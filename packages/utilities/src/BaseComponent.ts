import * as React from 'react';
import { Async } from './Async';
import { EventGroup } from './EventGroup';
import { IDisposable } from './IDisposable';
import { warnDeprecations, warnMutuallyExclusive, ISettingsMap } from './warn';

/**
 * Base props.
 *
 * @public
 */
export interface IBaseProps {
  componentRef?: any;
}

/**
 * Base component which provides a number of central utilities.
 *
 * @public
 */
export class BaseComponent<P extends IBaseProps, S> extends React.Component<P, S> {
  /**
   * External consumers should override BaseComponent.onError to hook into error messages that occur from
   * exceptions thrown from within components.
   */
  public static onError: ((errorMessage?: string, ex?: any) => void);

  /**
   * Controls whether the componentRef prop will be resolved by this component instance. If you are
   * implementing a passthrough (higher-order component), you would set this to false and pass through
   * the props to the inner component, allowing it to resolve the componentRef.
   */
  protected _shouldUpdateComponentRef: boolean;

  private __async: Async;
  private __events: EventGroup;
  private __disposables: IDisposable[] | null;
  private __resolves: { [name: string]: (ref: any) => any };
  private __className: string;

  /**
   * BaseComponent constructor
   * @param props - The props for the component.
   * @param context - The context for the component.
   */
  constructor(props?: P, context?: any) {
    super(props, context);

    if (props) {
      this.props = props;
    }

    this._shouldUpdateComponentRef = true;

    _makeAllSafe(this, BaseComponent.prototype, [
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
  public componentWillReceiveProps(newProps?: P, newContext?: any) {
    this._updateComponentRef(this.props, newProps);
  }

  /**
   * When the component has mounted, update the componentRef.
   */
  public componentDidMount() {
    this._updateComponentRef(undefined, this.props);
  }

  /**
   * If we have disposables, dispose them automatically on unmount.
   */
  public componentWillUnmount() {
    if (this.__disposables) {
      for (let i = 0, len = this._disposables.length; i < len; i++) {
        let disposable = this.__disposables[i];

        if (disposable.dispose) {
          disposable.dispose();
        }
      }
      this.__disposables = null;
    }
  }

  /**
   * Gets the object's class name.
   */
  public get className() {
    if (!this.__className) {
      let funcNameRegex = /function (.{1,})\(/;
      let results = (funcNameRegex).exec((this).constructor.toString());

      this.__className = (results && results.length > 1) ? results[1] : '';
    }

    return this.__className;
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
   * Gets the async instance associated with the component, created on demand. The async instance gives
   * subclasses a way to execute setTimeout/setInterval async calls safely, where the callbacks
   * will be cleared/ignored automatically after unmounting. The helpers within the async object also
   * preserve the this pointer so that you don't need to "bind" the callbacks.
   */
  protected get _async(): Async {
    if (!this.__async) {
      this.__async = new Async(this);
      this._disposables.push(this.__async);
    }

    return this.__async;
  }

  /**
   * Gets the event group instance assocaited with the component, created on demand. The event instance
   * provides on/off methods for listening to DOM (or regular javascript object) events. The event callbacks
   * will be automatically disconnected after unmounting. The helpers within the events object also
   * preserve the this reference so that you don't need to "bind" the callbacks.
   */
  protected get _events(): EventGroup {
    if (!this.__events) {
      this.__events = new EventGroup(this);
      this._disposables.push(this.__events);
    }

    return this.__events;
  }

  /**
   * Helper to return a memoized ref resolver function.
   * @param refName - Name of the member to assign the ref to.
   * @returns A function instance keyed from the given refname.
   */
  protected _resolveRef(refName: string): (ref: any) => any {
    if (!this.__resolves) {
      this.__resolves = {};
    }
    if (!this.__resolves[refName]) {
      this.__resolves[refName] = (ref) => {
        return (this as any)[refName] = ref;
      };
    }

    return this.__resolves[refName];
  }

  /**
   * Updates the componentRef (by calling it with "this" when necessary.)
   */
  protected _updateComponentRef(currentProps: IBaseProps | undefined, newProps: IBaseProps = {}) {
    if (this._shouldUpdateComponentRef &&
      ((!currentProps && newProps.componentRef) ||
        (currentProps && currentProps.componentRef !== newProps.componentRef))) {

      if (currentProps && currentProps.componentRef) {
        currentProps.componentRef(null);
      }

      if (newProps.componentRef) {
        newProps.componentRef(this);
      }
    }
  }
  /**
   * Warns when a deprecated props are being used.
   *
   * @param deprecationMap - The map of deprecations, where key is the prop name and the value is
   * either null or a replacement prop name.
   */
  protected _warnDeprecations(deprecationMap: ISettingsMap<P>) {
    warnDeprecations(this.className, this.props, deprecationMap);
  }

  /**
   * Warns when props which are mutually exclusive with each other are both used.
   *
   * @param mutuallyExclusiveMap - The map of mutually exclusive props.
   */
  protected _warnMutuallyExclusive(mutuallyExclusiveMap: ISettingsMap<P>) {
    warnMutuallyExclusive(this.className, this.props, mutuallyExclusiveMap);
  }
}

/**
 * Helper to override a given method with a wrapper method that can try/catch the original, but also
 * ensures that the BaseComponent's methods are called before the subclass's. This ensures that
 * componentWillUnmount in the base is called and that things in the _disposables array are disposed.
 */
function _makeAllSafe(obj: BaseComponent<any, any>, prototype: Object, methodNames: string[]) {
  for (let i = 0, len = methodNames.length; i < len; i++) {
    _makeSafe(obj, prototype, methodNames[i]);
  }
}

function _makeSafe(obj: BaseComponent<any, any>, prototype: Object, methodName: string) {
  let classMethod = (obj as any)[methodName];
  let prototypeMethod = (prototype as any)[methodName];

  if (classMethod || prototypeMethod) {
    (obj as any)[methodName] = function () {
      let retVal;

      try {
        if (prototypeMethod) {
          retVal = prototypeMethod.apply(this, arguments);
        }
        if (classMethod !== prototypeMethod) {
          retVal = classMethod.apply(this, arguments);
        }
      } catch (e) {
        const errorMessage = `Exception in ${obj.className}.${methodName}(): ${typeof e === 'string' ? e : e.stack}`;

        if (BaseComponent.onError) {
          BaseComponent.onError(errorMessage, e);
        }
      }

      return retVal;
    };
  }
}

BaseComponent.onError = (errorMessage) => {
  console.error(errorMessage);
  throw errorMessage;
};

/**
 * Simple constant function for returning null, used to render empty templates in JSX.
 *
 * @public
 */
export function nullRender(): JSX.Element | null { return null; }
