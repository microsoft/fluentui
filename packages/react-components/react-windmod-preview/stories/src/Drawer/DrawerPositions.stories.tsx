import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, InlineDrawer } from '@fluentui/react-windmod-preview/drawer';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

const positions = ['start', 'end', 'bottom'] as const;

/** `position` picks the edge the drawer is pinned to, and which axis `size` applies to. */
export const Positions = (): React.ReactNode => (
  <FluentProvider>
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      {positions.map(position => (
        <div key={position} style={{ display: 'flex', height: 240 }}>
          <InlineDrawer open position={position} separator>
            <DrawerHeader>
              <DrawerHeaderTitle>{position}</DrawerHeaderTitle>
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
