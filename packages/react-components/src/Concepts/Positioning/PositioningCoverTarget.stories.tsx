import * as React from 'react';
import { PositionedComponent, useGridExampleStyles } from './utils.stories';

export { Default } from './PositioningDefault.stories';
export { ShorthandPositions } from './PositioningShorthandPositions.stories';

export const CoverTarget = () => {
  const styles = useGridExampleStyles();
  return (
    <>
      <div className={styles.targetContainer}>
        <div className={styles.instructions}>Hover over each box to see its positioned element</div>
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
