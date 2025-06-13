import * as React from 'react';
import type { Meta } from '@storybook/react';
import {
  PositioningConfigurationProvider,
  usePositioning,
  type PositioningProps,
  type PositioningVirtualElement,
  type PositioningImperativeRef,
  type PositioningRect,
  type PositioningConfigurationFn,
} from '@fluentui/react-positioning';
import { useMergedRefs, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { Steps, StoryWright } from 'storywright';

import { Box, positions, useStyles } from './utils';
import { getStoryVariant, RTL } from '../../utilities';

const PositionAndAlignProps: React.FC<{ positionFixed?: boolean; useTransform?: boolean }> = ({
  positionFixed,
  useTransform,
}) => {
  const styles = useStyles();
  const positionedRefs = positions.reduce<ReturnType<typeof usePositioning>[]>((acc, cur) => {
    const positioningOptions: PositioningProps = { position: cur[0], align: cur[1] };
    // positionFixed is not public yet
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    positioningOptions.positionFixed = positionFixed;
    positioningOptions.useTransform = useTransform;

    // this loop is deterministic
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const positioningRefs = usePositioning(positioningOptions);
    acc.push(positioningRefs);
    return acc;
  }, []);

  const targetRef = useMergedRefs(...positionedRefs.map(x => x.targetRef));

  return (
    <div className={styles.wrapper}>
      {positions.map(([position, align], i) => (
        <Box key={`${position}-${align}`} ref={positionedRefs[i].containerRef}>{`${position}-${align}`}</Box>
      ))}
      <div ref={targetRef} className="target" />
    </div>
  );
};

const Offset = () => {
  const styles = useStyles();
  const positionedRefs = positions.reduce<ReturnType<typeof usePositioning>[]>((acc, cur) => {
    // this loop is deterministic
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const positioningRefs = usePositioning({
      position: cur[0],
      align: cur[1],
      offset: { crossAxis: 10, mainAxis: 10 },
    });
    acc.push(positioningRefs);
    return acc;
  }, []);

  const targetRef = useMergedRefs(...positionedRefs.map(x => x.targetRef));

  return (
    <div className={styles.wrapper}>
      {positions.map(([position, align], i) => (
        <Box key={`${position}-${align}`} ref={positionedRefs[i].containerRef}>{`${position}-${align}`}</Box>
      ))}
      <div ref={targetRef} className="target" />
    </div>
  );
};

const OffsetFunction = () => {
  const styles = useStyles();
  const positionedRefs = positions.reduce<ReturnType<typeof usePositioning>[]>((acc, cur) => {
    // this loop is deterministic
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const positioningRefs = usePositioning({
      position: cur[0],
      align: cur[1],
      offset: () => ({ crossAxis: 10, mainAxis: 10 }),
    });
    acc.push(positioningRefs);
    return acc;
  }, []);

  const targetRef = useMergedRefs(...positionedRefs.map(x => x.targetRef));

  return (
    <div className={styles.wrapper}>
      {positions.map(([position, align], i) => (
        <Box key={`${position}-${align}`} ref={positionedRefs[i].containerRef}>{`${position}-${align}`}</Box>
      ))}
      <div ref={targetRef} className="target" />
    </div>
  );
};

const CoverTarget = () => {
  const styles = useStyles();
  const positionedRefs = positions.reduce<ReturnType<typeof usePositioning>[]>((acc, cur) => {
    // this loop is deterministic
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const positioningRefs = usePositioning({ position: cur[0], align: cur[1], coverTarget: true });
    acc.push(positioningRefs);
    return acc;
  }, []);

  return (
    <div className={styles.gridWrapper}>
      {positions.map(([position, align], i) => (
        <div key={`${position}-${align}`}>
          <button ref={positionedRefs[i].targetRef}>Target</button>
          <Box className={styles.seeThrough} ref={positionedRefs[i].containerRef}>{`${position}-${align}`}</Box>
        </div>
      ))}
    </div>
  );
};

const VerticalFlip = () => {
  const styles = useStyles();
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const topPopper = usePositioning({ position: 'above', flipBoundary: boundary ?? undefined });
  const bottomPopper = usePositioning({ position: 'below', flipBoundary: boundary ?? undefined });

  return (
    <div
      className={styles.boundary}
      style={{ display: 'flex', flexDirection: 'column', height: 200, padding: '0px 50px' }}
      ref={setBoundary}
    >
      <button ref={topPopper.targetRef}>Target</button>
      <Box ref={topPopper.containerRef}>Flip</Box>

      <button style={{ marginTop: 'auto' }} ref={bottomPopper.targetRef}>
        Target
      </button>
      <Box ref={bottomPopper.containerRef}>Flip</Box>
    </div>
  );
};

const HorizontalFlip = () => {
  const styles = useStyles();
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const startPopper = usePositioning({ position: 'before', flipBoundary: boundary ?? undefined });
  const endPopper = usePositioning({ position: 'after', flipBoundary: boundary ?? undefined });
  const { dir } = useFluent();
  const marginDir = dir === 'ltr' ? 'marginLeft' : 'marginRight';

  return (
    <div className={styles.boundary} style={{ display: 'flex', width: 400, padding: '50px 0px' }} ref={setBoundary}>
      <button ref={startPopper.targetRef}>Target</button>
      <Box ref={startPopper.containerRef}>Flip</Box>

      <button style={{ [marginDir]: 'auto' }} ref={endPopper.targetRef}>
        Target
      </button>
      <Box ref={endPopper.containerRef}>Flip</Box>
    </div>
  );
};

const VerticalOverflow = () => {
  const styles = useStyles();
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const topPopper = usePositioning({ position: 'after', overflowBoundary: boundary ?? undefined });
  const bottomPopper = usePositioning({ position: 'after', overflowBoundary: boundary ?? undefined });

  return (
    <div
      className={styles.boundary}
      style={{ display: 'flex', flexDirection: 'column', height: 200, padding: '5px 50px' }}
      ref={setBoundary}
    >
      <button ref={topPopper.targetRef}>Target</button>
      <Box ref={topPopper.containerRef}>Shift</Box>

      <button style={{ marginTop: 'auto' }} ref={bottomPopper.targetRef}>
        Target
      </button>
      <Box ref={bottomPopper.containerRef}>Shift</Box>
    </div>
  );
};

const HorizontalOverflow = () => {
  const styles = useStyles();
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const startPopper = usePositioning({ position: 'below', overflowBoundary: boundary });
  const endPopper = usePositioning({ position: 'below', overflowBoundary: boundary });
  const { dir } = useFluent();
  const marginDir = dir === 'ltr' ? 'marginLeft' : 'marginRight';

  return (
    <div
      className={styles.boundary}
      style={{ display: 'flex', width: 400, padding: '50px 20px', boxSizing: 'border-box' }}
      ref={setBoundary}
    >
      <button ref={startPopper.targetRef}>Target</button>
      <Box ref={startPopper.containerRef} style={{ width: 100 }}>
        Shift
      </Box>

      <button style={{ [marginDir]: 'auto' }} ref={endPopper.targetRef}>
        Target
      </button>
      <Box ref={endPopper.containerRef} style={{ width: 100 }}>
        Shift
      </Box>
    </div>
  );
};

const HorizontalOverflowPadding = () => {
  const styles = useStyles();
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const startPopper = usePositioning({ position: 'below', overflowBoundary: boundary, overflowBoundaryPadding: 10 });
  const endPopper = usePositioning({ position: 'below', overflowBoundary: boundary, overflowBoundaryPadding: 10 });
  const { dir } = useFluent();
  const marginDir = dir === 'ltr' ? 'marginLeft' : 'marginRight';

  return (
    <div
      className={styles.boundary}
      style={{ display: 'flex', width: 400, padding: '50px 20px', boxSizing: 'border-box' }}
      ref={setBoundary}
    >
      <button ref={startPopper.targetRef}>Target</button>
      <Box ref={startPopper.containerRef} style={{ width: 100 }}>
        Shift
      </Box>

      <button style={{ [marginDir]: 'auto' }} ref={endPopper.targetRef}>
        Target
      </button>
      <Box ref={endPopper.containerRef} style={{ width: 100 }}>
        Shift
      </Box>
    </div>
  );
};

const VerticalOverflowPadding = () => {
  const styles = useStyles();
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const topPopper = usePositioning({ position: 'after', overflowBoundary: boundary, overflowBoundaryPadding: 10 });
  const bottomPopper = usePositioning({ position: 'after', overflowBoundary: boundary, overflowBoundaryPadding: 10 });

  return (
    <div
      className={styles.boundary}
      style={{ display: 'flex', flexDirection: 'column', height: 200, padding: '5px 50px' }}
      ref={setBoundary}
    >
      <button ref={topPopper.targetRef}>Target</button>
      <Box ref={topPopper.containerRef}>Shift</Box>

      <button style={{ marginTop: 'auto' }} ref={bottomPopper.targetRef}>
        Target
      </button>
      <Box ref={bottomPopper.containerRef}>Shift</Box>
    </div>
  );
};

const ExplicitOverflowPadding = () => {
  const styles = useStyles();
  const { dir } = useFluent();
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);

  const right = dir === 'ltr' ? 'right' : 'left';

  const first = usePositioning({
    position: 'above',
    overflowBoundary: boundary,
    overflowBoundaryPadding: { start: 20 },
  });
  const second = usePositioning({
    position: 'before',
    overflowBoundary: boundary,
    overflowBoundaryPadding: { top: 20 },
  });

  return (
    <div className={styles.boundary} style={{ height: 200, width: 400, position: 'relative' }} ref={setBoundary}>
      <Box ref={first.containerRef}>Shift</Box>
      <button style={{ position: 'absolute', top: 50 }} ref={first.targetRef}>
        Target
      </button>
      <Box ref={second.containerRef}>Shift</Box>
      <button style={{ position: 'absolute', [right]: 0 }} ref={second.targetRef}>
        Target
      </button>
    </div>
  );
};

const Pinned = () => {
  const styles = useStyles();
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const { containerRef, targetRef } = usePositioning({
    position: 'above',
    flipBoundary: boundary ?? undefined,
    pinned: true,
  });

  return (
    <div
      className={styles.boundary}
      style={{ display: 'flex', flexDirection: 'column', height: 200, padding: '10px 50px' }}
      ref={setBoundary}
    >
      <button ref={targetRef}>Target</button>
      <Box ref={containerRef}>Does not flip</Box>
    </div>
  );
};

const Arrow: React.FC = () => {
  const styles = useStyles();
  const positionedRefs = positions.reduce<ReturnType<typeof usePositioning>[]>((acc, cur) => {
    // this loop is deterministic
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const positioningRefs = usePositioning({ position: cur[0], align: cur[1], offset: 12, arrowPadding: 12 });
    acc.push(positioningRefs);
    return acc;
  }, []);

  const targetRef = useMergedRefs(...positionedRefs.map(x => x.targetRef));

  return (
    <div className={styles.wrapper}>
      {positions.map(([position, align], i) => (
        <Box className={styles.boxBold} key={`${position}-${align}`} ref={positionedRefs[i].containerRef}>
          <div className={styles.arrow} ref={positionedRefs[i].arrowRef} />
          {`${position}-${align}`}
        </Box>
      ))}
      <div ref={targetRef} className="target" />
    </div>
  );
};

const AutoSize = (extraProps: Partial<PositioningProps>) => {
  const styles = useStyles();
  const [overflowBoundary, setOverflowBoundary] = React.useState<HTMLDivElement | null>(null);
  const { containerRef, targetRef } = usePositioning({
    position: 'below',
    autoSize: true,
    overflowBoundary,
    ...extraProps,
  });

  return (
    <div
      ref={setOverflowBoundary}
      className={styles.boundary}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 200,
        padding: '10px 50px',
        position: 'relative',
      }}
    >
      <button ref={targetRef}>Target</button>
      <Box ref={containerRef} style={{ overflow: 'auto', border: '3px solid green' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. In fermentum et sollicitudin ac orci phasellus egestas. Facilisi cras fermentum odio eu feugiat
        pretium nibh ipsum consequat. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Porta
        nibh venenatis cras sed felis eget. Enim sed faucibus turpis in. Non blandit massa enim nec dui nunc mattis. Ut
        eu sem integer vitae justo. Lacus vestibulum sed arcu non. Vivamus arcu felis bibendum ut. Sagittis vitae et leo
        duis ut diam quam nulla porttitor. Amet est placerat in egestas erat imperdiet. Dapibus ultrices in iaculis nunc
        sed augue. Risus sed vulputate odio ut enim blandit volutpat maecenas. Orci dapibus ultrices in iaculis nunc sed
        augue lacus. Quam elementum pulvinar etiam non quam. Tempor commodo ullamcorper a lacus vestibulum sed arcu.
        Nunc non blandit massa enim nec. Venenatis a condimentum vitae sapien. Sodales ut eu sem integer vitae justo
        eget magna. In aliquam sem fringilla ut morbi tincidunt augue. Diam volutpat commodo sed egestas egestas
        fringilla phasellus faucibus scelerisque. Semper eget duis at tellus. Diam donec adipiscing tristique risus nec
        feugiat in fermentum posuere. Amet volutpat consequat mauris nunc congue nisi vitae. Hendrerit gravida rutrum
        quisque non tellus. Aliquet eget sit amet tellus. Libero id faucibus nisl tincidunt. Amet nulla facilisi morbi
        tempus iaculis urna id.
      </Box>
    </div>
  );
};

const AutoSizeAsyncContent = () => {
  const styles = useStyles();
  const [overflowBoundary, setOverflowBoundary] = React.useState<HTMLDivElement | null>(null);
  const { containerRef, targetRef } = usePositioning({
    position: 'below',
    autoSize: true,
    overflowBoundary,
  });

  return (
    <div
      ref={setOverflowBoundary}
      className={styles.boundary}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 200,
        padding: '10px 50px',
        position: 'relative',
      }}
    >
      <button ref={targetRef}>Target</button>
      <Box ref={containerRef} style={{ overflow: 'auto', border: '3px solid green' }}>
        <AsyncFloatingContent />
      </Box>
    </div>
  );
};
const AsyncFloatingContent = () => {
  const [isLoaded, setLoaded] = React.useState(false);
  const onLoaded = () => setLoaded(true);
  return isLoaded ? (
    <span id="full-content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. In fermentum et sollicitudin ac orci phasellus egestas. Facilisi cras fermentum odio eu feugiat
      pretium nibh ipsum consequat.
    </span>
  ) : (
    <button id="load-content" onClick={onLoaded}>
      load
    </button>
  );
};

const AutoSizeUpdatePosition = () => {
  const styles = useStyles();
  const [overflowBoundary, setOverflowBoundary] = React.useState<HTMLDivElement | null>(null);
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const { containerRef, targetRef } = usePositioning({
    position: 'below',
    align: 'start',
    autoSize: true,
    overflowBoundary,
    positioningRef,
  });

  const [isLoaded, setLoaded] = React.useState(false);
  const onLoaded = () => setLoaded(true);

  React.useEffect(() => {
    if (isLoaded) {
      positioningRef.current?.updatePosition();
    }
  }, [isLoaded]);

  return (
    <div
      ref={setOverflowBoundary}
      className={styles.boundary}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 200,
        width: 250,
        position: 'relative',
      }}
    >
      <button ref={targetRef} style={{ width: 'fit-content', marginLeft: 100, marginTop: 10 }}>
        Target
      </button>
      <Box ref={containerRef} style={{ overflow: 'clip', overflowClipMargin: 10, border: '3px solid green' }}>
        {isLoaded ? (
          <div id="full-content" style={{ backgroundColor: 'cornflowerblue', width: 300, height: 100 }} />
        ) : (
          <button id="load-content" onClick={onLoaded}>
            load + update position
          </button>
        )}
      </Box>
    </div>
  );
};

const DisableTether = () => {
  const styles = useStyles();
  const { containerRef, targetRef } = usePositioning({
    position: 'above',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    unstable_disableTether: 'all',
  });

  return (
    <>
      <div
        className={styles.boundary}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 200,
          padding: '10px 50px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <button style={{ position: 'absolute', top: -1000 }} ref={targetRef}>
          Target
        </button>
        <Box ref={containerRef}>Untethered</Box>
      </div>
      The target is outside of the boundary.
      <br />
      The positioned element is still fully visible.
    </>
  );
};

const VirtualElement = () => {
  const [target, setTarget] = React.useState<HTMLButtonElement | null>(null);

  const { containerRef, targetRef } = usePositioning({
    position: 'below',
    align: 'end',
  });

  React.useEffect(() => {
    if (target) {
      const virtualElement: PositioningVirtualElement = {
        getBoundingClientRect: () => target.getBoundingClientRect(),
      };

      targetRef.current = virtualElement;
    }
  }, [target, targetRef]);

  return (
    <>
      <button ref={setTarget}>Target</button>
      <Box ref={containerRef}>Anchored using virtual element</Box>
    </>
  );
};

const ResetTarget = () => {
  const [virtualElement, setVirtualElement] = React.useState<PositioningVirtualElement | null>(null);
  const { containerRef, targetRef } = usePositioning({
    position: 'below',
    align: 'end',
    target: virtualElement,
  });

  React.useEffect(() => {
    if (virtualElement) {
      setVirtualElement(null);
    }
  }, [virtualElement]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button ref={setVirtualElement}>Virtual Target</button>
        <button ref={targetRef}>Target should be fully visible</button>
      </div>
      <Box ref={containerRef}>Anchored to virtual element then reset to real target.</Box>
    </>
  );
};

const TargetProp = () => {
  const [target, setTarget] = React.useState<HTMLButtonElement | null>(null);

  const { containerRef } = usePositioning({
    target,
    position: 'below',
    align: 'end',
  });

  return (
    <>
      <button ref={setTarget}>Target</button>
      <Box ref={containerRef}>Anchored using target property</Box>
    </>
  );
};

const ImperativeTarget = () => {
  const positioningRef = React.useRef<PositioningImperativeRef>({ updatePosition: () => null, setTarget: () => null });
  const ref = React.useRef<HTMLButtonElement>(null);

  const { containerRef } = usePositioning({
    positioningRef,
    position: 'below',
    align: 'end',
  });

  React.useEffect(() => {
    if (ref.current) {
      positioningRef.current.setTarget(ref.current);
    }
  }, []);

  return (
    <>
      <button ref={ref}>Target</button>
      <Box ref={containerRef}>Anchored using setTarget </Box>
    </>
  );
};

const VisibilityModifiers = () => {
  const styles = useStyles();
  const popper = usePositioning({ align: 'center', position: 'above' });

  return (
    <>
      <p style={{ marginTop: 50 }}>
        This visual test asserts that visual styles are applied based on popper element's state:
      </p>
      <ul>
        <li>
          <b style={{ color: 'green' }}>green</b> when the popper element intersects boundaries
        </li>
        <li>
          <b style={{ color: 'red' }}>red</b> when the reference is hidden
        </li>
        <li>
          <b style={{ backgroundColor: 'yellow' }}>yellow</b> when the popper escapes the reference element's boundary
        </li>
      </ul>

      <div
        className={styles.boundary}
        id="scrollable-area"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          height: 400,
          overflow: 'scroll',
        }}
      >
        {Array(20)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              ref={i === 1 ? popper.targetRef : undefined}
              style={{ border: '2px solid grey', padding: 5, marginLeft: 10 }}
            >
              <p>message: {i}</p>
            </div>
          ))}
      </div>
      <Box className={styles.visibilityModifiers} ref={popper.containerRef}>
        Box with visibility modifiers
      </Box>
    </>
  );
};

const FallbackPositioning = () => {
  const styles = useStyles();
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);

  // Fluent UI handles window resizing by default.
  // Custom boundary resizing is not handled by default.
  const resizeObserver = React.useState(
    () =>
      new ResizeObserver(() => {
        positioningRef.current?.updatePosition();
      }),
  )[0];

  React.useEffect(() => {
    if (boundary) {
      resizeObserver.observe(boundary);
      return () => resizeObserver.unobserve(boundary);
    }
  }, [boundary, resizeObserver]);

  React.useEffect(() => {
    return () => {
      resizeObserver.disconnect();
    };
  }, [resizeObserver]);

  const { containerRef, targetRef } = usePositioning({
    position: 'after',
    align: 'start',
    fallbackPositions: ['below'],
    flipBoundary: boundary,
    overflowBoundary: boundary,
    positioningRef,
  });

  return (
    <div
      className={styles.boundary}
      style={{
        width: 200,
        height: 300,
        padding: '50px 20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        resize: 'both',
      }}
      ref={setBoundary}
    >
      <button ref={targetRef}>Target</button>
      <Box style={{ width: 120 }} ref={containerRef}>
        position: after-start
      </Box>
    </div>
  );
};

const MultiScrollParent = () => {
  const { targetRef, containerRef } = usePositioning({});
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 100 });
    }
  };

  return (
    <>
      <span>The popover should stay attached to the trigger</span>
      <button id="scroll" onClick={scroll}>
        scroll
      </button>
      <div
        ref={scrollContainerRef}
        style={{
          border: '2px dashed green',
          height: 300,
          width: 400,
          overflow: 'auto',
          display: 'grid',
          gridTemplateColumns: '350px auto',
          gridTemplateRows: '800px',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              overflow: 'auto',
              border: '2px dashed red',
              position: 'absolute',
              top: 150,
              left: 100,
              padding: 20,
            }}
          >
            <button id="target" ref={targetRef}>
              Trigger
            </button>
          </div>
        </div>
        <div
          style={{
            backgroundImage: 'linear-gradient(to bottom, #ffffff, #b9b9b9, #777777, #3b3b3b, #000000)',
          }}
        />
      </div>
      <div ref={containerRef} style={{ border: '2px solid blue', padding: 20, backgroundColor: 'white' }}>
        Popover
      </div>
    </>
  );
};

const MatchTargetSize = () => {
  const { targetRef, containerRef } = usePositioning({ matchTargetSize: 'width' });

  return (
    <>
      <button id="target" ref={targetRef} style={{ width: 350 }}>
        Trigger
      </button>
      <div
        ref={containerRef}
        style={{ border: '2px solid blue', padding: 20, backgroundColor: 'white', boxSizing: 'border-box' }}
      >
        Should have same width as trigger
      </div>
    </>
  );
};

const PositioningEndEvent = () => {
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [count, setCount] = React.useState(0);
  const { targetRef, containerRef } = usePositioning({
    onPositioningEnd: () => setCount(s => s + 1),
    positioningRef,
  });

  return (
    <>
      <button id="target" ref={targetRef} onClick={() => positioningRef.current?.updatePosition()}>
        Update position
      </button>
      <div
        ref={containerRef}
        style={{ border: '2px solid blue', padding: 20, backgroundColor: 'white', boxSizing: 'border-box' }}
      >
        positioning count: {count}
      </div>
    </>
  );
};

const TargetDisplayNone = () => {
  const { targetRef, containerRef } = usePositioning({});
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <div style={{ display: 'inline-block', width: 120, height: 30, border: '1px dashed green' }}>
        <button
          id="target"
          ref={targetRef}
          style={{ width: 120, height: 30, display: visible ? undefined : 'none' }}
          onClick={() => setVisible(false)}
        >
          remove me
        </button>
      </div>
      <div
        ref={containerRef}
        style={{ border: '2px solid blue', padding: 20, backgroundColor: 'white', boxSizing: 'border-box' }}
      >
        Should stay positioned to dashed green box
      </div>
    </>
  );
};

const ShiftToCoverTargetWithAutoSize = () => {
  const styles = useStyles();
  const [overflowBoundary, setOverflowBoundary] = React.useState<HTMLDivElement | null>(null);
  const { containerRef, targetRef } = usePositioning({
    position: 'below',
    overflowBoundary,
    shiftToCoverTarget: true,
    autoSize: true,
  });

  return (
    <div
      ref={setOverflowBoundary}
      className={styles.boundary}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 200,
        padding: '10px 50px',
        position: 'relative',
      }}
    >
      <button ref={targetRef}>Target</button>
      <Box ref={containerRef} style={{ overflow: 'auto', border: '3px solid green' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. In fermentum et sollicitudin ac orci phasellus egestas. Facilisi cras fermentum odio eu feugiat
        pretium nibh ipsum consequat. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Porta
        nibh venenatis cras sed felis eget. Enim sed faucibus turpis in. Non blandit massa enim nec dui nunc mattis. Ut
        eu sem integer vitae justo.
      </Box>
    </div>
  );
};

const ShiftToCoverTargetAsyncContentHorizontal = () => {
  const styles = useStyles();
  const [overflowBoundary, setOverflowBoundary] = React.useState<HTMLDivElement | null>(null);
  const { containerRef, targetRef } = usePositioning({
    position: 'after',
    overflowBoundary,
    shiftToCoverTarget: true,
    autoSize: true,
  });

  return (
    <div
      ref={setOverflowBoundary}
      className={styles.boundary}
      style={{
        height: 200,
        width: 300,
        padding: '50px 50px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <button ref={targetRef}>Target</button>
      <Box ref={containerRef} style={{ overflow: 'auto', border: '3px solid green', padding: 0 }}>
        <Box style={{ maxWidth: 180 }}>
          <AsyncFloatingContent />
        </Box>
      </Box>
    </div>
  );
};

const ShiftToCoverTargetAsyncContent = () => {
  const styles = useStyles();
  const [overflowBoundary, setOverflowBoundary] = React.useState<HTMLDivElement | null>(null);
  const { containerRef, targetRef } = usePositioning({
    position: 'below',
    overflowBoundary,
    shiftToCoverTarget: true,
    autoSize: true,
  });

  return (
    <div
      ref={setOverflowBoundary}
      className={styles.boundary}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 200,
        padding: '10px 50px',
        position: 'relative',
      }}
    >
      <button ref={targetRef}>Target</button>
      <Box ref={containerRef} style={{ overflow: 'auto', border: '3px solid green' }}>
        <AsyncFloatingContent />
      </Box>
    </div>
  );
};

const BoundaryRect = () => {
  const rectHostRef = React.useRef<HTMLDivElement>(null);

  const boundaryRect = React.useMemo<PositioningRect>(
    () => ({
      width: 700,
      height: 700,
      x: 70,
      y: 70,
    }),
    [],
  );
  const { targetRef, containerRef } = usePositioning({
    overflowBoundary: boundaryRect,

    position: 'below',
    align: 'end',
  });

  useIsomorphicLayoutEffect(() => {
    const rectEl = document.createElement('div');

    Object.assign(rectEl.style, {
      position: 'fixed',
      border: '4px solid orange',
      boxSizing: 'border-box',

      left: `${boundaryRect.x}px`,
      top: `${boundaryRect.y}px`,
      width: `${boundaryRect.width}px`,
      height: `${boundaryRect.height}px`,

      zIndex: 1,
    });

    rectHostRef.current?.append(rectEl);

    return () => {
      rectEl.remove();
    };
  }, [boundaryRect]);

  return (
    <>
      <div ref={rectHostRef} />
      <div
        style={{
          display: 'flex',
          width: 800,
          height: 800,
          border: '4px dashed green',
          padding: 50,

          position: 'absolute',
          left: 10,
          top: 10,
        }}
      >
        <div
          style={{
            padding: 20,
            backgroundColor: 'lightgray',
            fontSize: 20,
            display: 'flex',
            height: 'fit-content',
            width: '100%',
          }}
          ref={targetRef}
        >
          Hello world
        </div>
      </div>
      <div
        ref={containerRef}
        style={{ border: '2px solid blue', padding: 10, backgroundColor: 'white', boxSizing: 'border-box', zIndex: 2 }}
      >
        <ul>
          <li>
            SHOULD BE below gray box as it's a <code>target</code>
          </li>
          <li>
            SHOULD BE inside an orange box as it's a <code>overflowBoundary</code>
          </li>
        </ul>
      </div>
    </>
  );
};

const ConfigurationProviderExample = () => {
  const { containerRef, targetRef } = usePositioning({ position: 'after' });

  return (
    <div>
      <button ref={targetRef}>Target</button>
      <Box ref={containerRef}>Container</Box>
    </div>
  );
};

const ConfigurationProvider = () => {
  const styles = useStyles();
  const configurationFn: PositioningConfigurationFn = React.useCallback(({ options }) => {
    return {
      ...options,
      offset: { mainAxis: 20, crossAxis: 20 },
    };
  }, []);

  return (
    <div
      className={styles.boundary}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',

        height: 400,
        width: 400,
        padding: '5px 50px',
      }}
    >
      <ConfigurationProviderExample />

      <PositioningConfigurationProvider value={configurationFn}>
        <ConfigurationProviderExample />
      </PositioningConfigurationProvider>
    </div>
  );
};

export default {
  title: 'Positioning',

  decorators: [
    story => (
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {story()}
      </div>
    ),
  ],
} satisfies Meta<'div'>;

export const _BoundaryRect = () => <BoundaryRect />;
_BoundaryRect.storyName = 'using boundary rect';

export const _PositionAndAlignProps = () => <PositionAndAlignProps />;
_PositionAndAlignProps.storyName = 'position and align props';

export const PositionAndAlignPropsRTL = getStoryVariant(_PositionAndAlignProps, RTL);

export const _Offset = () => <Offset />;
_Offset.storyName = 'offset';

export const OffsetRTL = getStoryVariant(_Offset, RTL);

export const _OffsetFunction = () => <OffsetFunction />;
_OffsetFunction.storyName = 'offset function';

export const OffsetFunctionRTL = getStoryVariant(_OffsetFunction, RTL);

export const _CoverTarget = () => <CoverTarget />;
_CoverTarget.storyName = 'coverTarget';

export const CoverTargetRTL = getStoryVariant(_CoverTarget, RTL);

export const _VerticalFlip = () => <VerticalFlip />;
_VerticalFlip.storyName = 'vertical flip';

export const _HorizontalFlip = () => <HorizontalFlip />;
_HorizontalFlip.storyName = 'horizontal flip';

export const HorizontalFlipRTL = getStoryVariant(_HorizontalFlip, RTL);

export const _VerticalOverflow = () => <VerticalOverflow />;
_VerticalOverflow.storyName = 'vertical overflow';

export const _HorizontalOverflowPadding = () => <HorizontalOverflowPadding />;
_HorizontalOverflowPadding.storyName = 'horizontal overflow padding';

export const HorizontalOverflowPaddingRTL = getStoryVariant(_HorizontalOverflowPadding, RTL);

export const _VerticalOverflowPadding = () => <VerticalOverflowPadding />;
_VerticalOverflowPadding.storyName = 'vertical overflow padding';

export const _ExplicitOverflowPadding = () => <ExplicitOverflowPadding />;
_ExplicitOverflowPadding.storyName = 'explicit overflow padding';

export const ExplicitOverflowPaddingRTL = getStoryVariant(_ExplicitOverflowPadding, RTL);

export const _HorizontalOverflow = () => <HorizontalOverflow />;
_HorizontalOverflow.storyName = 'horizontal overflow';

export const HorizontalOverflowRTL = getStoryVariant(_HorizontalOverflow, RTL);

export const _Pinned = () => <Pinned />;
_Pinned.storyName = 'pinned';

export const _AutoSize = () => <AutoSize />;
_AutoSize.storyName = 'auto size';

export const _AutoSizeOverflowPadding = () => <AutoSize overflowBoundaryPadding={{ start: 10, end: 5 }} />;

_AutoSizeOverflowPadding.storyName = 'auto size overflow padding';

export const AutoSizeOverflowPaddingRTL = getStoryVariant(_AutoSizeOverflowPadding, RTL);

export const AutoSizeOverflowPaddingShorthand = () => <AutoSize overflowBoundaryPadding={10} />;
AutoSizeOverflowPaddingShorthand.storyName = 'auto size overflow padding shorthand';

export const _ConfigurationProvider = () => <ConfigurationProvider />;
_ConfigurationProvider.storyName = 'configuration provider';

export const AutoSizeWithAsyncContent = () => (
  <StoryWright
    steps={new Steps()
      .click('#load-content')
      .wait('#full-content')
      .snapshot('floating element is within the boundary')
      .end()}
  >
    <AutoSizeAsyncContent />
  </StoryWright>
);
AutoSizeWithAsyncContent.storyName = 'auto size with async content';

export const AutoSizeWithAsyncContentResetStylesOnUpdatePosition = () => (
  <StoryWright
    steps={new Steps()
      .click('#load-content')
      .wait('#full-content')
      .wait(250) // let updatePosition finish
      .snapshot('floating element width fills boundary and overflows 10px because of overflow:clip')
      .end()}
  >
    <AutoSizeUpdatePosition />
  </StoryWright>
);

AutoSizeWithAsyncContentResetStylesOnUpdatePosition.storyName =
  'auto size with async content reset styles on updatePosition';

export const _DisableTether = () => <DisableTether />;
_DisableTether.storyName = 'disable tether';

export const _PositionFixed = () => <PositionAndAlignProps positionFixed />;
_PositionFixed.storyName = 'position fixed';

export const _PositionFixedRTL = getStoryVariant(_PositionFixed, RTL);

export const _VirtualElement = () => <VirtualElement />;
_VirtualElement.storyName = 'virtual element';

export const _ResetTarget = () => <ResetTarget />;
_ResetTarget.storyName = 'reset target';

export const TargetProperty = () => <TargetProp />;
TargetProperty.storyName = 'target property';

export const _ImperativeTarget = () => <ImperativeTarget />;
_ImperativeTarget.storyName = 'imperative target';

export const _VisibilityModifiers = () => (
  <StoryWright
    steps={new Steps()
      .snapshot('has "[data-popper-is-intersecting]" when the popover intersects boundaries')
      .executeScript('document.querySelector("#scrollable-area").scrollTop = 80')
      .snapshot(`has "[data-popper-escaped]" when the popper escapes the reference element's boundary`)
      .executeScript('document.querySelector("#scrollable-area").scrollTop = 150')
      .snapshot('has "[data-popper-reference-hidden]" when the reference is hidden')
      .end()}
  >
    <VisibilityModifiers />
  </StoryWright>
);
_VisibilityModifiers.storyName = 'visibility modifiers';

export const _Arrow = () => <Arrow />;
_Arrow.storyName = 'arrow';

export const ArrowRTL = getStoryVariant(_Arrow, RTL);

export const _FallbackPositioning = () => <FallbackPositioning />;
_FallbackPositioning.storyName = 'fallback positioning';

export const DisableCssTransform = () => <PositionAndAlignProps useTransform={false} />;
DisableCssTransform.storyName = 'disable CSS transform';

export const DisableCssTransformRTL = getStoryVariant(DisableCssTransform, RTL);

export const DisableCssTransformWithPositionFixed = () => <PositionAndAlignProps positionFixed useTransform={false} />;
DisableCssTransformWithPositionFixed.storyName = 'disable CSS transform with position fixed';

export const DisableCssTransformWithPositionFixedRTL = getStoryVariant(DisableCssTransformWithPositionFixed, RTL);

export const MultipleScrollParents = () => (
  <StoryWright steps={new Steps().click('#scroll').snapshot('container attached to target').end()}>
    <MultiScrollParent />
  </StoryWright>
);
MultipleScrollParents.storyName = 'Multiple scroll parents';

export const _MatchTargetSize = () => <MatchTargetSize />;
_MatchTargetSize.storyName = 'Match target size';

export const PositioningEnd = () => (
  <StoryWright steps={new Steps().click('#target').snapshot('updated 2 times').end()}>
    <PositioningEndEvent />
  </StoryWright>
);
PositioningEnd.storyName = 'Positioning end';

export const _TargetDisplayNone = () => (
  <StoryWright steps={new Steps().click('#target').snapshot('target display: none').end()}>
    <TargetDisplayNone />
  </StoryWright>
);
_TargetDisplayNone.storyName = 'Target display none';

export const _ShiftToCoverTargetWithAutoSize = () => <ShiftToCoverTargetWithAutoSize />;
_ShiftToCoverTargetWithAutoSize.storyName = 'shiftToCoverTarget with autoSize';

export const _ShiftToCoverTargetAsyncContent = () => (
  <StoryWright
    steps={new Steps()
      .click('#load-content')
      .wait('#full-content')
      .snapshot('floating element is within the boundary')
      .end()}
  >
    <ShiftToCoverTargetAsyncContent />
  </StoryWright>
);
_ShiftToCoverTargetAsyncContent.storyName = 'shiftToCoverTarget with autoSize and async content';

export const _ShiftToCoverTargetHorizontal = () => (
  <StoryWright
    steps={new Steps()
      .click('#load-content')
      .wait('#full-content')
      .snapshot('floating element is within the boundary')
      .end()}
  >
    <ShiftToCoverTargetAsyncContentHorizontal />
  </StoryWright>
);
_ShiftToCoverTargetHorizontal.storyName = 'shiftToCoverTarget with autoSize and async content - horizontal';
