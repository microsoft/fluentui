import { IMRAction } from '../ContextualMenu/ContextualMenu.types';

export enum Video360Mode {
  Loading = 0,
  Play = 1,
  Pause = 2
}

export interface IVideo360 {
  description?: string;
  mode?: Video360Mode;
  menuVisible?: boolean;
  actions?: IMRAction[];
  onReady?: () => void;
  onClick?: (pickInfo: BABYLON.PickingInfo) => void;
}
