import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, InlineDrawer } from '@fluentui/react-windmod-preview/drawer';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

/** `separator` draws a visible edge where the position bucket already reserves one. */
export const Inline = (): React.ReactNode => (
  <FluentProvider>
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      {[false, true].map(separator => (
        <div key={String(separator)} style={{ display: 'flex', height: 200 }}>
          <InlineDrawer open separator={separator}>
            <DrawerHeader>
              <DrawerHeaderTitle>{separator ? 'separator' : 'no separator'}</DrawerHeaderTitle>
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
