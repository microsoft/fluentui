import * as React from 'react';
import {
  Toaster,
  ToastTitle,
  ToastBody,
  ToastFooter,
  useToastController,
} from '@fluentui/react-headless-components-preview/toast';
import { popoverStyle, cardBase, intentAccent } from './ToastStoryShared';

export const Default = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast } = useToastController(toasterId);

  const notify = () =>
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
      { intent: 'success' },
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
