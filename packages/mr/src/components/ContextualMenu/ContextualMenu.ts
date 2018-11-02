import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import { getIcon, IIconRecord } from 'office-ui-fabric-react';

import { Entity } from '../../common/nucleus3d/core/Entity';
import { IContextMenuProps, IActionGroup, IMRAction } from './ContextualMenu.types';
import { Panel } from '../Panel/Panel';

/**
 * The context menu entity. This class houses all of the visuals for the context menu.
 */
export class ContextualMenu extends Entity<IContextMenuProps> {
  private static readonly TEXT_PLANE_HEIGHT: number = 0.15;
  private static readonly BUTTON_PLANE_HEIGHT: number = 0.112;
  private static readonly MENU_WIDTH: number = 0.56;
  private static readonly MENU_DEPTH: number = 0.01;
  private static readonly LAYER_SEPARATION: number = 0.01;
  private static readonly PLANE_SEPARATION: number = 0.012;

  private _gui3DManager: GUI.GUI3DManager;
  private _textPanel: Panel;
  private _buttonPanel: Panel;
  private _descriptionControl: GUI.TextBlock;
  private _actionGroups: IActionGroup[] = [];

  public get isShowing(): boolean {
    return this.node.isEnabled();
  }

  public updateActions(actions: IMRAction[]): void {
    if (this.isMounted) {
      this._clearActions();
      actions.forEach((action: IMRAction, index: number) => this._createAndAddButton(action, index, actions.length));
      this._buttonPanel.node.setEnabled(actions.length > 0);
    }
  }

  public show(): void {
    this.node.setEnabled(true);
  }

  public hide(): void {
    this.node.setEnabled(false);
  }

  protected didMount(): void {
    this._gui3DManager = new GUI.GUI3DManager(this.context.scene);
    this.node.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y | BABYLON.Mesh.BILLBOARDMODE_X; // tslint:disable-line:no-bitwise
    this._initializeTextPanel();
    this._initializeButtonPanel();
  }

  protected willUnmount(): void {
    this._gui3DManager.dispose();
  }

  protected onPropsUpdated(oldProps: IContextMenuProps): void {
    if (this._shouldShowTextPanel) {
      this._descriptionControl.text = this.props.description!;
      this._textPanel.node.setEnabled(true);
    } else {
      this._textPanel.node.setEnabled(false);
    }
  }

  private get _shouldShowTextPanel(): boolean {
    return !!this.props.description && this.props.description.length > 0;
  }

  private _initializeTextPanel(): void {
    this._textPanel = new Panel({
      width: ContextualMenu.MENU_WIDTH,
      height: ContextualMenu.TEXT_PLANE_HEIGHT,
      depth: ContextualMenu.MENU_DEPTH,
      layerSeparation: ContextualMenu.LAYER_SEPARATION,
      alpha: 1
    });
    this.mountChild(this._textPanel);
    this._textPanel.node.position.y = (ContextualMenu.TEXT_PLANE_HEIGHT + ContextualMenu.PLANE_SEPARATION) / 2;
    this._textPanel.node.setEnabled(this._shouldShowTextPanel);

    const textPlane: BABYLON.Mesh = BABYLON.MeshBuilder.CreatePlane(
      'textPlane',
      {
        width: ContextualMenu.MENU_WIDTH,
        height: ContextualMenu.TEXT_PLANE_HEIGHT
      },
      this.context.scene
    );
    textPlane.parent = this._textPanel.node;
    BABYLON.Tags.AddTagsTo(textPlane, 'IgnoreInput');

    const adt: GUI.AdvancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateForMesh(
      textPlane,
      ContextualMenu.MENU_WIDTH * 1024,
      ContextualMenu.TEXT_PLANE_HEIGHT * 1024
    );
    this._descriptionControl = this._createDescriptionControl();
    adt.addControl(this._descriptionControl);
  }

  private _createDescriptionControl(): GUI.TextBlock {
    const descriptionControl: GUI.TextBlock = new GUI.TextBlock('description');
    descriptionControl.text = this.props.description as string;
    descriptionControl.paddingLeft = '4px';
    descriptionControl.paddingRight = '4px';
    descriptionControl.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    descriptionControl.width = 1;
    descriptionControl.fontSize = 22;
    descriptionControl.fontFamily = 'Segoe UI';
    descriptionControl.color = '#201F1E';
    descriptionControl.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    descriptionControl.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    descriptionControl.textWrapping = GUI.TextWrapping.WordWrap;
    return descriptionControl;
  }

  private _initializeButtonPanel(): void {
    this._buttonPanel = new Panel({
      width: ContextualMenu.MENU_WIDTH,
      height: ContextualMenu.BUTTON_PLANE_HEIGHT,
      depth: ContextualMenu.MENU_DEPTH,
      layerSeparation: ContextualMenu.LAYER_SEPARATION,
      alpha: 0.6
    });
    this.mountChild(this._buttonPanel);
    this._buttonPanel.node.position.y = -(ContextualMenu.BUTTON_PLANE_HEIGHT + ContextualMenu.PLANE_SEPARATION) / 2;
    this._buttonPanel.node.setEnabled(false);
  }

  private _clearActions(): void {
    this._actionGroups.forEach((group: IActionGroup) => {
      this._gui3DManager.removeControl(group.button);
      group.button.dispose();
    });

    this._actionGroups = [];
  }

  private _createAndAddButton(action: IMRAction, index: number, buttonCount: number): void {
    const pressedColor: BABYLON.Color3 = BABYLON.Color3.FromHexString('#106EBE');
    const nonPressedColor: BABYLON.Color3 = BABYLON.Color3.FromHexString('#0078D4');
    const hoverTextColor: string = '#f8f8f8';
    const nonHoverTextColor: string = 'black';
    const hoverAlpha: number = 0.8;
    const nonHoverAlpha: number = 0;

    const button: GUI.HolographicButton = new GUI.HolographicButton('contextMenuButton');
    this._gui3DManager.addControl(button);
    button.linkToTransformNode(this._buttonPanel.node);
    button.backMaterial.alpha = 0;
    button.frontMaterial.alpha = nonHoverAlpha;
    button.frontMaterial.albedoColor = nonPressedColor;
    button.frontMaterial.renderBorders = false;
    this._positionAndScaleButton(button, index, buttonCount);

    const icon: IIconRecord = getIcon(action.iconName)!;
    if (icon) {
      const textBlock: GUI.TextBlock = new GUI.TextBlock('buttonText');
      textBlock.text = icon.code!;
      textBlock.fontFamily = icon.subset.fontFace!.fontFamily!;
      textBlock.color = nonHoverTextColor;
      textBlock.fontSize = 80;
      textBlock.paddingTop = '12px';
      button.content = textBlock;
      button.tooltipText = action.description;
    } else {
      button.text = action.description;
    }

    button.onPointerDownObservable.add(() => {
      button.frontMaterial.albedoColor = pressedColor;
    });
    button.onPointerUpObservable.add(() => {
      button.frontMaterial.albedoColor = nonPressedColor;
    });
    button.onPointerEnterObservable.add(() => {
      button.frontMaterial.alpha = hoverAlpha;
      button.content.color = hoverTextColor;
    });
    button.onPointerOutObservable.add(() => {
      button.frontMaterial.alpha = nonHoverAlpha;
      button.content.color = nonHoverTextColor;
    });

    this._updateActionButtonVisuals(button, action);

    this._actionGroups.push({
      action: action,
      button: button
    });
  }

  private _positionAndScaleButton(button: GUI.HolographicButton, index: number, buttonCount: number): void {
    const buttonWidth: number = ContextualMenu.MENU_WIDTH / (buttonCount + 2);
    const firstEmptySlotOffset: number = (buttonWidth - ContextualMenu.MENU_WIDTH) / 2;
    const buttonOffset: number = firstEmptySlotOffset + buttonWidth * (index + 1);

    button.scaling = new BABYLON.Vector3(buttonWidth, ContextualMenu.BUTTON_PLANE_HEIGHT, ContextualMenu.MENU_DEPTH);
    button.position.x = buttonOffset;
  }

  private _updateActionButtonVisuals(button: GUI.HolographicButton, action: IMRAction): void {
    if (action.isActionable) {
      button.mesh!.isPickable = true;
      button.onPointerClickObservable.add(() => {
        action.invoke();
      });
    } else {
      button.mesh!.isPickable = false;
      button.onPointerClickObservable.clear();
    }
  }
}
