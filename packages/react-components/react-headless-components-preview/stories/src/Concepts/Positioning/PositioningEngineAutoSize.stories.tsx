import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';
import { PositioningProvider } from '@fluentui/react-headless-components-preview/positioning-floating-ui';

import styles from './positioning.module.css';
import menuStyles from '../../Menu/menu.module.css';

export const EngineAutoSize = (): React.ReactNode => {
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [itemCount, setItemCount] = React.useState(10);

  return (
    <PositioningProvider mode="floating-ui">
      <div className={styles.page}>
        <div className={styles.controls}>
          <label className={styles.row}>
            <input type="checkbox" checked={open} onChange={e => setOpen(e.target.checked)} />
            Open
          </label>
          <label className={styles.row}>
            Menu item count
            <input
              type="number"
              className={styles.input}
              min={1}
              value={itemCount}
              onChange={e => setItemCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
            />
          </label>
        </div>
        <div ref={setBoundary} className={`${styles.boundary} ${styles.boundaryCenter}`}>
          <Menu
            open={open}
            onOpenChange={(_, data) => setOpen(data.open)}
            positioning={{
              overflowBoundary: boundary,
              flipBoundary: boundary,
              autoSize: true,
            }}
          >
            <MenuTrigger>
              <button className={`${styles.trigger} ${styles.triggerBlock}`}>AutoSized menu</button>
            </MenuTrigger>
            <MenuPopover className={menuStyles.surface}>
              <MenuList className={menuStyles.list}>
                {Array.from({ length: itemCount }, (_, i) => (
                  <MenuItem key={i} className={menuStyles.item}>
                    Item {i}
                  </MenuItem>
                ))}
              </MenuList>
            </MenuPopover>
          </Menu>
        </div>
      </div>
    </PositioningProvider>
  );
};

EngineAutoSize.parameters = {
  docs: {
    description: {
      story: [
        '`autoSize` sets inline `max-width` and `max-height` styles on the element to ensure it fits within the',
        'available space, and makes it scroll. Increase the item count past what fits in the dashed box to see it',
        'kick in. Requires `PositioningProvider` in `floating-ui` or `fallback` mode; component-derived options (the menu still opens `below-start`) are',
        'merged before the engine is invoked.',
      ].join('\n'),
    },
  },
};
