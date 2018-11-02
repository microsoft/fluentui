/**
 * @copyright Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See https://github.com/haroldma/nucleus3d/blob/master/LICENSE for license information.
 */

import clone from 'lodash-es/clone';

import { Component } from '../Component';
import { Entity } from '../Entity';
import { IInternalComponent } from '../internals/IInternalComponent';
import { IInternalSystem } from '../internals/IInternalSystem';
import { System } from '../System';

/**
 * Represents the root of any nucleus tree.
 * @public
 */
export class SceneEntity extends Entity {
  private _mountedEntities: Entity[] = [];
  private _systems: Map<new () => Component, System> = new Map<new () => Component, System>();

  public static from(scene: BABYLON.Scene): SceneEntity {
    if (scene.isDisposed) {
      throw new Error('This scene has been disposed.');
    }

    let entity: SceneEntity = SceneEntity._extractFrom(scene) as SceneEntity;
    if (entity) {
      return entity;
    }
    entity = new SceneEntity();
    entity.mount(scene.getEngine(), scene);
    return entity;
  }

  private static _extractFrom(scene: BABYLON.Scene): Entity {
    return (scene as any).__entity__; // tslint:disable-line:no-any
  }

  private static _setTo(scene: BABYLON.Scene, entity: Entity): void {
    (scene as any).__entity__ = entity; // tslint:disable-line:no-any
  }

  constructor() {
    super({}, 'Scene');
  }

  /**
   * Gets the rendering canvas.
   */
  public get canvas(): HTMLCanvasElement {
    if (!this.isMounted) {
      this._throwSceneNotMounted();
    }
    return this.context.engine.getRenderingCanvas()!;
  }

  /**
   * Gets all registered systems.
   */
  public get systems(): System[] {
    const systems: System[] = [];
    this._systems.forEach((system: System) => {
      systems.push(system);
    });
    return systems;
  }

  /**
   * Mounts the scene.
   * @param engine - The BABYLON engine
   * @param scene - The BABYLON scene
   */
  public mount(engine: BABYLON.Engine, scene: BABYLON.Scene): void {
    if (SceneEntity._extractFrom(scene)) {
      throw new Error('The passed scene has an associated entity. Use SceneEntity.from(scene).');
    }
    SceneEntity._setTo(scene, this);
    // tslint:disable-next-line:no-any
    (this as any)._mount({
      engine,
      scene,
      sceneEntity: this
    });
  }

  /**
   * Gets a system by component type.
   * @param component - the component type
   */
  // tslint:disable-next-line:no-any
  public getSystem<T extends Component>(component: new (...args: any[]) => T): System | undefined {
    return this._systems.get(component);
  }

  /**
   * Register an array of systems.
   * @param systems - the systems
   */
  public registerSystems(systems: System[]): void {
    systems.forEach((system: System) => this.registerSystem(system));
  }

  /**
   * Register a system.
   * @param system - the system
   */
  public registerSystem<TSystem extends System>(system: TSystem): TSystem {
    if (this._systems.has(system.componentType)) {
      throw new Error('System already registered for this component type.');
    }

    this._systems.set(system.componentType, system);

    if (this.isMounted) {
      this._initializeSystem(system);
    }

    return system;
  }

  /**
   * Unregister a system.
   * @param system - the system
   */
  public unregisterSystem<TSystem extends System>(system: TSystem): void {
    if (!this._systems.has(system.componentType)) {
      throw new Error('System not registered for this component type.');
    }

    this._systems.delete(system.componentType);

    if (this.isMounted) {
      this._disposeSystem(system);
    }
  }

  public unmount(): void {
    this._systems.forEach((system: System) => {
      this._disposeSystem(system);
    });
    super.unmount();
  }

  protected didMount(): void {
    this._initializeSystems();
  }

  /**
   * @internal
   */
  // tslint:disable-next-line:no-unused-variable
  protected _internalRegisterEntity(entity: Entity): void {
    this._mountedEntities.push(entity);
  }

  /**
   * @internal
   */
  // tslint:disable-next-line:no-unused-variable
  protected _internalUnregisterEntity(entity: Entity): void {
    this._mountedEntities.splice(this._mountedEntities.indexOf(entity), 1);
  }

  private _initializeSystems(): void {
    this._systems.forEach((system: System) => {
      this._initializeSystem(system);
    });
  }

  private _disposeSystem(system: System): void {
    const internalSystem: IInternalSystem = system as any; // tslint:disable-line:no-any
    this.context.scene.onBeforeRenderObservable.removeCallback(internalSystem.onUpdate);
    internalSystem._internalDispose();
  }

  private _initializeSystem(system: System): void {
    const internalSystem: IInternalSystem = system as any; // tslint:disable-line:no-any
    internalSystem._internalInit(clone(this.context));

    this.context.scene.onBeforeRenderObservable.add(internalSystem.onUpdate);

    // intiailize any mounted entities
    this._mountedEntities.forEach((entity: Entity) => {
      entity.components.forEach((component: Component) => {
        if (component.constructor === system.componentType) {
          const internalComponent: IInternalComponent = component as any; // tslint:disable-line:no-any
          internalComponent._system = system;
        }
      });
    });
  }

  private _throwSceneNotMounted(): never {
    throw new Error('Scene entity has not been mounted.');
  }
}
