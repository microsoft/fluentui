/**
 * @copyright Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See https://github.com/haroldma/nucleus3d/blob/master/LICENSE for license information.
 */

import * as BABYLON from 'babylonjs';
import cloneDeep from 'lodash-es/cloneDeep';

import { INucleusContext } from './common/INucleusContext';
import { Entity } from './Entity';
import { System } from './System';

/**
 * Modular chunks of data that can add appearance, behaviors and/or functionality to an entity.
 * @public
 */
// tslint:disable-next-line:no-any
export abstract class Component<TProps = {}, TSystem extends System = any> {
  private _isEnabled: boolean = true;
  private _props: TProps;
  private _isMounted: boolean;
  private _context?: INucleusContext;
  private _system?: TSystem;
  private _entity: Entity;
  private _nodes: BABYLON.Node[] = [];

  /**
   * Constructs the component.
   * @param props - the props
   */
  constructor(props?: TProps) {
    this._props = cloneDeep(props) || ({} as TProps);
  }

  /**
   * Gets the context.
   */
  public get context(): INucleusContext {
    if (!this.isMounted) {
      this._throwNotMounted();
    }
    return this._context!;
  }

  /**
   * Gets the entity.
   */
  public get entity(): Entity {
    if (!this.isMounted) {
      this._throwNotMounted();
    }
    return this._entity;
  }

  /**
   * Gets whether the component is enabled.
   */
  public get isEnabled(): boolean {
    return this._isEnabled;
  }

  /**
   * Gets whether the component is mounted.
   */
  public get isMounted(): boolean {
    return this._isMounted;
  }

  /**
   * Gets all associated nodes with this component.
   */
  public get nodes(): ReadonlyArray<BABYLON.Node> {
    if (!this.isMounted) {
      this._throwNotMounted();
    }
    return this._nodes;
  }

  /**
   * Gets the properties.
   */
  public get props(): TProps {
    return this._props;
  }

  /**
   * Gets the associated system for the component class.
   */
  public get system(): TSystem | undefined {
    if (!this.isMounted) {
      this._throwNotMounted();
    }
    return this._system;
  }

  /**
   * Enable the component.
   * @remarks Does nothing if already enabled.
   */
  public enable(): void {
    if (this._isEnabled) {
      return;
    }
    this._isEnabled = true;
    if (this.isMounted) {
      this.onEnabled();
    }
  }

  /**
   * Disable the component.
   * @remarks Does nothing if already disabled.
   */
  public disable(): void {
    if (!this._isEnabled) {
      return;
    }
    this._isEnabled = false;
    if (this.isMounted) {
      this.onDisabled();
    }
  }

  /**
   * Update properties.
   * @param props - The new properties
   */
  public updateProps(props: TProps): void {
    if (!this.isMounted || !this.isEnabled || this.willPropsUpdate(props)) {
      const oldProps: TProps = cloneDeep(this.props);
      this._props = Object.assign(this.props, cloneDeep(props));

      if (this.isEnabled && this.isMounted) {
        this.onPropsUpdated(oldProps);
      }
    }
  }

  /**
   * Adds the node to 'this.nodes' and parents it to the entity's node.
   * Automatically disposes of it after unmounting the component.
   * @param mesh - the node
   */
  protected addNode<T extends BABYLON.Node>(node: T): T {
    node.parent = this.entity.node;
    this._nodes.push(node);
    return node;
  }

  /**
   * Removes and disposes the node from `this.nodes`.
   * @param mesh - the node
   * @param disposeMaterialAndTextures - if true, disposes of materials and textures
   */
  protected disposeNode<T extends BABYLON.Node>(node: T, disposeMaterialAndTextures: boolean = true): void {
    this._nodes.splice(this._nodes.indexOf(node), 1);
    node.dispose(false, disposeMaterialAndTextures);
  }

  /**
   * Adds the node to 'this.nodes` and parents it to the entity's node.
   * Automatically disposes of it after unmounting the component.
   * @param mesh - the node
   * @returns the entity for the mesh
   */
  protected mountMesh(mesh: BABYLON.AbstractMesh): Entity {
    this.addNode(mesh);
    return Entity.for(mesh);
  }

  /**
   * Called after being mounted to an entity.
   */
  protected didMount(): void {
    // EMPTY BLOCK
  }

  /**
   * Override to provide your custom enabling logic. Only called when mounted.
   * @remarks
   * The default implemantation calls didMount. (soft mount)
   */
  protected onEnabled(): void {
    this.didMount();
  }

  /**
   * Override to provide your custom disabling logic. Only called when mounted.
   * @remarks
   * The default implemantation calls willUnmount. (soft unmount)
   */
  protected onDisabled(): void {
    this.willUnmount();
  }

  /**
   * Called before an entity's props are updated
   * @deprecated Components should rely on their own props.
   */
  // tslint:disable-next-line:no-any
  protected onEntityPropsWillUpdate(oldProps: any): void {
    // EMPTY BLOCK
  }

  /**
   * Called after an entity's props are updated
   * @deprecated Components should rely on their own props.
   */
  protected onEntityPropsUpdated(): void {
    // EMPTY BLOCK
  }

  /**
   * Called before render.
   */
  protected onUpdate(): void {
    // EMPTY BLOCK
  }

  /**
   * Called before unmounting from entity.
   */
  protected willUnmount(): void {
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
   * @internal
   */
  // tslint:disable-next-line:no-unused-variable
  protected _internalMount(entity: Entity, system?: TSystem): void {
    if (this._isMounted) {
      throw new Error('This component is already mounted.');
    }
    this._entity = entity;
    this._context = entity.context;
    this._system = system;
    this._isMounted = true;

    if (this.isEnabled) {
      this.didMount();
    }
  }

  /**
   * @internal
   */
  // tslint:disable-next-line:no-unused-variable
  protected _internalUnmount(disposeMaterialAndTextures: boolean): void {
    if (!this._isMounted) {
      throw new Error('This component is not mounted.');
    }

    if (this.isEnabled) {
      this.willUnmount();
    }

    this._nodes.forEach((node: BABYLON.Node) => {
      if (!node.isDisposed()) {
        node.dispose(
          false, // doNotRecurse
          disposeMaterialAndTextures
        );
      }
    });

    this._nodes.length = 0;
    this._context = undefined;
    this._system = undefined;
    this._isMounted = false;
  }

  private _throwNotMounted(): never {
    throw new Error('Component has not been mounted.');
  }
}
