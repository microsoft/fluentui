/**
 * @copyright Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See https://github.com/haroldma/nucleus3d/blob/master/LICENSE for license information.
 */

import { SceneEntity } from '../common/SceneEntity';
import { Component } from '../Component';
import { Entity } from '../Entity';
import { IInternalComponent } from '../internals/IInternalComponent';

export class InternalComponentCollection {
  private _isMounted: boolean;
  private _entity?: Entity;
  private _sceneEntity?: SceneEntity;

  // tslint:disable-next-line:ban-types
  private _internalMap: Map<Function, IInternalComponent> = new Map<() => void, IInternalComponent>();

  // tslint:disable-next-line:ban-types
  public get map(): Map<Function, Component> {
    return this._internalMap as any; // tslint:disable-line:no-any
  }

  public get array(): Component[] {
    const arr: Component[] = [];
    this._internalMap.forEach((component: IInternalComponent) => {
      arr.push(component as any); // tslint:disable-line:no-any
    });
    return arr;
  }

  public mount(entity: Entity, sceneEntity: SceneEntity): void {
    if (this._isMounted) {
      return;
    }

    this._entity = entity;
    this._sceneEntity = sceneEntity as any; // tslint:disable-line:no-any

    this._isMounted = true;

    // Loop through array in cases where a component, mounted before the entity was mounted, mounts another component.
    // tslint:disable-next-line:no-any
    ((this.array as any) as IInternalComponent[]).forEach((component: IInternalComponent) => {
      component._internalMount(entity, sceneEntity.getSystem(component.constructor as new () => Component));
    });
  }

  public mountComponent(component: Component): void {
    const internalComponent: IInternalComponent = component as any; // tslint:disable-line:no-any
    if (this._isMounted) {
      internalComponent._internalMount(
        this._entity!,
        // tslint:disable-next-line:no-any
        this._sceneEntity!.getSystem(component.constructor as new () => Component)
      );
    }
    this._internalMap.set(component.constructor, internalComponent);
  }

  public onEntityPropsWillUpdate(oldProps: {}): void {
    this._internalMap.forEach((component: IInternalComponent) => {
      if (component.isEnabled) {
        component.onEntityPropsWillUpdate(oldProps);
      }
    });
  }

  public onEntityPropsUpdated(): void {
    this._internalMap.forEach((component: IInternalComponent) => {
      if (component.isEnabled) {
        component.onEntityPropsUpdated();
      }
    });
  }

  public unmountComponent(component: Component, disposeMaterialAndTextures: boolean): void {
    const internalComponent: IInternalComponent = component as any; // tslint:disable-line:no-any

    this._internalMap.delete(component.constructor);
    internalComponent._internalUnmount(disposeMaterialAndTextures);
  }

  public unmount(disposeMaterialAndTextures: boolean): void {
    this._internalMap.forEach((component: IInternalComponent) => {
      component._internalUnmount(disposeMaterialAndTextures);
    });
    this._internalMap.clear();
    this._entity = undefined;
    this._isMounted = false;
  }
}
