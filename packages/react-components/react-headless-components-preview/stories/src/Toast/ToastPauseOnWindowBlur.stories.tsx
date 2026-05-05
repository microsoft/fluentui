import * as React from 'react';
import { Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import { popoverStyle, cardBase, intentAccent } from './ToastStoryShared';

export const PauseOnWindowBlur = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast } = useToastController(toasterId);

  const notify = () =>
    dispatchToast(
      <div className={`${cardBase} ${intentAccent.info}`}>
        <ToastTitle className="text-sm font-semibold text-zinc-900">Click on another window!</ToastTitle>
      </div>,
      { pauseOnWindowBlur: true, intent: 'info' },
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

PauseOnWindowBlur.parameters = {
  docs: {
    description: {
      story: [
        'Pass `pauseOnWindowBlur: true` to `dispatchToast` to pause the dismiss timer when',
        'the user switches to another window. The timer resumes when the window regains focus.',
      ].join('\n'),
    },
  },
};
