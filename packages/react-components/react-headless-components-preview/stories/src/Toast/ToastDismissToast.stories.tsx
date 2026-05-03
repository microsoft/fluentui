import * as React from 'react';
import { Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import { popoverStyle, cardBase, intentAccent } from './ToastStoryShared';

export const DismissToast = (): React.ReactNode => {
  const toasterId = React.useId();
  const toastId = `dismiss-example-${toasterId}`;
  const [unmounted, setUnmounted] = React.useState(true);
  const { dispatchToast, dismissToast } = useToastController(toasterId);

  const notify = () => {
    dispatchToast(
      <div className={`${cardBase} ${intentAccent.success}`}>
        <ToastTitle className="text-sm font-semibold text-zinc-900">This is a toast</ToastTitle>
      </div>,
      {
        toastId,
        intent: 'success',
        onStatusChange: (_, { status }) => setUnmounted(status === 'unmounted'),
      },
    );
    setUnmounted(false);
  };

  return (
    <>
      <style>{popoverStyle}</style>
      <Toaster toasterId={toasterId} />
      <button
        type="button"
        className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100"
        onClick={unmounted ? notify : () => dismissToast(toastId)}
      >
        {unmounted ? 'Make' : 'Dismiss'} toast
      </button>
    </>
  );
};

DismissToast.parameters = {
  docs: {
    description: {
      story: [
        'Toasts can be dismissed imperatively with `dismissToast`. Provide a `toastId` when dispatching',
        'so you can reference the same toast later. Use `onStatusChange` to track when the toast is',
        'fully removed (`status === "unmounted"`).',
      ].join('\n'),
    },
  },
};
