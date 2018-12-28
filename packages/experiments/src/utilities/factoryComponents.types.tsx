import { IStackProps, ITextProps } from '@uifabric/experiments';
import { IContextualMenuProps, IIconProps, ILabelProps } from 'office-ui-fabric-react';
import { ISlotProp } from '../Foundation';

// TODO: All contents of this file should be moved to each respective component after Slots utilities are promoted.

// HTML Types
export type IHTMLButtonSlot = ISlotProp<React.ButtonHTMLAttributes<any>>;
export type IHTMLSlot = ISlotProp<React.HTMLAttributes<any>>;

// Icon Types
export const IconShorthandProp: keyof IIconProps = 'iconName';
export type IIconSlot = ISlotProp<IIconProps, 'iconName'>;

// TODO: move experimental components into respective types files
export type IContextualMenuSlot = ISlotProp<IContextualMenuProps>;
export type ILabelSlot = ISlotProp<ILabelProps, 'children'>;
export type IStackSlot = ISlotProp<IStackProps>;
export type ITextSlot = ISlotProp<ITextProps, 'children'>;
