'use client';

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
import { getSafeZonePoints } from './getSafeZonePoints';

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

// ---

/**
 * A component that renders a safe zone area with SVG shapes. Uses `useSyncExternalStore` to manage its active state
 * to avoid causing re-renders in `useSafeZoneArea()` as the hook might be used in host components like `Menu`.
 *
 * Draws a polygon from the mouse to the facing edges of the container and clips out the target element.
 *
 * @internal
 */
export const SafeZoneArea = React.memo((props: SafeZoneAreaProps): JSXElement => {
  const { debug, onMouseEnter, onMouseMove, onMouseLeave, stateStore } = props;

  const clipPathId = useId();
  const styles = useStyles();

  const active = useSyncExternalStore(stateStore.subscribe, stateStore.isActive);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const safeZoneRef = React.useRef<SVGPathElement>(null);
  const clipPathRef = React.useRef<SVGPathElement>(null);
  const rectDebugRef = React.useRef<SVGPathElement>(null);

  React.useImperativeHandle(
    props.imperativeRef,
    () => ({
      updateSVG({ containerRect, targetRect, mouseCoordinates }) {
        const topOffset = Math.min(targetRect.top, containerRect.top);
        const leftOffset = Math.min(targetRect.left, containerRect.left);
        const bottomOffset = Math.max(targetRect.bottom, containerRect.bottom);
        const rightOffset = Math.max(targetRect.right, containerRect.right);

        const containerCorners = getRectCorners(containerRect, [leftOffset, topOffset]);
        const targetCorners = getRectCorners(targetRect, [leftOffset, topOffset]);

        // SVG coordinates are relative to its top-left corner.
        const relativeMouseCoordinates: Point = [mouseCoordinates[0] - leftOffset, mouseCoordinates[1] - topOffset];
        const mouseAnchor = getMouseAnchor(
          containerCorners.topLeft,
          containerCorners.bottomRight,
          relativeMouseCoordinates,
        );

        const svgWidth = rightOffset - leftOffset;
        const svgHeight = bottomOffset - topOffset;
        const clipPath = computeOutsideClipPath(svgWidth, svgHeight, {
          x: targetCorners.topLeft[0],
          y: targetCorners.topLeft[1],
          width: targetRect.width,
          height: targetRect.height,
        });

        if (svgRef.current) {
          svgRef.current.style.width = `${svgWidth}px`;
          svgRef.current.style.height = `${svgHeight}px`;
          svgRef.current.style.transform = `translate(${leftOffset}px, ${topOffset}px)`;
        }

        const safeZonePoints = getSafeZonePoints(mouseAnchor, containerCorners);
        safeZoneRef.current?.setAttribute('d', safeZonePoints.length > 0 ? pointsToSvgPath(safeZonePoints) : '');
        clipPathRef.current?.setAttribute('d', clipPath);
        rectDebugRef.current?.setAttribute('d', clipPath);
      },
    }),
    [],
  );

  return (
    <div className={mergeClasses(styles.wrapper, active && styles.wrapperActive)} data-safe-zone="">
      <svg
        aria-hidden
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        style={{ width: 0, height: 0, transform: 'translate(0px, 0px)' }}
      >
        <g
          className={mergeClasses(styles.safeZone, debug && styles.safeZoneDebug)}
          clipPath={`url(#${clipPathId})`}
          onMouseEnter={onMouseEnter}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <path ref={safeZoneRef} />
        </g>

        <clipPath id={clipPathId}>
          <path ref={clipPathRef} />
        </clipPath>

        {debug && <path ref={rectDebugRef} className={styles.rectDebug} />}
      </svg>
    </div>
  );
});
