import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities/index';
import { Layer } from '@fluentui/react';

storiesOf('Layer', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Root', () => <Layer>Layer content</Layer>, { rtl: true });
