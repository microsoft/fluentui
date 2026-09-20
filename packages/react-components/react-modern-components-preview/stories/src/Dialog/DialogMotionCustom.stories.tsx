import * as React from 'react';
import { Button, motionTokens } from '@fluentui/react-components';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-modern-components-preview/dialog';

export const MotionCustom = (): React.ReactNode => (
  <Dialog
    surfaceMotion={{
      animateOpacity: true,
      duration: 600,
      easing: motionTokens.curveDecelerateMid,
      outScale: 0.5,
    }}
  >
    <DialogTrigger>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogSurface>
      <DialogBody>
        <DialogTitle>Dialog with custom motion</DialogTitle>
        The surface uses custom scale, opacity, duration, and easing values.
        <DialogActions>
          <DialogTrigger>
            <Button appearance="secondary">Close</Button>
          </DialogTrigger>
        </DialogActions>
      </DialogBody>
    </DialogSurface>
  </Dialog>
);

MotionCustom.parameters = {
  docs: {
    description: {
      story: 'Pass Scale motion parameters directly to the Dialog `surfaceMotion` slot.',
    },
  },
};
