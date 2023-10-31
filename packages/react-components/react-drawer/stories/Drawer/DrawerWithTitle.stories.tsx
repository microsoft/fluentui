import * as React from 'react';
import { InlineDrawer, DrawerHeader, DrawerHeaderTitle, Button, makeStyles } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  drawer: {
    width: '400px',
    height: '600px',
  },
});

export const WithTitle = () => {
  return (
    <InlineDrawer className={useStyles().drawer} open>
      <DrawerHeader>
        <DrawerHeaderTitle>Drawer with title</DrawerHeaderTitle>
        <DrawerHeaderTitle heading={{ as: 'h1' }}>Drawer with custom tag</DrawerHeaderTitle>
        <DrawerHeaderTitle action={<Button appearance="subtle" aria-label="Close" icon={<Dismiss24Regular />} />}>
          Drawer with title and action
        </DrawerHeaderTitle>
      </DrawerHeader>
    </InlineDrawer>
  );
};

WithTitle.parameters = {
  docs: {
    controls: {
      disable: true,
    },
    description: {
      story: [
        '`DrawerHeaderTitle` is a component that provides a structured heading for a Drawer and can be used to display a title and an action.',
        'Although it works as a standalone component, it is intended to be used within a `DrawerHeader`.',
        'The title renders an `h2` element by default but it can be customized using the `heading` prop.',
      ].join('\n'),
    },
  },
};
