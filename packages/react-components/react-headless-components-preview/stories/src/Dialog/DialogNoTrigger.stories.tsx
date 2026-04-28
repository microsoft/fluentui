import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogActions,
  DialogSurface,
  DialogTitle,
} from '@fluentui/react-headless-components-preview/dialog';
import type { DialogOpenChangeData } from '@fluentui/react-headless-components-preview/dialog';

import styles from '../../../../../../bebop/components/dialog.module.css';
import storySource from './DialogNoTrigger.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
/**
 * `DialogTrigger` is optional. When the open state is managed entirely by the
 * parent (e.g. opened by a network event, a timeout, or a button outside the
 * Dialog tree), omit `DialogTrigger` and pass only `DialogSurface` as children.
 */
export const NoTrigger = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = (_event: Event | React.SyntheticEvent, data: DialogOpenChangeData) => {
    setOpen(data.open);
  };

  return (
    <div className={styles.demoCol}>
      <div className={styles.row}>
        <button type="button" className={`${styles.btn} ${styles.primary}`} onClick={() => setOpen(true)}>
          Open
        </button>
        <button type="button" className={styles.btn} onClick={() => setOpen(false)}>
          Close
        </button>
        <span className={styles.demoNote}>open: {String(open)}</span>
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogSurface className={styles.surface}>
          <DialogBody className={styles.body}>
            <DialogTitle className={styles.title}>Programmatic open</DialogTitle>
            <p className={styles.copy}>
              This dialog has no <code>DialogTrigger</code>. It was opened by the buttons above. Close it with Escape,
              the backdrop, or the Close button.
            </p>
          </DialogBody>

          <DialogActions className={styles.actions}>
            <button type="button" className={styles.btn} onClick={() => setOpen(false)}>
              Close
            </button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

NoTrigger.parameters = withStorySource(storySource);
