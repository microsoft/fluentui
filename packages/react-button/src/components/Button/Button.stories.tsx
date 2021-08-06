import * as React from 'react';
import { Button, ButtonProps } from '../../Button';
import { Meta } from '@storybook/react';

// TODO: this is here while waiting for react-icons to merge
import { CalendarIcon } from '../../tmp-icons.stories';

export const Default = (props: ButtonProps) => <Button {...props}>Button</Button>;

export const Emphasis = () => (
  <>
    <Button primary>Primary button</Button>
    <Button>Default button</Button>
    <Button outline>Outline button</Button>
    <Button subtle>Subtle button</Button>
    <Button transparent>Transparent button</Button>
  </>
);
Emphasis.parameters = {
  docs: {
    description: {
      story:
        '- `primary` button is used for the most important action on the page or in a view\n' +
        '- `default` button is used for subordinate actions\n' +
        '- `outline` has no background styling and is emphasized through the styling of its content and borders\n' +
        '- `transparent` has no background or border styling and is just emphasized through its content styling\n' +
        '- `subtle` button blends into its background and becomes less emphasized\n',
    },
  },
};

export const ButtonWithIcon = () => (
  <>
    <Button icon={<CalendarIcon />}>Text</Button>
    <Button icon={<CalendarIcon />} iconPosition="after">
      Text
    </Button>
    <Button icon={<CalendarIcon />} />
  </>
);
ButtonWithIcon.parameters = {
  docs: {
    description: {
      story:
        'Button has an `icon` slot that, if specified, renders an icon either `before` or `after` the children, ' +
        'as specified by the `iconPosition` prop.',
    },
  },
};

export const CircularButton = () => (
  <>
    <Button circular>Button</Button>
    <Button circular outline icon={<CalendarIcon />} />
    <Button circular subtle icon={<CalendarIcon />} />
    <Button circular transparent icon={<CalendarIcon />} />
  </>
);
CircularButton.parameters = {
  docs: {
    description: {
      story: 'A button can have completely rounded corners.',
    },
  },
};

export const ButtonSize = () => (
  <>
    <div>
      <h4>small</h4>
      <Button size="small">Text</Button>
      <Button size="small" icon={<CalendarIcon />}>
        Text
      </Button>
      <Button size="small" icon={<CalendarIcon />} />
    </div>
    <div>
      <h4>medium</h4>
      <Button>Text</Button>
      <Button icon={<CalendarIcon />}>Text</Button>
      <Button icon={<CalendarIcon />} />
    </div>
    <div>
      <h4>large</h4>
      <Button size="large">Text</Button>
      <Button size="large" icon={<CalendarIcon />}>
        Text
      </Button>
      <Button size="large" icon={<CalendarIcon />} />
    </div>
  </>
);
ButtonSize.parameters = {
  docs: {
    description: {
      story: 'A button supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
  },
};

export const BlockButton = () => (
  <>
    <Button block>Block button</Button>
  </>
);
BlockButton.parameters = {
  docs: {
    description: {
      story: 'A button can fill the width of its container.',
    },
  },
};

export const DisabledButton = () => (
  <>
    <div>
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button disabledFocusable>Disabled focusable</Button>
    </div>
    <div>
      <Button primary icon={<CalendarIcon />}>
        Primary
      </Button>
      <Button primary disabled icon={<CalendarIcon />}>
        Primary disabled
      </Button>
      <Button primary disabledFocusable>
        Primary disabled focusable
      </Button>
    </div>
  </>
);
DisabledButton.parameters = {
  docs: {
    description: {
      story: `A button can be \`disabled\` or \`disabledFocusable\`.
              \`disabledFocusable\` is used in scenarios where it is important to keep a consistent tab order
              for screen reader and keyboard users. The primary example of this pattern is when
              the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.`,
    },
  },
};

export const ButtonWithLongText = () => (
  <>
    <Button>Text</Button>
    <Button>Text truncates after it hits the max width token value</Button>
  </>
);
ButtonWithLongText.parameters = {
  docs: {
    description: {
      story: 'Text truncates after it hits the max width theme token value.',
    },
  },
};

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
