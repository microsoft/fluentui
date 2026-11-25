import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogActions,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-headless-components-preview/dialog';
import { Checkbox } from '@fluentui/react-headless-components-preview/checkbox';
import { CheckmarkRegular } from '@fluentui/react-icons';

import styles from './dialog.module.css';
import checkboxStyles from '../Checkbox/checkbox.module.css';
/**
 * Use `DialogTrigger` with `action="close"` to wire up a close button anywhere
 * inside the dialog. It defaults to `type="button"` and calls `onOpenChange`
 * when clicked.
 */
export const WithCloseButton = (): React.ReactNode => (
  <Dialog>
    <DialogTrigger>
      <button type="button" className={styles.btn}>
        Open settings
      </button>
    </DialogTrigger>

    <DialogSurface className={styles.surface}>
      <DialogBody className={styles.body}>
        <DialogTitle className={styles.title}>Settings</DialogTitle>
        <p className={`${styles.copy} ${styles.demoSpacerLg}`}>Update your preferences below.</p>
        <div className={checkboxStyles.list}>
          {[
            { label: 'Email notifications', defaultChecked: true },
            { label: 'SMS notifications', defaultChecked: false },
            { label: 'Weekly digest', defaultChecked: true },
          ].map(opt => (
            <Checkbox
              key={opt.label}
              defaultChecked={opt.defaultChecked}
              label={{ children: opt.label, className: checkboxStyles.label }}
              className={checkboxStyles.row}
              input={{ className: checkboxStyles.input }}
              indicator={{
                className: checkboxStyles.indicator,
                children: <CheckmarkRegular className={checkboxStyles.iconCheck} aria-hidden />,
              }}
            />
          ))}
        </div>
      </DialogBody>

      <DialogActions className={styles.actions}>
        <DialogTrigger action="close">
          <button type="button" className={styles.btn}>
            Cancel
          </button>
        </DialogTrigger>
        <DialogTrigger action="close">
          <button type="button" className={`${styles.btn} ${styles.primary}`}>
            Save
          </button>
        </DialogTrigger>
      </DialogActions>
    </DialogSurface>
  </Dialog>
);
