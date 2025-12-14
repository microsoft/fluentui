import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const title3ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Title3',
};

export const useTitle3Styles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(title3ClassNames.root, state.root);

  return state;
};
