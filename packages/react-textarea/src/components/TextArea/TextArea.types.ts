import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TextAreaSlots = {
  /**
   * Wrapper element used for displaying the borders for TextArea. This wrapper is needed due to the focus
   * indicator border animation. For more information, see Spec.md
   *
   * The root only received a `className` and `style`. All other props are applied to the `textArea` slot.
   */
  root: NonNullable<Slot<'span'>>;

  /**
   * The `<textarea>` element. This is the primary slot, all native props and ref will be applied to this slot.
   */
  textArea: NonNullable<Slot<'textarea'>>;
};

type TextAreaCommons = {
  /**
   * Which direction the TextArea is allowed to be resized.
   *
   * @defaultvalue none
   */
  resize: 'none' | 'horizontal' | 'vertical' | 'both';

  /**
   * Size of the TextArea.
   *
   * @defaultvalue medium
   */
  size: 'small' | 'medium' | 'large';

  /**
   * Styling the TextArea should use.
   *
   * @defaultvalue outline
   */
  appearance: 'outline' | 'filledDarker' | 'filledLighter';
};

/**
 * TextArea Props
 */
export type TextAreaProps = Omit<
  ComponentProps<Partial<TextAreaSlots>, 'textArea'>,
  'value' | 'defaultValue' | 'onChange' | 'size'
> &
  Partial<TextAreaCommons> & {
    /**
     * The value of the TextArea.
     */
    value?: string;

    /**
     * The default value of the TextArea.
     */
    defaultValue?: string;

    /**
     * Callback for when the user changes the value.
     */
    onChange?: (ev: React.FormEvent<HTMLTextAreaElement>, data: TextAreaOnChangeData) => void;
  };

/**
 * State used in rendering TextArea
 */
export type TextAreaState = ComponentState<TextAreaSlots> & TextAreaCommons;

/**
 * Data passed to the `onChange` callback when the textarea's value changes.
 */
type TextAreaOnChangeData = {
  value: string;
};
