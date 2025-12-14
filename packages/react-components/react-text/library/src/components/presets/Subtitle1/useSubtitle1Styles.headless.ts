import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const subtitle1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subtitle1',
};

export const useSubtitle1Styles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(subtitle1ClassNames.root, state.root);

  return state;
};
