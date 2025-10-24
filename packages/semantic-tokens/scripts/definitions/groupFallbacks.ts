import { buttonFallbacks } from './fallbacks/button';
import { focusFallbacks } from './fallbacks/focus';
import { GroupFallbacks } from './fallbacks/fallbacks.types';

export const groupFallbacks: GroupFallbacks = {
  focus: focusFallbacks,
  button: buttonFallbacks,
};
