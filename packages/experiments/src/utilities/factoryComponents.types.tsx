import { IContextualMenuProps, IIconProps, ILabelProps, IPersonaPresenceProps } from 'office-ui-fabric-react';
import { ISlotProp } from '../Foundation';

// TODO: All contents of this file should be moved to each respective component after slots utilities are promoted.

// Icon Types
export const IconShorthandProp: keyof IIconProps = 'iconName';
export type IIconSlot = ISlotProp<IIconProps, 'iconName'>;

export type IContextualMenuSlot = ISlotProp<IContextualMenuProps>;
export type ILabelSlot = ISlotProp<ILabelProps, 'children'>;
export type IPersonaPresenceSlot = ISlotProp<IPersonaPresenceProps, 'presence'>;
