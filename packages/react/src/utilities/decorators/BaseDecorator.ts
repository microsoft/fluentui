import * as React from 'react';
import { hoistMethods, unhoistMethods } from '../../Utilities';

export class BaseDecorator<TProps, TState> extends React.Component<TProps, TState> {
  protected _composedComponentInstance: React.Component<TProps, TState>;

  private _hoisted: string[];

  constructor(props: TProps) {
    super(props);
    this._updateComposedComponentRef = this._updateComposedComponentRef.bind(this);
  }

  /**
   * Updates the ref to the component composed by the decorator, which will also take care of hoisting
   * (and unhoisting as appropriate) methods from said component.
   *
   * Pass this method as the argument to the 'ref' property of the composed component.
   */
  protected _updateComposedComponentRef(composedComponentInstance: React.Component<TProps, TState>): void {
    this._composedComponentInstance = composedComponentInstance;
    if (composedComponentInstance) {
      this._hoisted = hoistMethods(this, composedComponentInstance);
    } else if (this._hoisted) {
      unhoistMethods(this, this._hoisted);
    }
  }
}
