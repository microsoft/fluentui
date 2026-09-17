import * as React from 'react';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';

import styles from './positioning.module.css';

export const AutoSizeForSmallViewport = (): React.ReactNode => {
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const [itemCount, setItemCount] = React.useState(12);

  return (
    <div className={styles.column}>
      <label className={styles.row}>
        Menu item count
        <input
          className={styles.input}
          type="number"
          min={1}
          max={30}
          value={itemCount}
          onChange={event => setItemCount(event.currentTarget.valueAsNumber || 1)}
        />
      </label>
      <p className={styles.fallbackNote}>
        <code>autoSize</code> needs available-space measurements and therefore lazily loads floating-ui.
      </p>
      <div ref={setBoundary} className={`${styles.boundary} ${styles.boundaryCenter}`}>
        <Popover
          defaultOpen
          positioning={{ autoSize: true, overflowBoundary: boundary, flipBoundary: boundary, position: 'below' }}
        >
          <PopoverTrigger>
            <button className={`${styles.trigger} ${styles.boundaryTarget}`}>Autosized list</button>
          </PopoverTrigger>
          <PopoverSurface className={styles.menuSurface}>
            <div role="list" aria-label="Autosized items">
              {Array.from({ length: itemCount }, (_, index) => (
                <div className={styles.menuItem} key={index} role="listitem">
                  Item {index + 1}
                </div>
              ))}
            </div>
          </PopoverSurface>
        </Popover>
      </div>
    </div>
  );
};

AutoSizeForSmallViewport.parameters = {
  docs: {
    description: {
      story:
        '`autoSize` applies inline maximum dimensions so the surface fits the space available within its overflow boundary.',
    },
  },
};
