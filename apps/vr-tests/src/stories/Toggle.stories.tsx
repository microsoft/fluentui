/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, TestWrapperDecorator, runStories } from '../utilities';
import { IToggleProps, Toggle } from 'office-ui-fabric-react';

const baseProps: IToggleProps = {
  label: 'Toggle label',
  onText: 'On',
  offText: 'Off'
};

const toggleStories = {
  decorators: [FabricDecorator, TestWrapperDecorator],
  stories: {
    'Checked': () => <Toggle {...baseProps} defaultChecked={true} />,
    'Unchecked': () => <Toggle {...baseProps} defaultChecked={false} />,
    'Disabled checked': () => <Toggle {...baseProps} defaultChecked={true} disabled={true} />,
    'Disabled unchecked': () => <Toggle {...baseProps} defaultChecked={false} disabled={true} />
  }
};

runStories('Toggle', toggleStories);
