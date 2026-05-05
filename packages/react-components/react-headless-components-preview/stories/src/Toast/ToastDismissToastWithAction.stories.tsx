import * as React from 'react';
import {
  Toaster,
  ToastTitle,
  useToastController,
  useToastContext,
} from '@fluentui/react-headless-components-preview/toast';
import { popoverStyle, cardBase, intentAccent } from './ToastStoryShared';

/**
 * A dismiss button that reads `requestOpenChange` from `ToastContext`.
 * This is the headless equivalent of the styled layer's `ToastTrigger`.
 */
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

export const DismissToastWithAction = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast } = useToastController(toasterId);

  const notify = () =>
    dispatchToast(
      <div className={`${cardBase} ${intentAccent.success}`}>
        <ToastTitle
          className="flex items-center justify-between gap-2 text-sm font-semibold text-zinc-900"
          action={<DismissButton>Dismiss</DismissButton>}
        >
          Dismiss me
        </ToastTitle>
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

DismissToastWithAction.parameters = {
  docs: {
    description: {
      story: [
        'Use `useToastContext()` to access `requestOpenChange` inside the dispatched content.',
        'Calling it with `{ open: false }` closes the toast — this is the headless equivalent of',
        "the styled layer's `ToastTrigger` component.",
      ].join('\n'),
    },
  },
};
