import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogActions,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-headless-components-preview/dialog';

/**
 * Use `DialogTrigger` with `action="close"` to wire up a close button anywhere
 * inside the dialog — including the "X in the top-right corner" UX pattern.
 * It defaults to `type="button"` and calls `onOpenChange` when clicked.
 */
export const WithCloseButton = (): React.ReactNode => (
  <Dialog>
    <DialogTrigger>
      <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
        Open dialog
      </button>
    </DialogTrigger>

    <DialogSurface className="fixed inset-0 m-auto w-full max-w-[480px] rounded-lg border border-zinc-200 bg-white p-0 shadow-lg">
      <DialogBody className="px-4 py-3 text-sm text-zinc-700">
        <DialogTitle className="mb-3 mt-0 text-lg font-semibold text-zinc-900">Settings</DialogTitle>
        <p className="mt-0 mb-3">Update your preferences below.</p>
        <div className="flex flex-col gap-3">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" className="h-4 w-4 accent-zinc-900" defaultChecked />
            Email notifications
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" className="h-4 w-4 accent-zinc-900" />
            SMS notifications
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" className="h-4 w-4 accent-zinc-900" defaultChecked />
            Weekly digest
          </label>
        </div>
      </DialogBody>

      <DialogActions className="flex justify-end gap-2 px-4 pb-4">
        <DialogTrigger action="close">
          <button
            type="button"
            aria-label="Close"
            className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100"
          >
            Close
          </button>
        </DialogTrigger>
        <DialogTrigger action="close">
          <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
            Cancel
          </button>
        </DialogTrigger>
        <button
          type="button"
          className="rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800"
          onClick={() => alert('Settings saved!')}
        >
          Save
        </button>
      </DialogActions>
    </DialogSurface>
  </Dialog>
);
