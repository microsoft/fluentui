import * as React from 'react';
import { Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import { popoverStyle, cardBase, intentAccent } from './ToastStoryShared';

export const PauseAndPlay = (): React.ReactNode => {
  const toasterId = React.useId();
  const toastId = `pause-play-${toasterId}`;
  const [unmounted, setUnmounted] = React.useState(true);
  const [paused, setPaused] = React.useState(false);
  const { pauseToast, playToast, dispatchToast } = useToastController(toasterId);

  const notify = () => {
    dispatchToast(
      <div className={`${cardBase} ${intentAccent.success}`}>
        <ToastTitle className="text-sm font-semibold text-zinc-900">This is a toast</ToastTitle>
      </div>,
      {
        toastId,
        intent: 'success',
        onStatusChange: (_, { status }) => {
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
      <style>{popoverStyle}</style>
      <Toaster toasterId={toasterId} />
      <div className="flex gap-2">
        <button
          type="button"
          disabled={!unmounted}
          className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100 disabled:opacity-50"
          onClick={notify}
        >
          Make toast
        </button>
        <button
          type="button"
          disabled={unmounted}
          className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100 disabled:opacity-50"
          onClick={toggle}
        >
          {paused ? '▶ Play' : '⏸ Pause'} toast
        </button>
      </div>
    </>
  );
};

PauseAndPlay.parameters = {
  docs: {
    description: {
      story: [
        'Use `pauseToast` and `playToast` from `useToastController` to imperatively pause and',
        'resume the dismiss timer. Both require the `toastId` used when dispatching.',
      ].join('\n'),
    },
  },
};
