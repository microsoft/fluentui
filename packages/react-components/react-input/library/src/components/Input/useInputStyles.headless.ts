import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { InputSlots, InputState } from './Input.types';

export const inputClassNames: SlotClassNames<InputSlots> = {
  root: 'fui-Input',
  input: 'fui-Input__input',
  contentBefore: 'fui-Input__contentBefore',
  contentAfter: 'fui-Input__contentAfter',
};

export const useInputStyles_unstable = (state: InputState): InputState => {
  state.root.className = getComponentSlotClassName(inputClassNames.root, state.root, state);

  if (state.input) {
    state.input.className = getComponentSlotClassName(inputClassNames.input, state.input);
  }

  if (state.contentBefore) {
    state.contentBefore.className = getComponentSlotClassName(inputClassNames.contentBefore, state.contentBefore);
  }

  if (state.contentAfter) {
    state.contentAfter.className = getComponentSlotClassName(inputClassNames.contentAfter, state.contentAfter);
  }

  return state;
};
