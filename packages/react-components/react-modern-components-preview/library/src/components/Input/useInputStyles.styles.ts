import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InputSlots, InputState } from './Input.types';
import styles from './Input.module.css';

export const inputClassNames: SlotClassNames<InputSlots> = {
  root: 'fui-Input',
  input: 'fui-Input__input',
  contentBefore: 'fui-Input__contentBefore',
  contentAfter: 'fui-Input__contentAfter',
};

export const useInputStyles = (state: InputState): InputState => {
  state.root.className = clsx(inputClassNames.root, styles.root, state.root.className);
  state.input.className = clsx(inputClassNames.input, styles.input, state.input.className);

  if (state.contentBefore) {
    state.contentBefore.className = clsx(inputClassNames.contentBefore, styles.content, state.contentBefore.className);
  }

  if (state.contentAfter) {
    state.contentAfter.className = clsx(inputClassNames.contentAfter, styles.content, state.contentAfter.className);
  }

  return state;
};
