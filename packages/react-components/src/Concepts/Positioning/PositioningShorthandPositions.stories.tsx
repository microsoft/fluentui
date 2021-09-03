import * as React from 'react';
import { PositionedComponent, useGridExampleStyles } from './utils.stories';

export { Default } from './PositioningDefault.stories';

export const ShorthandPositions = () => {
  const styles = useGridExampleStyles();

  return (
    <>
      <div className={styles.targetContainer}>
        <div className={styles.instructions}>Hover over each box to see its positioned element</div>
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
