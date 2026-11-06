import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from './Text.types';
import styles from './Text.module.css';

export const textClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Text',
};

export const useTextStyles_unstable = (state: TextState): TextState => {
  state.root.className = clsx(
    textClassNames.root,
    styles.root,
    state.wrap === false && styles.nowrap,
    state.truncate && styles.truncate,
    state.block && styles.block,
    state.italic && styles.italic,
    state.underline && styles.underline,
    state.strikethrough && styles.strikethrough,
    styles[`size${state.size}`],
    styles[state.font],
    styles[state.weight],
    styles[state.align],
    state.root.className,
  );
  return state;
};
