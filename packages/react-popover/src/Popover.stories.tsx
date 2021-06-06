import * as React from 'react';
import { Popover, PopoverTrigger, PopoverOverlay, PopoverProps } from './index';

const ExampleContent = () => {
  return (
    <div>
      <h3>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

export const Default = (props: PopoverProps) => (
  <Popover {...props}>
    <PopoverTrigger>
      <button>Popover trigger</button>
    </PopoverTrigger>

    <PopoverOverlay>
      <ExampleContent />

      <div>
        <button>Action</button>
        <button>Action</button>
      </div>
    </PopoverOverlay>
  </Popover>
);

Default.argTypes = {
  open: {
    defaultValue: false,
    control: 'boolean',
  },

  openOnContext: {
    defaultValue: false,
    control: 'boolean',
  },

  openOnHover: {
    defaultValue: false,
    control: 'boolean',
  },

  position: {
    type: { name: 'string', required: false },
    control: {
      type: 'select',
      options: ['above', 'below', 'before', 'after'],
    },
  },

  align: {
    type: { name: 'string', required: false },
    control: {
      type: 'select',
      options: ['top', 'bottom', 'start', 'end', 'center'],
    },
  },

  size: {
    type: { name: 'string', required: false },
    control: {
      type: 'select',
      options: ['small', 'medium', 'large'],
    },
  },

  trapFocus: {
    defaultValue: true,
    control: 'boolean',
  },
};

export const AnchorToTarget = () => {
  const [target, setTarget] = React.useState<HTMLButtonElement | null>();

  return (
    <>
      <div>
        <Popover target={target}>
          <PopoverTrigger>
            <button>Popover trigger</button>
          </PopoverTrigger>

          <PopoverOverlay>
            <ExampleContent />
          </PopoverOverlay>
        </Popover>
      </div>

      <button ref={setTarget}>Custom target</button>
    </>
  );
};

export const Controlled = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange: PopoverProps['onOpenChange'] = (_, data) => setOpen(data.open || false);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger>
        <button>Controlled trigger</button>
      </PopoverTrigger>
      <PopoverOverlay>
        <ExampleContent />
      </PopoverOverlay>
    </Popover>
  );
};

export const WithCustomTrigger = () => {
  const [open, setOpen] = React.useState(false);
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  const onClick = () => setOpen(s => !s);
  const onOpenChange: PopoverProps['onOpenChange'] = (_, data) => setOpen(data.open || false);

  return (
    <>
      <button aria-haspopup ref={setTarget} onClick={onClick}>
        Custom trigger
      </button>
      <Popover target={target} open={open} onOpenChange={onOpenChange}>
        <PopoverOverlay>
          <ExampleContent />
        </PopoverOverlay>
      </Popover>
    </>
  );
};

const FirstNestedPopover = () => (
  <Popover trapFocus>
    <PopoverTrigger>
      <button>First nested trigger</button>
    </PopoverTrigger>

    <PopoverOverlay>
      <ExampleContent />
      <button>First nested button</button>
      <SecondNestedPopover />
      <SecondNestedPopover />
    </PopoverOverlay>
  </Popover>
);

const SecondNestedPopover = () => (
  <Popover trapFocus>
    <PopoverTrigger>
      <button>Second nested trigger</button>
    </PopoverTrigger>

    <PopoverOverlay>
      <ExampleContent />
      <button>Second nested button</button>
    </PopoverOverlay>
  </Popover>
);

export const NestedPopovers = () => {
  return (
    <Popover trapFocus>
      <PopoverTrigger>
        <button>Root trigger</button>
      </PopoverTrigger>

      <PopoverOverlay>
        <ExampleContent />
        <button>Root button</button>
        <FirstNestedPopover />
      </PopoverOverlay>
    </Popover>
  );
};

export default {
  title: 'Components/Popover',
  component: Popover,
};
