import * as React from 'react';
import { Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import { popoverStyle, cardBase, intentAccent } from './ToastStoryShared';

export const MultipleToasters = (): React.ReactNode => {
  const firstId = React.useId();
  const secondId = React.useId();
  const [toaster, setToaster] = React.useState<'first' | 'second'>('first');
  const { dispatchToast: dispatchFirst } = useToastController(firstId);
  const { dispatchToast: dispatchSecond } = useToastController(secondId);

  const notify = () => {
    if (toaster === 'first') {
      dispatchFirst(
        <div className={`${cardBase} ${intentAccent.info}`}>
          <ToastTitle className="text-sm font-semibold text-zinc-900">First toaster</ToastTitle>
        </div>,
        { intent: 'info' },
      );
    } else {
      dispatchSecond(
        <div className={`${cardBase} ${intentAccent.info}`}>
          <ToastTitle className="text-sm font-semibold text-zinc-900">Second toaster</ToastTitle>
        </div>,
        { intent: 'info' },
      );
    }
  };

  return (
    <>
      <style>{popoverStyle}</style>
      <Toaster toasterId={firstId} />
      <Toaster toasterId={secondId} />
      <div className="flex flex-col gap-3">
        <fieldset className="border border-zinc-200 rounded p-3 text-sm">
          <legend className="px-1 text-zinc-600">Choose toaster</legend>
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="toaster" checked={toaster === 'first'} onChange={() => setToaster('first')} />
              First toaster
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="toaster" checked={toaster === 'second'} onChange={() => setToaster('second')} />
              Second toaster
            </label>
          </div>
        </fieldset>
        <button
          type="button"
          className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100 w-fit"
          onClick={notify}
        >
          Make toast
        </button>
      </div>
    </>
  );
};

MultipleToasters.parameters = {
  docs: {
    description: {
      story: [
        '> ⚠️ This use case is **not recommended** for most applications.',
        '',
        'Pass a `toasterId` to each `Toaster` and to `useToastController` to support multiple',
        'independent Toasters on the same page.',
      ].join('\n'),
    },
  },
};
