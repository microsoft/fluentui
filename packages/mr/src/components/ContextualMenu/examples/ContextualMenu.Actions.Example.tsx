import * as React from 'react';
import { Scene, FabricSceneEntity, ContextualMenu } from '@uifabric/mr';

class MySceneEntity extends FabricSceneEntity {
  /**
   * The main entry point for the 3D example.
   */
  public render(): void {
    // Lights and camera
    const light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(0, -0.5, 1.0), this.context.scene);
    light.position = new BABYLON.Vector3(0, 5, -2);
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 1, -1.5), this.context.scene);
    camera.attachControl(this.canvas, false);

    // Fluent Contextual Menu
    const menu = new ContextualMenu({ description: 'An archival image of the old campus with the iconic X shaped buildings.' });
    this.mountChild(menu);
    menu.updateActions([
      {
        description: 'Add',
        isActionable: true,
        iconName: 'Add',
        onClick: () => {
          console.log('Add clicked');
        }
      },
      {
        description: 'Remove',
        isActionable: true,
        iconName: 'Remove',
        onClick: () => {
          console.log('Remove clicked');
        }
      },
      {
        description: 'Share',
        isActionable: true,
        iconName: 'Share',
        onClick: () => {
          console.log('Share clicked');
        }
      }
    ]);
    menu.node.position = new BABYLON.Vector3(0, 1, 0);
    menu.node.scaling.scaleInPlace(2);

    // Default Environment
    const environment = this.context.scene.createDefaultEnvironment();
    environment && environment.setMainColor(BABYLON.Color3.FromHexString('#74b9ff'));
    this.addEnvironmentMeshes(this.context.scene.meshes);
  }
}

export const ContextualMenuActionsExample = () => <Scene sceneEntity={new MySceneEntity()} />;
