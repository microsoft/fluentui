import * as React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
  type PositioningRect,
  useIsomorphicLayoutEffect,
} from '@fluentui/react-components';

import styles from './PositioningOverflowBoundaryRect.module.css';

const useClasses = () => styles;

export const OverflowBoundaryRect = () => {
  const classes = useClasses();

  const boundaryRef = React.useRef<HTMLDivElement | null>(null);
  const [boundaryRect, setBoundaryRect] = React.useState<PositioningRect | null>(null);

  useIsomorphicLayoutEffect(() => {
    setBoundaryRect(boundaryRef.current?.getBoundingClientRect() ?? null);
  }, []);

  return (
    <div className={classes.area}>
      <div className={classes.boundary} ref={boundaryRef} />

      <Popover
        positioning={{
          overflowBoundary: boundaryRect,
          position: 'below',
          align: 'start',
        }}
      >
        <PopoverTrigger disableButtonEnhancement>
          <Button>
            <code>align: start</code>
          </Button>
        </PopoverTrigger>
        <PopoverSurface>Stays within the defined rect</PopoverSurface>
      </Popover>

      <Popover
        positioning={{
          overflowBoundary: boundaryRect,
          position: 'above',
          align: 'start',
        }}
      >
        <PopoverTrigger disableButtonEnhancement>
          <Button>
            <code>align: start</code>
          </Button>
        </PopoverTrigger>
        <PopoverSurface>Stays within the defined rect</PopoverSurface>
      </Popover>
    </div>
  );
};

OverflowBoundaryRect.parameters = {
  docs: {
    description: {
      story: [
        'Boundaries can be also defined as `Rect` objects. ',
        'This is useful when a boundary is not an actual element, but some kind of computed values.',
      ].join('\n'),
    },
  },
};
