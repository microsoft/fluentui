import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const caption1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption1',
};

export const useCaption1Styles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(caption1ClassNames.root, state.root);

  return state;
};
