import type { ComponentProps, ComponentState, ComponentRender, Slot } from '@fluentui/react-utilities';
import type { ButtonCommons, ButtonSlots, ButtonState } from '../Button/Button.types';

export type CompoundButtonSlots = ButtonSlots & {
  /**
   * Second line of text that describes the action this button takes.
   */
  secondaryContent?: Slot<'span'>;

  /**
   * Container that wraps the children and the secondaryContent slot.
   */
  contentContainer: NonNullable<Slot<'span'>>;
};

export type CompoundButtonProps = ComponentProps<Partial<CompoundButtonSlots>> & Partial<ButtonCommons>;

export type CompoundButtonState = ComponentState<CompoundButtonSlots> &
  Omit<ButtonState, keyof ButtonSlots | 'components'>;

export type CompoundButtonRender = ComponentRender<CompoundButtonState>;
