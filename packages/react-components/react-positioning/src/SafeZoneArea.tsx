import { mergeClasses } from '@griffel/react';
import { useId } from '@fluentui/react-utilities';
import type { Placement } from '@floating-ui/dom';
import * as React from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { useStyles } from './SafeZoneArea.styles';

export type SafeZoneAreaImperativeHandle = {
  updateSVG: (options: {
    mouse: { x: number; y: number };
    containerRect: DOMRect;
    targetRect: DOMRect;
    containerPlacement: Placement;
  }) => void;
};

export type SafeZoneAreaProps = {
  /** Enables debug mode: makes drawn shapes visible. */
  debug: boolean;

  /** A reference to the SafeZoneArea imperative handle. */
  imperativeRef: React.Ref<SafeZoneAreaImperativeHandle>;

  // eslint-disable-next-line @nx/workspace-consistent-callback-type
  onMouseEnter: (e: React.MouseEvent) => void;
  // eslint-disable-next-line @nx/workspace-consistent-callback-type
  onMouseLeave: (e: React.MouseEvent) => void;

  stateStore: ReturnType<typeof createSafeZoneAreaStateStore>;
};

export function createSafeZoneAreaStateStore() {
  let isActive = false;
  const listeners: ((value: boolean) => void)[] = [];

  return {
    getSnapshot() {
      return isActive;
    },
    update(newValue: boolean) {
      isActive = newValue;
      listeners.forEach(listener => listener(isActive));
    },

    subscribe(listener: (value: boolean) => void) {
      listeners.push(listener);

      return () => {
        const index = listeners.indexOf(listener);

        if (index > -1) {
          listeners.splice(index, 1);
        }
      };
    },
  };
}

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
export const SafeZoneArea = React.memo((props: SafeZoneAreaProps) => {
  const { debug, onMouseEnter, onMouseLeave, stateStore } = props;

  const clipPathId = useId();
  const styles = useStyles();

  const active = useSyncExternalStore(stateStore.subscribe, stateStore.getSnapshot);
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useImperativeHandle(
    props.imperativeRef,
    () => ({
      updateSVG({
        mouse,

        containerPlacement,
        containerRect,
        targetRect,
      }) {
        const svgEl = svgRef.current;

        if (!svgEl) {
          return;
        }

        const trianglePathEl = svgEl.children.item(0) as SVGPathElement;
        const debugRectEl = svgEl.children.item(2) as SVGPathElement | null;
        const clipPathEl = svgEl.children.item(1) as SVGClipPathElement;
        const clipPathRect = clipPathEl.firstElementChild as SVGRectElement;

        const SIZE_MULTIPLIER = 0.9;

        let svgStyle: Partial<CSSStyleDeclaration>;

        let tringlePoints: [number, number][] = [];
        let clipPoints: [number, number][] = [];

        switch (containerPlacement.slice(0, 3)) {
          case 'top':
            svgStyle = {
              width: `${containerRect.width}px`,
              height: `${targetRect.bottom - containerRect.bottom}px`,
              transform: `translate(${containerRect.left}px, ${containerRect.bottom}px)`,
            };

            tringlePoints = [
              [containerRect.width, 0],
              [mouse.x - containerRect.left, (mouse.y - containerRect.bottom) / SIZE_MULTIPLIER],
              [0, 0],
            ];
            clipPoints = [
              [0, 0],
              [0, targetRect.bottom - containerRect.bottom],
              [targetRect.left - containerRect.left, targetRect.bottom - containerRect.bottom],
              [targetRect.left - containerRect.left, targetRect.top - containerRect.bottom],
              [targetRect.right - containerRect.left, targetRect.top - containerRect.bottom],
              [targetRect.right - containerRect.left, targetRect.bottom - containerRect.bottom],
              [containerRect.width, targetRect.bottom - containerRect.bottom],
              [containerRect.width, 0],
            ];

            break;

          case 'bot':
            svgStyle = {
              width: `${containerRect.width}px`,
              height: `${containerRect.top - targetRect.top}px`,
              transform: `translate(${containerRect.left}px, ${targetRect.top}px)`,
            };

            tringlePoints = [
              [containerRect.width, containerRect.top - targetRect.top],
              [mouse.x - containerRect.left, (mouse.y - targetRect.top) * SIZE_MULTIPLIER],
              [0, containerRect.top - targetRect.top],
            ];
            clipPoints = [
              [0, 0],
              [0, containerRect.top - targetRect.top],
              [containerRect.width, containerRect.top - targetRect.top],
              [containerRect.width, 0],
              [targetRect.right - containerRect.left, 0],
              [targetRect.right - containerRect.left, targetRect.height],
              [targetRect.left - containerRect.left, targetRect.height],
              [targetRect.left - containerRect.left, 0],
            ];

            break;

          case 'lef':
            svgStyle = {
              width: `${targetRect.right - containerRect.right}px`,
              height: `${containerRect.height}px`,
              transform: `translate(${containerRect.right}px, ${containerRect.top}px)`,
            };

            tringlePoints = [
              [(mouse.x - containerRect.right) / SIZE_MULTIPLIER, mouse.y - containerRect.top],
              [0, containerRect.height],
              [0, 0],
            ];
            clipPoints = [
              [0, 0],
              [0, containerRect.height],
              [targetRect.right - containerRect.right, containerRect.height],
              [targetRect.right - containerRect.right, targetRect.bottom - containerRect.top],
              [targetRect.left - containerRect.right, targetRect.bottom - containerRect.top],
              [targetRect.left - containerRect.right, targetRect.top - containerRect.top],
              [targetRect.right - containerRect.right, targetRect.top - containerRect.top],
              [targetRect.right - containerRect.right, 0],
            ];

            break;

          default:
            svgStyle = {
              width: `${containerRect.left - targetRect.left}px`,
              height: `${containerRect.height}px`,
              transform: `translate(${targetRect.left}px, ${containerRect.top}px)`,
            };

            tringlePoints = [
              [(mouse.x - targetRect.left) * SIZE_MULTIPLIER, mouse.y - containerRect.y],
              [containerRect.left - targetRect.left, containerRect.height],
              [containerRect.left - targetRect.left, 0],
            ];
            clipPoints = [
              [0, 0],
              [0, targetRect.top - containerRect.top],
              [targetRect.width, targetRect.top - containerRect.top],
              [targetRect.width, targetRect.bottom - containerRect.top],
              [0, targetRect.bottom - containerRect.top],
              [0, containerRect.height],
              [containerRect.left - targetRect.left, containerRect.height],
              [containerRect.left - targetRect.left, 0],
            ];

            break;
        }

        const trianglePath = `M ${tringlePoints.flatMap(p => p).join(' ')} z`;
        const clipPath = `M ${clipPoints.flatMap(p => p).join(' ')} z`;

        Object.assign(svgEl.style, svgStyle);

        trianglePathEl.setAttributeNS(null, 'd', trianglePath);
        clipPathRect.setAttributeNS(null, 'd', clipPath);
        debugRectEl?.setAttributeNS(null, 'd', clipPath);
      },
    }),
    [],
  );

  return (
    <div className={mergeClasses(styles.wrapper, active && styles.wrapperActive)} data-safe-zone="">
      {active ? (
        <svg aria-hidden className={styles.svg} xmlns="http://www.w3.org/2000/svg" ref={svgRef}>
          <path
            className={mergeClasses(styles.triangle, debug && styles.triangleDebug)}
            clipPath={`url(#${clipPathId})`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
          <clipPath id={clipPathId}>
            <path />
          </clipPath>

          {debug && <path className={styles.rectDebug} />}
        </svg>
      ) : null}
    </div>
  );
});
