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

  return (
    <Dialog open={open} onOpenChange={(_, data) => setOpen(data.open)}>
      <DialogTrigger>
        <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
          Open controlled dialog
        </button>
      </DialogTrigger>

      <DialogSurface className="fixed inset-0 m-auto w-full max-w-[480px] rounded-lg border border-zinc-200 bg-white p-0 shadow-lg">
        <DialogBody className="px-4 py-3 text-sm text-zinc-700">
          <DialogTitle className="mb-3 mt-0 text-lg font-semibold text-zinc-900">Dialog title</DialogTitle>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
          dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
          eaque?
        </DialogBody>
        <DialogActions className="flex justify-end gap-2 px-4 pb-4">
          <button
            type="button"
            className="rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800"
          >
            Do Something
          </button>
          <DialogTrigger action="close">
            <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
              Close
            </button>
          </DialogTrigger>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};
