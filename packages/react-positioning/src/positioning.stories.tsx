import * as React from 'react';
import { PositioningProps, PositioningShorthand } from './types';
import { Positioning } from './utils.stories';
import { resolvePositioningShorthand } from './utils/resolvePositioningShorthand';
import { makeStyles } from '@fluentui/react-make-styles';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';
import descriptionMd from './positioningDescription.md';
import bestPracticesMd from './positioningBestPractices.md';

const PositionedComponent = (props: {
  positioning: PositioningShorthand;
  gridArea?: string;
  targetContent?: React.ReactNode;
  targetClassName?: string;
  containerClassName?: string;
  containerContent?: React.ReactNode;
}) => {
  const { positioning, targetContent = 'Hover me', containerContent = 'Container', targetClassName } = props;
  const options = resolvePositioningShorthand(positioning);

  return (
    <Popover positioning={options} openOnHover noArrow>
      <PopoverTrigger>
        <Button primary className={targetClassName}>
          {targetContent}
        </Button>
      </PopoverTrigger>

      <PopoverSurface style={{ minWidth: 100 }}>{containerContent}</PopoverSurface>
    </Popover>
  );
};

export const Default = (props: PositioningProps) => {
  return <PositionedComponent positioning={props} />;
};

Default.height = '1000px';

const useStyles = makeStyles({
  targetContainer: {
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(5, 64px)',
    gap: '20px',
    margin: '16px 128px',
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

export const ShorthandPositions = () => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.targetContainer}>
        <div style={{ gridArea: '3/2/span 1/span 3', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Hover over each box to see its positioned element
        </div>
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
        'A simple string shorthand is enough to configure the',
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

export const CoverTarget = () => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.targetContainer}>
        <div style={{ gridArea: '3/2/span 1/span 3', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Hover over each box to see its positioned element
        </div>
        <PositionedComponent
          positioning={{ position: 'above', align: 'start', coverTarget: true }}
          targetClassName={styles.aboveStart}
          targetContent="above-start ↑"
        />
        <PositionedComponent
          positioning={{ position: 'above', coverTarget: true }}
          targetClassName={styles.above}
          targetContent="above ↑"
        />
        <PositionedComponent
          positioning={{ position: 'above', align: 'end', coverTarget: true }}
          targetClassName={styles.aboveEnd}
          targetContent="above-end ↑"
        />

        <PositionedComponent
          positioning={{ position: 'before', align: 'top', coverTarget: true }}
          targetClassName={styles.beforeTop}
          targetContent="← before-top"
        />
        <PositionedComponent
          positioning={{ position: 'before', coverTarget: true }}
          targetClassName={styles.before}
          targetContent="← before"
        />
        <PositionedComponent
          positioning={{ position: 'before', align: 'bottom', coverTarget: true }}
          targetClassName={styles.beforeBottom}
          targetContent="← before-bottom"
        />

        <PositionedComponent
          positioning={{ position: 'after', align: 'top', coverTarget: true }}
          targetClassName={styles.afterTop}
          targetContent="after-top →"
        />
        <PositionedComponent
          positioning={{ position: 'after', coverTarget: true }}
          targetClassName={styles.after}
          targetContent="after →"
        />
        <PositionedComponent
          positioning={{ position: 'after', align: 'bottom', coverTarget: true }}
          targetClassName={styles.afterBottom}
          targetContent="after-bottom →"
        />

        <PositionedComponent
          positioning={{ position: 'below', align: 'start', coverTarget: true }}
          targetClassName={styles.belowStart}
          targetContent="below-start ↓"
        />
        <PositionedComponent
          positioning={{ position: 'below', coverTarget: true }}
          targetClassName={styles.below}
          targetContent="below ↓"
        />
        <PositionedComponent
          positioning={{ position: 'below', align: 'end', coverTarget: true }}
          targetClassName={styles.belowEnd}
          targetContent="below-end ↓"
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

export const Offset = () => {
  const [offsetY, setOffsetY] = React.useState(10);
  const [offsetX, setOffsetX] = React.useState(10);

  const onChangeY = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffsetY(parseInt(e.target.value, 10));
  };

  const onChangeX = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffsetX(parseInt(e.target.value, 10));
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label style={{ display: 'flex', gap: 10 }}>
        Offset Y
        <input onChange={onChangeY} value={offsetY} type="number" />
      </label>
      <label style={{ display: 'flex', gap: 10 }}>
        Offset X
        <input onChange={onChangeX} value={offsetX} type="number" />
      </label>
      <PositionedComponent
        positioning={{ position: 'after', offset: [offsetY, offsetX] }}
        targetContent="Simple offset"
      />
      <PositionedComponent
        positioning={{ position: 'after', offset: () => [offsetY, offsetX] }}
        targetContent="Offset function"
      />
    </div>
  );
};

Offset.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'The positionined element can be offset from the target element. The offset value can be set either by:',
        '',
        '- Simple array with X and Y axis values',
        '- A function that returns the array offset value',
      ].join('\n'),
    },
  },
};

export const AnchorToTarget = () => {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <PositionedComponent positioning={{ position: 'above', align: 'start', target }} />
      <Button ref={setTarget}>Target</Button>
    </div>
  );
};

AnchorToTarget.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'Components with positioned slots will generally also contain the target which the positioned element will',
        'anchor on. It is also possible to select another DOM element for the anchor of the positioned slot. This',
        'can be useful in scenarios where the same instance of a positioned components needs to be reused',
      ].join('\n'),
    },
  },
};

export default {
  title: 'Concepts/Positioning',
  component: Positioning,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
