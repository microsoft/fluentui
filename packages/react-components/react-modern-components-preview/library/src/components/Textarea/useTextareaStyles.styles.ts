import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextareaSlots, TextareaState } from './Textarea.types';
import styles from './Textarea.module.css';

export const textareaClassNames: SlotClassNames<TextareaSlots> = {
  root: 'fui-Textarea',
  textarea: 'fui-Textarea__textarea',
};

export const useTextareaStyles = (state: TextareaState): TextareaState => {
  state.root.className = clsx(textareaClassNames.root, styles.root, state.root.className);
  state.textarea.className = clsx(textareaClassNames.textarea, styles.textarea, state.textarea.className);

  return state;
};
