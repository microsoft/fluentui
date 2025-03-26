import * as React from 'react';
import { Button, Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-components';
import { Provider } from '../Provider/Provider';

export const CustomPopover = () => {
  return (
    <Provider>
      <Popover>
        <PopoverTrigger>
          <Button>Click Me</Button>
        </PopoverTrigger>
        <PopoverSurface>This is a popover</PopoverSurface>
      </Popover>
    </Provider>
  );
};
