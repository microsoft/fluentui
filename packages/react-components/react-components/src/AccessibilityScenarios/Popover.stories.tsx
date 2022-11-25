import * as React from 'react';

import { Button, Input, Label, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';

import { Scenario } from './utils';

export const AddPeoplePopover: React.FunctionComponent = () => {
  const [popoverOpened, setPopoverOpened] = React.useState(false);

  return (
    <Scenario pageTitle="Add people popover">
      <Popover
        open={popoverOpened}
        onOpenChange={(event, data) => {
          setPopoverOpened(data.open);
        }}
        trapFocus
      >
        <PopoverTrigger>
          <Button aria-haspopup="dialog">Add people</Button>
        </PopoverTrigger>

        <PopoverSurface aria-label="Add someone to the chat">
          <Label htmlFor="addPeopleInput">Enter name, email or tag</Label>
          <Input type="text" name="addPeopleInput" id="addPeopleInput" />
          <Button
            onClick={() => {
              setPopoverOpened(false);
            }}
          >
            Cancel
          </Button>
        </PopoverSurface>
      </Popover>
    </Scenario>
  );
};
