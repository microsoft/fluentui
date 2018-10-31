/**
 * @copyright Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See https://github.com/haroldma/nucleus3d/blob/master/LICENSE for license information.
 */

import * as BABYLON from 'babylonjs';

import INucleusContext from '../common/INucleusContext';
import SceneEntity from '../common/SceneEntity';
import Component from '../Component';
import Entity from '../Entity';

describe('Component class', () => {
  const engine: BABYLON.Engine = new BABYLON.NullEngine();
  const sceneEntity: SceneEntity = new SceneEntity();
  const emptyEntity: Entity = new Entity();
  let scene: BABYLON.Scene;

  class FakeComponent extends Component {
    public didMountCalled: boolean;
    public willUpdateCalled: boolean;
    public onUpdatedCalled: boolean;
    public onEntityWillUpdateCalled: boolean;
    public onEntityUpdatedCalled: boolean;
    public willUnmountCalled: boolean;

    protected didMount(): void {
      this.didMountCalled = true;
    }

    protected willPropsUpdate(oldProps: {}): boolean {
      this.willUpdateCalled = true;
      return true;
    }

    protected onPropsUpdated(): void {
      this.onUpdatedCalled = true;
    }

    protected onEntityPropsWillUpdate(oldProps: {}): void {
      this.onEntityWillUpdateCalled = true;
    }

    protected onEntityPropsUpdated(): void {
      this.onEntityUpdatedCalled = true;
    }

    protected willUnmount(): void {
      this.willUnmountCalled = true;
    }
  }

  beforeEach(() => {
    scene = new BABYLON.Scene(engine);
    sceneEntity.mountChild(emptyEntity);
    sceneEntity.mount(engine, scene);
  });

  afterEach(() => {
    sceneEntity.unmount();
    scene.dispose();
  });

  describe('Mounting behavior', () => {
    it('should have a valid context if mounted', () => {
      const fakeComponent: FakeComponent = emptyEntity.mountComponent(new FakeComponent());
      const context: INucleusContext = fakeComponent.context;
      expect(context).toBeTruthy();
      expect(context.engine).toBeTruthy();
      expect(context.scene).toBeTruthy();
      expect(fakeComponent.entity.node).toBeTruthy();
      expect(fakeComponent.entity).toBe(emptyEntity);
    });

    it('should be unmounted if removed', () => {
      const fakeComponent: FakeComponent = emptyEntity.mountComponent(new FakeComponent());
      emptyEntity.unmountComponent(fakeComponent);
      expect(fakeComponent.isMounted).toBeFalsy();
    });
  });

  describe('Lifecycle', () => {
    it('should call didMount', () => {
      const fakeComponent: FakeComponent = emptyEntity.mountComponent(new FakeComponent());
      expect(fakeComponent.didMountCalled).toBeTruthy();
    });

    it('should not call didMount', () => {
      const fakeComponent: FakeComponent = new FakeComponent();
      fakeComponent.disable();
      emptyEntity.mountComponent(fakeComponent);
      expect(fakeComponent.didMountCalled).toBeFalsy();
    });

    it('should call update', () => {
      const fakeComponent: FakeComponent = emptyEntity.mountComponent(new FakeComponent());
      fakeComponent.updateProps({});
      expect(fakeComponent.willUpdateCalled).toBeTruthy();
      expect(fakeComponent.onUpdatedCalled).toBeTruthy();
    });

    it('should not call update', () => {
      const fakeComponent: FakeComponent = new FakeComponent();
      fakeComponent.disable();
      emptyEntity.mountComponent(fakeComponent);
      emptyEntity.updateProps({});
      expect(fakeComponent.onEntityWillUpdateCalled).toBeFalsy();
      expect(fakeComponent.onEntityUpdatedCalled).toBeFalsy();
    });

    it('should call update if entity updated', () => {
      const fakeComponent: FakeComponent = emptyEntity.mountComponent(new FakeComponent());
      emptyEntity.updateProps({});
      expect(fakeComponent.onEntityWillUpdateCalled).toBeTruthy();
      expect(fakeComponent.onEntityUpdatedCalled).toBeTruthy();
    });

    it('should not call update if entity updated', () => {
      const fakeComponent: FakeComponent = new FakeComponent();
      fakeComponent.disable();
      emptyEntity.mountComponent(fakeComponent);
      fakeComponent.updateProps({});
      expect(fakeComponent.willUpdateCalled).toBeFalsy();
      expect(fakeComponent.onUpdatedCalled).toBeFalsy();
    });

    it('should call unmount', () => {
      const fakeComponent: FakeComponent = emptyEntity.mountComponent(new FakeComponent());
      emptyEntity.unmountComponent(fakeComponent);
      expect(fakeComponent.willUnmountCalled).toBeTruthy();
    });
  });

  describe('Misc', () => {
    it('should retrive component by type', () => {
      const fakeComponent: FakeComponent = emptyEntity.mountComponent(new FakeComponent());

      expect(emptyEntity.hasComponent(FakeComponent)).toBeTruthy();
      expect(emptyEntity.getComponent(FakeComponent)).toBe(fakeComponent);
    });

    it('should throw if component type already mounted', () => {
      emptyEntity.mountComponent(new FakeComponent());
      expect(() => emptyEntity.mountComponent(new FakeComponent({ x: 3 }))).toThrow();
    });
  });
});
