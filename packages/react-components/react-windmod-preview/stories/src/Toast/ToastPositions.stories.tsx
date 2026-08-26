import * as React from 'react';
import {
  Button,
  FluentProvider,
  Toast,
  ToastBody,
  Toaster,
  ToastTitle,
  useToastController,
} from '@fluentui/react-windmod-preview';
import type { ToastPosition } from '@fluentui/react-windmod-preview';

const TOASTER_ID = 'toast-positions';
const positions: ToastPosition[] = ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'];

const Dispatcher = (): React.ReactNode => {
  const { dispatchToast } = useToastController(TOASTER_ID);

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {positions.map(position => (
        <Button
          key={position}
          onClick={() =>
            dispatchToast(
              <Toast>
                <ToastTitle>{position}</ToastTitle>
                <ToastBody>Each position is its own top-layer container.</ToastBody>
              </Toast>,
              { position, intent: 'info' },
            )
          }
        >
          {position}
        </Button>
      ))}
    </div>
  );
};

/**
 * The six positions. Each is a separate manual popover, so all six can be open at once, and the
 * Toaster's `offset` shifts them all.
 */
export const Positions = (): React.ReactNode => (
  <FluentProvider>
    <Toaster toasterId={TOASTER_ID} offset={{ horizontal: 40, vertical: 60 }} />
    <Dispatcher />
  </FluentProvider>
);
