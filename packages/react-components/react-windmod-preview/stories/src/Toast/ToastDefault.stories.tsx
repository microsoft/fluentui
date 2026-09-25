import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import { Link } from '@fluentui/react-windmod-preview/link';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import {
  Toast,
  ToastBody,
  ToastFooter,
  ToastTitle,
  Toaster,
  useToastController,
} from '@fluentui/react-windmod-preview/toast';

const TOASTER_ID = 'toast-default';

const Dispatcher = (): React.ReactNode => {
  const { dispatchToast } = useToastController(TOASTER_ID);

  return (
    <Button
      onClick={() =>
        dispatchToast(
          <Toast>
            <ToastTitle action="Undo">Mail sent</ToastTitle>
            <ToastBody subtitle="Sent to 3 people">Your message is on its way.</ToastBody>
            <ToastFooter>
              <Link href="#">View</Link>
              <Link href="#">Settings</Link>
            </ToastFooter>
          </Toast>,
          { intent: 'success' },
        )
      }
    >
      Show toast
    </Button>
  );
};

/** The whole anatomy in one toast: the intent glyph, a title action, a subtitle and a footer. */
export const Default = (): React.ReactNode => (
  <FluentProvider>
    <Toaster toasterId={TOASTER_ID} />
    <Dispatcher />
  </FluentProvider>
);
