import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogActions,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-headless-components-preview/dialog';

import styles from './dialog.module.css';
import storySource from './DialogControlled.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
/**
 * In controlled mode the parent owns the open state.
 * Pass `open` and `onOpenChange` together — `onOpenChange` fires for every
 * dismiss gesture (Escape, backdrop click, trigger click).
 */
export const Controlled = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={(_, data) => setOpen(data.open)}>
      <DialogTrigger>
        <button type="button" className={styles.btn}>
          Open controlled dialog
        </button>
      </DialogTrigger>

      <DialogSurface className={styles.surface}>
        <DialogBody className={styles.body}>
          <DialogTitle className={styles.title}>Dialog title</DialogTitle>
          <p className={styles.copy}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
            est dolor eius expedita nulla ullam.
          </p>
        </DialogBody>
        <DialogActions className={styles.actions}>
          <DialogTrigger action="close">
            <button type="button" className={styles.btn}>
              Close
            </button>
          </DialogTrigger>
          <button type="button" className={`${styles.btn} ${styles.primary}`}>
            Do something
          </button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

Controlled.parameters = withStorySource(storySource);
