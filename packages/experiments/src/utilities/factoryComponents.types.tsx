import * as React from 'react';
import { IStackProps, ITextProps, IPersonaCoinProps } from '@uifabric/experiments';
import { IContextualMenuProps, IIconProps, ILabelProps } from 'office-ui-fabric-react';
import { ISlotProp } from '../Foundation';

// TODO: All contents of this file should be moved to each respective component after Slots utilities are promoted.

// HTML Types
// TODO: Move to Foundation?
// export type IHTMLButtonSlot = ISlotProp<React.ButtonHTMLAttributes<any>>;
export type IHTMLButtonSlot = ISlotProp<JSX.IntrinsicElements['button']>;

// TODO: expand IHTMLSlot into more finite types like IHTMLButtonSlot with lookups?
//        something will need to change to access ref attribute of React.ClassAttributes
export type IHTMLSlot = ISlotProp<React.HTMLAttributes<any>>;

// Icon Types
export const IconShorthandProp: keyof IIconProps = 'iconName';
export type IIconSlot = ISlotProp<IIconProps, 'iconName'>;

// TODO: move experimental components into respective types files
export type IContextualMenuSlot = ISlotProp<IContextualMenuProps>;
export type ILabelSlot = ISlotProp<ILabelProps, 'children'>;
export type IStackSlot = ISlotProp<IStackProps>;
export type ITextSlot = ISlotProp<ITextProps, 'children'>;
export type IPersonaCoinSlot = ISlotProp<IPersonaCoinProps>;
