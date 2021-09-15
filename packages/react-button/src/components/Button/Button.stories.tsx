import * as React from 'react';
import { Button, ButtonProps } from '../../Button';
import { Meta } from '@storybook/react';
import { CalendarMonth24Regular } from '@fluentui/react-icons';
import descriptionMd from './ButtonDescription.md';
import bestPracticesMd from './ButtonBestPractices.md';

export const Default = (props: ButtonProps) => {
  return <Button {...props}>Button</Button>;
};

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
    <Button icon={<CalendarMonth24Regular />}>Text</Button>
    <Button icon={<CalendarMonth24Regular />} iconPosition="after">
      Text
    </Button>
    <Button icon={<CalendarMonth24Regular />} />
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
    <Button circular outline icon={<CalendarMonth24Regular />} />
    <Button circular subtle icon={<CalendarMonth24Regular />} />
    <Button circular transparent icon={<CalendarMonth24Regular />} />
  </>
);
CircularButton.parameters = {
  docs: {
    description: {
      story: 'A button can have completely rounded corners.',
    },
  },
};

export const ButtonSize = () => {
  const groupStyles: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5em' };
  const headerStyles: React.CSSProperties = { width: '100%', margin: 0 };
  return (
    <>
      <div style={groupStyles}>
        <h4 style={headerStyles}>small</h4>
        <Button size="small">Text</Button>
        <Button size="small" icon={<CalendarMonth24Regular />}>
          Text
        </Button>
        <Button size="small" icon={<CalendarMonth24Regular />} />
      </div>
      <div style={groupStyles}>
        <h4 style={headerStyles}>medium</h4>
        <Button>Text</Button>
        <Button icon={<CalendarMonth24Regular />}>Text</Button>
        <Button icon={<CalendarMonth24Regular />} />
      </div>
      <div style={groupStyles}>
        <h4 style={headerStyles}>large</h4>
        <Button size="large">Text</Button>
        <Button size="large" icon={<CalendarMonth24Regular />}>
          Text
        </Button>
        <Button size="large" icon={<CalendarMonth24Regular />} />
      </div>
    </>
  );
};
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

export const DisabledButton = () => {
  const groupStyles: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5em' };

  return (
    <>
      <div style={groupStyles}>
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button disabledFocusable>Disabled focusable</Button>
      </div>
      <div style={groupStyles}>
        <Button primary icon={<CalendarMonth24Regular />}>
          Primary
        </Button>
        <Button primary disabled icon={<CalendarMonth24Regular />}>
          Primary disabled
        </Button>
        <Button primary disabledFocusable>
          Primary disabled focusable
        </Button>
      </div>
    </>
  );
};
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
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
