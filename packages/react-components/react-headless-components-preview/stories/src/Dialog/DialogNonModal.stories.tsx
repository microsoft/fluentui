import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-headless-components-preview';

/**
 * A non-modal dialog does not dim the background and does not trap focus.
 * Users can still interact with the rest of the page while it is open.
 * There is no backdrop — only the dialog surface itself is rendered.
 */
export const NonModal = (): React.ReactNode => (
  <div className="flex gap-4 items-start">
    <Dialog modalType="non-modal">
      <DialogTrigger>
        <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
          Open non-modal dialog
        </button>
      </DialogTrigger>

      <DialogSurface className="fixed inset-0 m-auto w-72 rounded-lg border border-zinc-200 bg-white p-0 shadow-lg">
        <DialogHeader className="flex items-center justify-between px-4 pt-4">
          <DialogTitle className="m-0 text-base font-semibold text-zinc-900">Non-modal</DialogTitle>
          <DialogTrigger action="close">
            <button
              type="button"
              aria-label="Close"
              className="cursor-pointer border-none bg-transparent text-lg leading-none text-zinc-400 hover:text-zinc-700"
            >
              ✕
            </button>
          </DialogTrigger>
        </DialogHeader>

        <DialogBody className="px-4 py-3 text-sm text-zinc-700">
          <p className="m-0">
            You can still interact with the page behind this dialog. Focus is not trapped and the background is not
            dimmed.
          </p>
        </DialogBody>

        <DialogFooter className="flex justify-end gap-2 px-4 pb-4">
          <DialogTrigger action="close">
            <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
              Close
            </button>
          </DialogTrigger>
        </DialogFooter>
      </DialogSurface>
    </Dialog>

    <input
      type="text"
      placeholder="Type here while dialog is open…"
      className="rounded border border-zinc-200 px-3 py-1.5 text-sm outline-none focus:border-zinc-950"
    />
  </div>
);
