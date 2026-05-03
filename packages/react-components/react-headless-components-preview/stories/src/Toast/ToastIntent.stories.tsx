import * as React from 'react';
import { Toaster, ToastTitle, Toast, useToastController } from '@fluentui/react-headless-components-preview/toast';
import type { ToastIntent } from '@fluentui/react-headless-components-preview/toast';
import { popoverStyle, cardBase, intentAccent } from './ToastStoryShared';

const intentIcon: Record<string, string> = {
  success: '✓',
  info: 'i',
  warning: '⚠',
  error: '✕',
};

export const Intent = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast } = useToastController(toasterId);
  const [intent, setIntent] = React.useState<ToastIntent>('success');

  const notify = () =>
    dispatchToast(
      <div className={`${cardBase} ${intentAccent[intent] ?? ''}`}>
        <ToastTitle
          className="flex items-center gap-2 text-sm font-semibold text-zinc-900"
          media={
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white
                ${intent === 'success' ? 'bg-green-500' : ''}
                ${intent === 'info' ? 'bg-blue-500' : ''}
                ${intent === 'warning' ? 'bg-yellow-500' : ''}
                ${intent === 'error' ? 'bg-red-500' : ''}
              `}
            >
              {intentIcon[intent]}
            </span>
          }
        >
          Toast intent: {intent}
        </ToastTitle>
      </div>,
      { intent },
    );

  return (
    <>
      <style>{popoverStyle}</style>
      <Toaster toasterId={toasterId} />
      <div className="flex flex-col gap-3">
        <fieldset className="border border-zinc-200 rounded p-3 text-sm">
          <legend className="px-1 text-zinc-600">Intent</legend>
          <div className="flex flex-col gap-1">
            {(['success', 'info', 'warning', 'error'] as ToastIntent[]).map(i => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="intent" value={i} checked={intent === i} onChange={() => setIntent(i)} />
                {i}
              </label>
            ))}
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

Intent.parameters = {
  docs: {
    description: {
      story: [
        'The four standard intents — `success`, `info`, `warning`, `error` — are passed as a',
        '`dispatchToast` option. The `intent` value is forwarded to `ToastContext` so that',
        '`ToastTitle` can conditionally render the `media` slot. Fill that slot with any icon',
        'component you like; here we use a plain coloured `<span>`.',
      ].join('\n'),
    },
  },
};
