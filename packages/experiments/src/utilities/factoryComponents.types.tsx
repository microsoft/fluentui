import { IContextualMenuProps, IIconProps, ILabelProps, IPersonaPresenceProps, PersonaPresence } from 'office-ui-fabric-react';
import { ISlotProp } from '../Foundation';

// TODO: All contents of this file should be moved to each respective component as they are converted to use slots.
export type IContextualMenuSlot = ISlotProp<IContextualMenuProps>;
export type IIconSlot = ISlotProp<IIconProps, string>;
export type ILabelSlot = ISlotProp<ILabelProps, string>;
export type IPersonaPresenceSlot = ISlotProp<IPersonaPresenceProps, PersonaPresence>;
