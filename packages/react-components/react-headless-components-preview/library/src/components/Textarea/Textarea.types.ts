import type { TextareaBaseState } from '@fluentui/react-textarea';

export type { TextareaSlots, TextareaBaseProps as TextareaProps } from '@fluentui/react-textarea';

/**
 * Textarea component state
 */
export type TextareaState = TextareaBaseState & {
  root: {
    'data-disabled'?: string;
    'data-invalid'?: string;
    'data-resize'?: TextareaBaseState['resize'];
  };
};
