import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

const classes = {
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80',
  action:
    'px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 cursor-pointer border-none',
  link: 'text-blue-600 hover:text-blue-700 underline',
};

export const InternalUpdateContent = (): React.ReactNode => {
  const [revealed, setRevealed] = React.useState(false);
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if (revealed) {
      linkRef.current?.focus();
    }
  }, [revealed]);

  return (
    <Popover onOpenChange={(_, data) => !data.open && setRevealed(false)}>
      <PopoverTrigger>
        <button className={classes.trigger}>Popover trigger</button>
      </PopoverTrigger>
      <PopoverSurface className={classes.surface}>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">First panel</h3>
        <p className="text-sm text-gray-600 mb-3">
          Popover content can change while the popover is open. When new focusable content is revealed, move focus to it
          so keyboard users can continue interacting.
        </p>

        {revealed ? (
          <div className="text-sm text-gray-700">
            Revealed content with{' '}
            <a ref={linkRef} href="#" className={classes.link}>
              a focusable link
            </a>
            .
          </div>
        ) : (
          <button className={classes.action} onClick={() => setRevealed(true)}>
            Reveal more
          </button>
        )}
      </PopoverSurface>
    </Popover>
  );
};
