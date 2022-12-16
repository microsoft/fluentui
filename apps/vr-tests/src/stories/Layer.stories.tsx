import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Layer } from 'office-ui-fabric-react';

storiesOf('Layer', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.ms-Layer' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Root', () => <Layer>Layer content</Layer>, { rtl: true });
