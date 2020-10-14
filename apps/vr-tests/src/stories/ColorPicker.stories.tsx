import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { ColorPicker, Fabric } from '@fluentui/react';

storiesOf('ColorPicker', module)
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
  .addStory(
    'Root',
    () => (
      <Fabric>
        <ColorPicker
          color="#FFF"
          styles={{
            input: { fontFamily: 'Segoe UI' },
          }}
        />
      </Fabric>
    ),
    {
      rtl: true,
    },
  )
  .addStory('Blue', () => (
    <Fabric>
      <ColorPicker
        color="#48B"
        styles={{
          input: { fontFamily: 'Segoe UI' },
        }}
      />
    </Fabric>
  ));
