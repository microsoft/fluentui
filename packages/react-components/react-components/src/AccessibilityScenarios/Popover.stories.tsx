import * as React from 'react';

import { Button } from '@fluentui/react-button';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';

import { Scenario } from './utils';

interface AddPeopleContentProps {
  setPopoverOpened: (state: boolean) => void;
}

const AddPeopleContent: React.FunctionComponent<AddPeopleContentProps> = (props: AddPeopleContentProps) => {
  const { setPopoverOpened } = props;

  return (
    <>
      <label htmlFor="addPeopleInput">Enter name, email or tag</label>
      <input type="text" name="addPeopleInput" id="addPeopleInput" />
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

export const AddPeoplePopoverAccessibilityScenario: React.FunctionComponent = () => {
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
          <Button>Add people</Button>
        </PopoverTrigger>

        <PopoverSurface aria-label="Add someone to the chat">
          <AddPeopleContent setPopoverOpened={setPopoverOpened} />
        </PopoverSurface>
      </Popover>
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios / Add people popover',
  id: 'popover-accessibility-scenario',
};
