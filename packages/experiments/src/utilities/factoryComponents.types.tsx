import {
  ICalloutProps,
  IContextualMenuProps,
  IFontIconProps,
  IIconProps,
  ILabelProps,
  IListProps,
  IPersonaPresenceProps,
  PersonaPresence
} from 'office-ui-fabric-react';
import { ISlotProp } from '../Foundation';

// TODO: All contents of this file should be moved to each respective component after slots utilities are promoted.

export type ICalloutSlot = ISlotProp<ICalloutProps>;
export type IContextualMenuSlot = ISlotProp<IContextualMenuProps>;
export type IFontIconSlot = ISlotProp<IFontIconProps, string>;
export type IIconSlot = ISlotProp<IIconProps, string>;
export type ILabelSlot = ISlotProp<ILabelProps, string>;
export type IListSlot = ISlotProp<IListProps>;
export type IPersonaPresenceSlot = ISlotProp<IPersonaPresenceProps, PersonaPresence>;
