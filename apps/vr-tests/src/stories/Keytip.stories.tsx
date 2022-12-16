/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Keytip } from 'office-ui-fabric-react';

storiesOf('Keytip', module)
  .addDecorator(story => (
    <div style={{ width: '50px', height: '50px' }}>
      <span data-ktp-target={'ktp-a'} />
      {story()}
    </div>
  ))
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Root', () => <Keytip content={'A'} keySequences={['a']} visible={true} />)
  .addStory('Disabled', () => (
    <Keytip content={'A'} keySequences={['a']} visible={true} disabled={true} />
  ))
  .addStory('Offset', () => (
    <Keytip content={'A'} keySequences={['a']} visible={true} offset={{ x: 15, y: 15 }} />
  ));
