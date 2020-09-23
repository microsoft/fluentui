/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Modal } from '@fluentui/react-next';

storiesOf('Modal Next', module)
  .addDecorator(FabricDecorator)
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
