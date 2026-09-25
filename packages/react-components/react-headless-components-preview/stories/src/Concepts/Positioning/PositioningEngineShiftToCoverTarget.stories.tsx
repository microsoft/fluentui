import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';
import type { Position, PositioningImperativeRef } from '@fluentui/react-headless-components-preview/positioning';
// Headless consumers import the engine from `@fluentui/react-positioning` directly; pulling the whole
// `@fluentui/react-components` barrel for one export would defeat the purpose of the headless package.
// eslint-disable-next-line @fluentui/no-restricted-imports
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';

import styles from './positioning.module.css';
import menuStyles from '../../Menu/menu.module.css';

export const EngineShiftToCoverTarget = (): React.ReactNode => {
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [itemCount, setItemCount] = React.useState(6);
  const [position, setPosition] = React.useState<Position>('above');
  const positioningRef = React.useRef<PositioningImperativeRef>(null);

  // The boundary is user-resizable (`resize: both`); re-position when its size changes.
  React.useEffect(() => {
    if (!boundary) {
      return;
    }
    const observer = new ResizeObserver(() => positioningRef.current?.updatePosition());
    observer.observe(boundary);
    return () => observer.disconnect();
  }, [boundary]);

  return (
    <div className={styles.page}>
      <div className={styles.controls}>
        <label className={styles.row}>
          <input type="checkbox" checked={open} onChange={e => setOpen(e.target.checked)} />
          Open
        </label>
        <label className={styles.row}>
          Position
          <select className={styles.select} value={position} onChange={e => setPosition(e.target.value as Position)}>
            <option value="above">above</option>
            <option value="after">after</option>
          </select>
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
      <div ref={setBoundary} className={`${styles.boundary} ${styles.boundaryScroll}`}>
        <div className={styles.boundaryScrollInner}>
          <Menu
            open={open}
            onOpenChange={(_, data) => setOpen(data.open)}
            positioning={{
              positioningRef,
              overflowBoundary: boundary,
              flipBoundary: boundary,
              autoSize: true,
              shiftToCoverTarget: true,
              position,
              engine: floatingUIPositioningEngine,
            }}
          >
            <MenuTrigger>
              <button className={`${styles.trigger} ${styles.triggerBlock}`}>Open menu</button>
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
    </div>
  );
};

EngineShiftToCoverTarget.parameters = {
  docs: {
    description: {
      story: [
        "`shiftToCoverTarget` allows the positioned element to shift and cover the target element when there isn't",
        'enough space available to fit it. Drag the resize handle of the dashed box to shrink the available space.',
        'Requires a positioning engine.',
      ].join('\n'),
    },
  },
};
