import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Persona } from '@fluentui/react-persona';

export type TagSlots = {
  root: NonNullable<Slot<'div'>>;
  content?: Slot<'span'>;
  persona?: Slot<typeof Persona>;
  icon?: Slot<'span'>;
  primaryText?: Slot<'span'>;
  secondaryText?: Slot<'span'>;
  dismiss?: Slot<'span'>;
};

/**
 * Tag Props
 */
export type TagProps = ComponentProps<TagSlots> & {
  size?: 'extra-small' | 'small' | 'medium';
  shape?: 'rounded' | 'circular';
  style?: 'filled-darker' | 'filled-lighter' | 'tint' | 'outline';
  disabled?: boolean;
  checked?: boolean;
  dismissible?: boolean;
};

/**
 * State used in rendering Tag
 */
export type TagState = ComponentState<TagSlots>;
