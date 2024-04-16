import * as React from 'react';

import { Button, Input, Label, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';

import { Scenario } from './utils';

interface AddPeopleContentProps {
  setPopoverOpened: (state: boolean) => void;
}

const AddPeopleContent: React.FunctionComponent<AddPeopleContentProps> = (props: AddPeopleContentProps) => {
  const { setPopoverOpened } = props;

  return (
    <>
      <Label htmlFor="addPeopleInput">Enter name, email or tag</Label>
      <Input type="text" name="addPeopleInput" id="addPeopleInput" />
      <Button
        onClick={() => {
          setPopoverOpened(false);
        }}
      >
        Cancel
      </Button>
    </>
  );
};

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
        <PopoverTrigger disableButtonEnhancement>
          <Button>Add people</Button>
        </PopoverTrigger>

        <PopoverSurface aria-label="Add someone to the chat">
          <AddPeopleContent setPopoverOpened={setPopoverOpened} />
        </PopoverSurface>
      </Popover>
    </Scenario>
  );
};
