import * as React from 'react';
import {
  usePositioning,
  createArrowStyles,
  PositioningProps,
  PositioningVirtualElement,
  PositioningImperativeRef,
} from '@fluentui/react-positioning';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import { useMergedRefs } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { storiesOf } from '@storybook/react';
import * as ReactDOM from 'react-dom';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { Steps, StoryWright } from 'storywright';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    ...shorthands.gap('5px'),
    backgroundColor: tokens.colorNeutralBackground1,

    '& .target': {
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralBackground1,
      ...shorthands.border('2px', 'dashed', 'green'),
      width: '400px',
      height: '200px',
    },
  },

  gridWrapper: {
    width: '400px',
    height: '400px',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    columnGap: '20px',
    rowGap: '50px',
  },

  boundary: {
    ...shorthands.border('2px', 'dashed', 'red'),
  },

  box: {
    ...shorthands.padding('15px'),
    ...shorthands.border('1px', 'solid', 'blue'),
    backgroundColor: 'white',
  },
  boxBold: {
    ...shorthands.borderWidth('3px'),
  },

  arrow: {
    ...createArrowStyles({
      arrowHeight: 12,
      borderStyle: 'solid',
      borderColor: 'blue',
      borderWidth: '3px',
    }),
  },

  seeThrough: {
    opacity: 0.6,
  },

  visibilityModifiers: {
    backgroundColor: '#ccc',
    minHeight: '60px',
    width: '200px',

    '[data-popper-reference-hidden]': {
      outlineWidth: '5px',
      outlineStyle: 'solid',
      outlineColor: 'red',
    },
    '[data-popper-escaped]': {
      backgroundColor: 'yellow',
    },
    '[data-popper-is-intersecting]': {
      outlineWidth: '5px',
      outlineStyle: 'solid',
      outlineColor: 'green',
    },
  },
});

const positions = [
  ['above', 'start'],
  ['above', 'center'],
  ['above', 'end'],
  ['below', 'start'],
  ['below', 'center'],
  ['below', 'end'],
  ['before', 'top'],
  ['before', 'center'],
  ['before', 'bottom'],
  ['after', 'top'],
  ['after', 'center'],
  ['after', 'bottom'],
] as const;

const Box = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const styles = useStyles();
  return (
    <div {...props} className={mergeClasses(styles.box, props.className)} ref={ref}>
      {props.children}
    </div>
  );
});

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

const ScrollJump: React.FC = () => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open && buttonRef.current) {
      const scrollY = window.scrollY;
      buttonRef.current.focus();

      setTimeout(() => {
        const element = document.querySelector<HTMLElement>(
          scrollY === window.scrollY ? '#test-passed' : '#test-failed',
        );

        if (element) {
          element.style.setProperty('display', 'block');
          element.setAttribute('id', 'test-completed');
        }
      }, 500);
    }
  }, [open]);

  const { containerRef, targetRef } = usePositioning({
    position: 'above',
    align: 'start',
  });

  const floating = ReactDOM.createPortal(
    <Box ref={containerRef}>
      Focusable element <button ref={buttonRef}>Focus me</button>
    </Box>,
    document.body,
  );

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 10,
          left: 100,
          right: 100,

          background: 'white',
        }}
      >
        <p style={{ fontWeight: 20, border: '8px dotted magenta', padding: 10, margin: 0 }}>
          This example simulates a scroll jump on autofocus when opening a floating element. The example uses a layout
          effect to focus on the content of the floating box before usePopper is called. This results in the focus
          executing before the layout effect to position the floating is executed. The scroll jump is fixed internally
          in usePositioning by using position: fixed on the floating element before it is first positioned.
        </p>
        <div
          id="test-failed"
          style={{
            border: '8px dotted magenta',
            borderTop: 'none',
            padding: 10,
            fontSize: 20,
            color: 'red',
            display: 'none',
          }}
        >
          Test failed, scroll jump occurred 💥
        </div>
        <div
          id="test-passed"
          style={{
            border: '8px dotted magenta',
            borderTop: 'none',
            padding: 10,
            fontSize: 20,
            color: 'green',
            display: 'none',
          }}
        >
          Test passed ✅
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ccc 10px, #ccc 20px)',
        }}
      >
        <div style={{ background: 'white', border: '4px dotted green', margin: 10 }}>
          <div
            style={{
              display: 'flex',

              background:
                'repeating-linear-gradient(135deg, transparent, transparent 15px, #0f6cbd 10px, #0f6cbd 20px)',
              margin: 30,
              height: '100vh',
            }}
          />

          <div style={{ border: '4px dotted black', padding: 10, margin: 100 }}>
            <button id="target" ref={targetRef} onClick={() => setOpen(s => !s)}>
              Target
            </button>
          </div>

          <div
            style={{
              display: 'flex',

              background:
                'repeating-linear-gradient(135deg, transparent, transparent 15px, #0f6cbd 10px, #0f6cbd 20px)',
              margin: 30,
              height: '100vh',
            }}
          />

          {open && floating}
        </div>
      </div>
    </>
  );
};

//
//
//

const Context = createContext<
  | {
      containerRef: React.RefObject<HTMLDivElement>;
      targetRef: React.RefObject<HTMLDivElement>;
      open: boolean;
      setOpen: (open: boolean) => void;
    }
  | undefined
>(undefined);

const Controller: React.FC<React.PropsWithChildren<{}>> = props => {
  const [open, setOpen] = React.useState(false);
  const children = React.Children.toArray(props.children);

  const { containerRef, targetRef } = usePositioning({
    position: 'above',
    align: 'center',
  });

  React.useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      const button = containerRef.current?.querySelector('button');

      button.focus();

      setTimeout(() => {
        const element = document.querySelector<HTMLElement>(
          scrollY === window.scrollY ? '#test-passed' : '#test-failed',
        );

        if (element) {
          element.style.setProperty('display', 'block');
          element.setAttribute('id', 'test-completed');
        }
      }, 500);
    }
  }, [containerRef, open]);

  return (
    <Context.Provider value={{ setOpen, containerRef, targetRef, open }}>
      {children[0]}
      {open && children[1]}
    </Context.Provider>
  );
};

const Target: React.FC = props => {
  const open = useContextSelector(Context, v => v!.open);
  const setOpen = useContextSelector(Context, v => v!.setOpen);
  const targetRef = useContextSelector(Context, v => v!.targetRef);

  return React.cloneElement(props.children as React.ReactElement, {
    'aria-expanded': `${open}`,
    onClick: () => setOpen(true),
    ref: targetRef,
  });
};

const Container: React.FC = props => {
  const containerRef = useContextSelector(Context, v => v!.containerRef);

  return ReactDOM.createPortal(
    <div style={{ position: 'absolute', left: 0, top: 0, right: 0, zIndex: 1000 }}>
      <div ref={containerRef} style={{ background: 'white', padding: 20, border: '5px solid blue' }}>
        {props.children}
      </div>
    </div>,
    document.body,
  );
};

const ScrollJumpContext = () => {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 10,
          left: 100,
          right: 100,

          background: 'white',
        }}
      >
        <p style={{ fontWeight: 20, border: '8px dotted magenta', padding: 10, margin: 0 }}>
          This example simulates a scroll jump on autofocus when opening a floating element. The example uses a layout
          effect to focus on the content of the floating box before usePopper is called. This results in the focus
          executing before the layout effect to position the floating is executed. The scroll jump is fixed internally
          in usePositioning by using position: fixed on the floating element before it is first positioned.
        </p>
        <div
          id="test-failed"
          style={{
            border: '8px dotted magenta',
            borderTop: 'none',
            padding: 10,
            fontSize: 20,
            color: 'red',
            display: 'none',
          }}
        >
          Test failed, scroll jump occurred 💥
        </div>
        <div
          id="test-passed"
          style={{
            border: '8px dotted magenta',
            borderTop: 'none',
            padding: 10,
            fontSize: 20,
            color: 'green',
            display: 'none',
          }}
        >
          Test passed ✅
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ccc 10px, #ccc 20px)',
        }}
      >
        <div style={{ background: 'white', border: '4px dotted green', margin: 10, padding: 40 }}>
          <div
            style={{
              display: 'flex',

              background:
                'repeating-linear-gradient(135deg, transparent, transparent 15px, #0f6cbd 10px, #0f6cbd 20px)',
              margin: 30,
              height: '100vh',
            }}
          />

          <Controller>
            <Target>
              <button id="target">Popover trigger</button>
            </Target>

            <Container>
              <button>Action</button>
            </Container>
          </Controller>
        </div>
      </div>
    </>
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
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const { targetRef, containerRef } = usePositioning({
    positioningRef,
  });

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

storiesOf('Positioning', module)
  .addDecorator(story => (
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
  ))
  .addStory('position and align props', () => <PositionAndAlignProps />, { includeRtl: true })
  .addStory('offset', () => <Offset />, { includeRtl: true })
  .addStory('offset function', () => <OffsetFunction />, { includeRtl: true })
  .addStory('coverTarget', () => <CoverTarget />, { includeRtl: true })
  .addStory('vertical flip', () => <VerticalFlip />)
  .addStory('horizontal flip', () => <HorizontalFlip />, { includeRtl: true })
  .addStory('vertical overflow', () => <VerticalOverflow />)
  .addStory('horizontal overflow padding', () => <HorizontalOverflowPadding />, { includeRtl: true })
  .addStory('vertical overflow padding', () => <VerticalOverflowPadding />)
  .addStory('explicit overflow padding', () => <ExplicitOverflowPadding />, { includeRtl: true })
  .addStory('horizontal overflow', () => <HorizontalOverflow />, { includeRtl: true })
  .addStory('pinned', () => <Pinned />)
  .addStory('auto size', () => <AutoSize />)
  .addStory('auto size overflow padding', () => <AutoSize overflowBoundaryPadding={{ start: 10, end: 5 }} />, {
    includeRtl: true,
  })
  .addStory('auto size overflow padding shorthand', () => <AutoSize overflowBoundaryPadding={10} />)
  .addStory('auto size with async content', () => (
    <StoryWright
      steps={new Steps()
        .click('#load-content')
        .wait('#full-content')
        .snapshot('floating element is within the boundary')
        .end()}
    >
      <AutoSizeAsyncContent />
    </StoryWright>
  ))
  .addStory('auto size with async content reset styles on updatePosition', () => (
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
  ))
  .addStory('disable tether', () => <DisableTether />)
  .addStory('position fixed', () => <PositionAndAlignProps positionFixed />, { includeRtl: true })
  .addStory('virtual element', () => <VirtualElement />)
  .addStory('reset target', () => <ResetTarget />)
  .addStory('target property', () => <TargetProp />)
  .addStory('imperative target', () => <ImperativeTarget />)
  .addStory('visibility modifiers', () => (
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
  ))
  .addStory('arrow', () => <Arrow />, { includeRtl: true })
  .addStory('fallback positioning', () => <FallbackPositioning />)
  .addStory('disable CSS transform', () => <PositionAndAlignProps useTransform={false} />, { includeRtl: true })
  .addStory(
    'disable CSS transform with position fixed',
    () => <PositionAndAlignProps positionFixed useTransform={false} />,
    { includeRtl: true },
  )
  .addStory('Multiple scroll parents', () => (
    <StoryWright steps={new Steps().click('#scroll').snapshot('container attached to target').end()}>
      <MultiScrollParent />
    </StoryWright>
  ))
  .addStory('Match target size', () => <MatchTargetSize />)
  .addStory('Positioning end', () => (
    <StoryWright steps={new Steps().click('#target').snapshot('updated 2 times').end()}>
      <PositioningEndEvent />
    </StoryWright>
  ))
  .addStory('Target display none', () => (
    <StoryWright steps={new Steps().click('#target').snapshot('target display: none').end()}>
      <TargetDisplayNone />
    </StoryWright>
  ));

storiesOf('Positioning (no decorator)', module)
  .addStory('scroll jumps', () => (
    <StoryWright
      steps={new Steps()
        .focus('#target')
        .click('#target')
        .wait('#test-completed')
        .snapshot('positions without scroll jump')
        .end()}
    >
      <ScrollJump />
    </StoryWright>
  ))
  .addStory('scroll jumps (with context usage)', () => (
    <StoryWright
      steps={new Steps()
        .focus('#target')
        .click('#target')
        .wait('#test-completed')
        .snapshot('positions without scroll jump')
        .end()}
    >
      <ScrollJumpContext />
    </StoryWright>
  ));
