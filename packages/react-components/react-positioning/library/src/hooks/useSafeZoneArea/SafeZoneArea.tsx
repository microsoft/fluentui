import { mergeClasses } from '@griffel/react';
import { useId } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import * as React from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

import type { createSafeZoneAreaStateStore } from './createSafeZoneAreaStateStore';
import { getRectCorners } from './getRectCorners';
import { getMouseAnchor } from './getMouseAnchor';
import { pointsToSvgPath } from './pointsToSvgPath';
import { useStyles } from './SafeZoneArea.styles';
import type { Point } from './types';
import { computeOutsideClipPath } from './computeOutsideClipPath';

export type SafeZoneAreaImperativeHandle = {
  updateSVG: (options: { containerRect: DOMRect; targetRect: DOMRect; mouseCoordinates: Point }) => void;
};

export type SafeZoneAreaProps = {
  /** Enables debug mode: makes drawn shapes visible. */
  debug: boolean;

  /** A reference to the SafeZoneArea imperative handle. */
  imperativeRef: React.Ref<SafeZoneAreaImperativeHandle>;

  // eslint-disable-next-line @nx/workspace-consistent-callback-type
  onMouseEnter: (e: React.MouseEvent) => void;
  // eslint-disable-next-line @nx/workspace-consistent-callback-type
  onMouseMove: (e: React.MouseEvent) => void;
  // eslint-disable-next-line @nx/workspace-consistent-callback-type
  onMouseLeave: (e: React.MouseEvent) => void;

  stateStore: ReturnType<typeof createSafeZoneAreaStateStore>;
};

/**
 * @internal
 */
type SafeZoneAreaState = {
  containerRect: DOMRect;
  targetRect: DOMRect;
  mouseCoordinates: Point;
};

// ---

const EMPTY_RECT: DOMRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  toJSON() {
    return '';
  },
};

export function isSameRect(a: DOMRect, b: DOMRect): boolean {
  return (
    a.top === b.top &&
    a.right === b.right &&
    a.bottom === b.bottom &&
    a.left === b.left &&
    a.width === b.width &&
    a.height === b.height
  );
}

export function isSameCoordinates(a: Point, b: Point): boolean {
  return a[0] === b[0] && a[1] === b[1];
}

// ---

/**
 * A component that renders a safe zone area with SVG shapes. Uses `useSyncExternalStore` to manage its active state
 * to avoid causing re-renders in `useSafeZoneArea()` as the hook might be used in host components like `Menu`.
 *
 * Draws two shapes:
 * - a triangle that points to the target element which is an actual safe zone
 * - a rectangle for a clip path that clips out the target element
 *
 * @internal
 */
export const SafeZoneArea = React.memo((props: SafeZoneAreaProps): JSXElement => {
  const { debug, onMouseEnter, onMouseMove, onMouseLeave, stateStore } = props;

  const clipPathId = useId();
  const styles = useStyles();

  const active = useSyncExternalStore(stateStore.subscribe, stateStore.isActive);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const [state, setState] = React.useState<SafeZoneAreaState>(() => ({
    containerRect: EMPTY_RECT,
    targetRect: EMPTY_RECT,
    mouseCoordinates: [0, 0],
  }));

  React.useImperativeHandle(
    props.imperativeRef,
    () => ({
      updateSVG(newState) {
        setState(prevState => {
          // Heads up!
          // A small optimization to avoid unnecessary re-renders
          if (
            isSameRect(prevState.containerRect, newState.containerRect) &&
            isSameRect(prevState.targetRect, newState.targetRect) &&
            isSameCoordinates(prevState.mouseCoordinates, newState.mouseCoordinates)
          ) {
            return prevState;
          }

          return newState;
        });
      },
    }),
    [],
  );

  const { containerRect, targetRect, mouseCoordinates } = state;

  const topOffset = Math.min(targetRect.top, containerRect.top);
  const leftOffset = Math.min(targetRect.left, containerRect.left);
  const bottomOffset = Math.max(targetRect.bottom, containerRect.bottom);
  const rightOffset = Math.max(targetRect.right, containerRect.right);

  // ---

  const containerCorners = getRectCorners(containerRect, [leftOffset, topOffset]);
  const targetCorners = getRectCorners(targetRect, [leftOffset, topOffset]);

  // Heads up!
  // The SVG coordinate system starts at the top-left corner of the SVG element,
  // so we need to adjust the mouse coordinates relative to the SVG's top-left corner.
  const relativeMouseCoordinates: Point = [mouseCoordinates[0] - leftOffset, mouseCoordinates[1] - topOffset];
  const mouseAnchor = getMouseAnchor(containerCorners.topLeft, containerCorners.bottomRight, relativeMouseCoordinates);

  const triangleA = [mouseAnchor, containerCorners.topLeft, containerCorners.topRight];
  const triangleB = [mouseAnchor, containerCorners.topRight, containerCorners.bottomRight];
  const triangleC = [mouseAnchor, containerCorners.bottomRight, containerCorners.bottomLeft];
  const triangleD = [mouseAnchor, containerCorners.bottomLeft, containerCorners.topLeft];

  const svgWidth = rightOffset - leftOffset;
  const svgHeight = bottomOffset - topOffset;

  const clipPath = computeOutsideClipPath(
    svgWidth,
    svgHeight,
    {
      x: targetCorners.topLeft[0],
      y: targetCorners.topLeft[1],
      width: targetRect.width,
      height: targetRect.height,
    },
    {
      x: containerCorners.topLeft[0],
      y: containerCorners.topLeft[1],
      width: containerRect.width,
      height: containerRect.height,
    },
  );

  return (
    <div className={mergeClasses(styles.wrapper, active && styles.wrapperActive)} data-safe-zone="">
      {active ? (
        <svg
          aria-hidden
          className={styles.svg}
          xmlns="http://www.w3.org/2000/svg"
          ref={svgRef}
          style={{
            width: `${svgWidth}px`,
            height: `${svgHeight}px`,
            transform: `translate(${leftOffset}px, ${topOffset}px)`,
          }}
        >
          <g
            className={mergeClasses(styles.triangle, debug && styles.triangleDebug)}
            clipPath={`url(#${clipPathId})`}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            <path d={pointsToSvgPath(triangleA)} />
            <path d={pointsToSvgPath(triangleB)} />
            <path d={pointsToSvgPath(triangleC)} />
            <path d={pointsToSvgPath(triangleD)} />
          </g>

          <clipPath id={clipPathId}>
            <path d={clipPath} />
          </clipPath>

          {debug && <path className={styles.rectDebug} d={clipPath} />}
        </svg>
      ) : null}
    </div>
  );
});
