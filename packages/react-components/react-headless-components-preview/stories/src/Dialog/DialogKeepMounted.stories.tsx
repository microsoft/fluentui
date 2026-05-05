import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogActions,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-headless-components-preview/dialog';
import { Textarea } from '@fluentui/react-headless-components-preview/textarea';

import styles from './dialog.module.css';
import textareaStyles from '../Textarea/textarea.module.css';
/**
 * `unmountOnClose={false}` keeps the dialog in the DOM at all times. The native
 * `<dialog>` element manages its own visibility via `show()`/`close()`, so any
 * state inside (e.g. form values) is preserved across open/close cycles.
 */
export const KeepMounted = (): React.ReactNode => (
  <Dialog unmountOnClose={false}>
    <DialogTrigger>
      <button type="button" className={styles.btn}>
        Open dialog (state preserved)
      </button>
    </DialogTrigger>

    <DialogSurface className={styles.surface}>
      <DialogBody className={styles.body}>
        <DialogTitle className={styles.title}>Draft message</DialogTitle>
        <p className={`${styles.copy} ${styles.demoSpacer}`}>
          Close and reopen — your draft is preserved (<code>unmountOnClose=false</code>).
        </p>
        <Textarea
          rows={4}
          placeholder="Type your message…"
          className={textareaStyles.wrap}
          textarea={{ className: textareaStyles.textarea }}
        />
      </DialogBody>

      <DialogActions className={styles.actions}>
        <DialogTrigger action="close">
          <button type="button" className={styles.btn}>
            Save draft
          </button>
        </DialogTrigger>
        <button type="button" className={`${styles.btn} ${styles.primary}`}>
          Send
        </button>
      </DialogActions>
    </DialogSurface>
  </Dialog>
);
