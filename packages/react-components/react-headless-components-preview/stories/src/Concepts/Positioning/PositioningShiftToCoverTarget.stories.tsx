import * as React from 'react';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';
import type {
  PositioningImperativeRef,
  PositioningProps,
} from '@fluentui/react-headless-components-preview/positioning';

import styles from './positioning.module.css';

export const CoverTargetForSmallViewport = (): React.ReactNode => {
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const [position, setPosition] = React.useState<PositioningProps['position']>('above');
  const positioningRef = React.useRef<PositioningImperativeRef>(null);

  return (
    <div className={styles.column}>
      <label className={styles.row}>
        Position
        <select
          className={styles.select}
          value={position}
          onChange={event => setPosition(event.target.value as 'above' | 'after')}
        >
          <option value="above">above</option>
          <option value="after">after</option>
        </select>
      </label>
      <div ref={setBoundary} className={styles.boundary} onPointerUp={() => positioningRef.current?.updatePosition()}>
        <Popover
          defaultOpen
          positioning={{
            positioningRef,
            overflowBoundary: boundary,
            flipBoundary: boundary,
            autoSize: true,
            shiftToCoverTarget: true,
            position,
          }}
        >
          <PopoverTrigger>
            <button className={`${styles.trigger} ${styles.boundaryTarget} ${styles.boundarySpacer}`}>Target</button>
          </PopoverTrigger>
          <PopoverSurface className={styles.menuSurface}>
            <div role="list" aria-label="Constrained items">
              {Array.from({ length: 8 }, (_, index) => (
                <div className={styles.menuItem} key={index} role="listitem">
                  Item {index + 1}
                </div>
              ))}
            </div>
          </PopoverSurface>
        </Popover>
      </div>
    </div>
  );
};

CoverTargetForSmallViewport.parameters = {
  docs: {
    description: {
      story:
        '`shiftToCoverTarget` allows the surface to overlap its target when the configured boundary cannot fit it otherwise. Resize the boundary to explore the behavior.',
    },
  },
};
