import { detectOverflow } from '@popperjs/core';
import type { Modifier } from '@popperjs/core';

export const isIntersectingModifier: IsIntersectingModifier = {
  name: 'is-intersecting-modifier',
  enabled: true,
  phase: 'main',
  requires: ['preventOverflow'],
  fn: ({ state, name }) => {
    const popperRect = state.rects.popper;
    const popperAltOverflow = detectOverflow(state, { altBoundary: true });

    const isIntersectingTop = popperAltOverflow.top < popperRect.height && popperAltOverflow.top > 0;
    const isIntersectingBottom = popperAltOverflow.bottom < popperRect.height && popperAltOverflow.bottom > 0;

    const isIntersecting = isIntersectingTop || isIntersectingBottom;

    state.modifiersData[name] = {
      isIntersecting,
    };
    state.attributes.popper = {
      ...state.attributes.popper,
      'data-popper-is-intersecting': isIntersecting,
    };
  },
};

type IsIntersectingModifier = Modifier<'is-intersecting-modifier', never>;
