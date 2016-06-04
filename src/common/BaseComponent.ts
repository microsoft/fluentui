import * as React from 'react';
import { Async } from '../utilities/Async/Async';
import { EventGroup } from '../utilities/eventGroup/EventGroup';
import { IDisposable } from './IDisposable';

const __errorCallbacks: ((errorMessage?: string, ex?: Error) => void)[] = [];

export class BaseComponent<P, S> extends React.Component<P, S> {
  private __async: Async;
  private __events: EventGroup;
  private __disposables: IDisposable[];

  public static onError(cb: (errorMessage?: string, ex?: Error) => void) {
    __errorCallbacks.push(cb);
  }

  constructor(props: P) {
    super(props);
    _makeAllSafe(this, BaseComponent.prototype, [
      'componentWillMount',
      'componentDidMount',
      'componentWillUpdate',
      'componentDidUpdate',
      'componentWillUnmount',
      'render'
    ]);
  }

  public componentWillUnmount() {
    if (this.__disposables) {
      for (let i = 0, len = this._disposables.length; i < len; i++) {
        this.__disposables[i].dispose();
      }
      this.__disposables = null;
    }
  }

  public get className() {
    let funcNameRegex = /function (.{1,})\(/;
    let results = (funcNameRegex).exec((this).constructor.toString());

    return (results && results.length > 1) ? results[1] : '';
  }

  protected get _disposables(): IDisposable[] {
    if (!this.__disposables) {
      this.__disposables = [];
    }
    return this.__disposables;
  }

  protected get _async(): Async {
    if (!this.__async) {
      this.__async = new Async(this);
      this._disposables.push(this.__async);
    }

    return this.__async;
  }

  protected get _events(): EventGroup {
    if (!this.__events) {
      this.__events = new EventGroup(this);
      this._disposables.push(this.__events);
    }

    return this.__events;
  }
}

function _makeAllSafe(obj: BaseComponent<any, any>, prototype: Object, methodNames: string[]) {
  for (let i = 0, len = methodNames.length; i < len; i++) {
    _makeSafe(obj, prototype, methodNames[i]);
  }
}

function _makeSafe(obj: BaseComponent<any, any>, prototype: Object, methodName: string) {
  let classMethod = obj[methodName];
  let prototypeMethod = prototype[methodName];

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

      for (let i = 0, len = __errorCallbacks.length; i < len; i++) {
        __errorCallbacks[i](errorMessage, e);
      }
    }

    return retVal;
  };
}

BaseComponent.onError((errorMessage, ex) => console.error(errorMessage));
