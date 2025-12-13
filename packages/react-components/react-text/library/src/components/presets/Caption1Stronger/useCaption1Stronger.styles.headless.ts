import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const caption1StrongerClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption1Stronger',
};

export const useCaption1StrongerStyles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(caption1StrongerClassNames.root, state.root);

  return state;
};
