/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Overlay } from 'office-ui-fabric-react';

storiesOf('Overlay', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.ms-Overlay' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory(
    'Root',
    // prettier-ignore
    () => <Overlay>Overlay content</Overlay>,
    { rtl: true },
  )
  .addStory(
    'Dark',
    // prettier-ignore
    () => <Overlay isDarkThemed>Overlay content</Overlay>,
  );
