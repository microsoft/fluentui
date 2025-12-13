import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const title1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Title1',
};

export const useTitle1Styles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(title1ClassNames.root, state.root);

  return state;
};
