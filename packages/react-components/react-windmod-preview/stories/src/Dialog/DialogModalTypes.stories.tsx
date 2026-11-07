import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-windmod-preview/dialog';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import type { DialogActionsPosition, DialogModalType } from '@fluentui/react-windmod-preview/dialog';

import styles from '../compare.module.css';

const modalTypes: { modalType: DialogModalType; blurb: string; position: DialogActionsPosition }[] = [
  {
    modalType: 'modal',
    blurb: 'showModal() dims the page behind a real ::backdrop and traps focus natively.',
    position: 'end',
  },
  {
    modalType: 'alert',
    blurb: 'The same modal path with role="alertdialog", and no dismiss on a backdrop click.',
    position: 'start',
  },
  {
    modalType: 'non-modal',
    blurb: 'popover="manual" enters the top layer without a backdrop; the page stays interactive.',
    position: 'end',
  },
];

/** The three modalities, and both DialogActions positions. */
export const ModalTypes = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.spacer}>
      {modalTypes.map(({ modalType, blurb, position }) => (
        <Dialog key={modalType} modalType={modalType}>
          <DialogTrigger>
            <Button>{modalType}</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogTitle>{modalType}</DialogTitle>
            <DialogBody>{blurb}</DialogBody>
            <DialogActions position={position}>
              <DialogTrigger>
                <Button>Close</Button>
              </DialogTrigger>
              <Button appearance="primary">Confirm</Button>
            </DialogActions>
          </DialogSurface>
        </Dialog>
      ))}
    </div>
  </FluentProvider>
);
