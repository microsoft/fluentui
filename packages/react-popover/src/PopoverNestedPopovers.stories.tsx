import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from './index';
import { Button } from './utils.stories';
import { ExampleContent } from './utils.stories';

const FirstNestedPopover = () => (
  <Popover trapFocus>
    <PopoverTrigger>
      <Button>First nested trigger</Button>
    </PopoverTrigger>

    <PopoverSurface>
      <ExampleContent />
      <Button>First nested button</Button>
      <SecondNestedPopover />
      <SecondNestedPopover />
    </PopoverSurface>
  </Popover>
);

const SecondNestedPopover = () => (
  <Popover trapFocus>
    <PopoverTrigger>
      <Button>Second nested trigger</Button>
    </PopoverTrigger>

    <PopoverSurface>
      <ExampleContent />
      <Button>Second nested button</Button>
    </PopoverSurface>
  </Popover>
);

export const NestedPopovers = () => {
  return (
    <Popover trapFocus>
      <PopoverTrigger>
        <Button>Root trigger</Button>
      </PopoverTrigger>

      <PopoverSurface>
        <ExampleContent />
        <Button>Root button</Button>
        <FirstNestedPopover />
      </PopoverSurface>
    </Popover>
  );
};

NestedPopovers.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'Popovers can be nested within each other. Too much nesting can result in',
        'extra accessibility considerations and are generally not a great user experience,',
        '',
        'Since nested popovers will generally have an interactive `PopoverTrigger` to control',
        'the nested popover, make sure to combine their usage with the `trapFocus` prop for correct',
        'screen reader and keyboard accessibility.',
        '',
        '- Try and limit nesting to 2 levels.',
        '- Make sure to use `trapFocus` when nesting.',
        '- Creating nested popovers as separate components will result in more maintainable code.',
      ].join('\n'),
    },
  },
};
