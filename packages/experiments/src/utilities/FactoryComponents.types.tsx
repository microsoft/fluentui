import { ISlotProp } from './Slots';
import { IHorizontalStackProps, ITextProps } from '@uifabric/experiments';
import { IContextualMenuProps, IIconProps } from 'office-ui-fabric-react';

// TODO: All contents of this file should be moved to each respective component after Slots utilities are promoted.

// HTML Types
export type IHTMLButtonSlot = ISlotProp<React.ButtonHTMLAttributes<any>>;

// Icon Types
export const IconShorthandProp: keyof IIconProps = 'iconName';
export type IIconSlot = ISlotProp<IIconProps, 'iconName'>;

export type IHorizontalStackSlot = ISlotProp<IHorizontalStackProps>;
export type IContextualMenuSlot = ISlotProp<IContextualMenuProps>;
export type ITextSlot = ISlotProp<ITextProps, 'children'>;
