import * as React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
} from '@fluentui/react-headless-components-preview/drawer';
import { DismissRegular } from '@fluentui/react-icons';

export const Inline = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(value => !value);
  const closeDrawer = () => setOpen(false);

  return (
    <div className="flex h-[420px] overflow-hidden rounded border border-zinc-200 bg-white text-zinc-900">
      <Drawer
        className={
          'shrink-0 overflow-hidden border-r bg-zinc-50 transition-[width,opacity,transform,border-color] duration-200 ease-linear w-0 border-r-transparent opacity-0 data-[open]:w-72 data-[open]:border-r-zinc-200 data-[open]:opacity-100'
        }
        type="inline"
        open={open}
        unmountOnClose={false}
      >
        <DrawerHeader className="border-b border-zinc-200 px-4 py-3">
          <DrawerHeaderTitle
            action={
              <button aria-label="Close drawer" className="rounded size-8 hover:bg-zinc-100" onClick={closeDrawer}>
                <DismissRegular />
              </button>
            }
            className="flex items-center justify-between gap-3"
            heading={{ className: 'text-lg font-semibold' }}
          >
            Inline drawer
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody className="px-3 py-3 text-sm text-zinc-700">
          <DrawerContent />
        </DrawerBody>
      </Drawer>

      <main className="flex flex-1 items-start flex-col gap-3 p-4">
        <button className="rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100" onClick={toggleDrawer}>
          {open ? 'Hide inline drawer' : 'Show inline drawer'}
        </button>
      </main>
    </div>
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
          className="rounded px-3 py-2 font-medium no-underline aria-[current]:bg-zinc-200 aria-[current]:text-zinc-950 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
        >
          {item}
        </a>
      ))}
    </nav>
  );
};

Inline.parameters = {
  docs: {
    description: {
      story: 'The main content remains available while an inline drawer is visible.',
    },
  },
};
