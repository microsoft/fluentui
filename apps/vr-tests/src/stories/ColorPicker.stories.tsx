/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, TestWrapperDecorator, runStories } from '../utilities';
import { ColorPicker } from 'office-ui-fabric-react';

const colorPickerStories = {
  decorators: [FabricDecorator, TestWrapperDecorator],
  stories: {
    'Root': () => <ColorPicker color='#FFF' />,
    'Blue': () => <ColorPicker color='#48B' />
  }
};

runStories('ColorPicker', colorPickerStories);