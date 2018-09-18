/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, runStories } from '../utilities';
import { Modal } from 'office-ui-fabric-react/lib/Modal';

const ModalDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default', { cropTo: '.ms-Modal' })
      .end()
    }
  >
    {story()}
  </Screener>
);

const modalStories = {
  decorators: [FabricDecorator, ModalDecorator],
  stories: {
    'Root': () => (
      <Modal
        isOpen
        isBlocking={false}
      >
        Modal content
      </Modal >
    )
  }
};

runStories('Modal', modalStories);