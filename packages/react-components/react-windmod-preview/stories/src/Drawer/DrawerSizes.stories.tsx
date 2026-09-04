import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, InlineDrawer } from '@fluentui/react-windmod-preview/drawer';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

const sizes = ['small', 'medium', 'large'] as const;

/** `size` is a width at `start`/`end` and a height at `bottom`. `full` fills the viewport. */
export const Sizes = (): React.ReactNode => (
  <FluentProvider>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {sizes.map(size => (
        <div key={size} style={{ display: 'flex', height: 160 }}>
          <InlineDrawer open size={size} separator>
            <DrawerHeader>
              <DrawerHeaderTitle>{size}</DrawerHeaderTitle>
            </DrawerHeader>
            <DrawerBody>
              <p>Drawer body</p>
            </DrawerBody>
          </InlineDrawer>
        </div>
      ))}
    </div>
  </FluentProvider>
);
