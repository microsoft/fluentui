import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Button,
  Toaster,
  useToastController,
  ToastTitle,
  ToastTrigger,
  Toast,
  ToastLink,
} from '@fluentui/react-components';

export const DismissToastWithAction = (): JSXElement => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle
          action={
            <ToastTrigger>
              <ToastLink>Dismiss</ToastLink>
            </ToastTrigger>
          }
        >
          Dismiss me
        </ToastTitle>
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

DismissToastWithAction.parameters = {
  docs: {
    description: {
      story: [
        "By wrapping a button or link with a  `ToastTrigger`, it's possible to make that actionable",
        'element dismiss the toast with a click.',
      ].join('\n'),
    },
  },
};
