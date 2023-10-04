import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { InteractionTagContextValue } from '../../contexts/interactionTagContext';
import { TagAppearance, TagShape, TagSize, TagValue, TagDismissHandler } from '../../utils/types';

export type InteractionTagContextValues = {
  interactionTag: InteractionTagContextValue;
};

export type InteractionTagSlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * InteractionTag Props
 */
export type InteractionTagProps<Value = TagValue> = ComponentProps<Partial<InteractionTagSlots>> & {
  /**
   * An InteractionTag can have filled, outlined or brand experience.
   *
   * @default 'filled'
   */
  appearance?: TagAppearance;

  /**
   * An InteractionTag can show that it cannot be interacted with.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * An InteractionTag can have rounded or circular shape.
   *
   * @default 'round'
   */
  shape?: TagShape;

  /**
   * An InteractionTag has three sizes.
   *
   * @default 'medium'
   */
  size?: TagSize;

  /**
   * Unique value identifying the tag within a TagGroup
   */
  value?: Value;
};

/**
 * State used in rendering InteractionTag
 */
export type InteractionTagState<Value = TagValue> = ComponentState<InteractionTagSlots> &
  Required<Pick<InteractionTagProps, 'appearance' | 'disabled' | 'shape' | 'size' | 'value'>> & {
    /**
     * Event handler from TagGroup context that allows TagGroup to dismiss the tag
     */
    handleTagDismiss: TagDismissHandler<Value>;

    /**
     * id to assign to InteractionTagPrimary
     */
    interactionTagPrimaryId: string;
  };
