'use client';

import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  slot,
  useEventCallback,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { toDataAttributeValue } from '../../utils/toDataAttributeValue';
import type { CarouselPart } from './carouselContext';
import { useCarouselSelection } from './useCarouselSelection';
import { useCarouselEnvironment, useCarouselRotation } from './useCarouselRotation';
import type { CarouselProps, CarouselState } from './Carousel.types';

const pageLabel = (position: number, total: number) => `Page ${position} of ${total}`;
const slideLabel = (position: number, total: number) => `Slide ${position} of ${total}`;

/**
 * Create the state required to render Carousel.
 *
 * The root owns group selection, playback and transitions. Compound parts (`CarouselViewport`,
 * `CarouselPrevious`, `CarouselNext`, `CarouselNav`, `CarouselAutoplayButton`) register themselves, so
 * a complete tablist, two operable arrows, or one operable circular arrow enables paging.
 * Without a route to every group, all slides stay visible.
 */
export function useCarousel(props: CarouselProps, ref: React.Ref<HTMLDivElement>): CarouselState {
  const {
    groupSize = 1,
    circular = false,
    autoplayInterval = 4000,
    activeIndex,
    defaultActiveIndex,
    onActiveIndexChange,
    transition,
    getPageLabel = pageLabel,
    getSlideLabel = slideLabel,
    ...rootProps
  } = props;
  if (![1, 2, 3, 4].includes(groupSize)) {
    throw new RangeError('Carousel groupSize must be 1, 2, 3 or 4.');
  }
  if (!Number.isInteger(autoplayInterval) || autoplayInterval < 1000 || autoplayInterval > 2147483647) {
    throw new RangeError('Carousel autoplayInterval must be an integer from 1000 to 2147483647.');
  }
  for (const value of [activeIndex, defaultActiveIndex]) {
    if (value !== undefined && (!Number.isInteger(value) || value < 0)) {
      throw new RangeError('Carousel indices must be non-negative integers.');
    }
  }
  const fluent = useFluent_unstable();
  const rootRef = React.useRef<HTMLDivElement>(null);
  // Resolved lazily, so the root doesn't override an inherited direction: the explicit prop, then the root's computed
  // direction (the actual layout; the headless Provider writes no `dir` to the DOM), then the Provider's direction.
  const getDir = useEventCallback((): 'ltr' | 'rtl' => {
    if (rootProps.dir === 'rtl' || rootProps.dir === 'ltr') {
      return rootProps.dir;
    }
    const root = rootRef.current;
    const computed = root && fluent.targetDocument?.defaultView?.getComputedStyle(root).direction;
    if (computed === 'rtl' || computed === 'ltr') {
      return computed;
    }
    return fluent.dir === 'rtl' ? 'rtl' : 'ltr';
  });
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const rootMergedRef = useMergedRefs(ref, rootRef);
  const idPrefix = useId('carousel-', props.id);
  const viewportId = `${idPrefix}-viewport`;

  const [slideCount, setSlideCount] = React.useState(0);
  const [parts, setParts] = React.useState<{ part: CarouselPart; available: boolean }[]>([]);
  const register = React.useCallback((part: CarouselPart, available = true) => {
    const entry = { part, available };
    setParts(current => [...current, entry]);
    return () => setParts(current => current.filter(item => item !== entry));
  }, []);

  const pageCount = Math.ceil(slideCount / groupSize);
  const available = (part: CarouselPart) => parts.some(item => item.part === part && item.available);
  const hasPrevious = available('previous');
  const hasNext = available('next');
  // Page only when the rendered controls reach every group in both directions; a lone non-circular arrow
  // would strand the collection at a boundary, so it stays static instead.
  const hasNav = available('nav');
  const reachable = hasNav || (circular ? hasPrevious || hasNext : hasPrevious && hasNext);
  const canPage = pageCount > 1 && reachable;
  const autoplay = canPage && available('autoplay');

  const environment = useCarouselEnvironment(fluent.targetDocument, rootRef, autoplay);
  const selection = useCarouselSelection({
    activeIndex,
    defaultActiveIndex,
    onActiveIndexChange,
    transition,
    pageCount,
    groupSize,
    paged: canPage,
    circular,
    getDir,
    targetDocument: fluent.targetDocument,
    rootRef,
    reducedMotion: environment.reducedMotion,
    documentVisible: environment.documentVisible,
    viewportRef,
  });
  const { view } = selection;
  const { paged } = view;
  const buttons = paged && parts.some(item => item.part === 'previous' || item.part === 'next');
  const nav = paged && hasNav;
  const lastGroup = !circular && view.index === pageCount - 1;
  // Arrival at the last group stops rotation. If Play was explicitly started there, request the restart
  // until the controlled owner accepts it, just like an ordinary advance.
  const advance = useEventCallback(() => {
    selection.request((view.index + 1) % pageCount, 'autoplay', undefined, 1);
  });
  const rotation = useCarouselRotation(
    fluent.targetDocument,
    autoplay,
    autoplayInterval,
    view.index,
    view.busy,
    lastGroup,
    advance,
    environment,
    viewportRef,
  );
  const previousUnavailable = !circular && view.index === 0;
  const nextUnavailable = !circular && view.index === pageCount - 1;

  const select = useEventCallback(
    (index: number, event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
      rotation.stop();
      selection.request(index, 'nav', event);
    },
  );
  const onNavKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLElement>, tabIndex: number) => {
    // Move from the focused tab, not the selected group: a controlled owner may decline or delay a selection.
    const dir = getDir();
    let index = tabIndex;
    switch (event.key) {
      case 'ArrowRight':
        index += dir === 'rtl' ? -1 : 1;
        break;
      case 'ArrowLeft':
        index += dir === 'rtl' ? 1 : -1;
        break;
      case 'Home':
        index = 0;
        break;
      case 'End':
        index = pageCount - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    index = (index + pageCount) % pageCount;
    const tabs = event.currentTarget.closest('[role="tablist"]')?.querySelectorAll<HTMLElement>('[role="tab"]');
    tabs?.[index]?.focus();
    select(index, event);
  });
  const previous = useEventCallback((event: React.MouseEvent<HTMLElement>) => {
    if (!event.defaultPrevented && !previousUnavailable) {
      rotation.stop();
      selection.request((view.index + pageCount - 1) % pageCount, 'previous', event, -1);
    }
  });
  const next = useEventCallback((event: React.MouseEvent<HTMLElement>) => {
    if (!event.defaultPrevented && !nextUnavailable) {
      rotation.stop();
      selection.request((view.index + 1) % pageCount, 'next', event, 1);
    }
  });
  const toggleAutoplay = useEventCallback((event: React.MouseEvent<HTMLElement>) => {
    if (event.defaultPrevented || !autoplay || environment.reducedMotion) {
      return;
    }
    if (rotation.playing) {
      rotation.stop();
    } else {
      if (!circular && view.index === pageCount - 1) {
        selection.request(0, 'autoplay', event, 1);
      }
      rotation.play();
    }
  });
  const onFocusCapture = useEventCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (rotation.playing) {
      rotation.interrupt(event);
    }
    if (view.busy && viewportRef.current?.contains(event.target)) {
      selection.settle(false);
    }
  });

  return {
    components: { root: 'div' },
    root: Object.assign(
      slot.always(
        getIntrinsicElementProps<CarouselProps>('div', {
          role: 'region',
          'aria-roledescription': 'carousel',
          ...rootProps,
          ref: rootMergedRef,
          onPointerOver: mergeCallbacks(rootProps.onPointerOver, rotation.onPointerOver),
          onPointerLeave: mergeCallbacks(rootProps.onPointerLeave, rotation.onPointerLeave),
          onPointerDownCapture: mergeCallbacks(rootProps.onPointerDownCapture, rotation.interrupt),
          onKeyDownCapture: mergeCallbacks(rootProps.onKeyDownCapture, rotation.interrupt),
          // A child's autoFocus can run before the first ancestor layout effect. There is nothing to interrupt yet.
          onFocusCapture: mergeCallbacks(
            rootProps.onFocusCapture,
            rotation.playing || view.busy ? onFocusCapture : undefined,
          ),
        }),
        { elementType: 'div' },
      ),
      {
        'data-paged': toDataAttributeValue(paged),
        'data-playing': toDataAttributeValue(rotation.playing),
        'data-circular': toDataAttributeValue(circular),
      },
    ),
    idPrefix,
    viewportId,
    viewportRef,
    groupSize,
    slideCount,
    pageCount,
    activeIndex: view.index,
    outgoingIndex: view.outgoing,
    busy: view.busy,
    paged,
    buttons,
    nav,
    autoplay,
    playing: rotation.playing,
    reducedMotion: environment.reducedMotion,
    previousUnavailable,
    nextUnavailable,
    previousHidden: previousUnavailable && !(view.busy && view.anchor === 'previous'),
    nextHidden: nextUnavailable && !(view.busy && view.anchor === 'next'),
    getPageLabel,
    getSlideLabel,
    register,
    setSlideCount,
    select,
    previous,
    next,
    toggleAutoplay,
    onNavKeyDown,
  };
}
