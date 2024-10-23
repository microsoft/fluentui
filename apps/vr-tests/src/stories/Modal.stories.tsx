import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { Modal } from '@fluentui/react/lib/Modal';

export default {
  title: 'Modal',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.ms-Modal' }).end()),
  ],
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
