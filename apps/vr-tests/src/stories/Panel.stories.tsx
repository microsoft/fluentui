/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Panel, PanelType, SearchBox } from 'office-ui-fabric-react';

Panel.defaultProps = {
  isOpen: true,
  children: 'Content goes here'
};

storiesOf('Panel', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => <Screener steps={new Screener.Steps().snapshot('default').end()}>{story()}</Screener>)
  .add('Small left w/ close button', () => <Panel hasCloseButton type={PanelType.smallFixedNear} headerText="Small" />)
  .add('Small fixed right w/ close button', () => (
    <Panel hasCloseButton type={PanelType.smallFixedFar} headerText="Small fixed" />
  ))
  .add('Small fluid right', () => <Panel type={PanelType.smallFluid} headerText="Small fluid" />)
  .add('Medium right', () => <Panel type={PanelType.medium} headerText="Medium" />)
  .add('Large right', () => <Panel type={PanelType.large} headerText="Large" />)
  .add('Large fixed right', () => <Panel type={PanelType.largeFixed} headerText="Large fixed" />)
  .add('Extra large right', () => <Panel type={PanelType.extraLarge} headerText="Extra Large" />);

storiesOf('Panel', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default')
        .click('.ms-SearchBox-field')
        .snapshot('click')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .add('SearchBox and Right Panel', () => (
    <div>
      <SearchBox placeholder="Search" />
      <Panel isOpen={false} type={PanelType.medium} headerClassName="" headerText={'Header'} isHiddenOnDismiss>
        {null}
      </Panel>
    </div>
  ));
