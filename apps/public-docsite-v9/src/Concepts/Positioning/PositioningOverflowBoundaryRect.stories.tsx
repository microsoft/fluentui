import * as React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
  makeStyles,
  tokens,
  type PositioningRect,
  useIsomorphicLayoutEffect,
} from '@fluentui/react-components';

const useClasses = makeStyles({
  area: {
    border: `2px solid ${tokens.colorStatusDangerBackground3}`,
    padding: '60px 20px 20px 20px',
    width: '300px',
    height: '300px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    justifyContent: 'space-between',
    position: 'relative',

    '::before': {
      content: '"Container"',
      position: 'absolute',
      padding: `${tokens.spacingHorizontalMNudge} ${tokens.spacingHorizontalS}`,

      top: 0,
      left: 0,

      color: tokens.colorStatusDangerBackground1,
      backgroundColor: tokens.colorStatusDangerBackground3,
    },
  },
  boundary: {
    width: '320px',
    height: '320px',
    outline: `2px solid ${tokens.colorBrandBackground}`,

    position: 'absolute',
    top: '50px',
    left: '10px',
    pointerEvents: 'none',

    '::before': {
      content: '"Boundary"',
      position: 'absolute',
      padding: `${tokens.spacingHorizontalMNudge} ${tokens.spacingHorizontalS}`,

      top: 0,
      left: 0,

      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});

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
