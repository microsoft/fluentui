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
 * Dialogs can be nested. The inner `Dialog` detects that it is inside a parent
 * `DialogContext` and sets `isNestedDialog=true` automatically.
 *
 * Each dialog manages its own open state independently. Pressing Escape closes
 * only the innermost open dialog — propagation is stopped so the outer dialog
 * stays open.
 */
export const Nested = (): React.ReactNode => (
  <Dialog>
    <DialogTrigger>
      <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
        Open outer dialog
      </button>
    </DialogTrigger>

    <DialogSurface className="w-full max-w-[480px] rounded-lg border border-zinc-200 bg-white p-0 shadow-lg">
      <DialogHeader className="flex items-center justify-between px-4 pt-4">
        <DialogTitle className="m-0 text-lg font-semibold text-zinc-900">Outer dialog</DialogTitle>
        <DialogTrigger action="close">
          <button
            type="button"
            aria-label="Close"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded border-none bg-transparent text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
          >
            ✕
          </button>
        </DialogTrigger>
      </DialogHeader>

      <DialogBody className="px-4 py-3 text-sm text-zinc-700">
        <p className="mt-0 mb-3">This is the outer dialog. Open the inner dialog to see nesting in action.</p>

        {/* Inner dialog lives inside the outer dialog's body */}
        <Dialog>
          <DialogTrigger>
            <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
              Open inner dialog
            </button>
          </DialogTrigger>

          <DialogSurface className="w-full max-w-[360px] rounded-lg border border-zinc-300 bg-white p-0 shadow-xl">
            <DialogHeader className="flex items-center justify-between px-4 pt-4">
              <DialogTitle className="m-0 text-base font-semibold text-zinc-900">Inner dialog</DialogTitle>
              <DialogTrigger action="close">
                <button
                  type="button"
                  aria-label="Close"
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded border-none bg-transparent text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                >
                  ✕
                </button>
              </DialogTrigger>
            </DialogHeader>

            <DialogBody className="px-4 py-3 text-sm text-zinc-700">
              <p className="m-0">
                This is the inner dialog. Press Escape — only this dialog closes; the outer stays open.
              </p>
            </DialogBody>

            <DialogFooter className="flex justify-end px-4 pb-4">
              <DialogTrigger action="close">
                <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
                  Close inner
                </button>
              </DialogTrigger>
            </DialogFooter>
          </DialogSurface>
        </Dialog>
      </DialogBody>

      <DialogFooter className="flex justify-end px-4 pb-4">
        <DialogTrigger action="close">
          <button type="button" className="rounded px-3 py-1.5 text-sm border border-zinc-200 hover:bg-zinc-100">
            Close outer
          </button>
        </DialogTrigger>
      </DialogFooter>
    </DialogSurface>
  </Dialog>
);
