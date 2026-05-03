import * as React from 'react';
import { Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import { popoverStyle, cardBase, intentAccent } from './ToastStoryShared';

export const DismissAll = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast, dismissAllToasts } = useToastController(toasterId);

  const notify = () =>
    dispatchToast(
      <div className={`${cardBase} ${intentAccent.info}`}>
        <ToastTitle className="text-sm font-semibold text-zinc-900">This is a toast</ToastTitle>
      </div>,
      { intent: 'info' },
    );

  return (
    <>
      <style>{popoverStyle}</style>
      <Toaster toasterId={toasterId} />
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100"
          onClick={notify}
        >
          Make toast
        </button>
        <button
          type="button"
          className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100"
          onClick={() => dismissAllToasts()}
        >
          Dismiss all toasts
        </button>
      </div>
    </>
  );
};

DismissAll.parameters = {
  docs: {
    description: {
      story: 'The `dismissAllToasts` imperative API dismisses all rendered toasts at once.',
    },
  },
};
