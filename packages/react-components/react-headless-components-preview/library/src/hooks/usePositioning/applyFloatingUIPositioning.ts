import type { Middleware, Placement, Strategy } from '@floating-ui/dom';
import type { PositioningProps } from '@fluentui/react-positioning';
import { ALIGNMENTS, POSITIONS } from './constants';
import { resolveOffset } from './utils';
import { normalizeAlign } from './utils/placement';

// alert('Floating UI');

type FloatingUIDom = typeof import('@floating-ui/dom');
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

function toPlacement(props: PositioningProps): Placement {
  const position = props.position ?? POSITIONS.above;
  const align = normalizeAlign(props.align ?? ALIGNMENTS.center);
  const main = PHYSICAL_BLOCK[position];
  return `${main}${PLACEMENT_ALIGN_SUFFIX[align]}` as Placement;
}

function shorthandToPlacement(value: string): Placement {
  const [pos, alignRaw] = value.split('-');
  const main = PHYSICAL_BLOCK[pos];
  if (!alignRaw) {
    return main as Placement;
  }
  const align = normalizeAlign(alignRaw);
  return `${main}${PLACEMENT_ALIGN_SUFFIX[align]}` as Placement;
}

export interface ApplyFloatingUIPositioningArgs {
  target: HTMLElement;
  container: HTMLElement;
  arrow: HTMLElement | null;
  options: PositioningProps;
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
}: ApplyFloatingUIPositioningArgs): () => void {
  let cancelled = false;
  let detach: (() => void) | undefined;

  loadFloatingUI()
    .then(mod => {
      if (cancelled) {
        return;
      }
      detach = setupFloatingUI(mod, target, container, arrow, options);
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
  target: HTMLElement,
  container: HTMLElement,
  arrow: HTMLElement | null,
  options: PositioningProps,
): () => void {
  const placement = toPlacement(options);
  const strategy: Strategy = options.strategy ?? 'absolute';
  const { mainAxis, crossAxis } = resolveOffset(options.offset);
  const middleware: Middleware[] = [];

  if (mainAxis || crossAxis) {
    middleware.push(mod.offset({ mainAxis, crossAxis }));
  }

  if (!options.pinned) {
    const fallbackPlacements = options.fallbackPositions?.map(shorthandToPlacement);
    middleware.push(mod.flip(fallbackPlacements ? { fallbackPlacements } : {}));
  }

  middleware.push(mod.shift());

  if (options.matchTargetSize === 'width') {
    middleware.push(
      mod.size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    );
  }

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
        Object.assign(container.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
        container.setAttribute('data-placement', computed);

        if (arrow && middlewareData.arrow) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow;
          Object.assign(arrow.style, {
            left: arrowX !== null && arrowX !== undefined ? `${arrowX}px` : '',
            top: arrowY !== null && arrowY !== undefined ? `${arrowY}px` : '',
          });
        }

        // Reveal the container — `usePositioning` hid it before scheduling
        // this helper, and computePosition is async, so the surface stays
        // invisible until the first set of coordinates lands.
        container.style.removeProperty('visibility');
      })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error('[usePositioning]: computePosition failed', err);
        }
      });
  };

  // autoUpdate handles scroll, resize, and ResizeObserver under one disposer.
  const stopAutoUpdate = mod.autoUpdate(target, container, update);
  update();

  return () => {
    disposed = true;
    stopAutoUpdate();

    container.style.removeProperty('left');
    container.style.removeProperty('top');
    container.style.removeProperty('width');
    container.style.removeProperty('visibility');
    container.removeAttribute('data-placement');

    if (arrow) {
      arrow.style.removeProperty('position');
      arrow.style.removeProperty('left');
      arrow.style.removeProperty('top');
    }
  };
}
