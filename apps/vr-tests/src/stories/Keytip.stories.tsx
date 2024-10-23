import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { DelayedRender, Keytip } from '@fluentui/react';

export default {
  title: 'Keytip',

  decorators: [
    story => (
      <div style={{ width: '50px', height: '50px' }}>
        <span data-ktp-target={'ktp-a'}>text</span>
        {story()}
      </div>
    ),
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
} satisfies Meta<typeof Keytip>;

export const Root = () => (
  <DelayedRender>
    <Keytip content={'A'} keySequences={['a']} visible={true} />
  </DelayedRender>
);

export const Disabled = () => (
  <DelayedRender>
    <Keytip content={'A'} keySequences={['a']} visible={true} disabled={true} />
  </DelayedRender>
);

export const Offset = () => (
  <DelayedRender>
    <Keytip content={'A'} keySequences={['a']} visible={true} offset={{ x: 15, y: 15 }} />
  </DelayedRender>
);
