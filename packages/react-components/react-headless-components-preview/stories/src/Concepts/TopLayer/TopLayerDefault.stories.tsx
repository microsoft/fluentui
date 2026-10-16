import * as React from 'react';
import { useTopLayer, getTopLayerTriggerProps } from '@fluentui/react-headless-components-preview/top-layer';
import { usePositioning } from '@fluentui/react-headless-components-preview/positioning';

import styles from './topLayer.module.css';
import { popoverAttribute } from './popoverAttribute';

/**
 * A menu recipe: `useTopLayer` with `mode="auto"` and `role="menu"`, anchored with `usePositioning`.
 * Opening focuses the first item. Escape and clicks outside close it through `onClose`; Escape returns focus to the
 * trigger. The fade-out runs before the element unmounts.
 */
export const Default = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);
  const menuId = 'top-layer-menu';
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const { targetRef, containerRef } = usePositioning({ position: 'below', align: 'start', offset: 4 });
  const { shouldRender, popover } = useTopLayer(menuRef, {
    open,
    mode: 'auto',
    role: 'menu',
    onClose: () => setOpen(false),
  });
  const ref = React.useCallback(
    (element: HTMLDivElement | null) => {
      menuRef.current = element;
      containerRef(element);
    },
    [containerRef],
  );

  return (
    <>
      <button
        ref={targetRef}
        className={styles.btn}
        onClick={() => setOpen(!open)}
        {...getTopLayerTriggerProps({ open, layerId: menuId, role: 'menu' })}
      >
        Actions
      </button>
      {shouldRender && (
        <div
          ref={ref}
          id={menuId}
          role="menu"
          aria-label="Actions"
          {...popoverAttribute(popover)}
          className={styles.layer}
          data-open={open ? '' : undefined}
        >
          <button role="menuitem" className={styles.btn} onClick={() => setOpen(false)}>
            Edit
          </button>
          <button role="menuitem" className={styles.btn} onClick={() => setOpen(false)}>
            Duplicate
          </button>
        </div>
      )}
    </>
  );
};
