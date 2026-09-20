import * as React from 'react';
import { Button, Link, useId } from '@fluentui/react-components';
import {
  Toaster,
  Toast,
  ToastBody,
  ToastFooter,
  ToastTitle,
  useToastController,
} from '@fluentui/react-modern-components-preview/toast';

export const InvertedAppearance = (): React.ReactNode => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast appearance="inverted">
        <ToastTitle action={<Link>Undo</Link>}>Email sent</ToastTitle>
        <ToastBody subtitle="Subtitle">This is a toast body</ToastBody>
        <ToastFooter>
          <Link>Action</Link>
          <Link>Action</Link>
        </ToastFooter>
      </Toast>,
      { intent: 'success' },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};
