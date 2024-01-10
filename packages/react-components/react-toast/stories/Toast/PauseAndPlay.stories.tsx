import * as React from 'react';
import { PlayFilled, PauseFilled } from '@fluentui/react-icons';
import {
  useId,
  Button,
  ToggleButton,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
} from '@fluentui/react-components';

export const PauseAndPlay = () => {
  const toasterId = useId('toaster');
  const toastId = useId('example');
  const [unmounted, setUnmounted] = React.useState(true);
  const [paused, setPaused] = React.useState(false);
  const { pauseToast, playToast, dispatchToast } = useToastController(toasterId);

  const notify = () => {
    dispatchToast(
      <Toast>
        <ToastTitle>This is a toast</ToastTitle>
      </Toast>,
      {
        toastId,
        intent: 'success',
        onStatusChange: (e, { status }) => {
          setUnmounted(status === 'unmounted');
          setPaused(false);
        },
      },
    );
    setUnmounted(false);
  };

  const toggle = () => {
    if (paused) {
      playToast(toastId);
      setPaused(false);
    } else {
      pauseToast(toastId);
      setPaused(true);
    }
  };

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button disabledFocusable={!unmounted} onClick={notify}>
        Make toast
      </Button>
      <ToggleButton
        icon={paused ? <PlayFilled /> : <PauseFilled />}
        disabledFocusable={unmounted}
        onClick={toggle}
        checked={paused}
      >
        {paused ? 'Play' : 'Pause'} toast
      </ToggleButton>
    </>
  );
};

PauseAndPlay.parameters = {
  docs: {
    description: {
      story: [
        'Toasts can be paused and played imperatively based on the user provided id.',
        '',
        '> ⚠️ Toasts paused this way can only be dismissed once the **app** plays it again. Make sure',
        'that your app will will play a toast after it has been paused.',
      ].join('\n'),
    },
  },
};
