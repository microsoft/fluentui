import { computePosition } from '@floating-ui/dom';
import type { Middleware, Placement, Strategy } from '@floating-ui/dom';
import { isHTMLElement } from '@fluentui/react-utilities';
import type { OnPositioningEndEventDetail, PositionManager, PositioningPlacement, TargetElement } from './types';
import { debounce, writeArrowUpdates, writeContainerUpdates } from './utils';
import { listScrollParents } from './utils/listScrollParents';
import { POSITIONING_END_EVENT } from './constants';
import { createResizeObserver } from './utils/createResizeObserver';

interface PositionManagerOptions {
  /**
   * The positioned element
   */
  container: HTMLElement;
  /**
   * Element that the container will be anchored to
   */
  target: TargetElement;
  /**
   * Arrow that points from the container to the target
   */
  arrow: HTMLElement | null;
  /**
   * The value of the css `position` property
   * @default absolute
   */
  strategy: Strategy;
  /**
   * [Floating UI middleware](https://floating-ui.com/docs/middleware)
   */
  middleware: Middleware[];
  /**
   * [Floating UI placement](https://floating-ui.com/docs/computePosition#placement)
   */
  placement?: Placement;
  /**
   * Modifies whether popover is positioned using transform.
   * @default true
   */
  useTransform?: boolean;
  /**
   * Disables the resize observer that updates position on target or dimension change
   */
  disableUpdateOnResize?: boolean;
}

function isLayoutViewportUnavailable(container: HTMLElement): boolean {
  const { clientWidth, clientHeight } = container.ownerDocument.documentElement;

  return clientWidth === 0 && clientHeight === 0;
}

// Keep propagation provenance private so reciprocal references cannot create an update loop.
const positioningUpdateSources = new WeakMap<Event, Set<object>>();

function getAncestorElements(start: Element | undefined): Set<Element> {
  const visited = new Set<Element>();
  let element: Element | null | undefined = start;

  while (element && !visited.has(element)) {
    visited.add(element);

    const root = element.getRootNode();
    element =
      element.assignedSlot ??
      element.parentElement ??
      ('host' in root && isHTMLElement(root.host)
        ? root.host
        : root === element.ownerDocument
        ? element.ownerDocument.defaultView?.frameElement
        : null);
  }

  return visited;
}

function hasActiveAncestorAnimation(ancestors: Set<Element>): boolean {
  for (const element of ancestors) {
    if (
      element.getAnimations?.().some(animation => {
        return (
          animation.playState === 'running' &&
          animation.playbackRate !== 0 &&
          animation.effect !== null &&
          Number.isFinite(animation.effect.getComputedTiming().endTime)
        );
      })
    ) {
      return true;
    }
  }

  return false;
}

/**
 * @internal
 * @returns manager that handles positioning out of the react lifecycle
 */
export function createPositionManager(options: PositionManagerOptions): PositionManager {
  let isDestroyed = false;
  let animationFrame: number | undefined;
  let updateId = 0;
  let pendingUpdateSources: Set<object> | undefined;
  const propagationSource = {};
  const {
    container,
    target,
    arrow,
    strategy,
    middleware,
    placement,
    useTransform = true,
    disableUpdateOnResize = false,
  } = options;
  const targetWindow = container.ownerDocument.defaultView;
  if (!target || !container || !targetWindow) {
    return {
      updatePosition: () => undefined,
      dispose: () => undefined,
    };
  }

  // When the dimensions of the target or the container change - trigger a position update
  const resizeObserver = disableUpdateOnResize
    ? null
    : createResizeObserver(targetWindow, entries => {
        // If content rect dimensions to go 0 -> very likely that `display: none` is being used to hide the element
        // In this case don't update and let users update imperatively
        const shouldUpdateOnResize = entries.every(entry => {
          return entry.contentRect.width > 0 && entry.contentRect.height > 0;
        });

        if (shouldUpdateOnResize) {
          updatePosition();
        }
      });

  let isFirstUpdate = true;
  const scrollParents: Set<HTMLElement> = new Set<HTMLElement>();
  const positioningParents = new Set<Element>();

  // When the container is first resolved, set position `fixed` to avoid scroll jumps.
  // Without this scroll jumps can occur when the element is rendered initially and receives focus
  Object.assign(container.style, { position: 'fixed', left: 0, top: 0, margin: 0 });

  const forceUpdate = () => {
    // debounced update can still occur afterwards
    // early return to avoid memory leaks
    if (isDestroyed) {
      return;
    }

    const updateSources = pendingUpdateSources;
    pendingUpdateSources = undefined;
    const referenceAncestors = getAncestorElements(isHTMLElement(target) ? target : target.contextElement);
    positioningParents.forEach(element => {
      if (!referenceAncestors.has(element)) {
        element.removeEventListener(POSITIONING_END_EVENT, onAncestorPositioningEnd);
        positioningParents.delete(element);
      }
    });
    referenceAncestors.forEach(element => {
      if (element !== container && !positioningParents.has(element)) {
        element.addEventListener(POSITIONING_END_EVENT, onAncestorPositioningEnd);
        positioningParents.add(element);
      }
    });

    if (isFirstUpdate) {
      listScrollParents(container).forEach(scrollParent => scrollParents.add(scrollParent));
      if (isHTMLElement(target)) {
        listScrollParents(target).forEach(scrollParent => scrollParents.add(scrollParent));
      }

      scrollParents.forEach(scrollParent => {
        scrollParent.addEventListener('scroll', updatePosition, { passive: true });
      });

      resizeObserver?.observe(container);
      if (isHTMLElement(target)) {
        resizeObserver?.observe(target);
      }

      isFirstUpdate = false;
    }

    // The debounced initial update runs after ancestor layout effects have created their animations.
    if (hasActiveAncestorAnimation(new Set([...referenceAncestors, ...getAncestorElements(container)]))) {
      if (animationFrame === undefined) {
        animationFrame = targetWindow.requestAnimationFrame(() => {
          animationFrame = undefined;
          updatePosition();
        });
      }
    } else if (animationFrame !== undefined) {
      targetWindow.cancelAnimationFrame(animationFrame);
      animationFrame = undefined;
    }

    // Always compute, including the first frame after motion finishes or is cancelled.
    const currentUpdateId = ++updateId;
    Object.assign(container.style, { position: strategy });
    computePosition(target, container, { placement, middleware, strategy })
      .then(({ x, y, middlewareData, placement: computedPlacement }) => {
        // Promise can still resolve after destruction
        // early return to avoid applying outdated position
        if (isDestroyed || currentUpdateId !== updateId) {
          return;
        }

        const positioningMiddlewareData = isLayoutViewportUnavailable(container)
          ? {
              ...middlewareData,
              hide: { ...middlewareData.hide, escaped: false, referenceHidden: false },
            }
          : middlewareData;

        writeArrowUpdates({ arrow, middlewareData: positioningMiddlewareData });
        writeContainerUpdates({
          container,
          middlewareData: positioningMiddlewareData,
          placement: computedPlacement,
          coordinates: { x, y },
          lowPPI: (targetWindow?.devicePixelRatio || 1) <= 1,
          strategy,
          useTransform,
        });

        const event = new CustomEvent<OnPositioningEndEventDetail>(POSITIONING_END_EVENT, {
          detail: {
            // Cast from Floating UI's Placement to the Fluent-owned PositioningPlacement.
            // These are equivalent string unions; the cast avoids leaking @floating-ui/dom
            // types into the public API surface.
            placement: computedPlacement satisfies PositioningPlacement,
            escaped: positioningMiddlewareData.hide?.escaped ?? false,
            referenceHidden: positioningMiddlewareData.hide?.referenceHidden ?? false,
          },
        });
        const sources = new Set(updateSources);
        sources.add(propagationSource);
        positioningUpdateSources.set(event, sources);
        container.dispatchEvent(event);
      })
      .catch(err => {
        // https://github.com/floating-ui/floating-ui/issues/1845
        // FIXME for node > 14
        // node 15 introduces promise rejection which means that any components
        // tests need to be `it('', async () => {})` otherwise there can be race conditions with
        // JSDOM being torn down before this promise is resolved so globals like `window` and `document` don't exist
        // Unless all tests that ever use `usePositioning` are turned into async tests, any logging during testing
        // will actually be counter productive
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[usePositioning]: Failed to calculate position', err);
        }
      });
  };

  const scheduleUpdate = debounce(() => forceUpdate());
  const updatePosition = () => {
    pendingUpdateSources = undefined;
    scheduleUpdate();
  };
  const onAncestorPositioningEnd = (event: Event) => {
    if (isDestroyed || event.target !== event.currentTarget) {
      return;
    }
    const sources = positioningUpdateSources.get(event);
    if (sources?.has(propagationSource)) {
      return;
    }
    const pendingSources = (pendingUpdateSources ??= new Set<object>());
    sources?.forEach(source => pendingSources.add(source));
    scheduleUpdate();
  };

  const dispose = () => {
    isDestroyed = true;

    if (animationFrame !== undefined) {
      targetWindow.cancelAnimationFrame(animationFrame);
      animationFrame = undefined;
    }

    if (targetWindow) {
      targetWindow.removeEventListener('scroll', updatePosition);
      targetWindow.removeEventListener('resize', updatePosition);
    }

    scrollParents.forEach(scrollParent => {
      scrollParent.removeEventListener('scroll', updatePosition);
    });
    scrollParents.clear();
    positioningParents.forEach(element => {
      element.removeEventListener(POSITIONING_END_EVENT, onAncestorPositioningEnd);
    });
    positioningParents.clear();
    pendingUpdateSources = undefined;

    resizeObserver?.disconnect();
  };

  if (targetWindow) {
    targetWindow.addEventListener('scroll', updatePosition, { passive: true });
    targetWindow.addEventListener('resize', updatePosition);
  }

  // Update the position on initialization
  updatePosition();

  return {
    updatePosition,
    dispose,
  };
}
