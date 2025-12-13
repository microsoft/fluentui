import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const caption2StrongClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption2Strong',
};

export const useCaption2StrongStyles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(caption2StrongClassNames.root, state.root);

  return state;
};
