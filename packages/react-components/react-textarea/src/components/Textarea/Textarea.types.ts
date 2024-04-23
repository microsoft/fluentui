import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TextareaSlots = {
  /**
   * Wrapper element used for displaying the borders for Textarea. This wrapper is needed due to the focus
   * indicator border animation. For more information, see Spec.md
   *
   * The root only receives `className` and `style`. All other props are applied to the `textarea` slot.
   */
  root: NonNullable<Slot<'span'>>;

  /**
   * The `<textarea>` element. This is the primary slot, all native props and ref are applied to this slot.
   */
  textarea: NonNullable<Slot<'textarea'>>;
};

/**
 * Textarea Props
 */
export type TextareaProps = Omit<
  ComponentProps<Partial<TextareaSlots>, 'textarea'>,
  'defaultValue' | 'onChange' | 'size' | 'value'
> & {
  /**
   * Styling the Textarea should use.
   *
   * @default outline
   *
   * Note: 'filled-darker-shadow' and 'filled-lighter-shadow' are deprecated and will be removed in the future.
   */
  appearance?: 'outline' | 'filled-darker' | 'filled-lighter' | 'filled-darker-shadow' | 'filled-lighter-shadow';

  /**
   * The default value of the Textarea.
   */
  defaultValue?: string;

  /**
   * Callback for when the user changes the value.
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onChange?: (ev: React.ChangeEvent<HTMLTextAreaElement>, data: TextareaOnChangeData) => void;

  /**
   * Which direction the Textarea is allowed to be resized.
   *
   * @default none
   */
  resize?: 'none' | 'horizontal' | 'vertical' | 'both';

  /**
   * Size of the Textarea.
   *
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * The value of the Textarea.
   */
  value?: string;
};

/**
 * State used in rendering Textarea
 */
export type TextareaState = ComponentState<TextareaSlots> &
  Required<Pick<TextareaProps, 'appearance' | 'resize' | 'size'>>;

/**
 * Data passed to the `onChange` callback when the textarea's value changes.
 */
export type TextareaOnChangeData = {
  value: string;
};
