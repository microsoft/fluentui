// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import { Button } from '@fluentui/react-windmod-preview/button';
// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogHeader,
  DialogSurface,
  DialogTitle,
} from '@fluentui/react-windmod-preview/dialog';
// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import type { DialogVrBand } from './DialogVrScene';
import { DialogVrScene } from './DialogVrScene';

/** The windmod surface carries the grid itself, so the grid role needs no element of its own. */
const Grid = ({ children }: { children: React.ReactNode }) => <>{children}</>;

/** Four bands, one dialog per frame — see DialogVrScene for why a grid of cells is impossible. */
export const DialogVrWindmod = (band: DialogVrBand): React.ReactNode => (
  <FluentProvider>
    <DialogVrScene
      band={band}
      Dialog={Dialog as never}
      DialogSurface={DialogSurface as never}
      Grid={Grid}
      DialogTitle={DialogTitle as never}
      DialogHeader={DialogHeader as never}
      Scroller={DialogBody as never}
      DialogActions={DialogActions as never}
      Button={Button as never}
      titleProps={{}}
    />
  </FluentProvider>
);
