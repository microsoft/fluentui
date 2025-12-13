import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const largeTitleClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-LargeTitle',
};

export const useLargeTitleStyles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(largeTitleClassNames.root, state.root);

  return state;
};
