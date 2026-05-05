import * as React from 'react';
import { Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import { popoverStyle, cardBase, intentAccent } from './ToastStoryShared';

export const UpdateToast = (): React.ReactNode => {
  const toasterId = React.useId();
  const toastId = `update-example-${toasterId}`;
  const [unmounted, setUnmounted] = React.useState(true);
  const { dispatchToast, updateToast } = useToastController(toasterId);

  const notify = () => {
    dispatchToast(
      <div className={`${cardBase} ${intentAccent.warning}`}>
        <ToastTitle className="text-sm font-semibold text-zinc-900">This toast never closes</ToastTitle>
      </div>,
      {
        toastId,
        intent: 'warning',
        timeout: -1,
        onStatusChange: (_, { status }) => setUnmounted(status === 'unmounted'),
      },
    );
    setUnmounted(false);
  };

  const update = () =>
    updateToast({
      content: (
        <div className={`${cardBase} ${intentAccent.success}`}>
          <ToastTitle className="text-sm font-semibold text-zinc-900">This toast will close soon</ToastTitle>
        </div>
      ),
      intent: 'success',
      toastId,
      timeout: 2000,
    });

  return (
    <>
      <style>{popoverStyle}</style>
      <Toaster toasterId={toasterId} />
      <button
        type="button"
        className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100"
        onClick={unmounted ? notify : update}
      >
        {unmounted ? 'Make toast' : 'Update toast'}
      </button>
    </>
  );
};

UpdateToast.parameters = {
  docs: {
    description: {
      story: [
        'Use the `updateToast` imperative API to change a visible toast. You **must** provide a',
        '`toastId` when dispatching. Almost all options — content, intent, timeout — can be updated.',
      ].join('\n'),
    },
  },
};
