import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const caption2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption2',
};

export const useCaption2Styles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(caption2ClassNames.root, state.root);

  return state;
};
