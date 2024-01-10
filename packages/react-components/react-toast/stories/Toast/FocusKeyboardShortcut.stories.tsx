import * as React from 'react';
import {
  useId,
  Link,
  Button,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  ToastFooter,
  ToastTrigger,
} from '@fluentui/react-components';

export const FocusKeyboardShortcut = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle
          action={
            <ToastTrigger>
              <Link>Dismiss</Link>
            </ToastTrigger>
          }
        >
          Email sent
        </ToastTitle>
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
      <Toaster limit={3} shortcuts={{ focus: e => e.ctrlKey && e.key === 'm' }} toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};

FocusKeyboardShortcut.parameters = {
  docs: {
    description: {
      story: [
        'Developers can be define a shortcut to focus on the most recent visible toast . This example',
        'configures the shortcut to be `CTRL+M`. Once a toast is focused, all toasts belonging to that toaster',
        'are paused and will not timeout.',
      ].join('\n'),
    },
  },
};
