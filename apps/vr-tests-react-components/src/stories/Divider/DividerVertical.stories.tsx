import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Divider } from '@fluentui/react-divider';
import { Steps, StoryWright } from 'storywright';

import { TestWrapperDecorator } from '../../utilities';

export default {
  title: 'Divider Converged - Vertical',

  decorators: [
    TestWrapperDecorator,
    story => (
      <div style={{ height: '200px' }}>
        <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
      </div>
    ),
  ],
} satisfies Meta<typeof Divider>;

export const CenterAligned = () => <Divider vertical>Today</Divider>;

export const CenterAlignedMultiline = () => (
  <Divider vertical>
    Yesterday
    <br />
    Today
    <br />
    Tomorrow
  </Divider>
);

export const StartAligned = () => (
  <Divider vertical alignContent="start">
    Today
  </Divider>
);

export const StartAlignedMultiline = () => (
  <Divider vertical alignContent="start">
    Yesterday
    <br />
    Today
    <br />
    Tomorrow
  </Divider>
);

export const EndAligned = () => (
  <Divider vertical alignContent="end">
    Today
  </Divider>
);

export const EndAlignedMultiline = () => (
  <Divider vertical alignContent="end">
    Yesterday
    <br />
    Today
    <br />
    Tomorrow
  </Divider>
);

export const Inset = () => (
  <Divider inset vertical>
    Today
  </Divider>
);
Inset.storyName = 'inset';
