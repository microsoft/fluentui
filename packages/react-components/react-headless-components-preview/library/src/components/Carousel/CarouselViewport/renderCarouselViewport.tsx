/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { CarouselItemIndexContext } from '../carouselContext';
import type { CarouselViewportSlots, CarouselViewportState } from './CarouselViewport.types';

/** Zero slides render nothing, leaving an empty region. */
export const renderCarouselViewport = (state: CarouselViewportState): JSXElement | null => {
  assertSlots<CarouselViewportSlots>(state);
  const { pages, idPrefix, groupSize, getPageLabel, paged, nav } = state;
  if (!pages.length) {
    return null;
  }
  return (
    <state.root>
      {pages.map((page, i) => {
        const inactive = paged && state.activeIndex !== i;
        return (
          <div
            key={i}
            id={`${idPrefix}-page-${i + 1}`}
            role={nav ? 'tabpanel' : 'group'}
            aria-label={nav ? undefined : getPageLabel(i + 1, pages.length)}
            aria-labelledby={nav ? `${idPrefix}-tab-${i + 1}` : undefined}
            aria-hidden={inactive || undefined}
            hidden={inactive}
            ref={node => {
              node?.toggleAttribute('inert', inactive);
            }}
            data-carousel-page=""
            data-active={inactive ? undefined : ''}
            data-outgoing={state.outgoingIndex === i ? '' : undefined}
          >
            <div data-carousel-slides="">
              {page.map((child, j) => (
                <CarouselItemIndexContext.Provider
                  key={React.isValidElement(child) && child.key !== null ? child.key : j}
                  value={i * groupSize + j}
                >
                  {child}
                </CarouselItemIndexContext.Provider>
              ))}
            </div>
          </div>
        );
      })}
    </state.root>
  );
};
