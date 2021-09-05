import * as React from 'react';
import { Meta } from '@storybook/react';
import { CounterBadge, CounterBadgeProps } from '../../CounterBadge';
import descriptionMd from '../../BadgeDescription.md';
import bestPracticesMd from '../../BadgeBestPractices.md';

export const Default = (args: CounterBadgeProps) => <CounterBadge {...args} />;
Default.args = {
  count: 5,
};

export const Sizes = (args: CounterBadgeProps) => {
  return (
    <>
      <CounterBadge {...args} size="smallest" />
      <CounterBadge {...args} size="smaller" />
      <CounterBadge {...args} size="small" />
      <CounterBadge {...args} size="medium" />
      <CounterBadge {...args} size="large" />
      <CounterBadge {...args} size="larger" />
      <CounterBadge {...args} size="largest" />
    </>
  );
};
Sizes.args = {
  count: 5,
};
Sizes.parameters = {
  docs: {
    description: {
      story: 'A CounterBadge supports `smallest`, `smaller`, `small`, `medium`, `large`, `larger`, and `largest` sized',
    },
  },
};

export const Shapes = (args: CounterBadgeProps) => {
  return (
    <>
      <CounterBadge {...args} shape="rounded" />
      <CounterBadge {...args} shape="circular" />
    </>
  );
};

Shapes.args = {
  count: 5,
};

Shapes.parameters = {
  docs: {
    description: {
      story: 'A CounterBadge can be represented in the `rounded` and `circular` shapes.',
    },
  },
};

export const Appearance = (args: CounterBadgeProps) => {
  return (
    <>
      <CounterBadge {...args} appearance="filled" />
      <CounterBadge {...args} appearance="ghost" />
    </>
  );
};

Appearance.args = {
  count: 5,
};

Appearance.parameters = {
  docs: {
    description: {
      story: 'A CounterBadge can have appearance as `ghost`, `filled`',
    },
  },
};

export const Color = (args: CounterBadgeProps) => {
  return (
    <>
      <CounterBadge appearance="filled" color="brand" {...args} />
      <CounterBadge appearance="filled" color="danger" {...args} />
      <CounterBadge appearance="filled" color="important" {...args} />
      <CounterBadge appearance="filled" color="informative" {...args} />
      <CounterBadge appearance="filled" color="severe" {...args} />
      <CounterBadge appearance="filled" color="subtle" {...args} />
      <CounterBadge appearance="filled" color="success" {...args} />
      <CounterBadge appearance="filled" color="warning" {...args} />
    </>
  );
};

Color.args = {
  count: 5,
};

Color.parameters = {
  docs: {
    description: {
      story:
        'A CounterBadge has predefined set of colors for `warning`, `success`, `subtle`, `severe`, ' +
        '`informative`, `important`, `danger` and `brand`',
    },
  },
};

export const Dot = (args: CounterBadgeProps) => <CounterBadge {...args} />;

Dot.args = {
  count: 0,
  dot: true,
};

Dot.parameters = {
  docs: {
    description: {
      story: 'A Badge can be represented as a dot',
    },
  },
};

export default {
  title: 'Components/Counter Badge',
  component: CounterBadge,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
