import * as React from 'react';
import { Async } from '../utilities/Async/Async';
import { EventGroup } from '../utilities/eventGroup/EventGroup';
import { IDisposable } from './IDisposable';

export class BaseComponent<P, S> extends React.Component<P, S> {
  /**
   * External consumers should override BaseComponent.onError to hook into error messages that occur from
   * exceptions thrown from within components.
   */
  public static onError: ((errorMessage?: string, ex?: Error) => void);

  private __async: Async;
  private __events: EventGroup;
  private __disposables: IDisposable[];

  constructor(props?: P) {
    super(props);

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

  /** If we have disposables, dispose them automatically on unmount. */
  public componentWillUnmount() {
    if (this.__disposables) {
      for (let i = 0, len = this._disposables.length; i < len; i++) {
        this.__disposables[i].dispose();
      }
      this.__disposables = null;
    }
  }

  /** Gets the object's class name. */
  public get className() {
    let funcNameRegex = /function (.{1,})\(/;
    let results = (funcNameRegex).exec((this).constructor.toString());

    return (results && results.length > 1) ? results[1] : '';
  }

  /** Allows subclasses to push things to this._disposables to be auto disposed. */
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
}

/**
 * Helper to override a given method with a wrapper method that can try/catch the original, but also
 * ensures that the BaseComponent's methods are called before the subclass's. This ensures that
 * componentWillUnmount in the base is called and that things in the _disposables array are disposed.
 **/
function _makeAllSafe(obj: BaseComponent<any, any>, prototype: Object, methodNames: string[]) {
  for (let i = 0, len = methodNames.length; i < len; i++) {
    _makeSafe(obj, prototype, methodNames[i]);
  }
}

function _makeSafe(obj: BaseComponent<any, any>, prototype: Object, methodName: string) {
  let classMethod = obj[methodName];
  let prototypeMethod = prototype[methodName];

  if (classMethod || prototypeMethod) {
    obj[methodName] = function() {
      let retVal;

      try {
        if (prototypeMethod) {
          retVal = prototypeMethod.apply(this, arguments);
        }
        if (classMethod) {
          retVal = classMethod.apply(this, arguments);
        }
      } catch (e) {
        const errorMessage = `Exception in ${ obj.className }.${ methodName }(): ${ typeof e === 'string' ? e : e.stack }`;

        if (BaseComponent.onError) {
          BaseComponent.onError(errorMessage, e);
        }
      }

      return retVal;
    };
  }
}

BaseComponent.onError = (errorMessage) => console.error(errorMessage);
