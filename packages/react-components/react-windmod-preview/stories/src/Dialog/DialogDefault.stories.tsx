import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogHeader,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-windmod-preview/dialog';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import styles from '../compare.module.css';

/**
 * The published anatomy: the surface carries the grid, DialogHeader is the header row, DialogBody
 * is the scrollable content area and DialogActions is the footer row.
 */
export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.spacer}>
      <Dialog>
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogHeader>
            <DialogTitle>Dialog title</DialogTitle>
          </DialogHeader>
          <DialogBody>
            A dialog interrupts the page to communicate a message or ask for a decision. Escape closes it, and focus is
            trapped inside while it is open.
          </DialogBody>
          <DialogActions>
            <DialogTrigger>
              <Button>Close</Button>
            </DialogTrigger>
            <Button appearance="primary">Confirm</Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </div>
  </FluentProvider>
);
