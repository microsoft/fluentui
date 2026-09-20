import * as React from 'react';
import { Button, Link, makeStyles, Text, useId } from '@fluentui/react-components';
import { Toaster, Toast, ToastTitle, useToastController } from '@fluentui/react-modern-components-preview/toast';

const useStyles = makeStyles({
  container: {
    border: '2px dashed green',

    height: '500px',
    width: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: '20px',
  },
});

export const Inline = (): React.ReactNode => {
  const styles = useStyles();
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle action={<Link>Undo</Link>}>Email sent</ToastTitle>
      </Toast>,
      { intent: 'success' },
    );

  return (
    <>
      <Button onClick={notify}>Make toast</Button>
      <div className={styles.container}>
        <Text weight="bold">The toaster is declared here</Text>

        <Toaster toasterId={toasterId} position="bottom" />
      </div>
    </>
  );
};

Inline.parameters = {
  docs: {
    description: {
      story: [
        'The modern `Toaster` always renders in the browser top layer using the native Popover API.',
        'It does not support the stable `inline` opt-out, even when declared inside a positioned ancestor.',
      ].join('\n'),
    },
  },
};
