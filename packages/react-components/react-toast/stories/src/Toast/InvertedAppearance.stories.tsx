import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Button,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  ToastFooter,
  ToastLink,
} from '@fluentui/react-components';

export const InvertedAppearance = (): JSXElement => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast appearance="inverted">
        <ToastTitle action={<ToastLink>Undo</ToastLink>}>Email sent</ToastTitle>
        <ToastBody subtitle="Subtitle">This is a toast body</ToastBody>
        <ToastFooter>
          <ToastLink>Action</ToastLink>
          <ToastLink>Action</ToastLink>
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
