import * as React from 'react';
import { useTopLayer, getTopLayerTriggerProps } from '@fluentui/react-headless-components-preview/top-layer';

import styles from './topLayer.module.css';
import { popoverAttribute } from './popoverAttribute';

/**
 * A toggletip recipe: `mode="hint"` does not close open `auto` popovers, so it can sit next to an open menu.
 * Browsers without `hint` support get `auto` instead. `role="status"` does not move focus.
 */
export const Hint = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);
  const tipId = 'top-layer-hint';
  const tipRef = React.useRef<HTMLDivElement>(null);
  const { shouldRender, popover } = useTopLayer(tipRef, {
    open,
    mode: 'hint',
    role: 'status',
    onClose: () => setOpen(false),
  });

  return (
    <>
      <button
        className={styles.btn}
        onClick={() => setOpen(!open)}
        {...getTopLayerTriggerProps({ open, layerId: tipId, role: 'status' })}
      >
        Show hint
      </button>
      {shouldRender && (
        <div
          ref={tipRef}
          id={tipId}
          role="status"
          {...popoverAttribute(popover)}
          className={styles.layer}
          data-open={open ? '' : undefined}
        >
          Saved a moment ago.
        </div>
      )}
    </>
  );
};
