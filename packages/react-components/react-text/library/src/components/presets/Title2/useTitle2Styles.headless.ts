import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const title2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Title2',
};

export const useTitle2Styles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(title2ClassNames.root, state.root);

  return state;
};
