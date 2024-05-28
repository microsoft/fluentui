import * as React from 'react';
import {
  useId,
  Link,
  Button,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  Text,
  makeStyles,
} from '@fluentui/react-components';

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

export const Inline = () => {
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
        <Text weight="bold">Toasts appear here</Text>

        <Toaster inline toasterId={toasterId} position="bottom" />
      </div>
    </>
  );
};

Inline.parameters = {
  docs: {
    description: {
      story: [
        'Setting the `inline` prop on a toaster will render toasts in DOM order, positioned relative to the closest',
        'positioned ancestor. The simplest way to achieve this is to render the toaster inside an element',
        'with `position: relative`.',
      ].join('\n'),
    },
  },
};
