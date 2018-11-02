import { IMRAction } from '../ContextualMenu/ContextualMenu.types';

export interface IImage360 {
  description?: string;
  menuVisible?: boolean;
  actions?: IMRAction[];
  onReady?: () => void;
  onClick?: (pickInfo: BABYLON.PickingInfo) => void;
}
