/**
 * @copyright Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See https://github.com/haroldma/nucleus3d/blob/master/LICENSE for license information.
 */

import * as BABYLON from 'babylonjs';

import INucleusContext from '../common/INucleusContext';
import SceneEntity from '../common/SceneEntity';
import Component from '../Component';
import Entity from '../Entity';
import System from '../System';

describe('Component class', () => {
  const engine: BABYLON.Engine = new BABYLON.NullEngine();
  const sceneEntity: SceneEntity = new SceneEntity();
  const emptyEntity: Entity = new Entity();
  let scene: BABYLON.Scene;

  class FakeComponent extends Component<{}, FakeSystem> {}

  // tslint:disable-next-line
  class FakeSystem extends System {
    public didMountCalled: boolean;
    public willUpdateCalled: boolean;
    public onUpdatedCalled: boolean;
    public onUpdateCalled: boolean;

    constructor() {
      super(FakeComponent);
    }

    protected onInit(): void {
      this.didMountCalled = true;
    }

    protected willPropsUpdate(oldProps: {}): boolean {
      this.willUpdateCalled = true;
      return true;
    }

    protected onPropsUpdated(): void {
      this.onUpdatedCalled = true;
    }

    protected onUpdate(): void {
      this.onUpdateCalled = true;
    }
  }

  beforeEach(() => {
    scene = new BABYLON.Scene(engine);
    sceneEntity.mountChild(emptyEntity);
    sceneEntity.mount(engine, scene);
  });

  afterEach(() => {
    sceneEntity.systems.forEach((system: System) => {
      sceneEntity.unregisterSystem(system);
    });
    sceneEntity.unmount();
    scene.dispose();
  });

  describe('Lifecycle', () => {
    it('should have a valid context if registered', () => {
      const fakeSystem: FakeSystem = sceneEntity.registerSystem(new FakeSystem());
      const context: INucleusContext = (fakeSystem as any).context; // tslint:disable-line:no-any
      expect(context).toBeTruthy();
      expect(context.engine).toBeTruthy();
      expect(context.scene).toBeTruthy();
    });

    it('should be present in related component', () => {
      const fakeSystem: FakeSystem = sceneEntity.registerSystem(new FakeSystem());
      const fakeComponent: FakeComponent = emptyEntity.mountComponent(new FakeComponent());
      expect(fakeComponent.system).toBe(fakeSystem);
    });

    it('should call update', () => {
      const fakeSystem: FakeSystem = sceneEntity.registerSystem(new FakeSystem());
      fakeSystem.updateProps({});
      expect(fakeSystem.willUpdateCalled).toBeTruthy();
      expect(fakeSystem.onUpdatedCalled).toBeTruthy();
    });
  });
});
