import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogSurface,
  DialogTitle,
} from '@fluentui/react-headless-components-preview';
import type { DialogOpenChangeData } from '@fluentui/react-headless-components-preview';

/**
 * `DialogTrigger` is optional. When the open state is managed entirely by the
 * parent (e.g. opened by a network event, a timeout, or a button outside the
 * Dialog tree), omit `DialogTrigger` and pass only `DialogSurface` as children.
 *
 * Use `open` + `onOpenChange` for full control.
 */
export const NoTrigger = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = (_event: DialogOpenChangeData['event'], data: DialogOpenChangeData) => {
    setOpen(data.open);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800"
          onClick={() => setOpen(true)}
        >
          Open
        </button>
        <button
          type="button"
          className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100"
          onClick={() => setOpen(false)}
        >
          Close
        </button>
        <span className="self-center text-sm text-zinc-500">open: {String(open)}</span>
      </div>

      {/* No DialogTrigger — Dialog receives only DialogSurface as child */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogSurface className="w-full max-w-[420px] rounded-lg border border-zinc-200 bg-white p-0 shadow-lg">
          <DialogHeader className="flex items-center justify-between px-4 pt-4">
            <DialogTitle className="m-0 text-lg font-semibold text-zinc-900">Programmatic open</DialogTitle>
            <button
              type="button"
              aria-label="Close"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded border-none bg-transparent text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </DialogHeader>

          <DialogBody className="px-4 py-3 text-sm text-zinc-700">
            <p className="m-0">
              This dialog has no <code>DialogTrigger</code>. It was opened by the buttons above. Close it with Escape,
              the backdrop, or the ✕ button.
            </p>
          </DialogBody>

          <DialogFooter className="flex justify-end px-4 pb-4">
            <button
              type="button"
              className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </DialogFooter>
        </DialogSurface>
      </Dialog>
    </div>
  );
};
