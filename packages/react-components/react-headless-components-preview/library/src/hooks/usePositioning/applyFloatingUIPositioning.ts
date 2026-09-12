import type { Boundary, Middleware, MiddlewareState, Padding, Placement, Strategy } from '@floating-ui/dom';
import type {
  Alignment,
  Position,
  PositioningBoundary,
  PositioningProps,
  PositioningVirtualElement,
} from '@fluentui/react-positioning';
import { ALIGNMENTS, POSITIONS } from './constants';
import { normalizeAlign } from './utils/placement';

// alert('Floating UI');

type FloatingUIDom = typeof import('@floating-ui/dom');
type OnPositioningEndEventDetail = {
  placement: Placement;
  escaped: boolean;
  referenceHidden: boolean;
};

const CONTAINER_PROPS = [
  'position',
  'inset',
  'margin',
  'left',
  'top',
  'width',
  'height',
  'max-width',
  'max-height',
  'box-sizing',
  'transform',
  'overflow-x',
  'overflow-y',
] as const;
const ARROW_PROPS = ['position', 'left', 'top'] as const;

type StyleSnapshot = Array<{ property: string; value: string; priority: string }>;

function captureStyles(element: HTMLElement, properties: readonly string[]): StyleSnapshot {
  return properties.map(property => ({
    property,
    value: element.style.getPropertyValue(property),
    priority: element.style.getPropertyPriority(property),
  }));
}

function restoreStyles(element: HTMLElement, snapshot: StyleSnapshot): void {
  for (const { property, value, priority } of snapshot) {
    if (value) {
      element.style.setProperty(property, value, priority);
    } else {
      element.style.removeProperty(property);
    }
  }
}

let floatingModule: FloatingUIDom | null = null;
let floatingPromise: Promise<FloatingUIDom> | null = null;

function loadFloatingUI(): Promise<FloatingUIDom> {
  if (floatingModule) {
    return Promise.resolve(floatingModule);
  }
  if (!floatingPromise) {
    floatingPromise = import(
      /* webpackChunkName: "floating-ui-dom" */
      '@floating-ui/dom'
    ).then(m => {
      floatingModule = m;
      return m;
    });
  }
  return floatingPromise;
}

/**
 * Eagerly load the floating-ui chunk. Useful for warming the chunk before a
 * popover/tooltip first opens (e.g. on app boot or hover-intent).
 */
export function preloadFloatingUI(): Promise<unknown> {
  return loadFloatingUI();
}

/**
 * For tests only.
 *
 * @internal
 */
export function resetFloatingUIForTests(): void {
  floatingModule = null;
  floatingPromise = null;
}

const PHYSICAL_BLOCK: Record<string, 'top' | 'bottom' | 'left' | 'right'> = {
  above: 'top',
  below: 'bottom',
  before: 'left',
  after: 'right',
};

const PLACEMENT_ALIGN_SUFFIX: Record<string, '' | '-start' | '-end'> = {
  start: '-start',
  end: '-end',
  center: '',
};

function toPlacement(props: PositioningProps, isRtl: boolean): Placement {
  const position = props.position ?? POSITIONS.above;
  const align = normalizeAlign(props.align ?? ALIGNMENTS.center);
  const main =
    position === POSITIONS.before && isRtl
      ? 'right'
      : position === POSITIONS.after && isRtl
      ? 'left'
      : PHYSICAL_BLOCK[position];
  return `${main}${PLACEMENT_ALIGN_SUFFIX[align]}` as Placement;
}

function shorthandToPlacement(value: string, isRtl: boolean): Placement {
  const [pos, alignRaw] = value.split('-');
  const main =
    pos === POSITIONS.before && isRtl ? 'right' : pos === POSITIONS.after && isRtl ? 'left' : PHYSICAL_BLOCK[pos];
  if (!alignRaw) {
    return main as Placement;
  }
  const align = normalizeAlign(alignRaw);
  return `${main}${PLACEMENT_ALIGN_SUFFIX[align]}` as Placement;
}

export interface ApplyFloatingUIPositioningArgs {
  target: HTMLElement | PositioningVirtualElement;
  container: HTMLElement;
  arrow: HTMLElement | null;
  options: PositioningProps;
  isRtl: boolean;
}

/**
 * Applies floating-ui-based positioning to the container, anchoring it to the
 * target. The floating-ui module is loaded lazily — until it resolves, no
 * positioning is applied. Returns a cleanup that detaches all listeners and
 * cancels any in-flight load.
 */
export function applyFloatingUIPositioning({
  target,
  container,
  arrow,
  options,
  isRtl,
}: ApplyFloatingUIPositioningArgs): () => void {
  let cancelled = false;
  let detach: (() => void) | undefined;

  loadFloatingUI()
    .then(mod => {
      if (cancelled) {
        return;
      }
      detach = setupFloatingUI(mod, target, container, arrow, options, isRtl);
    })
    .catch(err => {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('[usePositioning]: Failed to load floating-ui fallback', err);
      }
    });

  return () => {
    cancelled = true;
    detach?.();
  };
}

function setupFloatingUI(
  mod: FloatingUIDom,
  target: HTMLElement | PositioningVirtualElement,
  container: HTMLElement,
  arrow: HTMLElement | null,
  options: PositioningProps,
  isRtl: boolean,
): () => void {
  const placement = toPlacement(options, isRtl);
  const strategy: Strategy = options.strategy ?? 'absolute';
  const useTransform = options.useTransform ?? true;
  const middleware: Middleware[] = [];
  const containerStyles = captureStyles(container, CONTAINER_PROPS);
  const arrowStyles = arrow ? captureStyles(arrow, ARROW_PROPS) : null;
  const previousPlacement = container.getAttribute('data-placement');

  if (options.matchTargetSize === 'width') {
    middleware.push(
      mod.size({
        apply({ rects, elements }) {
          elements.floating.style.setProperty('width', `${rects.reference.width}px`);
        },
      }),
    );
  }

  if (options.offset) {
    middleware.push(mod.offset(toFloatingUIOffset(options.offset)));
  }

  if (options.coverTarget) {
    middleware.push(coverTarget());
  }

  if (!options.pinned) {
    const fallbackPlacements = options.fallbackPositions?.map(value => shorthandToPlacement(value, isRtl));
    middleware.push(
      mod.flip({
        fallbackStrategy: 'bestFit',
        ...(fallbackPlacements?.length && { fallbackPlacements }),
        ...(options.flipBoundary && {
          altBoundary: true,
          boundary: getBoundary(container, options.flipBoundary),
        }),
      }),
    );
  }

  const overflowBoundary = options.overflowBoundary
    ? { altBoundary: true, boundary: getBoundary(container, options.overflowBoundary) }
    : {};
  const overflowPadding =
    options.overflowBoundaryPadding !== undefined
      ? { padding: toFloatingUIPadding(options.overflowBoundaryPadding, isRtl) }
      : {};

  middleware.push(
    mod.shift({
      ...overflowBoundary,
      ...overflowPadding,
      ...(options.shiftToCoverTarget && {
        crossAxis: true,
        limiter: mod.limitShift({ crossAxis: true, mainAxis: false }),
      }),
    }),
  );

  const autoSize = normalizeAutoSize(options.autoSize);
  if (autoSize) {
    middleware.push(resetMaxSize(autoSize));
    middleware.push(
      mod.size({
        ...overflowBoundary,
        ...overflowPadding,
        apply({ availableHeight, availableWidth, elements, rects }) {
          applyMaxSize(elements.floating, 'width', availableWidth, rects.floating.width, autoSize.applyMaxWidth);
          applyMaxSize(elements.floating, 'height', availableHeight, rects.floating.height, autoSize.applyMaxHeight);
        },
      }),
    );
  }

  middleware.push(mod.hide({ strategy: 'referenceHidden' }), mod.hide({ strategy: 'escaped' }));

  // Arrow middleware must come last so it sees the final, post-flip/shift
  // coordinates — that's what positions the arrow against the trigger.
  if (arrow) {
    arrow.style.setProperty('position', 'absolute');
    middleware.push(mod.arrow({ element: arrow, padding: options.arrowPadding }));
  }

  // Reset transient styles each setup so a previous fallback's leftovers don't leak.
  Object.assign(container.style, { position: strategy, inset: 'auto', margin: '0' });

  let disposed = false;

  const update = () => {
    if (disposed) {
      return;
    }
    mod
      .computePosition(target, container, { placement, strategy, middleware })
      .then(({ x, y, placement: computed, middlewareData }) => {
        if (disposed) {
          return;
        }
        if (useTransform) {
          container.style.removeProperty('left');
          container.style.removeProperty('top');
          container.style.setProperty('transform', `translate3d(${x}px, ${y}px, 0)`);
        } else {
          container.style.removeProperty('transform');
          container.style.setProperty('left', `${x}px`);
          container.style.setProperty('top', `${y}px`);
        }
        container.setAttribute('data-placement', computed);

        if (arrow && middlewareData.arrow) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow;
          Object.assign(arrow.style, {
            left: arrowX !== null && arrowX !== undefined ? `${arrowX}px` : '',
            top: arrowY !== null && arrowY !== undefined ? `${arrowY}px` : '',
          });
        }

        const CustomEventCtor = container.ownerDocument.defaultView?.CustomEvent ?? CustomEvent;
        const positioningEndEvent = new CustomEventCtor<OnPositioningEndEventDetail>('fui-positioningend', {
          detail: {
            placement: computed,
            escaped: middlewareData.hide?.escaped ?? false,
            referenceHidden: middlewareData.hide?.referenceHidden ?? false,
          },
        });
        container.dispatchEvent(positioningEndEvent);
        options.onPositioningEnd?.(positioningEndEvent);
      })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error('[usePositioning]: computePosition failed', err);
        }
      });
  };

  // autoUpdate handles scroll, resize, and ResizeObserver under one disposer.
  const stopAutoUpdate = mod.autoUpdate(target, container, update, {
    elementResize: !options.disableUpdateOnResize,
  });
  update();

  return () => {
    disposed = true;
    stopAutoUpdate();

    restoreStyles(container, containerStyles);
    if (previousPlacement === null) {
      container.removeAttribute('data-placement');
    } else {
      container.setAttribute('data-placement', previousPlacement);
    }

    if (arrow && arrowStyles) {
      restoreStyles(arrow, arrowStyles);
    }
  };
}

function toFloatingUIOffset(offset: NonNullable<PositioningProps['offset']>) {
  if (typeof offset !== 'function') {
    return offset;
  }

  return ({ placement, rects }: MiddlewareState) => {
    const [side, alignment] = placement.split('-') as [string, 'start' | 'end' | undefined];
    const position: Position =
      side === 'top'
        ? POSITIONS.above
        : side === 'bottom'
        ? POSITIONS.below
        : side === 'left'
        ? POSITIONS.before
        : POSITIONS.after;
    const logicalAlignment: Alignment | undefined = alignment
      ? position === POSITIONS.above || position === POSITIONS.below
        ? alignment
        : alignment === 'start'
        ? 'top'
        : 'bottom'
      : undefined;

    return offset({
      positionedRect: rects.floating,
      targetRect: rects.reference,
      position,
      alignment: logicalAlignment,
    });
  };
}

function normalizeAutoSize(autoSize: PositioningProps['autoSize']) {
  if (autoSize === true || autoSize === 'always') {
    return { applyMaxWidth: true, applyMaxHeight: true };
  }
  if (autoSize === 'width' || autoSize === 'width-always') {
    return { applyMaxWidth: true, applyMaxHeight: false };
  }
  if (autoSize === 'height' || autoSize === 'height-always') {
    return { applyMaxWidth: false, applyMaxHeight: true };
  }
  return null;
}

function resetMaxSize(autoSize: { applyMaxWidth: boolean; applyMaxHeight: boolean }): Middleware {
  return {
    name: 'resetMaxSize',
    fn({ middlewareData, elements }) {
      if (middlewareData.resetMaxSize?.maxSizeAlreadyReset) {
        return {};
      }
      if (autoSize.applyMaxWidth) {
        elements.floating.style.removeProperty('max-width');
        elements.floating.style.removeProperty('width');
      }
      if (autoSize.applyMaxHeight) {
        elements.floating.style.removeProperty('max-height');
        elements.floating.style.removeProperty('height');
      }
      elements.floating.style.removeProperty('box-sizing');
      return { data: { maxSizeAlreadyReset: true }, reset: { rects: true } };
    },
  };
}

function applyMaxSize(
  element: HTMLElement,
  dimension: 'width' | 'height',
  availableSize: number,
  currentSize: number,
  enabled: boolean,
): void {
  if (!enabled) {
    return;
  }
  element.style.setProperty('box-sizing', 'border-box');
  element.style.setProperty(`max-${dimension}`, `${availableSize}px`);
  if (currentSize > availableSize) {
    element.style.setProperty(dimension, `${availableSize}px`);
    const axis = dimension === 'width' ? 'x' : 'y';
    if (!element.style.getPropertyValue(`overflow-${axis}`)) {
      element.style.setProperty(`overflow-${axis}`, 'auto');
    }
  }
}

function coverTarget(): Middleware {
  return {
    name: 'coverTarget',
    fn({ placement, rects, x, y }) {
      const side = placement.split('-')[0];
      return {
        x: side === 'left' ? x + rects.reference.width : side === 'right' ? x - rects.reference.width : x,
        y: side === 'top' ? y + rects.reference.height : side === 'bottom' ? y - rects.reference.height : y,
      };
    },
  };
}

function toFloatingUIPadding(
  padding: NonNullable<PositioningProps['overflowBoundaryPadding']>,
  isRtl: boolean,
): Padding {
  if (typeof padding === 'number') {
    return padding;
  }
  return {
    top: padding.top,
    bottom: padding.bottom,
    left: isRtl ? padding.end : padding.start,
    right: isRtl ? padding.start : padding.end,
  };
}

function getBoundary(container: HTMLElement, boundary: PositioningBoundary): Boundary {
  if (boundary === 'window') {
    return container.ownerDocument.documentElement;
  }
  if (boundary === 'clippingParents') {
    return 'clippingAncestors';
  }
  if (boundary === 'scrollParent') {
    return getScrollParent(container);
  }
  return boundary;
}

function getScrollParent(element: HTMLElement): HTMLElement {
  let parent = element.parentElement;
  const targetWindow = element.ownerDocument.defaultView;
  while (parent && parent !== element.ownerDocument.body) {
    const style = targetWindow?.getComputedStyle(parent);
    if (style && /(auto|scroll|overlay)/.test(`${style.overflow}${style.overflowX}${style.overflowY}`)) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return element.ownerDocument.documentElement;
}
