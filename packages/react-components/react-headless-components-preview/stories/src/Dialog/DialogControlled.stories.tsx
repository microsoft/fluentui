import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  type DialogOpenChangeData,
} from '@fluentui/react-headless-components-preview';

/**
 * In controlled mode the parent component owns the open state.
 * Pass `open` and `onOpenChange` together — `onOpenChange` fires for every
 * dismiss gesture (Escape, backdrop click, trigger click) so the parent can
 * decide whether to actually close.
 *
 * This example blocks closing until the user ticks a checkbox,
 * demonstrating how to veto a close by calling `event.preventDefault()`.
 */
export const Controlled = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);

  const handleOpenChange = (_event: DialogOpenChangeData['event'], data: DialogOpenChangeData) => {
    // Allow opening unconditionally
    if (data.open) {
      setOpen(true);
      return;
    }
    // Block closing unless the checkbox is ticked
    if (!confirmed && data.type !== 'triggerClick') {
      // The user tried to close via Escape or backdrop — prevent it
      _event.preventDefault();
      return;
    }
    setOpen(false);
    setConfirmed(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
          Open controlled dialog
        </button>
      </DialogTrigger>

      <DialogSurface className="w-full max-w-[480px] rounded-lg border border-zinc-200 bg-white p-0 shadow-lg">
        <DialogHeader className="flex items-center justify-between px-4 pt-4">
          <DialogTitle className="m-0 text-lg font-semibold text-zinc-900">Terms of service</DialogTitle>
        </DialogHeader>

        <DialogBody className="px-4 py-3 text-sm text-zinc-700">
          <p className="mt-0 mb-3">
            By using this service you agree to our terms. You must acknowledge them before closing.
          </p>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer accent-zinc-900"
              checked={confirmed}
              onChange={e => setConfirmed(e.target.checked)}
            />
            I have read and accept the terms of service
          </label>
          {!confirmed && (
            <p className="mt-2 mb-0 text-xs text-zinc-500">
              You must tick the checkbox before closing (Escape and backdrop click are blocked).
            </p>
          )}
        </DialogBody>

        <DialogFooter className="flex justify-end gap-2 px-4 pb-4">
          <DialogTrigger action="close">
            <button
              type="button"
              disabled={!confirmed}
              className="rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Accept &amp; close
            </button>
          </DialogTrigger>
        </DialogFooter>
      </DialogSurface>
    </Dialog>
  );
};
