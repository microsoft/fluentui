import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextareaState, TextareaSlots } from './Textarea.types';
import styles from './Textarea.module.css';

export const textareaClassNames: SlotClassNames<TextareaSlots> = {
  root: 'fui-Textarea',
  textarea: 'fui-Textarea__textarea',
};

export const useTextareaStyles_unstable = (state: TextareaState): TextareaState => {
  state.root.className = clsx(
    textareaClassNames.root,
    styles.root,
    styles[state.size],
    styles[state.appearance],
    styles[state.resize],
    state.appearance.startsWith('filled') && styles.filled,
    state.textarea.disabled && styles.disabled,
    String(state.textarea['aria-invalid']) === 'true' && styles.invalid,
    state.root.className,
  );
  state.textarea.className = clsx(textareaClassNames.textarea, styles.textarea, state.textarea.className);
  return state;
};
