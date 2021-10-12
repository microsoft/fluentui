import type { VanillaButtonState } from './VanillaButton.types';
import { className } from './VanillaButtonStyles.css';

export const useVanillaButtonStyles = (state: VanillaButtonState): VanillaButtonState => {
  state.root.className = className;

  return state;
};
