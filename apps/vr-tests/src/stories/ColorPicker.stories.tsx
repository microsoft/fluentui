/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { ColorPicker, Fabric } from 'office-ui-fabric-react';

storiesOf('ColorPicker', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => <Screener steps={new Screener.Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>)
  .addStory(
    'Root',
    () => (
      <Fabric>
        <ColorPicker
          color="#FFF"
          styles={{
            input: { fontFamily: 'Segoe UI' }
          }}
        />
      </Fabric>
    ),
    {
      rtl: true
    }
  )
  .addStory('Blue', () => (
    <Fabric>
      <ColorPicker
        color="#48B"
        styles={{
          input: { fontFamily: 'Segoe UI' }
        }}
      />
    </Fabric>
  ));
