import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TagContextValue = Required<Pick<TagProps, 'dismissable' | 'shape' | 'size' | 'interactive'>>;

export type TagContextValues = {
  tag: TagContextValue;
};

export type TagSlots = {
  root: NonNullable<Slot<'div'>>;

  dismissButton: Slot<'button'>;
};

/**
 * Tag Props
 */
export type TagProps = ComponentProps<Partial<TagSlots>> & {
  size?: 'extra-small' | 'small' | 'medium';
  shape?: 'rounded' | 'circular';
  appearance?: 'filled-darker' | 'filled-lighter' | 'tint' | 'outline';
  disabled?: boolean;
  checked?: boolean;
  dismissable?: boolean;
  interactive?: boolean;
};

/**
 * State used in rendering Tag
 */
export type TagState = ComponentState<TagSlots> &
  Required<Pick<TagProps, 'appearance' | 'checked' | 'disabled' | 'dismissable' | 'shape' | 'size' | 'interactive'>>;
