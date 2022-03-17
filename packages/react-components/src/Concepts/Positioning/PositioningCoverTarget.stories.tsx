import * as React from 'react';
import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';
import { PositioningShorthand } from '@fluentui/react-positioning';

const useExampleStyles = makeStyles({
  popoverSurface: {
    width: '150px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  target: {
    height: '50px',
    width: '140px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const useGridExampleStyles = makeStyles({
  targetContainer: {
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(5, 64px)',
    ...shorthands.gap('20px'),
    ...shorthands.margin('16px', '128px'),
  },

  instructions: {
    gridRowStart: '3',
    gridColumnStart: '2',
    gridRowEnd: 'span 1',
    gridColumnEnd: 'span 3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  aboveStart: {
    gridRowStart: '1',
    gridColumnStart: '2',
    flexDirection: 'row-reverse',
  },
  above: {
    gridRowStart: '1',
    gridColumnStart: '3',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  aboveEnd: {
    gridRowStart: '1',
    gridColumnStart: '4',
  },
  beforeTop: {
    gridRowStart: '2',
    gridColumnStart: '1',
    flexDirection: 'column-reverse',
    '& div:nth-child(2)': {
      transform: 'rotate(270deg)',
    },
  },
  before: {
    gridRowStart: '3',
    gridColumnStart: '1',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  beforeBottom: {
    gridRowStart: '4',
    gridColumnStart: '1',
    flexDirection: 'column',
    '& div:nth-child(2)': {
      transform: 'rotate(270deg)',
    },
  },
  afterTop: {
    gridRowStart: '2',
    gridColumnStart: '5',
    flexDirection: 'column-reverse',
    '& div:nth-child(2)': {
      transform: 'rotate(90deg)',
    },
  },
  after: {
    gridRowStart: '3',
    gridColumnStart: '5',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  afterBottom: {
    gridRowStart: '4',
    gridColumnStart: '5',
    flexDirection: 'column',
    '& div:nth-child(2)': {
      transform: 'rotate(90deg)',
    },
  },
  belowStart: {
    flexDirection: 'row-reverse',
    gridRowStart: '5',
    gridColumnStart: '2',
    '& div:nth-child(2)': {
      transform: 'rotate(180deg)',
    },
  },
  below: {
    gridRowStart: '5',
    gridColumnStart: '3',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  belowEnd: {
    gridRowStart: '5',
    gridColumnStart: '4',
    '& div:nth-child(2)': {
      transform: 'rotate(180deg)',
    },
  },
});

export const CoverTarget = () => {
  const styles = useGridExampleStyles();

  return (
    <>
      <div className={styles.targetContainer}>
        <div className={styles.instructions}>Click each button to see its positioned element</div>
        <PositionedComponent
          positioning={{ position: 'above', align: 'start', coverTarget: true }}
          targetClassName={styles.aboveStart}
          targetContent="above-start"
        />
        <PositionedComponent
          positioning={{ position: 'above', coverTarget: true }}
          targetClassName={styles.above}
          targetContent="above"
        />
        <PositionedComponent
          positioning={{ position: 'above', align: 'end', coverTarget: true }}
          targetClassName={styles.aboveEnd}
          targetContent="above-end"
        />

        <PositionedComponent
          positioning={{ position: 'before', align: 'top', coverTarget: true }}
          targetClassName={styles.beforeTop}
          targetContent="before-top"
        />
        <PositionedComponent
          positioning={{ position: 'before', coverTarget: true }}
          targetClassName={styles.before}
          targetContent="before"
        />
        <PositionedComponent
          positioning={{ position: 'before', align: 'bottom', coverTarget: true }}
          targetClassName={styles.beforeBottom}
          targetContent="before-bottom"
        />

        <PositionedComponent
          positioning={{ position: 'after', align: 'top', coverTarget: true }}
          targetClassName={styles.afterTop}
          targetContent="after-top"
        />
        <PositionedComponent
          positioning={{ position: 'after', coverTarget: true }}
          targetClassName={styles.after}
          targetContent="after"
        />
        <PositionedComponent
          positioning={{ position: 'after', align: 'bottom', coverTarget: true }}
          targetClassName={styles.afterBottom}
          targetContent="after-bottom"
        />

        <PositionedComponent
          positioning={{ position: 'below', align: 'start', coverTarget: true }}
          targetClassName={styles.belowStart}
          targetContent="below-start"
        />
        <PositionedComponent
          positioning={{ position: 'below', coverTarget: true }}
          targetClassName={styles.below}
          targetContent="below"
        />
        <PositionedComponent
          positioning={{ position: 'below', align: 'end', coverTarget: true }}
          targetClassName={styles.belowEnd}
          targetContent="below-end"
        />
      </div>
    </>
  );
};

CoverTarget.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'It is also possible to position the element in such a way that it covers the target element. The position and',
        'align properties work in the same way but with an added offset to move the positioning element on the target',
        'element.',
      ].join('\n'),
    },
  },
};

CoverTarget.decorators = [
  (Story: React.ElementType) => (
    <div style={{ height: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Story />
    </div>
  ),
];

const PositionedComponent = (props: {
  positioning: PositioningShorthand;
  gridArea?: string;
  targetContent?: React.ReactNode;
  targetClassName?: string;
}) => {
  const { positioning, targetContent = 'Click me', targetClassName } = props;
  const styles = useExampleStyles();

  return (
    <Popover positioning={positioning} noArrow>
      <PopoverTrigger>
        <Button appearance="primary" className={mergeClasses(styles.target, targetClassName)}>
          <div>{targetContent}</div>
          <div>↑</div>
        </Button>
      </PopoverTrigger>

      <PopoverSurface className={styles.popoverSurface}>Container</PopoverSurface>
    </Popover>
  );
};
