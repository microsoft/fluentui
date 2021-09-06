import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';
import { PositioningShorthand } from '@fluentui/react-positioning';

export const ShorthandPositions = () => {
  const styles = useGridExampleStyles();

  return (
    <>
      <div className={styles.targetContainer}>
        <div className={styles.instructions}>Click each button to see its positioned element</div>
        <PositionedComponent
          positioning="above-start"
          targetClassName={styles.aboveStart}
          targetContent="above-start ↑"
        />
        <PositionedComponent positioning="above" targetClassName={styles.above} targetContent="above ↑" />
        <PositionedComponent positioning="above-end" targetClassName={styles.aboveEnd} targetContent="above-end ↑" />

        <PositionedComponent positioning="before-top" targetClassName={styles.beforeTop} targetContent="← before-top" />
        <PositionedComponent positioning="before" targetClassName={styles.before} targetContent="← before" />
        <PositionedComponent
          positioning="before-bottom"
          targetClassName={styles.beforeBottom}
          targetContent="← before-bottom"
        />

        <PositionedComponent positioning="after-top" targetClassName={styles.afterTop} targetContent="after-top →" />
        <PositionedComponent positioning="after" targetClassName={styles.after} targetContent="after →" />
        <PositionedComponent
          positioning="after-bottom"
          targetClassName={styles.afterBottom}
          targetContent="after-bottom →"
        />

        <PositionedComponent
          positioning="below-start"
          targetClassName={styles.belowStart}
          targetContent="below-start ↓"
        />
        <PositionedComponent positioning="below" targetClassName={styles.below} targetContent="below ↓" />
        <PositionedComponent positioning="below-end" targetClassName={styles.belowEnd} targetContent="below-end ↓" />
      </div>
    </>
  );
};

ShorthandPositions.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'If all you need to configure is the placement of the positioned element, you can use a shorthand syntax to',
        'avoid using a full blown javascript object',
      ].join('\n'),
    },
  },
};

ShorthandPositions.decorators = [
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
        <Button primary className={targetClassName}>
          {targetContent}
        </Button>
      </PopoverTrigger>

      <PopoverSurface className={styles.popoverSurface}>Container</PopoverSurface>
    </Popover>
  );
};

const useExampleStyles = makeStyles({
  popoverSurface: {
    width: '150px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const useGridExampleStyles = makeStyles({
  targetContainer: {
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(5, 64px)',
    gap: '20px',
    margin: '16px 128px',
  },

  instructions: {
    gridArea: '3/2/span 1/span 3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  aboveStart: {
    gridArea: '1/2',
  },
  above: {
    gridArea: '1/3',
  },
  aboveEnd: {
    gridArea: '1/4',
  },
  beforeTop: {
    gridArea: '2/1',
  },
  before: {
    gridArea: '3/1',
  },
  beforeBottom: {
    gridArea: '4/1',
  },
  afterTop: {
    gridArea: '2/5',
  },
  after: {
    gridArea: '3/5',
  },
  afterBottom: {
    gridArea: '4/5',
  },
  belowStart: {
    gridArea: '5/2',
  },
  below: {
    gridArea: '5/3',
  },
  belowEnd: {
    gridArea: '5/4',
  },
});
