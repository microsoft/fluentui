import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogActions,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-headless-components-preview/dialog';
import { Input } from '@fluentui/react-headless-components-preview/input';

import styles from './dialog.module.css';
import inputStyles from '../Input/input.module.css';
import storySource from './DialogNonModal.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
/**
 * A non-modal dialog does not dim the background and does not trap focus.
 * Users can still interact with the rest of the page while it is open.
 */
export const NonModal = (): React.ReactNode => (
  <div className={styles.row}>
    <Dialog modalType="non-modal">
      <DialogTrigger>
        <button type="button" className={styles.btn}>
          Open non-modal dialog
        </button>
      </DialogTrigger>

      <DialogSurface className={styles.alertSurface}>
        <DialogBody className={styles.body}>
          <DialogTitle className={styles.title}>Non-modal</DialogTitle>
          <p className={styles.copy}>
            You can still interact with the page behind this dialog. Focus is not trapped and the background is not
            dimmed.
          </p>
        </DialogBody>

        <DialogActions className={styles.actions}>
          <DialogTrigger action="close">
            <button type="button" className={styles.btn}>
              Close
            </button>
          </DialogTrigger>
        </DialogActions>
      </DialogSurface>
    </Dialog>

    <Input
      placeholder="Type here while dialog is open…"
      className={inputStyles.wrap}
      input={{ className: inputStyles.input }}
    />
  </div>
);

NonModal.parameters = withStorySource(storySource);
