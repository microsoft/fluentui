import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogActions,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-headless-components-preview';

/**
 * An alert dialog uses `modalType="alert"`, which sets `role="alertdialog"` on the surface.
 * It is intended for critical messages that require the user to make a decision before proceeding.
 *
 * Unlike a regular modal:
 * - Clicking the backdrop does NOT dismiss the alert dialog (only action buttons can).
 * - Screen readers announce it as an alert, giving it higher urgency.
 *
 * The user must explicitly choose "Delete" or "Cancel" — there is no escape hatch.
 */
export const Alert = (): React.ReactNode => {
  return (
    <Dialog modalType="alert">
      <DialogTrigger>
        <button
          type="button"
          className="rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800"
        >
          Delete item
        </button>
      </DialogTrigger>

      <DialogSurface className="fixed inset-0 m-auto w-full max-w-[400px] rounded-lg border border-zinc-200 bg-white p-0 shadow-lg">
        <DialogBody className="px-4 py-3 text-sm text-zinc-700">
          <DialogTitle className="mb-3 mt-0 text-lg font-semibold text-zinc-900">Delete item?</DialogTitle>
          <p className="m-0">This action is permanent and cannot be undone. The item will be deleted immediately.</p>
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
              Delete
            </button>
          </DialogTrigger>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};
