/**
 * @copyright Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See https://github.com/haroldma/nucleus3d/blob/master/LICENSE for license information.
 */

import * as BABYLON from 'babylonjs';

import SceneEntity from '../common/SceneEntity';
import Entity from '../Entity';

describe('Entity class', () => {
  const engine: BABYLON.Engine = new BABYLON.NullEngine();
  const sceneEntity: SceneEntity = new SceneEntity();
  let scene: BABYLON.Scene;

  const fakeRenderLoop: () => void = () => {
    scene.onBeforeRenderObservable.notifyObservers(scene);
  };

  beforeEach(() => {
    scene = new BABYLON.Scene(engine);
    sceneEntity.mount(engine, scene);
    engine.runRenderLoop(fakeRenderLoop);
  });

  afterEach(() => {
    engine.stopRenderLoop(fakeRenderLoop);
    sceneEntity.unmount();
    scene.dispose();
  });

  describe('Mounting behavior', () => {
    it('should have a node if mounted', () => {
      const entity: Entity = new Entity();
      sceneEntity.mountChild(entity);
      expect(entity.node).toBeTruthy();
    });

    it('should not have a node if unmounted', () => {
      const entity: Entity = new Entity();
      sceneEntity.mountChild(entity);
      entity.unmount();
      expect(() => entity.node).toThrow();
    });

    it('should unmount on dispose of mesh', () => {
      const entity: Entity = sceneEntity.mountChild(new Entity());
      entity.node.dispose();
      expect(entity.isMounted).toBeFalsy();
    });

    it('should call willUnmount before dispose of mesh', (done: jest.DoneCallback) => {
      const entity: Entity = sceneEntity.mountChild(new Entity());
      // tslint:disable-next-line:no-any
      (entity as any).willUnmount = () => {
        expect(entity.node.isDisposed()).toBeFalsy();
        done();
      };
      entity.node.dispose();
    });

    it('should dispose of a node if unmounted', () => {
      const entity: Entity = new Entity();
      sceneEntity.mountChild(entity);
      const node: BABYLON.AbstractMesh = entity.node;
      entity.unmount();
      expect(node.isDisposed()).toBeTruthy();
    });

    it('should throw on unmount if not mounted', () => {
      const entity: Entity = new Entity();
      expect(entity.unmount).toThrow();
    });

    it('should have a custom node if onMount overriden', () => {
      const customNode: BABYLON.Mesh = new BABYLON.Mesh('CustomNode');
      const entity: Entity = new Entity();
      // tslint:disable-next-line:no-any
      (entity as any).onMount = () => {
        return customNode;
      };
      sceneEntity.mountChild(entity);
      expect(entity.node).toBe(customNode);
    });
  });

  describe('Lifecycle', () => {
    class FakeEntity extends Entity {
      public didMountCalled: boolean;
      public getChildContextCalled: boolean;
      public willUpdateCalled: boolean;
      public onUpdateCalled: boolean;
      public onUpdatedCalled: boolean;
      public parentUpdatedCalled: boolean;
      public willUnmountCalled: boolean;

      private _shouldUpdate: boolean;

      constructor(shouldNotUpdate?: boolean) {
        super();
        this._shouldUpdate = shouldNotUpdate || false;
      }

      protected didMount(): void {
        this.didMountCalled = true;
      }

      protected getChildContext(): {} | undefined {
        this.getChildContextCalled = true;
        return undefined;
      }

      protected willPropsUpdate(newProps: {}): boolean {
        this.willUpdateCalled = true;
        return this._shouldUpdate;
      }

      protected onPropsUpdated(oldProps: {}): void {
        this.onUpdatedCalled = true;
      }

      protected onUpdate(): void {
        this.onUpdateCalled = true;
      }

      protected parentUpdated(isParentMounted: boolean): void {
        this.parentUpdatedCalled = true;
      }

      protected willUnmount(): void {
        this.willUnmountCalled = true;
      }
    }

    it('should call didMount', () => {
      const fakeEntity: FakeEntity = sceneEntity.mountChild(new FakeEntity());
      expect(fakeEntity.didMountCalled).toBeTruthy();
    });

    it('should return same on Entity.for', () => {
      const fakeEntity: FakeEntity = sceneEntity.mountChild(new FakeEntity());
      const forEntity: Entity = Entity.for(fakeEntity.node);
      expect(fakeEntity).toBe(forEntity);
    });

    it('should call getChildContext', () => {
      const fakeEntity: FakeEntity = sceneEntity.mountChild(new FakeEntity());
      fakeEntity.mountChild(new FakeEntity());
      expect(fakeEntity.getChildContextCalled).toBeTruthy();
    });

    it('should call willUpdate', () => {
      const fakeEntity: FakeEntity = sceneEntity.mountChild(new FakeEntity());
      fakeEntity.updateProps({});
      expect(fakeEntity.willUpdateCalled).toBeTruthy();
    });

    it('should call onUpdate', (done: jest.DoneCallback) => {
      const fakeEntity: FakeEntity = sceneEntity.mountChild(new FakeEntity(true));
      const observable: BABYLON.Observer<BABYLON.Scene> = scene.onBeforeRenderObservable.add(() => {
        scene.onBeforeRenderObservable.remove(observable);
        expect(fakeEntity.onUpdateCalled).toBeTruthy();
        done();
      })!;
      setTimeout(() => {
        done.fail('render loop never called.');
      }, 500);
    });

    it('should call onUpdated', () => {
      const fakeEntity: FakeEntity = sceneEntity.mountChild(new FakeEntity(true));
      fakeEntity.updateProps({});
      expect(fakeEntity.onUpdatedCalled).toBeTruthy();
    });

    it('should not call onUpdated', () => {
      const fakeEntity: FakeEntity = sceneEntity.mountChild(new FakeEntity());
      fakeEntity.updateProps({});
      expect(fakeEntity.onUpdatedCalled).toBeFalsy();
    });

    it('should call child/parent updated', () => {
      const fakeEntity: FakeEntity = sceneEntity.mountChild(new FakeEntity());
      const fakeChildEntity: FakeEntity = fakeEntity.mountChild(new FakeEntity());
      expect(fakeChildEntity.parentUpdatedCalled).toBeTruthy();
    });

    it('should call willUnmount', () => {
      const fakeEntity: FakeEntity = sceneEntity.mountChild(new FakeEntity());
      fakeEntity.unmount();
      expect(fakeEntity.willUnmountCalled).toBeTruthy();
    });
  });

  describe('Misc', () => {
    it('should return new entity using Entity.for', () => {
      const mesh: BABYLON.Mesh = new BABYLON.Mesh('Mesh', scene);
      const newEntity: Entity = Entity.for(mesh);
      sceneEntity.mountChild(newEntity);

      expect(newEntity).toBeTruthy();
      expect(newEntity.node).toBe(mesh);
    });

    it('should return same entity on second call to Entity.for', () => {
      const mesh: BABYLON.Mesh = new BABYLON.Mesh('Mesh', scene);
      const newEntity: Entity = Entity.for(mesh);
      sceneEntity.mountChild(newEntity);

      const secondCall: Entity = Entity.for(mesh);

      expect(newEntity).toBe(secondCall);
    });

    it('should deep copy properties', () => {
      // tslint:disable-next-line:no-any
      const props: any = {
        test: {
          a: 1,
          b: {
            c: new Set<number>([1, 2, 3])
          }
        }
      };
      const entity: Entity = new Entity(props);

      expect(entity.props).toEqual(props);
      props.test.a = 5;
      props.test.b.c.delete(1);
      expect(entity.props).not.toEqual(props);
    });
  });
});
