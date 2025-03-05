import * as React from 'react';
import { makeStyles, mergeClasses, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { PositioningShorthand } from '@fluentui/react-components';

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
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    width: '100%',
    overflow: 'scroll',
  },

  instructions: {
    textAlign: 'center',
  },

  targetContainer: {
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(5, 64px)',
    gap: '20px',
    margin: '16px 128px',
  },

  aboveStart: {
    gridRowStart: '1',
    gridColumnStart: '1',
    flexDirection: 'row-reverse',
  },
  above: {
    gridRowStart: '1',
    gridColumnStart: '2',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  aboveEnd: {
    gridRowStart: '1',
    gridColumnStart: '3',
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
    gridColumnStart: '3',
    flexDirection: 'column-reverse',
    '& div:nth-child(2)': {
      transform: 'rotate(90deg)',
    },
  },
  after: {
    gridRowStart: '3',
    gridColumnStart: '3',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  afterBottom: {
    gridRowStart: '4',
    gridColumnStart: '3',
    flexDirection: 'column',
    '& div:nth-child(2)': {
      transform: 'rotate(90deg)',
    },
  },
  belowStart: {
    flexDirection: 'row-reverse',
    gridRowStart: '5',
    gridColumnStart: '1',
    '& div:nth-child(2)': {
      transform: 'rotate(180deg)',
    },
  },
  below: {
    gridRowStart: '5',
    gridColumnStart: '2',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  belowEnd: {
    gridRowStart: '5',
    gridColumnStart: '3',
    '& div:nth-child(2)': {
      transform: 'rotate(180deg)',
    },
  },
});

export const CoverTarget = () => {
  const styles = useGridExampleStyles();

  return (
    <div className={styles.wrapper}>
      <div className={styles.instructions}>Click each button to see its positioned element</div>
      <div className={styles.targetContainer}>
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
    </div>
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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
    <Popover positioning={positioning}>
      <PopoverTrigger disableButtonEnhancement>
        <Button appearance="primary" className={mergeClasses(styles.target, targetClassName)}>
          <div>{targetContent}</div>
          <div>↑</div>
        </Button>
      </PopoverTrigger>

      <PopoverSurface className={styles.popoverSurface}>Container</PopoverSurface>
    </Popover>
  );
};
