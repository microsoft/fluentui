import * as React from 'react';
import { Toaster, useToastController, ToastLayout, ToastTitle, ToasterProps } from '@fluentui/react-toast';
import { useId, Link, makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  visuallyHidden: {
    clip: 'rect(0px, 0px, 0px, 0px)',
    height: '1px',
    ...shorthands.margin('-1px'),
    ...shorthands.overflow('hidden'),
    ...shorthands.padding('0px'),
    width: '1px',
    position: 'absolute',
  },
});

let counter = 0;

export const CustomAnnounce = () => {
  const styles = useStyles();
  const [alert, setAlert] = React.useState('');
  const [status, setStatus] = React.useState('');
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const dispatchAlert = () =>
    dispatchToast(
      <ToastLayout>
        <ToastTitle intent="success" action={<Link>Undo</Link>}>
          Assertive toast {counter++}
        </ToastTitle>
      </ToastLayout>,
      { politeness: 'assertive' },
    );

  const dispatchStatus = () =>
    dispatchToast(
      <ToastLayout>
        <ToastTitle intent="success" action={<Link>Undo</Link>}>
          Polite toast {counter++}
        </ToastTitle>
      </ToastLayout>,
      { politeness: 'polite' },
    );

  const announce: ToasterProps['announce'] = (msg, options) => {
    options.politeness === 'assertive' ? setAlert(msg) : setStatus(msg);
  };

  return (
    <>
      <div role="status" className={styles.visuallyHidden}>
        {status}
      </div>
      <div role="alert" className={styles.visuallyHidden}>
        {alert}
      </div>
      <Toaster announce={announce} toasterId={toasterId} />
      <button onClick={dispatchAlert}>Dispatch assertive</button>
      <button onClick={dispatchStatus}>Dispatch polite</button>
    </>
  );
};
