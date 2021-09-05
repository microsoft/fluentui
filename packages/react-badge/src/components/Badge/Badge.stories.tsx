import * as React from 'react';
import { Meta } from '@storybook/react';
import { Badge } from '@fluentui/react-badge';
import { AcceptIcon } from '../../tmp-icons.stories';
import descriptionMd from '../../BadgeDescription.md';
import bestPracticesMd from '../../BadgeBestPractices.md';

export const Default = () => <Badge />;

export const Sizes = () => {
  return (
    <>
      <Badge size="smallest" />
      <Badge size="smaller" />
      <Badge size="small" />
      <Badge size="medium" />
      <Badge size="large" />
      <Badge size="larger" />
      <Badge size="largest" />
    </>
  );
};

Sizes.parameters = {
  docs: {
    description: {
      story: 'A Badge supports `smallest`, `smaller`, `small`, `medium`, `large`, `larger`, and `largest` sized',
    },
  },
};

export const Shapes = () => {
  return (
    <>
      <Badge shape="square" />
      <Badge shape="rounded" />
      <Badge shape="circular" />
    </>
  );
};

Shapes.parameters = {
  docs: {
    description: {
      story: 'A Badge can be represented in the `square`, `rounded` and `circular` shapes.',
    },
  },
};

export const Appearance = () => {
  return (
    <>
      <Badge appearance="filled">999+</Badge>
      <Badge appearance="ghost">999+</Badge>
      <Badge appearance="outline">999+</Badge>
      <Badge appearance="tint">999+</Badge>
    </>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: 'A Badge can have appearance as `ghost`, `filled`, `outline`, `tint`',
    },
  },
};

export const Color = () => {
  return (
    <>
      <Badge appearance="filled" color="brand">
        999+
      </Badge>
      <Badge appearance="filled" color="danger">
        999+
      </Badge>
      <Badge appearance="filled" color="important">
        999+
      </Badge>
      <Badge appearance="filled" color="informative">
        999+
      </Badge>
      <Badge appearance="filled" color="severe">
        999+
      </Badge>
      <Badge appearance="filled" color="subtle">
        999+
      </Badge>
      <Badge appearance="filled" color="success">
        999+
      </Badge>
      <Badge appearance="filled" color="warning">
        999+
      </Badge>
    </>
  );
};

Color.parameters = {
  docs: {
    description: {
      story:
        'A Badge has predefined set of colors for `warning`, `success`, `subtle`, `severe`, ' +
        '`informative`, `important`, `danger` and `brand`',
    },
  },
};

export const BadgeWithIcon = () => {
  return <Badge size="medium" icon={<AcceptIcon />} />;
};

BadgeWithIcon.parameters = {
  docs: {
    description: {
      story: 'A Badge can contain an icon',
    },
  },
};

export default {
  title: 'Components/Badge',
  component: Badge,
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
