import * as React from 'react';
import {
  InlineDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
} from '@fluentui/react-headless-components-preview/drawer';
import { DismissRegular } from '@fluentui/react-icons';

const buttonClassName = 'rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100';

const navItems = ['Dashboard', 'Activity', 'Projects', 'Calendar', 'Settings'];

export const Inline = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex h-[420px] overflow-hidden rounded border border-zinc-200 bg-white text-zinc-900">
      <InlineDrawer
        open={open}
        className={
          'shrink-0 overflow-hidden border-r bg-zinc-50 transition-[width,opacity,transform,border-color] duration-200 ease-linear w-0 border-r-transparent opacity-0 data-[open]:w-72 data-[open]:border-r-zinc-200 data-[open]:opacity-100'
        }
      >
        <div className="w-72">
          <DrawerHeader className="border-b border-zinc-200 px-4 py-3">
            <DrawerHeaderTitle
              action={
                <button aria-label="Close Drawer" className="hover:text-gray-600" onClick={() => setOpen(false)}>
                  <DismissRegular />
                </button>
              }
              className="flex items-center justify-between gap-3"
              heading={{ className: 'm-0 text-lg font-semibold' }}
            >
              Inline drawer
            </DrawerHeaderTitle>
          </DrawerHeader>
          <DrawerBody className="px-3 py-3 text-sm text-zinc-700">
            <nav aria-label="Example navigation" className="flex flex-col gap-1">
              {navItems.map((item, index) => (
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
          </DrawerBody>
        </div>
      </InlineDrawer>

      <main className="flex flex-1 items-start flex-col gap-3 p-4">
        <button type="button" className={buttonClassName} onClick={() => setOpen(value => !value)}>
          {open ? 'Hide inline drawer' : 'Show inline drawer'}
        </button>
      </main>
    </div>
  );
};

Inline.parameters = {
  docs: {
    description: {
      story: 'The main content remains available while an inline drawer is visible.',
    },
  },
};
