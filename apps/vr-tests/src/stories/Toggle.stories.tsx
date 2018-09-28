/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { IToggleProps, Toggle } from 'office-ui-fabric-react';

const baseProps: IToggleProps = {
  label: 'Toggle label',
  onText: 'On',
  offText: 'Off'
};

storiesOf('Toggle', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory('Checked', () => <Toggle {...baseProps} defaultChecked={true} />, { rtl: true })
  .addStory('Unchecked', () => <Toggle {...baseProps} defaultChecked={false} />, { rtl: true })
  .addStory('Disabled checked', () => <Toggle {...baseProps} defaultChecked={true} disabled={true} />)
  .addStory('Disabled unchecked', () => <Toggle {...baseProps} defaultChecked={false} disabled={true} />);
