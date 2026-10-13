import type {
  Alignment,
  OnPositioningEndEventDetail,
  PositionManager,
  PositioningOptions,
  Position,
  TargetElement,
} from './types';
import { debounce, normalizeAutoSize, writeContainerUpdates, writeVisibilityUpdates } from './utils';
import { MATCH_TARGET_SIZE_CSS_VAR, POSITIONING_END_EVENT } from './constants';
import { createResizeObserver } from './utils/createResizeObserver';
import {
  applyArrow,
  applyAutoSize,
  applyBoundary,
  applyFunctionOffset,
  computePlacement,
  getClippingRect,
  getContainingBlock,
  getVisibility,
  resetAutoSize,
  resolveOffset,
  toPlacement,
  toPositioningPlacement,
} from './engine';
import type { Placement, PlacementInput, PlacementOutput, PlacementRect } from './engine';

/**
 * @internal
 */
export interface PositionManagerOptions
  extends Pick<
    PositioningOptions,
    | 'align'
    | 'arrowPadding'
    | 'autoSize'
    | 'coverTarget'
    | 'disableUpdateOnResize'
    | 'fallbackPositions'
    | 'flipBoundary'
    | 'matchTargetSize'
    | 'offset'
    | 'overflowBoundary'
    | 'overflowBoundaryPadding'
    | 'pinned'
    | 'position'
    | 'useTransform'
  > {
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
  strategy: 'absolute' | 'fixed';
  /**
   * Direction of the content, `before` and `after` swap sides and `start` and `end` alignments follow it.
   * Defaults to the direction of the containing block of the container.
   */
  isRtl?: boolean;
  /**
   * The container is positioned by the browser (CSS anchor positioning), the placement that it ended up with is read
   * with this function instead of being computed. It returns `null` when it can't be detected.
   * The container is not moved, only `autoSize`, the arrow, the visibility attributes and the end event are handled.
   */
  detectPlacement?: (target: TargetElement, container: HTMLElement) => Placement | null;
  /**
   * Called after every update with the placement that the container ended up with.
   */
  onPlacement?: (placement: Placement) => void;
  /**
   * Names of the attributes that are written on the container, an empty string skips an attribute.
   */
  attributes?: Partial<Record<'placement' | 'hidden' | 'escaped' | 'intersecting', string>>;
}

function isLayoutViewportUnavailable(container: HTMLElement): boolean {
  const { clientWidth, clientHeight } = container.ownerDocument.documentElement;

  return clientWidth === 0 && clientHeight === 0;
}

/**
 * @internal
 * @returns manager that handles positioning out of the react lifecycle
 */
export function createPositionManager(options: PositionManagerOptions): PositionManager {
  let isDestroyed = false;
  const {
    container,
    target,
    arrow,
    strategy,
    useTransform = true,
    disableUpdateOnResize = false,
    detectPlacement,
    attributes,
  } = options;
  // `options` can be mutated by the caller, the properties that are not destructured are read on every update
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

  // When the container is first resolved, set position `fixed` to avoid scroll jumps.
  // Without this scroll jumps can occur when the element is rendered initially and receives focus
  if (!detectPlacement) {
    Object.assign(container.style, { position: 'fixed', left: 0, top: 0, margin: 0 });
  }

  const forceUpdate = () => {
    // debounced update can still occur afterwards
    // early return to avoid memory leaks
    if (isDestroyed) {
      return;
    }

    if (isFirstUpdate) {
      resizeObserver?.observe(container);
      if ('nodeType' in target) {
        resizeObserver?.observe(target);
      }

      isFirstUpdate = false;
    }

    if (!detectPlacement) {
      Object.assign(container.style, { position: strategy });
    }

    const { position, align, offset, arrowPadding, matchTargetSize, pinned, coverTarget, fallbackPositions } = options;
    const autoSize = normalizeAutoSize(options.autoSize);

    // The styles of the previous update would change the size that is measured
    if (autoSize) {
      resetAutoSize(container, autoSize);
    }

    const anchor = target.getBoundingClientRect();

    if (matchTargetSize === 'width' && !detectPlacement) {
      container.style.setProperty(MATCH_TARGET_SIZE_CSS_VAR, `${anchor.width}px`);
      if (!container.style.width) {
        container.style.width = `var(${MATCH_TARGET_SIZE_CSS_VAR})`;
      }
    }

    const requested = toPlacement(position, align);
    const [mainAxis, crossAxis] = resolveOffset(offset);
    const [containingBlock, , originLeft, originTop] = getContainingBlock(container, strategy);
    const isRtl =
      options.isRtl ??
      targetWindow.getComputedStyle(containingBlock ?? container.ownerDocument.documentElement).direction === 'rtl';
    let result: Placement | null = requested;
    let bounds: PlacementRect = getClippingRect(container);

    if (detectPlacement) {
      // The browser did the positioning, the arrow and the size need the side that it picked
      result = detectPlacement(target, container);
      if (autoSize) {
        applyAutoSize(container, autoSize, result ?? requested, anchor, bounds, isRtl, mainAxis);
      }
    } else {
      const fallbacks = fallbackPositions?.length
        ? fallbackPositions.map(shorthand => {
            const [fallbackPosition, fallbackAlign] = shorthand.split('-');
            return toPlacement(fallbackPosition as Position, fallbackAlign as Alignment);
          })
        : undefined;
      const blockMain = requested.position === 'above' || requested.position === 'below';
      const compute = (): [PlacementOutput, PlacementRect] => {
        const input: PlacementInput = [
          anchor,
          getClippingRect(container),
          container.offsetWidth,
          container.offsetHeight,
          isRtl,
          requested,
          blockMain ? mainAxis : crossAxis,
          blockMain ? crossAxis : mainAxis,
          undefined,
          fallbacks,
          pinned,
          coverTarget,
        ];

        applyFunctionOffset(input, offset);
        applyBoundary(input, container, isRtl, options);

        return [computePlacement(input), input[1]];
      };

      let output: PlacementOutput;
      [output, bounds] = compute();

      if (autoSize) {
        const { offsetWidth, offsetHeight } = container;
        applyAutoSize(container, autoSize, output, anchor, bounds, isRtl, mainAxis);

        // The container was positioned using a size that is not the final one
        if (container.offsetWidth !== offsetWidth || container.offsetHeight !== offsetHeight) {
          [output, bounds] = compute();
          applyAutoSize(container, autoSize, output, anchor, bounds, isRtl, mainAxis);
        }
      }

      result = output;
      writeContainerUpdates({
        container,
        placement: toPositioningPlacement(output, isRtl),
        placementAttribute: attributes?.placement,
        coordinates: { x: output.left - originLeft, y: output.top - originTop },
        lowPPI: (targetWindow?.devicePixelRatio || 1) <= 1,
        strategy,
        useTransform,
      });
    }

    // Measured after the container is moved
    const popup = container.getBoundingClientRect();
    const visibility = isLayoutViewportUnavailable(container)
      ? { escaped: false, referenceHidden: false, intersecting: false }
      : getVisibility(container, target, anchor, popup);

    if (result) {
      applyArrow(arrow, result, anchor, popup, arrowPadding);
      options.onPlacement?.(result);
    }
    writeVisibilityUpdates({ container, visibility, attributes });

    if (result) {
      container.dispatchEvent(
        new CustomEvent<OnPositioningEndEventDetail>(POSITIONING_END_EVENT, {
          detail: {
            placement: toPositioningPlacement(result, isRtl),
            escaped: visibility.escaped,
            referenceHidden: visibility.referenceHidden,
          },
        }),
      );
    }
  };

  const updatePosition = debounce(() => forceUpdate());

  const dispose = () => {
    isDestroyed = true;

    if (targetWindow) {
      targetWindow.removeEventListener('scroll', updatePosition, { capture: true });
      targetWindow.removeEventListener('resize', updatePosition);
    }

    resizeObserver?.disconnect();
  };

  if (targetWindow) {
    // `scroll` doesn't bubble, capturing it covers every scrollable ancestor
    targetWindow.addEventListener('scroll', updatePosition, { capture: true, passive: true });
    targetWindow.addEventListener('resize', updatePosition);
  }

  // Update the position on initialization
  updatePosition();

  return {
    updatePosition,
    dispose,
  };
}
