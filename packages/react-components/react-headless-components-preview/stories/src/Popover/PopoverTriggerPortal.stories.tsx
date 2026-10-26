import * as React from 'react';
import { createPortal } from 'react-dom';
import { Portal } from '@fluentui/react-components';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './popover.module.css';

export const TriggerPortal = (): React.ReactNode => {
  const [target, setTarget] = React.useState<{
    root: ShadowRoot;
    mountNode: HTMLDivElement;
    outsideMountNode: Element;
  } | null>(null);
  const attachRoot = React.useCallback((host: HTMLDivElement | null) => {
    if (host) {
      const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
      const mountNode = root.querySelector('div') ?? root.appendChild(host.ownerDocument.createElement('div'));
      const outsideMountNode =
        mountNode.nextElementSibling ?? root.appendChild(host.ownerDocument.createElement('div'));
      setTarget(previous => (previous?.root === root ? previous : { root, mountNode, outsideMountNode }));
    }
  }, []);
  return (
    <>
      <p className={styles.body}>
        Tab to Portalled trigger control, press Enter, then Tab once more. The popup closes on this first exit and
        Outside shadow sibling retains focus.
      </p>
      <Popover>
        <PopoverTrigger>
          <button className={styles.trigger}>
            Physical trigger
            {target && (
              <Portal mountNode={target.mountNode}>
                <button>Portalled trigger control</button>
              </Portal>
            )}
          </button>
        </PopoverTrigger>
        <PopoverSurface as="div" className={styles.surface}>
          <p className={styles.body}>This popup was opened from a trigger-owned shadow Portal.</p>
        </PopoverSurface>
      </Popover>
      <div ref={attachRoot} />
      {target && createPortal(<button>Outside shadow sibling</button>, target.outsideMountNode)}
    </>
  );
};
