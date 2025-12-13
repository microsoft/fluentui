import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const body1StrongerClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body1Stronger',
};

export const useBody1StrongerStyles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(body1StrongerClassNames.root, state.root);

  return state;
};
