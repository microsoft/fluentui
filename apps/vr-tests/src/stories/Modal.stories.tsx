import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Modal } from '@fluentui/react/lib/Modal';

storiesOf('Modal', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.ms-Modal' })
        .end()}
    >
      {story()}
    </Screener>,
  )
  .addStory('Root', () => (
    <Modal isOpen isBlocking={false}>
      Modal content
    </Modal>
  ));
