/**
 * @copyright Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See https://github.com/haroldma/nucleus3d/blob/master/LICENSE for license information.
 */

import cloneDeep from 'lodash-es/cloneDeep';

import { INucleusContext } from './common/INucleusContext';
import { Component } from './Component';

/**
 * Provide global scope, services, and management to classes of components.
 * @public
 */
export abstract class System<TProps = {}> {
  // tslint:disable-next-line:no-any
  private _componentType: new (...args: any[]) => Component;
  private _props: TProps;
  private _context?: INucleusContext;
  private _isInitialized: boolean;

  /**
   * Constructs the system.
   * @param componentType - the component type to associate with the system
   */
  // tslint:disable-next-line:no-any
  constructor(componentType: new (...args: any[]) => Component) {
    this._props = {} as TProps;
    this._componentType = componentType;
    this.onUpdate = this.onUpdate.bind(this);
  }

  /**
   * Gets the context.
   */
  protected get context(): INucleusContext {
    if (!this.isInitialized) {
      this._throwNotInitialized();
    }
    return this._context!;
  }

  /**
   * Gets whether the system has been initialized.
   */
  public get isInitialized(): boolean {
    return this._isInitialized;
  }

  /**
   * Gets the properties.
   */
  public get props(): TProps {
    return this._props;
  }

  /**
   * Gets the associated component type.
   */
  // tslint:disable-next-line:no-any
  public get componentType(): new (...args: any[]) => Component {
    return this._componentType;
  }

  /**
   * Update properties.
   * @param props - The new properties
   */
  public updateProps(props: TProps): void {
    if (!this._isInitialized || this.willPropsUpdate(props)) {
      const oldProps: TProps = cloneDeep(this.props);
      this._props = Object.assign(this.props, cloneDeep(props));

      if (this._isInitialized) {
        this.onPropsUpdated(oldProps);
      }
    }
  }

  /**
   * Called to initialize the system.
   */
  protected onInit(): void {
    // EMPTY BLOCK
  }

  /**
   * Called before render.
   */
  protected onUpdate(): void {
    // EMPTY BLOCK
  }

  /**
   * Called before update. False will reject the changes.
   */
  protected willPropsUpdate(newProps: TProps): boolean {
    return true;
  }

  /**
   * Called after props updated.
   */
  protected onPropsUpdated(oldProps: TProps): void {
    // EMPTY BLOCK
  }

  /**
   * Called when disposing of system.
   */
  protected onDispose(): void {
    // EMPTY BLOCK
  }

  /**
   * @internal
   */
  // tslint:disable-next-line:no-unused-variable
  protected _internalInit(context: INucleusContext): void {
    this._context = context;
    this._isInitialized = true;
    this.onInit();
  }

  /**
   * @internal
   */
  // tslint:disable-next-line:no-unused-variable
  protected _internalDispose(): void {
    this._context = undefined;
    this.onDispose();
    this._isInitialized = false;
  }

  private _throwNotInitialized(): never {
    throw new Error('System has not been initialized.');
  }
}
