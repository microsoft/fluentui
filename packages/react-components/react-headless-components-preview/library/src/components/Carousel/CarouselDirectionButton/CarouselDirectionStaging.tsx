'use client';

import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import type { CarouselDirectionButtonState } from './CarouselDirectionButton.types';

const blockStagedClick = (event: React.MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

/** Keep the entire callback result in place, including anything outside the forwarded root. */
export const CarouselDirectionStaging = ({
  state,
  children,
}: {
  state: CarouselDirectionButtonState;
  children: React.ReactElement;
}): React.ReactElement => {
  const { hidden, stage } = state;
  const inertRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      node?.toggleAttribute('inert', hidden);
    },
    [hidden],
  );
  const containerRef = useMergedRefs(inertRef, stage?.ref);
  return (
    <>
      <div
        style={{ display: hidden ? 'none' : 'contents' }}
        hidden={hidden}
        aria-hidden={hidden || undefined}
        ref={containerRef}
        onClickCapture={hidden ? blockStagedClick : undefined}
        onFocus={stage?.onFocus}
        onBlur={stage?.onBlur}
      >
        {children}
      </div>
      {hidden && state.rendered && (
        <div
          data-carousel-button={state.kind}
          className={state.root.className}
          style={{ ...state.root.style, visibility: 'hidden' }}
          dir={state.root.dir}
          hidden
          aria-hidden="true"
          ref={inertRef}
        />
      )}
    </>
  );
};
