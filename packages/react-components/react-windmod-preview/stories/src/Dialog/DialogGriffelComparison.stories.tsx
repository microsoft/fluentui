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
import {
  Button as GriffelButton,
  Dialog as GriffelDialog,
  DialogActions as GriffelDialogActions,
  DialogBody as GriffelDialogBody,
  DialogContent as GriffelDialogContent,
  DialogSurface as GriffelDialogSurface,
  DialogTitle as GriffelDialogTitle,
  DialogTrigger as GriffelDialogTrigger,
  FluentProvider as GriffelFluentProvider,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

const BODY_TEXT =
  'A dialog interrupts the page to communicate a message or ask for a decision. Both surfaces are ' +
  '600px wide with 24px padding and the same grid: two declared rows, with the actions placing ' +
  'themselves into an implicit third.';

/**
 * The windmod dialog beside its Griffel-suite twin. The mechanisms differ — a native <dialog> in
 * the browser top layer painting a real ::backdrop, against a portaled div with its own overlay
 * div — and so do the anatomies, which is why the two trees below are not shaped alike (see
 * DialogVrScene for the role-vs-component naming that follows from it). Only one can be open at a
 * time; the SURFACES are what must match.
 */
export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.spacer}>
    <FluentProvider>
      <Dialog>
        <DialogTrigger>
          <Button>Windmod</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogTitle>Windmod dialog</DialogTitle>
          <DialogBody>{BODY_TEXT}</DialogBody>
          <DialogActions>
            <DialogTrigger>
              <Button>Close</Button>
            </DialogTrigger>
            <Button appearance="primary">Confirm</Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </FluentProvider>
    <GriffelFluentProvider theme={webLightTheme}>
      <GriffelDialog>
        <GriffelDialogTrigger>
          <GriffelButton>Griffel</GriffelButton>
        </GriffelDialogTrigger>
        <GriffelDialogSurface>
          <GriffelDialogBody>
            {/* The headless title has no action slot, so the comparison removes Griffel's default
                close glyph rather than inventing an API the headless family lacks. */}
            <GriffelDialogTitle action={null}>Griffel dialog</GriffelDialogTitle>
            <GriffelDialogContent>{BODY_TEXT}</GriffelDialogContent>
            <GriffelDialogActions>
              <GriffelDialogTrigger>
                <GriffelButton>Close</GriffelButton>
              </GriffelDialogTrigger>
              <GriffelButton appearance="primary">Confirm</GriffelButton>
            </GriffelDialogActions>
          </GriffelDialogBody>
        </GriffelDialogSurface>
      </GriffelDialog>
    </GriffelFluentProvider>
  </div>
);
