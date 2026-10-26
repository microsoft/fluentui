import * as React from 'react';
import { createPortal } from 'react-dom';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './popover.module.css';

export const InFrame = (): React.ReactNode => {
  const [doc, setDocument] = React.useState<Document | null>(null);
  return (
    <>
      <button className={styles.trigger}>Before frame</button>
      <iframe
        title="Popover host"
        srcDoc="<!doctype html><html><body></body></html>"
        onLoad={event => setDocument(event.currentTarget.contentDocument)}
      />
      {doc &&
        createPortal(
          <Popover defaultOpen>
            <PopoverTrigger>
              <button>Toggle iframe popover</button>
            </PopoverTrigger>
            <PopoverSurface as="div">
              <p>Tab from the button below into the parent page. The popover closes without taking focus back.</p>
              <button>Inside iframe popover</button>
            </PopoverSurface>
          </Popover>,
          doc.body,
        )}
      <button className={styles.trigger}>After frame</button>
    </>
  );
};
