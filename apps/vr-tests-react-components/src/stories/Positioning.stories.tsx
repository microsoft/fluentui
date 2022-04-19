import * as React from 'react';
import {
  usePopper,
  createArrowStyles,
  PositioningProps,
  PopperVirtualElement,
  PopperRefHandle,
} from '@fluentui/react-positioning';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { useMergedRefs } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { storiesOf } from '@storybook/react';
import { useFluent } from '@fluentui/react-shared-contexts';
import Screener from 'screener-storybook/src/screener';

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

  arrow: {
    ...createArrowStyles({ arrowHeight: 8 }),
    backgroundColor: 'red',
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

const PositionAndAlignProps: React.FC<{ positionFixed?: boolean }> = ({ positionFixed }) => {
  const styles = useStyles();
  const positionedRefs = positions.reduce<ReturnType<typeof usePopper>[]>((acc, cur) => {
    const popperOptions: PositioningProps = { position: cur[0], align: cur[1] };
    // positionFixed is not public yet
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    popperOptions.positionFixed = positionFixed;

    // this loop is deterministic
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const popperRefs = usePopper(popperOptions);
    acc.push(popperRefs);
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
  const positionedRefs = positions.reduce<ReturnType<typeof usePopper>[]>((acc, cur) => {
    // this loop is deterministic
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const popperRefs = usePopper({ position: cur[0], align: cur[1], offset: [10, 10] });
    acc.push(popperRefs);
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
  const positionedRefs = positions.reduce<ReturnType<typeof usePopper>[]>((acc, cur) => {
    // this loop is deterministic
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const popperRefs = usePopper({ position: cur[0], align: cur[1], offset: () => [10, 10] });
    acc.push(popperRefs);
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
  const positionedRefs = positions.reduce<ReturnType<typeof usePopper>[]>((acc, cur) => {
    // this loop is deterministic
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const popperRefs = usePopper({ position: cur[0], align: cur[1], coverTarget: true });
    acc.push(popperRefs);
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
  const topPopper = usePopper({ position: 'above', flipBoundary: boundary ?? undefined });
  const bottomPopper = usePopper({ position: 'below', flipBoundary: boundary ?? undefined });

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
  const startPopper = usePopper({ position: 'before', flipBoundary: boundary ?? undefined });
  const endPopper = usePopper({ position: 'after', flipBoundary: boundary ?? undefined });
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
  const topPopper = usePopper({ position: 'after', overflowBoundary: boundary ?? undefined });
  const bottomPopper = usePopper({ position: 'after', overflowBoundary: boundary ?? undefined });

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
  const startPopper = usePopper({ position: 'below', overflowBoundary: boundary ?? undefined });
  const endPopper = usePopper({ position: 'below', overflowBoundary: boundary ?? undefined });
  const { dir } = useFluent();
  const marginDir = dir === 'ltr' ? 'marginLeft' : 'marginRight';

  return (
    <div className={styles.boundary} style={{ display: 'flex', width: 400, padding: '50px 5px' }} ref={setBoundary}>
      <button ref={startPopper.targetRef}>Target</button>
      <Box ref={startPopper.containerRef} style={{ width: 50 }}>
        Shift
      </Box>

      <button style={{ [marginDir]: 'auto' }} ref={endPopper.targetRef}>
        Target
      </button>
      <Box ref={endPopper.containerRef} style={{ width: 50 }}>
        Shift
      </Box>
    </div>
  );
};

const Pinned = () => {
  const styles = useStyles();
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const { containerRef, targetRef } = usePopper({
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
  const positionedRefs = positions.reduce<ReturnType<typeof usePopper>[]>((acc, cur) => {
    // this loop is deterministic
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const popperRefs = usePopper({ position: cur[0], align: cur[1] });
    acc.push(popperRefs);
    return acc;
  }, []);

  const targetRef = useMergedRefs(...positionedRefs.map(x => x.targetRef));

  return (
    <div className={styles.wrapper}>
      {positions.map(([position, align], i) => (
        <Box key={`${position}-${align}`} ref={positionedRefs[i].containerRef}>
          <div className={styles.arrow} ref={positionedRefs[i].arrowRef} />
          {`${position}-${align}`}
        </Box>
      ))}
      <div ref={targetRef} className="target" />
    </div>
  );
};

const AutoSize = () => {
  const styles = useStyles();
  const { containerRef, targetRef } = usePopper({
    position: 'below',
    autoSize: true,
  });

  return (
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
      <button ref={targetRef}>Target</button>
      <Box ref={containerRef} style={{ overflow: 'auto' }}>
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

const DisableTether = () => {
  const styles = useStyles();
  const { containerRef, targetRef } = usePopper({
    position: 'above',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/naming-convention
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

  const { containerRef, targetRef } = usePopper({
    position: 'below',
    align: 'end',
  });

  React.useEffect(() => {
    if (target) {
      const virtualElement: PopperVirtualElement = {
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

const TargetProp = () => {
  const [target, setTarget] = React.useState<HTMLButtonElement | null>(null);

  const { containerRef } = usePopper({
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
  const popperRef = React.useRef<PopperRefHandle>({ updatePosition: () => null, setTarget: () => null });
  const ref = React.useRef<HTMLButtonElement>(null);

  const { containerRef } = usePopper({
    popperRef,
    position: 'below',
    align: 'end',
  });

  React.useEffect(() => {
    if (ref.current) {
      popperRef.current.setTarget(ref.current);
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
  const popper = usePopper({ align: 'center', position: 'above' });

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
  .addStory('horizontal overflow', () => <HorizontalOverflow />, { includeRtl: true })
  .addStory('pinned', () => <Pinned />)
  .addStory('auto size', () => <AutoSize />)
  .addStory('disable tether', () => <DisableTether />)
  .addStory('position fixed', () => <PositionAndAlignProps positionFixed />, { includeRtl: true })
  .addStory('virtual element', () => <VirtualElement />)
  .addStory('target property', () => <TargetProp />)
  .addStory('imperative target', () => <ImperativeTarget />)
  .addStory('visibility modifiers', () => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('has "[data-popper-is-intersecting]" when the popover intersects boundaries')
        .executeScript('document.querySelector("#scrollable-area").scrollTop = 80')
        .snapshot(`has "[data-popper-escaped]" when the popper escapes the reference element's boundary`)
        .executeScript('document.querySelector("#scrollable-area").scrollTop = 150')
        .snapshot('has "[data-popper-reference-hidden]" when the reference is hidden')
        .end()}
    >
      <VisibilityModifiers />
    </Screener>
  ))
  .addStory('arrow', () => <Arrow />, { includeRtl: true });
