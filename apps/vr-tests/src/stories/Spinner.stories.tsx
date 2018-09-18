/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, TestWrapperDecorator, runStories } from '../utilities';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';

const spinnerStories = {
  decorators: [FabricDecorator, TestWrapperDecorator],
  stories: {
    'Extra small': () => <Spinner size={SpinnerSize.xSmall} />,
    'Small': () => <Spinner size={SpinnerSize.small} />,
    'Medium': () => <Spinner size={SpinnerSize.medium} />,
    'Large': () => <Spinner size={SpinnerSize.large} />,
    'Label': () => <Spinner size={SpinnerSize.medium} label='Spinner label' />
  }
};

runStories('Spinner', spinnerStories);