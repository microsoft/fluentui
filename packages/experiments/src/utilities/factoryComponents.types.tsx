import { IContextualMenuProps, IIconProps, ILabelProps, IPersonaPresenceProps, PersonaPresence } from 'office-ui-fabric-react';
import { ISlotProp } from '../Foundation';

// TODO: All contents of this file should be moved to each respective component after slots utilities are promoted.

export type IContextualMenuSlot = ISlotProp<IContextualMenuProps>;
export type IIconSlot = ISlotProp<IIconProps, string>;
export type ILabelSlot = ISlotProp<ILabelProps, React.ReactNode>;
export type IPersonaPresenceSlot = ISlotProp<IPersonaPresenceProps, PersonaPresence>;
