import { buttonFallbacks } from './fallbacks/button';
import { focusFallbacks } from './fallbacks/focus';
import { GroupFallbacks } from './fallbacks/fallbacks.types';
import { linkFallbacks } from './fallbacks/link';

export const groupFallbacks: GroupFallbacks = {
  focus: focusFallbacks,
  button: buttonFallbacks,
  link: linkFallbacks,
};
