import * as React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
} from '@fluentui/react-headless-components-preview/drawer';

const buttonClassName = 'rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100';
const primaryButtonClassName = 'rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800';

const navItems = ['Dashboard', 'Activity', 'Projects', 'Calendar', 'Settings'];

export const Default = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Drawer
        open={open}
        unmountOnClose={false}
        onOpenChange={(_, data) => setOpen(data.open)}
        className={
          'fixed inset-y-0 right-0 m-0 hidden min-h-screen w-80 max-w-[calc(100vw-32px)] translate-x-full flex-col border-0 border-l border-zinc-200 bg-white p-0 shadow-xl transition-transform [&[open]]:flex [&[open]]:translate-x-0 [&[open]]:starting:-translate-x-full backdrop:bg-black/40'
        }
      >
        <DrawerHeader className="border-b border-zinc-200 px-4 py-3">
          <DrawerHeaderTitle
            action={
              <button aria-label="Close drawer" className={buttonClassName} onClick={() => setOpen(false)}>
                Close
              </button>
            }
            className="flex items-start justify-between gap-3"
            heading={{ className: 'm-0 text-lg font-semibold text-zinc-900' }}
          >
            Overlay drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody className="flex-grow overflow-auto px-3 py-3 text-sm text-zinc-700">
          <nav aria-label="Example navigation" className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`'rounded px-3 py-2 font-medium no-underline aria-[current]:bg-zinc-200 aria-[current]:text-zinc-950 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950'`}
                aria-current={index === 0 ? 'page' : undefined}
              >
                {item}
              </a>
            ))}
          </nav>
        </DrawerBody>

        <DrawerFooter className="flex justify-end gap-2 border-t border-zinc-200 px-4 py-3">
          <button className={primaryButtonClassName} onClick={() => setOpen(false)}>
            Close
          </button>
        </DrawerFooter>
      </Drawer>

      <div className="p-4">
        <button className={primaryButtonClassName} onClick={() => setOpen(!open)}>
          Open drawer
        </button>
      </div>
    </>
  );
};
