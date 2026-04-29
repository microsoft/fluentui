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
import storySource from './DialogAlert.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
/**
 * An alert dialog uses `modalType="alert"`, which sets `role="alertdialog"` on the surface.
 * It is intended for critical messages that require the user to make a decision before proceeding.
 *
 * Unlike a regular modal:
 * - Clicking the backdrop does NOT dismiss the alert dialog (only action buttons can).
 * - Screen readers announce it as an alert, giving it higher urgency.
 */
export const Alert = (): React.ReactNode => (
  <Dialog modalType="alert">
    <DialogTrigger>
      <button type="button" className={`${styles.btn} ${styles.danger}`}>
        Delete item
      </button>
    </DialogTrigger>

    <DialogSurface className={`${styles.surface} ${styles.alertSurface}`}>
      <DialogBody className={styles.body}>
        <DialogTitle className={styles.title}>Delete item?</DialogTitle>
        <p className={styles.copy}>
          This action is permanent and cannot be undone. The item will be deleted immediately.
        </p>
      </DialogBody>

      <DialogActions className={styles.actions}>
        <DialogTrigger action="close">
          <button type="button" className={styles.btn}>
            Cancel
          </button>
        </DialogTrigger>
        <DialogTrigger action="close">
          <button type="button" className={`${styles.btn} ${styles.danger}`}>
            Delete
          </button>
        </DialogTrigger>
      </DialogActions>
    </DialogSurface>
  </Dialog>
);

Alert.parameters = withStorySource(storySource);
