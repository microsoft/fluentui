import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import { usePositioning } from '@fluentui/react-positioning';

import descriptionMd from './PositioningEngineDescription.md';
import styles from './positioning.module.css';

/**
 * A scrolling region containing a trigger near its bottom edge.
 *
 * There is room below the trigger in the viewport, but not inside the box — so whether the surface
 * flips depends entirely on what the engine treats as the boundary.
 */
const BoundaryDemo = ({
  label,
  flipBoundary,
  onBoundaryRef,
}: {
  label: string;
  flipBoundary?: HTMLElement | null;
  onBoundaryRef?: (el: HTMLElement | null) => void;
}) => (
  <div className={styles.section}>
    <div className={styles.sectionTitle}>{label}</div>
    <div className={styles.boundary} ref={onBoundaryRef}>
      <div className={styles.boundaryFiller} />
      <Popover
        defaultOpen
        positioning={
          flipBoundary === undefined
            ? { position: 'below', align: 'start' }
            : { position: 'below', align: 'start', flipBoundary, engine: usePositioning }
        }
      >
        <PopoverTrigger>
          <button className={styles.trigger}>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface className={styles.surfaceEngine}>
          Flipping is decided against {flipBoundary === undefined ? 'the viewport' : 'the scrolling box'}.
        </PopoverSurface>
      </Popover>
    </div>
  </div>
);

export const Engine = (): React.ReactNode => {
  const [boundary, setBoundary] = React.useState<HTMLElement | null>(null);

  return (
    <div className={styles.pageRoomy}>
      <div className={styles.grid}>
        <BoundaryDemo label="Default engine — flips against the viewport" />
        <BoundaryDemo
          label="Injected engine — flips against the box"
          flipBoundary={boundary}
          onBoundaryRef={setBoundary}
        />
      </div>
    </div>
  );
};

Engine.parameters = {
  docs: {
    description: {
      story: descriptionMd,
    },
  },
};
