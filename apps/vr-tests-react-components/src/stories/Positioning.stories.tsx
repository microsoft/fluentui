import * as React from 'react';
import { usePopper } from '@fluentui/react-positioning';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { useMergedRefs } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { storiesOf } from '@storybook/react';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    ...shorthands.gap('5px'),
    ...shorthands.padding('50px', '120px'),
    backgroundColor: tokens.colorNeutralBackground1,

    '& button, & .target': {
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralBackground1,
      ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    },
  },

  gridWrapper: {
    display: 'grid',
  },

  positionedContainer: {
    ...shorthands.padding('5px'),
    ...shorthands.border('1px', 'solid', 'red'),
    backgroundColor: 'white',
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
    <div {...props} className={mergeClasses(styles.positionedContainer, props.className)} ref={ref}>
      {props.children}
    </div>
  );
});

storiesOf('Positioning', module)
  .addStory(
    'position and align props',
    () => {
      const styles = useStyles();
      const positionedRefs = positions.reduce<ReturnType<typeof usePopper>[]>((acc, cur) => {
        const popperRefs = usePopper({ position: cur[0], align: cur[1] });
        acc.push(popperRefs);
        return acc;
      }, []);

      const targetRef = useMergedRefs(...positionedRefs.map(x => x.targetRef));

      return (
        <div className={styles.wrapper}>
          {positions.map(([position, align], i) => (
            <Box key={`${position}-${align}`} ref={positionedRefs[i].containerRef}>{`${position}-${align}`}</Box>
          ))}
          <div ref={targetRef} className="target" style={{ width: '300px', height: '150px' }} />
        </div>
      );
    },
    { includeRtl: true },
  )
  .addStory(
    'offset',
    () => {
      const styles = useStyles();
      const positionedRefs = positions.reduce<ReturnType<typeof usePopper>[]>((acc, cur) => {
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
          <div ref={targetRef} className="target" style={{ width: '300px', height: '150px' }} />
        </div>
      );
    },
    { includeRtl: true },
  )
  .addStory(
    'offset function',
    () => {
      const styles = useStyles();
      const positionedRefs = positions.reduce<ReturnType<typeof usePopper>[]>((acc, cur) => {
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
          <div ref={targetRef} className="target" style={{ width: '300px', height: '150px' }} />
        </div>
      );
    },
    { includeRtl: true },
  )
  .addStory(
    'coverTarget',
    () => {
      const styles = useStyles();
      const positionedRefs = positions.reduce<ReturnType<typeof usePopper>[]>((acc, cur) => {
        const popperRefs = usePopper({ position: cur[0], align: cur[1], coverTarget: true });
        acc.push(popperRefs);
        return acc;
      }, []);

      return (
        <div className={styles.wrapper}>
          {positions.map(([position, align], i) => (
            <div key={`${position}-${align}`}>
              <div ref={positionedRefs[i].targetRef}>Target</div>
              <Box ref={positionedRefs[i].containerRef}>{`${position}-${align}`}</Box>
            </div>
          ))}
        </div>
      );
    },
    { includeRtl: true },
  );
