import * as React from 'react';
import {
  BaseComponent,
  hoistMethods,
  unhoistMethods
} from '../../Utilities';

export class BaseDecorator<P, S> extends BaseComponent<P, S> {
  protected _shouldUpdateComponentRef = false;

  protected _composedComponentInstance: React.Component<P, S>;

  private _hoisted: string[];

  constructor() {
    super();
    this._updateComposedComponentRef = this._updateComposedComponentRef.bind(this);
  }

  /**
   * Updates the ref to the component composed by the decorator, which will also take care of hoisting
   * (and unhoisting as appropriate) methods from said component.
   *
   * Pass this method as the argument to the 'ref' property of the composed component.
   */
  protected _updateComposedComponentRef(composedComponentInstance: React.Component<P, S>) {
    this._composedComponentInstance = composedComponentInstance;
    if (composedComponentInstance) {
      this._hoisted = hoistMethods(this, composedComponentInstance);
    } else if (this._hoisted) {
      unhoistMethods(this, this._hoisted);
    }
  }
}
