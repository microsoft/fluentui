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
import storySource from './DialogNested.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
/**
 * Dialogs can be nested. The inner `Dialog` detects that it is inside a parent
 * `DialogContext` and sets `isNestedDialog=true` automatically. Each dialog
 * manages its own open state independently.
 */
export const Nested = (): React.ReactNode => (
  <Dialog>
    <DialogTrigger>
      <button type="button" className={styles.btn}>
        Open outer dialog
      </button>
    </DialogTrigger>

    <DialogSurface className={styles.surface}>
      <DialogBody className={styles.body}>
        <DialogTitle className={styles.title}>Outer dialog</DialogTitle>
        <p className={`${styles.copy} ${styles.demoSpacer}`}>
          This is the outer dialog. Open the inner dialog to see nesting in action.
        </p>

        <Dialog>
          <DialogTrigger>
            <button type="button" className={styles.btn}>
              Open inner dialog
            </button>
          </DialogTrigger>

          <DialogSurface className={styles.alertSurface}>
            <DialogBody className={styles.body}>
              <DialogTitle className={styles.title}>Inner dialog</DialogTitle>
              <p className={styles.copy}>Press Escape — only this dialog closes; the outer stays open.</p>
            </DialogBody>

            <DialogActions className={styles.actions}>
              <DialogTrigger action="close">
                <button type="button" className={styles.btn}>
                  Close inner
                </button>
              </DialogTrigger>
            </DialogActions>
          </DialogSurface>
        </Dialog>
      </DialogBody>

      <DialogActions className={styles.actions}>
        <DialogTrigger action="close">
          <button type="button" className={styles.btn}>
            Close outer
          </button>
        </DialogTrigger>
      </DialogActions>
    </DialogSurface>
  </Dialog>
);

Nested.parameters = withStorySource(storySource);
