import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Toast, ToastBody, ToastTitle, Toaster, useToastController } from '@fluentui/react-windmod-preview/toast';
import type { ToastIntent } from '@fluentui/react-windmod-preview/toast';

const TOASTER_ID = 'toast-intents';
const intents: ToastIntent[] = ['info', 'success', 'warning', 'error'];

const Dispatcher = ({ appearance }: { appearance?: 'inverted' }): React.ReactNode => {
  const { dispatchToast } = useToastController(TOASTER_ID);

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {intents.map(intent => (
        <Button
          key={intent}
          onClick={() =>
            dispatchToast(
              <Toast appearance={appearance}>
                <ToastTitle action="Undo">{intent}</ToastTitle>
                <ToastBody subtitle="Subtitle">Each intent picks its own glyph and colour.</ToastBody>
              </Toast>,
              { intent },
            )
          }
        >
          {intent}
        </Button>
      ))}
    </div>
  );
};

/** The four intents, each on the normal surface and on the inverted one. */
export const Intents = (): React.ReactNode => (
  <FluentProvider>
    <Toaster toasterId={TOASTER_ID} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Dispatcher />
      <Dispatcher appearance="inverted" />
    </div>
  </FluentProvider>
);
