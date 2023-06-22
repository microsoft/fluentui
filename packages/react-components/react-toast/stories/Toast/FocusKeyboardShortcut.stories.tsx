import * as React from 'react';
import { Toaster, useToastController, Toast, ToastTitle, ToastBody, ToastFooter } from '@fluentui/react-toast';
import { useId, Link, Button } from '@fluentui/react-components';

export const FocusKeyboardShortcut = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
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
      <Toaster isFocusShortcut={e => e.ctrlKey && e.key === 'Enter'} toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};

FocusKeyboardShortcut.parameters = {
  docs: {
    description: {
      story: [
        'By default `CTRL+M` will move focus to the most recent toast.',
        'This can be cusomized using the `isFocusShortcut` prop on the `Toaster`. This example',
        'customizes the shortcut to be `CTRL+Enter`',
      ].join('\n'),
    },
  },
};
