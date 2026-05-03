import * as React from 'react';
import { Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import { popoverStyle, cardBase, intentAccent } from './ToastStoryShared';

export const PauseOnHover = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast } = useToastController(toasterId);

  const notify = () =>
    dispatchToast(
      <div className={`${cardBase} ${intentAccent.info}`}>
        <ToastTitle className="text-sm font-semibold text-zinc-900">Hover me!</ToastTitle>
      </div>,
      { pauseOnHover: true, intent: 'info' },
    );

  return (
    <>
      <style>{popoverStyle}</style>
      <Toaster toasterId={toasterId} />
      <button
        type="button"
        className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100"
        onClick={notify}
      >
        Make toast
      </button>
    </>
  );
};

PauseOnHover.parameters = {
  docs: {
    description: {
      story: [
        'Pass `pauseOnHover: true` to `dispatchToast` to pause the dismiss timer while the',
        'mouse cursor is inside the toast. The timer resumes when the cursor leaves.',
      ].join('\n'),
    },
  },
};
