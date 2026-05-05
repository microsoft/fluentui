import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogActions,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-headless-components-preview/dialog';

export const Default = (): React.ReactNode => (
  <Dialog>
    <DialogTrigger>
      <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
        Open dialog
      </button>
    </DialogTrigger>

    <DialogSurface className="fixed inset-0 m-auto w-full max-w-[480px] rounded-lg border border-zinc-200 bg-white p-0 shadow-lg backdrop:bg-black/50">
      <DialogBody className="p-4 text-sm text-zinc-700">
        <DialogTitle className="mb-3 mt-0 text-lg font-semibold text-zinc-900">Confirm action</DialogTitle>
        <p className="m-0">Are you sure you want to proceed? This action cannot be undone.</p>
      </DialogBody>

      <DialogActions className="flex justify-end gap-2 px-4 pb-4">
        <DialogTrigger action="close">
          <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
            Cancel
          </button>
        </DialogTrigger>
        <DialogTrigger action="close">
          <button
            type="button"
            className="rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800"
          >
            Confirm
          </button>
        </DialogTrigger>
      </DialogActions>
    </DialogSurface>
  </Dialog>
);
