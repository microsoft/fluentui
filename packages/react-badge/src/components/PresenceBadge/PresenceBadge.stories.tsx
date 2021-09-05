import * as React from 'react';
import { Meta } from '@storybook/react';
import { PresenceBadge } from '@fluentui/react-badge';
import descriptionMd from '../../BadgeDescription.md';
import bestPracticesMd from '../../BadgeBestPractices.md';

export const Default = () => <PresenceBadge />;

export const Sizes = () => {
  return (
    <>
      <PresenceBadge size="smallest" />
      <PresenceBadge size="smaller" />
      <PresenceBadge size="small" />
      <PresenceBadge size="medium" />
      <PresenceBadge size="large" />
      <PresenceBadge size="larger" />
    </>
  );
};

Sizes.parameters = {
  docs: {
    description: {
      story: 'A PresenceBadge supports `smallest`, `smaller`, `small`, `medium`, `large`, and `larger` sizes',
    },
  },
};

export const Status = () => {
  return (
    <>
      <PresenceBadge status="available" />
      <PresenceBadge status="away" />
      <PresenceBadge status="busy" />
      <PresenceBadge status="doNotDisturb" />
      <PresenceBadge status="offline" />
      <PresenceBadge status="outOfOffice" />
    </>
  );
};

Status.parameters = {
  docs: {
    description: {
      story:
        'A PresenceBadge supports `available`, `away`, `busy`, `doNotDisutrb`, ' +
        '`offline`, and `outOfOffice` status',
    },
  },
};

export const OutOfOffice = () => {
  return (
    <>
      <PresenceBadge outOfOffice status="available" />
      <PresenceBadge outOfOffice status="away" />
      <PresenceBadge outOfOffice status="busy" />
      <PresenceBadge outOfOffice status="doNotDisturb" />
      <PresenceBadge outOfOffice status="offline" />
      <PresenceBadge outOfOffice status="outOfOffice" />
    </>
  );
};

OutOfOffice.parameters = {
  docs: {
    description: {
      story:
        'A PresenceBadge supports `available`, `away`, `busy`, `doNotDisutrb`, ' +
        '`offline`, and `outOfOffice` status on outOfOffice mode',
    },
  },
};

export default {
  title: 'Components/Presence Badge',
  component: PresenceBadge,
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
