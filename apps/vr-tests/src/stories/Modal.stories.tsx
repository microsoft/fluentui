/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Modal } from 'office-ui-fabric-react/lib/Modal';

storiesOf('Modal', module)
  .addDecorator(FabricDecorator)
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
  ));
