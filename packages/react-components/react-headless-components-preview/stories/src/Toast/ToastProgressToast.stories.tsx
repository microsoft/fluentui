import * as React from 'react';
import {
  Toaster,
  ToastTitle,
  ToastBody,
  ToastFooter,
  useToastController,
  useToastContext,
} from '@fluentui/react-headless-components-preview/toast';
import { popoverStyle, cardBase, intentAccent } from './ToastStoryShared';

const intervalDelay = 100;
const intervalIncrement = 5;

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

const DownloadProgressBar: React.FC<{ onDownloadEnd: () => void }> = ({ onDownloadEnd }) => {
  const [value, setValue] = React.useState(100);

  React.useEffect(() => {
    if (value > 0) {
      const id = setTimeout(() => setValue(v => Math.max(v - intervalIncrement, 0)), intervalDelay);
      return () => clearTimeout(id);
    }
    if (value === 0) {
      onDownloadEnd();
    }
  }, [value, onDownloadEnd]);

  return <progress value={value} max={100} className="mt-2 w-full" />;
};

export const ProgressToast = (): React.ReactNode => {
  const toasterId = React.useId();
  const toastId = `progress-${toasterId}`;
  const [unmounted, setUnmounted] = React.useState(true);
  const { dispatchToast, dismissToast } = useToastController(toasterId);

  const dismiss = React.useCallback(() => dismissToast(toastId), [dismissToast, toastId]);

  const notify = () =>
    dispatchToast(
      <div className={`${cardBase} ${intentAccent.success}`}>
        <ToastTitle
          className="flex items-center justify-between gap-2 text-sm font-semibold text-zinc-900"
          action={<DismissButton>Dismiss</DismissButton>}
        >
          Downloading file
        </ToastTitle>
        <ToastBody className="mt-1">
          <p className="text-sm text-zinc-600 mb-1">This may take a while</p>
          <DownloadProgressBar onDownloadEnd={dismiss} />
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
        intent: 'success',
        timeout: -1,
        toastId,
        onStatusChange: (_, { status }) => setUnmounted(status === 'unmounted'),
      },
    );

  return (
    <>
      <style>{popoverStyle}</style>
      <Toaster toasterId={toasterId} />
      <button
        type="button"
        disabled={!unmounted}
        className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100 disabled:opacity-50"
        onClick={notify}
      >
        Make toast
      </button>
    </>
  );
};

ProgressToast.parameters = {
  docs: {
    description: {
      story: [
        'Toasts can host arbitrary content — here a CSS progress bar is rendered inside a toast.',
        'The toast uses `timeout: -1` so it never auto-dismisses; the progress bar calls',
        '`dismissToast` imperatively once it completes.',
      ].join('\n'),
    },
  },
};
