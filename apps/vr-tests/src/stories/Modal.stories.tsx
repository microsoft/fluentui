import * as React from 'react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { TestWrapperDecorator } from '../utilities';
import { Modal } from '@fluentui/react/lib/Modal';

export default {
  title: 'Modal',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: { steps: new Steps().snapshot('default', { cropTo: '.ms-Modal' }).end() },
  } satisfies StoryParameters,
};

export const Root = () => (
  <Modal isOpen isBlocking={false}>
    Modal content
  </Modal>
);

export const Modeless = () => (
  <Modal isModeless isOpen>
    Modeless Modal content
  </Modal>
);
