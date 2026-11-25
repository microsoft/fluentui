import { isHTMLElement } from '@fluentui/react-utilities';
import type {
  OnPositioningEndEventDetail,
  PositionManager,
  PositioningOptions,
  PositioningPlacement,
  Strategy,
  TargetElement,
} from './types';
import { computePosition } from './utils/computePosition';
import { getPhysicalParent, getWindow, px } from './utils/domGeometry';
import { debounce } from './utils';
import {
  DATA_POSITIONING_ESCAPED,
  DATA_POSITIONING_HIDDEN,
  DATA_POSITIONING_INTERSECTING,
  DATA_POSITIONING_PLACEMENT,
  POSITIONING_END_EVENT,
} from './constants';
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
  /** Positioning options resolved by the configuration context */
  options?: PositioningOptions;
  isRtl?: boolean;
  /**
   * [Floating UI placement](https://floating-ui.com/docs/computePosition#placement)
   */
  placement?: PositioningPlacement;
}

/**
 * @internal
 * @returns manager that handles positioning out of the react lifecycle
 */
export function createPositionManager(managerOptions: PositionManagerOptions): PositionManager {
  let isDestroyed = false;
  const { container, target, arrow, strategy, options = {} } = managerOptions;
  // Modifies whether the container is positioned using transform
  const { useTransform = true, disableUpdateOnResize } = options;
  const targetWindow = getWindow(container) as (Window & typeof globalThis) | null;
  // Containers of documents without a window (e.g. `DOMParser`) can't be positioned
  if (!targetWindow) {
    const noop = () => undefined;
    return { updatePosition: noop, dispose: noop };
  }

  // When the dimensions of the target or the container change - trigger a position update,
  // unless disabled by the `disableUpdateOnResize` option
  const resizeObserver = disableUpdateOnResize
    ? null
    : createResizeObserver(targetWindow, entries => {
        // If content rect dimensions to go 0 -> very likely that `display: none` is being used to hide the element
        // In this case don't update and let users update imperatively
        if (entries.every(entry => entry.contentRect.width > 0 && entry.contentRect.height > 0)) {
          updatePosition();
        }
      });

  let isFirstUpdate = true;
  const scrollRoots = new Set<Document | ShadowRoot>();
  const elements = isHTMLElement(target) ? [container, target] : [container];
  const getScrollElements = () =>
    isHTMLElement(target) || !target.contextElement ? elements : [...elements, target.contextElement];
  const onScroll = (event: Event) => {
    // Non-composed scroll events stay inside shadow roots; use the original target when an event is retargeted.
    const scrollTarget = event.composedPath()[0] ?? event.target;
    const affectsPosition = getScrollElements().some(element => {
      if (scrollTarget === element.ownerDocument) {
        return true;
      }
      for (let parent = getPhysicalParent(element); parent; parent = getPhysicalParent(parent)) {
        if (parent === scrollTarget) {
          return true;
        }
      }
      return false;
    });
    if (affectsPosition) {
      updatePosition();
    }
  };
  const updateScrollRoots = () => {
    const nextRoots = new Set<Document | ShadowRoot>();
    getScrollElements().forEach(element => {
      nextRoots.add(element.ownerDocument);
      for (let node: Element | null = element; node; node = getPhysicalParent(node)) {
        const root = node.getRootNode();
        if (root.nodeType === 11 && 'host' in root) {
          nextRoots.add(root as ShadowRoot);
        }
      }
    });
    scrollRoots.forEach(root => {
      if (!nextRoots.has(root)) {
        root.removeEventListener('scroll', onScroll, true);
        scrollRoots.delete(root);
      }
    });
    nextRoots.forEach(root => {
      if (!scrollRoots.has(root)) {
        root.addEventListener('scroll', onScroll, { capture: true, passive: true });
        scrollRoots.add(root);
      }
    });
  };
  // Identifies the latest position computation that started. A computation that started earlier can resolve later,
  // so only the latest one may write the position.
  let latestComputation = 0;

  // When the container is first resolved, set position `fixed` to avoid scroll jumps.
  // Without this scroll jumps can occur when the element is rendered initially and receives focus
  Object.assign(container.style, { position: 'fixed', left: 0, top: 0, margin: 0 });

  const forceUpdate = () => {
    // debounced update can still occur afterwards
    // early return to avoid memory leaks
    if (isDestroyed) {
      return;
    }

    if (isFirstUpdate) {
      elements.forEach(element => {
        resizeObserver && resizeObserver.observe(element);
      });

      isFirstUpdate = false;
    }

    container.style.position = strategy;
    latestComputation += 1;
    const computation = latestComputation;
    computePosition(target, container, managerOptions)
      .then(({ x, y, placement, arrow: arrowCoordinates, intersecting, escaped, referenceHidden }) => {
        // Promise can still resolve after destruction or after a newer computation started
        // early return to avoid applying outdated position
        if (isDestroyed || computation !== latestComputation) {
          return;
        }

        if (arrow && arrowCoordinates) {
          Object.assign(arrow.style, { left: px(arrowCoordinates.x), top: px(arrowCoordinates.y) });
        }
        container.setAttribute(DATA_POSITIONING_PLACEMENT, placement);
        container.toggleAttribute(DATA_POSITIONING_INTERSECTING, intersecting);
        container.toggleAttribute(DATA_POSITIONING_ESCAPED, escaped);
        container.toggleAttribute(DATA_POSITIONING_HIDDEN, referenceHidden);

        // Round so that the coordinates land on device pixels.
        // This prevents blurriness in cases where the browser doesn't apply pixel snapping, such as when other
        // effects like `backdrop-filter: blur()` are applied to the container, and the browser is zoomed in.
        // See https://github.com/microsoft/fluentui/issues/26764 for more info.
        const devicePixelRatio = targetWindow.devicePixelRatio || 1;
        const left = px(Math.round(x * devicePixelRatio) / devicePixelRatio);
        const top = px(Math.round(y * devicePixelRatio) / devicePixelRatio);
        Object.assign(
          container.style,
          useTransform
            ? {
                // Layer acceleration can disable subpixel rendering which causes slightly
                // blurry text on low PPI displays, so we want to use 2D transforms instead
                transform: devicePixelRatio <= 1 ? `translate(${left}, ${top})` : `translate3d(${left}, ${top}, 0)`,
              }
            : { left, top },
        );

        container.dispatchEvent(
          new CustomEvent<OnPositioningEndEventDetail>(POSITIONING_END_EVENT, {
            detail: {
              placement,
              escaped,
              referenceHidden,
            },
          }),
        );
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

  const scheduleUpdate = debounce(forceUpdate);
  const updatePosition = () => {
    if (!isDestroyed) {
      // A render can move the same element into another shadow root without changing its ref.
      updateScrollRoots();
      scheduleUpdate();
    }
  };

  const dispose = () => {
    isDestroyed = true;

    targetWindow.removeEventListener('resize', updatePosition);
    targetWindow.removeEventListener('scroll', updatePosition);
    scrollRoots.forEach(root => {
      root.removeEventListener('scroll', onScroll, true);
    });
    scrollRoots.clear();

    resizeObserver && resizeObserver.disconnect();
  };

  targetWindow.addEventListener('scroll', updatePosition, { passive: true });
  targetWindow.addEventListener('resize', updatePosition);

  // Update the position on initialization
  updatePosition();

  return {
    updatePosition,
    dispose,
  };
}
