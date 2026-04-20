import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';

const classes = {
  outer: 'p-16 min-h-[320px]',
  container: 'flex items-start gap-10',
  column: 'flex flex-col items-start gap-2',
  label: 'text-xs font-semibold text-gray-500 uppercase tracking-wide',
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  target:
    'px-4 py-2 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 focus-visible:outline-2 focus-visible:outline-purple-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[240px] max-w-xs flex flex-col gap-2',
};

export const AnchorToCustomTarget = (): React.ReactNode => {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  return (
    <div className={classes.outer}>
      <div className={classes.container}>
        <div className={classes.column}>
          <span className={classes.label}>Custom anchor (target)</span>
          <button ref={setTarget} className={classes.target}>
            Anchor
          </button>
        </div>

        <div className={classes.column}>
          <span className={classes.label}>Popover trigger (unrelated)</span>
          <Popover positioning={{ target, position: 'below', offset: 4 }}>
            <PopoverTrigger>
              <button className={classes.trigger}>Open popover</button>
            </PopoverTrigger>
            <PopoverSurface className={classes.surface}>
              <h3 className="text-sm font-semibold text-gray-900 m-0">Popover content</h3>
              <p className="text-sm text-gray-600">
                Clicking <em>Open popover</em> toggles this surface, but <code>positioning.target</code> makes it anchor
                to the purple <em>Anchor</em> button instead of the trigger. It appears to the right of the anchor
                regardless of where the trigger sits.
              </p>
            </PopoverSurface>
          </Popover>
        </div>
      </div>
    </div>
  );
};
