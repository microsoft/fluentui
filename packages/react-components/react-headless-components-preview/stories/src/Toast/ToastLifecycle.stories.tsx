import * as React from 'react';
import {
  Toaster,
  ToastTitle,
  ToastBody,
  ToastFooter,
  useToastController,
} from '@fluentui/react-headless-components-preview/toast';
import type { ToastStatus } from '@fluentui/react-headless-components-preview/toast';
import { popoverStyle, cardBase, intentAccent } from './ToastStoryShared';

export const ToastLifecycle = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast } = useToastController(toasterId);
  const [statusLog, setStatusLog] = React.useState<[number, ToastStatus][]>([]);
  const [dismissed, setDismissed] = React.useState(true);

  const notify = () => {
    dispatchToast(
      <div className={`${cardBase} ${intentAccent.success}`}>
        <ToastTitle
          className="flex items-center justify-between gap-2 text-sm font-semibold text-zinc-900"
          action={
            <button
              type="button"
              className="text-xs text-blue-600 hover:underline bg-transparent border-0 p-0 cursor-pointer"
            >
              Undo
            </button>
          }
        >
          Email sent
        </ToastTitle>
        <ToastBody
          subtitle={<span className="text-xs text-zinc-400">Subtitle</span>}
          className="text-sm text-zinc-600 mt-1"
        >
          This is a toast body
        </ToastBody>
        <ToastFooter className="flex gap-3 mt-3">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline bg-transparent border-0 p-0 cursor-pointer"
          >
            Action
          </button>
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline bg-transparent border-0 p-0 cursor-pointer"
          >
            Action
          </button>
        </ToastFooter>
      </div>,
      {
        timeout: 1000,
        intent: 'success',
        onStatusChange: (_, { status: toastStatus }) => {
          setDismissed(toastStatus === 'unmounted');
          setStatusLog(prev => [[Date.now(), toastStatus], ...prev]);
        },
      },
    );
  };

  return (
    <>
      <style>{popoverStyle}</style>
      <Toaster toasterId={toasterId} />
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            disabled={!dismissed}
            className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100 disabled:opacity-50"
            onClick={notify}
          >
            Make toast
          </button>
          <button
            type="button"
            className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100"
            onClick={() => setStatusLog([])}
          >
            Clear log
          </button>
        </div>
        <div className="flex flex-col gap-1 min-w-[200px]">
          <div className="bg-zinc-900 text-white text-xs font-bold px-3 py-1 w-fit">Status log</div>
          <div
            role="log"
            aria-label="Toast status log"
            className="overflow-y-auto border-2 border-zinc-900 p-3 h-[200px] text-xs font-mono"
          >
            {statusLog.map(([time, status], i) => {
              const date = new Date(time);
              return (
                <div key={i}>
                  {date.toLocaleTimeString()} <strong>{status}</strong>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

ToastLifecycle.parameters = {
  docs: {
    description: {
      story: [
        'The `onStatusChange` callback reports each lifecycle transition of a toast.',
        'Possible statuses: `queued`, `visible`, `hidden`, `unmounted`.',
      ].join('\n'),
    },
  },
};
