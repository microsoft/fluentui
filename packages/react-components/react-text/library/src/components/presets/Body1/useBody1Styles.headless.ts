import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const body1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body1',
};

export const useBody1Styles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(body1ClassNames.root, state.root);

  return state;
};
