import * as React from 'react';
import { useFocusTrap } from '@fluentui/react-headless-components-preview/focus';

const classes = {
  button:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed',
  ghostButton:
    'px-4 py-2 rounded-md bg-white text-gray-800 font-medium border border-gray-300 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer',
  panel: 'flex flex-col gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 max-w-sm',
  hint: 'text-sm text-gray-600',
};

export const Default = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);
  const trapRef = useFocusTrap(open);

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <button className={classes.button} onClick={() => setOpen(true)} disabled={open}>
        Open panel
      </button>

      <p className={classes.hint}>
        Open the panel, then press <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd>. Focus cycles inside the panel and
        cannot escape until you close it.
      </p>

      {open && (
        <div ref={trapRef} role="dialog" aria-label="Trapped panel" className={classes.panel}>
          <h3 className="font-semibold text-gray-900">Trapped panel</h3>
          <button className={classes.ghostButton}>Action 1</button>
          <button className={classes.ghostButton}>Action 2</button>
          <button className={classes.button} onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};
