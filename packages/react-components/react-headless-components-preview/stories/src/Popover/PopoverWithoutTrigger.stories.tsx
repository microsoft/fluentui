import * as React from 'react';
import { Popover, PopoverSurface } from '@fluentui/react-headless-components-preview';

const classes = {
  container: 'flex flex-col items-start gap-4 p-4',
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[240px] max-w-xs flex flex-col gap-2',
};

export const WithoutTrigger = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className={classes.container}>
      <button ref={buttonRef} className={classes.trigger} onClick={() => setOpen(value => !value)}>
        Toggle popover
      </button>
      <Popover
        open={open}
        onOpenChange={(_e, data) => setOpen(data.open)}
        trapFocus
        positioning={{ target: buttonRef }}
      >
        <PopoverSurface className={classes.surface}>
          <h3 className="text-sm font-semibold text-gray-900 m-0">Popover content</h3>
          <p className="text-sm text-gray-600">
            This popover has no <code>PopoverTrigger</code>. The surface is controlled externally and anchored to the
            button via the <code>positioning.target</code> prop.
          </p>
        </PopoverSurface>
      </Popover>
    </div>
  );
};
