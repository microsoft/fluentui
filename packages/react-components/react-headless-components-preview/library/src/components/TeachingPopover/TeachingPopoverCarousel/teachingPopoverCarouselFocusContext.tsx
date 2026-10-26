'use client';

import * as React from 'react';
import { renderTeachingPopoverCarousel_unstable } from '@fluentui/react-teaching-popover';
import { useMergedRefs } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselContextValues,
  TeachingPopoverCarouselState,
} from './TeachingPopoverCarousel.types';

export const TeachingPopoverCarouselFocusContext = React.createContext<
  { root: HTMLDivElement | null; value: string | null } | undefined
>(undefined);

export const TeachingPopoverCarouselFocusProvider = ({
  state,
  contextValues,
}: {
  state: TeachingPopoverCarouselState;
  contextValues: TeachingPopoverCarouselContextValues;
}): JSXElement => {
  const [root, setRoot] = React.useState<HTMLDivElement | null>(null);
  const ref = useMergedRefs(state.root.ref, setRoot);
  const value = React.useMemo(
    () => ({ root, value: contextValues.carousel.value }),
    [root, contextValues.carousel.value],
  );
  return (
    <TeachingPopoverCarouselFocusContext.Provider value={value}>
      {renderTeachingPopoverCarousel_unstable({ ...state, root: { ...state.root, ref } }, contextValues)}
    </TeachingPopoverCarouselFocusContext.Provider>
  );
};
