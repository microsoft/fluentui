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
 * By default, `DialogSurface` is unmounted from the DOM when the dialog closes
 * (`unmountOnClose={true}`), which resets any state inside it.
 *
 * Set `unmountOnClose={false}` to keep the dialog in the DOM at all times.
 * The native `<dialog>` element manages its own visibility via `show()`/`close()`,
 * so the dialog is hidden without being removed. Any state inside (e.g. form values)
 * is preserved across open/close cycles.
 *
 * Type something in the input, close the dialog, then reopen it — the value persists.
 */
export const KeepMounted = (): React.ReactNode => (
  <Dialog unmountOnClose={false}>
    <DialogTrigger>
      <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
        Open dialog (state preserved)
      </button>
    </DialogTrigger>

    <DialogSurface className="fixed inset-0 m-auto w-full max-w-[480px] rounded-lg border border-zinc-200 bg-white p-0 shadow-lg">
      <DialogBody className="px-4 py-3">
        <DialogTitle className="mb-3 mt-0 text-lg font-semibold text-zinc-900">Draft message</DialogTitle>
        <p className="mt-0 mb-2 text-sm text-zinc-700">
          Close and reopen — your draft is preserved (<code>unmountOnClose=false</code>).
        </p>
        <textarea
          className="w-full rounded border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950"
          rows={4}
          placeholder="Type your message…"
          defaultValue=""
        />
      </DialogBody>

      <DialogActions className="flex justify-end gap-2 px-4 pb-4">
        <DialogTrigger action="close">
          <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
            Save draft
          </button>
        </DialogTrigger>
        <button
          type="button"
          className="rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800"
        >
          Send
        </button>
      </DialogActions>
    </DialogSurface>
  </Dialog>
);
