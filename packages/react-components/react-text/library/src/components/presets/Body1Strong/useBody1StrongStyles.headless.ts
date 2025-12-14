import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const body1StrongClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body1Strong',
};

export const useBody1StrongStyles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(body1StrongClassNames.root, state.root);

  return state;
};
