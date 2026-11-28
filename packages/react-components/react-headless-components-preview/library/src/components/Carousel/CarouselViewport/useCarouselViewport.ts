'use client';

import * as React from 'react';
import { slot, useEventCallback, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import { toDataAttributeValue } from '../../../utils/toDataAttributeValue';
import { useCarouselContext } from '../carouselContext';
import { hasTabStop } from '../focusCarouselPage';
import type { CarouselViewportProps, CarouselViewportState } from './CarouselViewport.types';

/**
 * Create the state required to render CarouselViewport.
 *
 * Groups its children into pages, reports the slide count to `Carousel`, and exposes the live region
 * that announces settled groups.
 */
export const useCarouselViewport = (
  props: CarouselViewportProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselViewportState => {
  const context = useCarouselContext();
  const { groupSize, setSlideCount } = context;
  const { children, ...rest } = props;
  const slides = React.useMemo(() => React.Children.toArray(children), [children]);
  const pages = React.useMemo(
    () =>
      Array.from({ length: Math.ceil(slides.length / groupSize) }, (_, i) =>
        slides.slice(i * groupSize, (i + 1) * groupSize),
      ),
    [slides, groupSize],
  );
  useIsomorphicLayoutEffect(() => setSlideCount(slides.length), [slides.length, setSlideCount]);
  useIsomorphicLayoutEffect(() => () => setSlideCount(0), [setSlideCount]);
  const viewportRef = useMergedRefs(ref, context.viewportRef);
  // A tab panel whose slides offer no focus stop becomes one itself. Measured after render, so the server
  // markup omits it; one flag per group, as a string so an unchanged measurement doesn't re-render.
  const [stoplessPages, setStoplessPages] = React.useState('');
  const { nav } = context;
  const measure = useEventCallback(() => {
    const pageElements = nav ? Array.from(context.viewportRef.current?.children ?? []) : [];
    setStoplessPages(pageElements.map(page => (hasTabStop(page as HTMLElement) ? '0' : '1')).join(''));
  });
  useIsomorphicLayoutEffect(() => {
    measure();
    const viewport = context.viewportRef.current;
    const Observer = viewport?.ownerDocument.defaultView?.MutationObserver;
    if (!nav || !viewport || !Observer) {
      return;
    }
    // Slide content can change without re-rendering the viewport.
    const observer = new Observer(measure);
    observer.observe(viewport, {
      subtree: true,
      childList: true,
      attributeFilter: [
        'tabindex',
        'disabled',
        'href',
        'contenteditable',
        'controls',
        'type',
        'hidden',
        'inert',
        'open',
        'class',
        'style',
      ],
    });
    // Ancestors can conceal or disable slide controls without touching the viewport: presentation classes and
    // styles, and a surrounding fieldset's disabled state or first legend (which exempts its content).
    for (let node = viewport.parentElement; node; node = node.parentElement) {
      observer.observe(node, {
        attributeFilter: ['class', 'style', 'disabled'],
        childList: node.localName === 'fieldset',
      });
    }
    // Media queries can change computed display or visibility too.
    const win = viewport.ownerDocument.defaultView;
    win?.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      win?.removeEventListener('resize', measure);
    };
  }, [nav, pages, context.viewportRef, measure]);

  return {
    components: { root: 'div' },
    root: Object.assign(
      slot.always(
        {
          ...rest,
          ref: viewportRef,
          id: context.viewportId,
          // A static collection has nothing to announce; a paged one announces settled groups unless playing.
          'aria-live': context.paged && !context.playing ? ('polite' as const) : ('off' as const),
          'aria-atomic': context.paged || undefined,
          'aria-busy': context.busy,
        },
        { elementType: 'div' },
      ),
      {
        'data-group-size': groupSize,
        'data-paged': toDataAttributeValue(context.paged),
        'data-buttons': toDataAttributeValue(context.buttons),
        'data-nav': toDataAttributeValue(context.nav),
        'data-transitioning': toDataAttributeValue(context.busy),
      },
    ),
    pages,
    idPrefix: context.idPrefix,
    groupSize,
    activeIndex: context.activeIndex,
    outgoingIndex: context.outgoingIndex,
    paged: context.paged,
    nav,
    focusablePages: pages.map((_, i) => stoplessPages[i] === '1'),
    getPageLabel: context.getPageLabel,
  };
};
