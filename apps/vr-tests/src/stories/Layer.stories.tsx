import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Layer } from '@fluentui/react';

storiesOf('Layer', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.ms-Layer' })
        .end()}
    >
      {story()}
    </Screener>,
  )
  .addStory('Root', () => <Layer>Layer content</Layer>, { includeRtl: true });
