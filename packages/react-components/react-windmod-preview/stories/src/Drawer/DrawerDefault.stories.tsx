import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderNavigation,
  DrawerHeaderTitle,
  InlineDrawer,
} from '@fluentui/react-windmod-preview/drawer';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

/** The whole anatomy in one drawer: navigation, title with an action, a scrolling body, a footer. */
export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div style={{ display: 'flex', height: 360 }}>
      <InlineDrawer open>
        <DrawerHeader>
          <DrawerHeaderNavigation aria-label="Drawer navigation">
            <Button appearance="subtle">Back</Button>
          </DrawerHeaderNavigation>
          <DrawerHeaderTitle action={<Button appearance="subtle">Close</Button>}>Drawer title</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          {Array.from({ length: 12 }, (_, index) => (
            <p key={index}>Drawer body paragraph {index + 1}</p>
          ))}
        </DrawerBody>
        <DrawerFooter>
          <Button appearance="primary">Save</Button>
          <Button>Cancel</Button>
        </DrawerFooter>
      </InlineDrawer>
    </div>
  </FluentProvider>
);
