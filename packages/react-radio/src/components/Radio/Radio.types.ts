import type { ComponentProps, ComponentState, ComponentRender, Slot } from '@fluentui/react-utilities';

export type RadioSlots = {
  root: Slot<'span'>;
};

/**
 * Radio Props
 */
export type RadioProps = ComponentProps<RadioSlots>;

/**
 * State used in rendering Radio
 */
export type RadioState = ComponentState<RadioSlots>;

export type RadioRender = ComponentRender<RadioState>;
