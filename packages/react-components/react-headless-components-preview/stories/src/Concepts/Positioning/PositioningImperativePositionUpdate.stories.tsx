import * as React from 'react';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';
import type { PositioningImperativeRef } from '@fluentui/react-headless-components-preview/positioning';

import styles from './positioning.module.css';

export const ImperativePositionUpdate = (): React.ReactNode => {
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => positioningRef.current?.updatePosition(), [value]);

  return (
    <div className={styles.movingArea}>
      <label className={styles.group}>
        <span>Move the target: {value}%</span>
        <input
          className={styles.range}
          type="range"
          min={0}
          max={80}
          value={value}
          onChange={event => setValue(event.currentTarget.valueAsNumber)}
        />
      </label>
      <Popover open positioning={{ position: 'below', positioningRef }}>
        <PopoverTrigger>
          <button className={`${styles.trigger} ${styles.movingTrigger}`} style={{ left: `${value}%` }}>
            Target
          </button>
        </PopoverTrigger>
        <PopoverSurface className={styles.surfaceCallout}>Imperatively updated</PopoverSurface>
      </Popover>
    </div>
  );
};

ImperativePositionUpdate.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story:
        '`positioningRef.updatePosition()` requests an immediate update after movement that does not resize the target. Native CSS anchors normally update automatically; the method is most useful for fallback and unusual imperative layouts.',
    },
  },
};
