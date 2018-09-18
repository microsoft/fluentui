/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, TestWrapperDecorator, runStories } from '../utilities';
import { Label, ILabelProps } from 'office-ui-fabric-react';

const labelStories = {
  decorators: [FabricDecorator, TestWrapperDecorator],
  stories: {
    'Root': () => <Label>I'm a label</Label>,
    'Disabled': () => <Label disabled>I'm a disabled label</Label>,
    'Required': () => <Label required>I'm a required label</Label>
  }
};

runStories('Label', labelStories);