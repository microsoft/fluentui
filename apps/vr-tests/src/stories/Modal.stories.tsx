import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Modal } from '@fluentui/react/lib/Modal';

storiesOf('Modal', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.ms-Modal' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Root', () => (
    <Modal isOpen isBlocking={false}>
      Modal content
    </Modal>
  ))
  .addStory('Modeless', () => (
    <Modal isModeless isOpen>
      Modeless Modal content
    </Modal>
  ));
