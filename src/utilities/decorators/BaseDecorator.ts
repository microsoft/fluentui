import * as React from 'react';
import { hoistMethods, unhoistMethods } from '../hoist';
import { BaseComponent } from '../../common/BaseComponent';

export class BaseDecorator<P, S> extends BaseComponent<P, S> {
  protected _composedComponentInstance: React.Component<P, S>;
  private _hoisted: string[];

  constructor() {
    super();
    this._updateChildRef = this._updateChildRef.bind(this);
  }

  protected _updateChildRef(composedComponentInstance: React.Component<P, S>) {
    this._composedComponentInstance = composedComponentInstance;
    if (composedComponentInstance) {
      this._hoisted = hoistMethods(this, composedComponentInstance);
    } else if (this._hoisted) {
      unhoistMethods(this, this._hoisted);
    }
  }
}
