import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities/index';
import { Label } from '@fluentui/react';

storiesOf('Label', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>,
  )
  .addStory('Root', () => <Label>I'm a label</Label>, { rtl: true })
  .addStory('Disabled', () => <Label disabled>I'm a disabled label</Label>)
  .addStory('Required', () => <Label required>I'm a required label</Label>);
