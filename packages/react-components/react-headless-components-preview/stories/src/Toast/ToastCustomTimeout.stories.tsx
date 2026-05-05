import * as React from 'react';
import {
  Toaster,
  ToastTitle,
  useToastController,
  useToastContext,
} from '@fluentui/react-headless-components-preview/toast';
import { popoverStyle, cardBase, intentAccent } from './ToastStoryShared';

const DismissButton = ({ children }: { children: React.ReactNode }) => {
  const { requestOpenChange } = useToastContext();
  return (
    <button
      type="button"
      className="text-xs text-blue-600 hover:underline bg-transparent border-0 p-0 cursor-pointer"
      onClick={e => requestOpenChange({ type: 'dismissClick', open: false, event: e })}
    >
      {children}
    </button>
  );
};

export const CustomTimeout = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast } = useToastController(toasterId);
  const [timeout, setDismissTimeout] = React.useState(1000);

  const notify = () =>
    dispatchToast(
      <div className={`${cardBase} ${intentAccent.info}`}>
        <ToastTitle
          className="flex items-center justify-between gap-2 text-sm font-semibold text-zinc-900"
          action={<DismissButton>Dismiss</DismissButton>}
        >
          {timeout >= 0 ? `Custom timeout ${timeout} ms` : 'Dismiss manually'}
        </ToastTitle>
      </div>,
      { timeout, intent: 'info' },
    );

  return (
    <>
      <style>{popoverStyle}</style>
      <Toaster toasterId={toasterId} />
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm text-zinc-700">
          Timeout (ms)
          <input
            type="number"
            value={timeout}
            onChange={e => setDismissTimeout(Number(e.target.value))}
            className="w-32 rounded border border-zinc-300 px-2 py-1 text-sm"
          />
          <span className="text-xs text-zinc-400">Use a negative value to prevent auto-dismiss.</span>
        </label>
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

CustomTimeout.parameters = {
  docs: {
    description: {
      story: [
        'Pass `timeout` (ms) to `dispatchToast` to control how long a toast stays visible.',
        'A negative value disables auto-dismiss — the user must close the toast manually.',
      ].join('\n'),
    },
  },
};
