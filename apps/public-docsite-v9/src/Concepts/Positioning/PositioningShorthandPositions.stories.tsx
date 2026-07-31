import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { PositioningShorthand } from '@fluentui/react-components';

import styles from './PositioningShorthandPositions.module.css';

export const ShorthandPositions = () => {
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
  return (
    <Popover positioning={positioning}>
      <PopoverTrigger disableButtonEnhancement>
        <Button appearance="primary" className={`${styles.target} ${targetClassName}`}>
          <div>{targetContent}</div>
          <div>↑</div>
        </Button>
      </PopoverTrigger>

      <PopoverSurface className={styles.popoverSurface}>Container</PopoverSurface>
    </Popover>
  );
};
