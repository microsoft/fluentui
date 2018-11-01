import * as GUI from 'babylonjs-gui';

export interface IMRAction {
  /**
   * The description of the action.
   */
  description: string;

  /**
   * The name of an icon to display the action in a button.
   */
  iconName?: string;

  /**
   * Returns true if the action can be taken.
   */
  isActionable: boolean;

  /**
   * Performs the action.
   */
  invoke: () => void;
}

export interface IActionGroup {
  action: IMRAction;
  button: GUI.Button3D;
}

/**
 * Properties that represent a context menu.
 */
export interface IContextMenuProps {
  description?: string;
}
