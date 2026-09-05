import * as React from 'react';
import { Popover, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import type {
  PositioningImperativeRef,
  PositioningVirtualElement,
} from '@fluentui/react-headless-components-preview/positioning';

import styles from './positioning.module.css';

export const ImperativeAnchorTarget = (): React.ReactNode => {
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [open, setOpen] = React.useState(false);

  const onMouseMove = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX: x, clientY: y } = event;
    const virtualTarget: PositioningVirtualElement = {
      getBoundingClientRect: () => ({ x, y, top: y, right: x, bottom: y, left: x, width: 0, height: 0 }),
    };
    positioningRef.current?.setTarget(virtualTarget);
  }, []);

  return (
    <div className={styles.column}>
      <p className={styles.fallbackNote}>
        Virtual targets cannot be represented by CSS anchors, so this scenario lazily loads floating-ui.
      </p>
      <Popover open={open} positioning={{ positioningRef, offset: 15 }}>
        <PopoverSurface className={styles.surfaceCallout}>Follows the cursor</PopoverSurface>
      </Popover>
      <div
        className={styles.cursorArea}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        Move the pointer here
      </div>
    </div>
  );
};

ImperativeAnchorTarget.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story:
        '`positioningRef.setTarget()` accepts an HTML element or a virtual element. Virtual coordinates are useful for cursor-following surfaces and automatically select the lazy floating-ui fallback.',
    },
  },
};
