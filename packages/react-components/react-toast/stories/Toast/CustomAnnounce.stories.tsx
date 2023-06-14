import * as React from 'react';
import { Toaster, useToastController, Toast, ToastTitle, ToasterProps, ToastPoliteness } from '@fluentui/react-toast';
import { useId, makeStyles, shorthands, Button, Field, RadioGroup, Radio } from '@fluentui/react-components';

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
  const [politeness, setPoliteness] = React.useState<ToastPoliteness>('polite');
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle intent="success">
          {politeness === 'polite' ? 'Polite' : 'Assertive'} toast {counter++}
        </ToastTitle>
      </Toast>,
      { politeness },
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
      <Field label="Toast politeness">
        <RadioGroup value={politeness} onChange={(e, data) => setPoliteness(data.value as ToastPoliteness)}>
          <Radio label="Polite" value="polite" />
          <Radio label="Assertive" value="assertive" />
        </RadioGroup>
      </Field>
      <br />
      <Toaster announce={announce} toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};

CustomAnnounce.parameters = {
  docs: {
    description: {
      story: [
        'The `Toaster` manages an [aria-live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)',
        "internally so that toasts are announced to screen readers on render. It's possible to opt-out of this default",
        'behaviour by providing a custom `announce` callback.',
      ].join('\n'),
    },
  },
};
