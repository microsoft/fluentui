import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { DialogContentContextValue } from '../../contexts/dialogContentContext';

export type DialogContentSlots = {
  root: Slot<'div', 'main'>;
};

export type DialogContentContextValues = {
  dialogContent: DialogContentContextValue;
};

/**
 * DialogContent Props
 */
export type DialogContentProps = ComponentProps<DialogContentSlots>;

/**
 * State used in rendering DialogContent
 */
export type DialogContentState = ComponentState<DialogContentSlots>;
