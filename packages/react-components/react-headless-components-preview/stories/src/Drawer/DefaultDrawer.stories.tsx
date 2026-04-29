import * as React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
} from '@fluentui/react-headless-components-preview/drawer';
import { DismissRegular } from '@fluentui/react-icons';

const buttonClassName = 'rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800';

export const Default = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(value => !value);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <Drawer
        className={
          'fixed inset-y-0 right-0 m-0 hidden min-h-screen w-80 max-w-[calc(100vw-32px)] translate-x-full flex-col border-0 border-l border-zinc-200 bg-white p-0 shadow-xl transition-transform [&[open]]:flex [&[open]]:translate-x-0 [&[open]]:starting:-translate-x-full backdrop:bg-black/40'
        }
        open={open}
        onOpenChange={(_, data) => setOpen(data.open)}
        unmountOnClose={false}
      >
        <DrawerHeader className="border-b border-zinc-200 px-4 py-3">
          <DrawerHeaderTitle
            action={
              <button aria-label="Close drawer" className="rounded size-8 hover:bg-zinc-100" onClick={closeDrawer}>
                <DismissRegular />
              </button>
            }
            className="flex items-start justify-between gap-3"
            heading={{ className: 'text-lg font-semibold text-zinc-900' }}
          >
            Overlay drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody className="flex-grow overflow-auto px-3 py-3 text-sm text-zinc-700">
          <DrawerContent />
        </DrawerBody>

        <DrawerFooter className="flex justify-end gap-2 border-t border-zinc-200 px-4 py-3">
          <button className={buttonClassName} onClick={closeDrawer}>
            Close
          </button>
        </DrawerFooter>
      </Drawer>

      <div className="p-4">
        <button className={buttonClassName} onClick={toggleDrawer}>
          Open drawer
        </button>
      </div>
    </>
  );
};

const DrawerContent = () => {
  const items = ['Dashboard', 'Activity', 'Projects', 'Calendar', 'Settings'];

  return (
    <nav aria-label="Example navigation" className="flex flex-col gap-1">
      {items.map((item, index) => (
        <a
          key={item}
          aria-current={index === 0 ? 'page' : undefined}
          href="#"
          className={`'rounded px-3 py-2 font-medium no-underline aria-[current]:bg-zinc-200 aria-[current]:text-zinc-950 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950'`}
        >
          {item}
        </a>
      ))}
    </nav>
  );
};
