import { computePosition } from '@floating-ui/dom';
import type { Middleware, Placement, Strategy } from '@floating-ui/dom';
import { isHTMLElement } from '@fluentui/react-utilities';
import type { PositionManager, TargetElement } from './types';
import { debounce, writeArrowUpdates, writeContainerUpdates } from './utils';
import { listScrollParents } from './utils/listScrollParents';
import { POSITIONING_END_EVENT } from './constants';

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
}

/**
 * @internal
 * @returns manager that handles positioning out of the react lifecycle
 */
export function createPositionManager(options: PositionManagerOptions): PositionManager {
  const { container, target, arrow, strategy, middleware, placement, useTransform = true } = options;
  let isDestroyed = false;
  if (!target || !container) {
    return {
      updatePosition: () => undefined,
      dispose: () => undefined,
    };
  }

  let isFirstUpdate = true;
  const scrollParents: Set<HTMLElement> = new Set<HTMLElement>();
  const targetWindow = container.ownerDocument.defaultView;

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
      listScrollParents(container).forEach(scrollParent => scrollParents.add(scrollParent));
      if (isHTMLElement(target)) {
        listScrollParents(target).forEach(scrollParent => scrollParents.add(scrollParent));
      }

      scrollParents.forEach(scrollParent => {
        scrollParent.addEventListener('scroll', updatePosition, { passive: true });
      });

      isFirstUpdate = false;
    }

    Object.assign(container.style, { position: strategy });
    computePosition(target, container, { placement, middleware, strategy })
      .then(({ x, y, middlewareData, placement: computedPlacement }) => {
        // Promise can still resolve after destruction
        // early return to avoid applying outdated position
        if (isDestroyed) {
          return;
        }

        writeArrowUpdates({ arrow, middlewareData });
        writeContainerUpdates({
          container,
          middlewareData,
          placement: computedPlacement,
          coordinates: { x, y },
          lowPPI: (targetWindow?.devicePixelRatio || 1) <= 1,
          strategy,
          useTransform,
        });

        container.dispatchEvent(new CustomEvent(POSITIONING_END_EVENT));
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

  const updatePosition = debounce(() => forceUpdate());

  const dispose = () => {
    isDestroyed = true;

    if (targetWindow) {
      targetWindow.removeEventListener('scroll', updatePosition);
      targetWindow.removeEventListener('resize', updatePosition);
    }

    scrollParents.forEach(scrollParent => {
      scrollParent.removeEventListener('scroll', updatePosition);
    });
    scrollParents.clear();
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
