import { ISlotProp } from './slots';
import { IStackProps, ITextProps, IPersonaCoinProps } from '@uifabric/experiments';
import { IContextualMenuProps, IIconProps } from 'office-ui-fabric-react';

// TODO: All contents of this file should be moved to each respective component after Slots utilities are promoted.

// HTML Types
export type IHTMLButtonSlot = ISlotProp<React.ButtonHTMLAttributes<any>>;
export type IHTMLDivSlot = ISlotProp<React.HTMLAttributes<any>>;

// Icon Types
export const IconShorthandProp: keyof IIconProps = 'iconName';
export type IIconSlot = ISlotProp<IIconProps, 'iconName'>;

export type IHorizontalStackSlot = ISlotProp<IStackProps>;
export type IContextualMenuSlot = ISlotProp<IContextualMenuProps>;
export type ITextSlot = ISlotProp<ITextProps, 'children'>;
export type IPersonaCoinSlot = ISlotProp<IPersonaCoinProps>;
