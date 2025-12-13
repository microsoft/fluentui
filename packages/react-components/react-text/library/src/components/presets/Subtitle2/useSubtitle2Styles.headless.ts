import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const subtitle2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subtitle2',
};

export const useSubtitle2Styles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(subtitle2ClassNames.root, state.root);

  return state;
};
