// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  FluentProvider,
  webLightTheme,
} from '@fluentui/react-components';

import type { DialogVrBand } from './DialogVrScene';
import { DialogVrScene } from './DialogVrScene';

/**
 * Griffel's DialogBody IS the grid and DialogContent is the scroller; it has no header member, so
 * the header role is left unfilled and the title renders bare. `action: null` removes the default
 * close glyph its non-modal DialogTitle would otherwise render, which the headless title has no
 * slot for — and it puts Griffel's title on the same `grid-column-end: 4` windmod authors
 * unconditionally.
 */
const titleProps = { action: null } as const;

export const DialogVrGriffel = (band: DialogVrBand): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <DialogVrScene
      band={band}
      Dialog={Dialog as never}
      DialogSurface={DialogSurface as never}
      Grid={DialogBody as never}
      DialogTitle={DialogTitle as never}
      Scroller={DialogContent as never}
      DialogActions={DialogActions as never}
      Button={Button as never}
      titleProps={titleProps}
    />
  </FluentProvider>
);
