import * as React from 'react';
import {
  useId,
  Button,
  Field,
  SpinButton,
  RadioGroup,
  Radio,
  makeStyles,
  ToastPosition,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  playground: {
    display: 'grid',
    gridTemplateColumns: '25% 75%',
    columnGap: '20px',
    rowGap: '20px',
  },

  horizontal: {
    gridColumnEnd: 2,
  },

  vertical: {
    gridRowStart: 2,
    gridColumnEnd: 2,
  },

  positions: {
    gridRowStart: 1,
    gridRowEnd: 3,
    gridColumnStart: 2,
  },
});

export const Offset = () => {
  const styles = useStyles();
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const [horizontal, setHorizontal] = React.useState(20);
  const [vertical, setVertical] = React.useState(16);
  const [position, setPosition] = React.useState<ToastPosition>('bottom-end');

  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>
          Offset: {horizontal}, {vertical}
        </ToastTitle>
      </Toast>,
      { position, intent: 'info' },
    );

  return (
    <>
      <div className={styles.playground}>
        <Field label="Horizontal offset" className={styles.horizontal}>
          <SpinButton
            value={horizontal}
            onChange={(e, data) => {
              if (data.value) {
                setHorizontal(data.value);
              } else if (data.displayValue !== undefined) {
                const newValue = parseFloat(data.displayValue);
                if (!Number.isNaN(newValue)) {
                  setHorizontal(newValue);
                }
              }
            }}
          />
        </Field>
        <Field label="Vertical offset" className={styles.vertical}>
          <SpinButton
            value={vertical}
            onChange={(e, data) => {
              if (data.value) {
                setVertical(data.value);
              } else if (data.displayValue !== undefined) {
                const newValue = parseFloat(data.displayValue);
                if (!Number.isNaN(newValue)) {
                  setVertical(newValue);
                }
              }
            }}
          />
        </Field>
        <Field label="Toast position" className={styles.positions}>
          <RadioGroup value={position} onChange={(e, data) => setPosition(data.value as ToastPosition)}>
            <Radio label="bottom" value="bottom" />
            <Radio label="bottom-start" value="bottom-start" />
            <Radio label="bottom-end" value="bottom-end" />
            <Radio label="top" value="top" />
            <Radio label="top-start" value="top-start" />
            <Radio label="top-end" value="top-end" />
          </RadioGroup>
        </Field>
      </div>
      <br />
      <Button onClick={() => notify()}>Make toast</Button>
      <Toaster toasterId={toasterId} offset={{ horizontal, vertical }} />
    </>
  );
};

Offset.parameters = {
  docs: {
    description: {
      story: [
        'You can declare a static offset for toasts relative to the viewport. This offset can only be set on the',
        "`Toaster` component, because it wouldn't make sense to have separate toast offsets for a toasts in a",
        'single position.',
      ].join('\n'),
    },
  },
};
