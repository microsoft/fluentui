import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogActions,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-headless-components-preview/dialog';

import styles from '../../../../../../theme/components/dialog.module.css';
import storySource from './DialogDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => (
  <Dialog>
    <DialogTrigger>
      <button type="button" className={styles.btn}>
        Open dialog
      </button>
    </DialogTrigger>

    <DialogSurface className={styles.surface}>
      <DialogBody className={styles.body}>
        <DialogTitle className={styles.title}>Confirm action</DialogTitle>
        <p className={styles.copy}>Are you sure you want to proceed? This action cannot be undone.</p>
      </DialogBody>

      <DialogActions className={styles.actions}>
        <DialogTrigger action="close">
          <button type="button" className={styles.btn}>
            Cancel
          </button>
        </DialogTrigger>
        <DialogTrigger action="close">
          <button type="button" className={`${styles.btn} ${styles.primary}`}>
            Confirm
          </button>
        </DialogTrigger>
      </DialogActions>
    </DialogSurface>
  </Dialog>
);

Default.parameters = withStorySource(storySource);
