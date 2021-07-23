import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface, PopoverProps } from './index';
import { ArgTypes, Meta, Parameters } from '@storybook/react';

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

    <PopoverSurface>
      <ExampleContent />

      <div>
        <button>Action</button>
        <button>Action</button>
      </div>
    </PopoverSurface>
  </Popover>
);
// @FIXME - remove manually specified argTypes once `react-components` package will use new storybook setup(DX)
// https://github.com/microsoft/fluentui/issues/18514
Default.argTypes = {
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
} as ArgTypes;
Default.parameters = {
  controls: {
    disable: false,
  },
} as Parameters;

export const AnchorToTarget = () => {
  const [target, setTarget] = React.useState<HTMLButtonElement | null>();

  return (
    <>
      <div>
        <Popover target={target}>
          <PopoverTrigger>
            <button>Popover trigger</button>
          </PopoverTrigger>

          <PopoverSurface>
            <ExampleContent />
          </PopoverSurface>
        </Popover>
      </div>

      <button ref={setTarget}>Custom target</button>
    </>
  );
};

export const Controlled = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpenChange: PopoverProps['onOpenChange'] = (_, data) => setOpen(data.open || false);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <button>Controlled trigger</button>
      </PopoverTrigger>
      <PopoverSurface>
        <ExampleContent />
      </PopoverSurface>
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
        <PopoverSurface>
          <ExampleContent />
        </PopoverSurface>
      </Popover>
    </>
  );
};

const FirstNestedPopover = () => (
  <Popover trapFocus>
    <PopoverTrigger>
      <button>First nested trigger</button>
    </PopoverTrigger>

    <PopoverSurface>
      <ExampleContent />
      <button>First nested button</button>
      <SecondNestedPopover />
      <SecondNestedPopover />
    </PopoverSurface>
  </Popover>
);

const SecondNestedPopover = () => (
  <Popover trapFocus>
    <PopoverTrigger>
      <button>Second nested trigger</button>
    </PopoverTrigger>

    <PopoverSurface>
      <ExampleContent />
      <button>Second nested button</button>
    </PopoverSurface>
  </Popover>
);

export const NestedPopovers = () => {
  return (
    <Popover trapFocus>
      <PopoverTrigger>
        <button>Root trigger</button>
      </PopoverTrigger>

      <PopoverSurface>
        <ExampleContent />
        <button>Root button</button>
        <FirstNestedPopover />
      </PopoverSurface>
    </Popover>
  );
};

// Used for internal testing
export const InternalUpdateContent = () => {
  const [visible, setVisible] = React.useState(true);

  const changeContent = () => setVisible(false);

  return (
    <Popover>
      <PopoverTrigger>
        <button>Popover trigger</button>
      </PopoverTrigger>

      <PopoverSurface>
        <ExampleContent />

        {visible ? (
          <div>
            <button onClick={changeContent}>Action</button>
          </div>
        ) : (
          <div>The second panel</div>
        )}
      </PopoverSurface>
    </Popover>
  );
};

export default {
  title: 'Components/Popover',
  component: Popover,
} as Meta;
