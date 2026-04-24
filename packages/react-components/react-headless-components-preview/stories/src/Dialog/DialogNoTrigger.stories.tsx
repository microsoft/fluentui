import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogActions,
  DialogSurface,
  DialogTitle,
} from '@fluentui/react-headless-components-preview/dialog';
import type { DialogOpenChangeData } from '@fluentui/react-headless-components-preview/dialog';

/**
 * `DialogTrigger` is optional. When the open state is managed entirely by the
 * parent (e.g. opened by a network event, a timeout, or a button outside the
 * Dialog tree), omit `DialogTrigger` and pass only `DialogSurface` as children.
 *
 * Use `open` + `onOpenChange` for full control.
 */
export const NoTrigger = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = (_event: Event | React.SyntheticEvent, data: DialogOpenChangeData) => {
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
        <DialogSurface className="fixed inset-0 m-auto w-full max-w-[420px] rounded-lg border border-zinc-200 bg-white p-0 shadow-lg">
          <DialogBody className="px-4 py-3 text-sm text-zinc-700">
            <DialogTitle className="mb-3 mt-0 text-lg font-semibold text-zinc-900">Programmatic open</DialogTitle>
            <p className="m-0">
              This dialog has no <code>DialogTrigger</code>. It was opened by the buttons above. Close it with Escape,
              the backdrop, or the Close button.
            </p>
          </DialogBody>

          <DialogActions className="flex justify-end px-4 pb-4">
            <button
              type="button"
              className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </div>
  );
};
