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

export const ShorthandPositions = () => {
  const styles = useGridExampleStyles();

  return (
    <div className={styles.wrapper}>
      <div className={styles.instructions}>Click each button to see its positioned element</div>
      <div className={styles.targetContainer}>
        <PositionedComponent
          positioning="above-start"
          targetClassName={styles.aboveStart}
          targetContent="above-start"
        />
        <PositionedComponent positioning="above" targetClassName={styles.above} targetContent="above" />
        <PositionedComponent positioning="above-end" targetClassName={styles.aboveEnd} targetContent="above-end" />

        <PositionedComponent positioning="before-top" targetClassName={styles.beforeTop} targetContent="before-top" />
        <PositionedComponent positioning="before" targetClassName={styles.before} targetContent="before" />
        <PositionedComponent
          positioning="before-bottom"
          targetClassName={styles.beforeBottom}
          targetContent="before-bottom"
        />

        <PositionedComponent positioning="after-top" targetClassName={styles.afterTop} targetContent="after-top" />
        <PositionedComponent positioning="after" targetClassName={styles.after} targetContent="after" />
        <PositionedComponent
          positioning="after-bottom"
          targetClassName={styles.afterBottom}
          targetContent="after-bottom"
        />

        <PositionedComponent
          positioning="below-start"
          targetClassName={styles.belowStart}
          targetContent="below-start"
        />
        <PositionedComponent positioning="below" targetClassName={styles.below} targetContent="below" />
        <PositionedComponent positioning="below-end" targetClassName={styles.belowEnd} targetContent="below-end" />
      </div>
    </div>
  );
};

ShorthandPositions.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'If you only need to configure the placement of the positioned element, you can use a shorthand syntax to',
        'avoid using a full blown javascript object.',
      ].join('\n'),
    },
  },
};

ShorthandPositions.decorators = [
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
