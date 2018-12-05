/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { ColorPicker, rgb2hex } from 'office-ui-fabric-react';

storiesOf('ColorPicker', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => <Screener steps={new Screener.Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>)
  .addStory('Root', () => <ColorPicker color="#FFF" styles={{ tableHeader: { fontFamily: 'Segoe UI' } }} />, {
    rtl: true
  })
  .addStory('Blue', () => <ColorPicker color="#48B" styles={{ tableHeader: { fontFamily: 'Segoe UI' } }} />);
