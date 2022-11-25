import * as React from 'react';
import { Button, Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-components';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Popover>
          <PopoverTrigger>
            <Button>Popover</Button>
          </PopoverTrigger>
          <PopoverSurface>This is a popover</PopoverSurface>
        </Popover>
      ))}
    </>
  );
};

export default Scenario;
