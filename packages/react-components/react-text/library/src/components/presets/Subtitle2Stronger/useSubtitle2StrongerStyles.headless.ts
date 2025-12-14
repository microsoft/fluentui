import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const subtitle2StrongerClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subtitle2Stronger',
};

export const useSubtitle2StrongerStyles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(subtitle2StrongerClassNames.root, state.root);

  return state;
};
