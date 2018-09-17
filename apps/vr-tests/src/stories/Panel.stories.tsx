/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, runStories } from '../utilities';
import { Panel, PanelType, SearchBox } from 'office-ui-fabric-react';
import { setRTL } from 'office-ui-fabric-react/lib/Utilities';

const defaultProps = {
  isOpen: true,
  children: 'Content goes here'
};

const ScreenerDecorator = story => <Screener steps={new Screener.Steps().snapshot('default').end()}>{story()}</Screener>;
const SearchBoxDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default')
      .click('.ms-SearchBox-field')
      .snapshot('default')
      .end()}
  >
    {story()}
  </Screener>
);

const defaultStories = {
  decorators: [FabricDecorator, ScreenerDecorator],
  stories: {
    'Small left w/ close button': () => (
      <Panel {...defaultProps} hasCloseButton type={PanelType.smallFixedNear} headerText="Small" />
    ),
    'Small fixed right w/ close button': () => (
      <Panel {...defaultProps} hasCloseButton type={PanelType.smallFixedFar} headerText="Small fixed" />
    ),
    'Small fluid right': () => (
      <Panel {...defaultProps} type={PanelType.smallFluid} headerText="Small fluid" />
    ),
    'Medium right': () => (
      <Panel {...defaultProps} type={PanelType.medium} headerText="Medium" />
    ),
    'Large right': () => (
      <Panel {...defaultProps} type={PanelType.large} headerText="Large" />
    ),
    'Large fixed right': () => (
      <Panel {...defaultProps} type={PanelType.largeFixed} headerText="Large fixed" />
    ),
    'Extra large right': () => (
      <Panel {...defaultProps} type={PanelType.extraLarge} headerText="Extra Large" />
    ),
    'Custom': () => (
      <Panel {...defaultProps} type={PanelType.custom} headerText="Custom" customWidth="200vw" />
    )
  }
};

const searchBoxStories = {
  decorators: [FabricDecorator, SearchBoxDecorator],
  stories: {
    'SearchBox and Right Panel': () => (
      <div>
        <SearchBox placeholder="Search" />
        <Panel isOpen={false} type={PanelType.medium} headerClassName="" headerText={'Header'} isHiddenOnDismiss>
          {null}
        </Panel>
      </div>
    )
  }
};

runStories('Panel', defaultStories);
runStories('Panel', searchBoxStories);
