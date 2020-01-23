/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Panel, PanelType, SearchBox } from 'office-ui-fabric-react';

const defaultProps = {
  isOpen: true,
  children: 'Content goes here'
};

storiesOf('Panel', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default')
        .end()}
    >
      {story()}
    </Screener>
  )
  .add(
    'Small left w/ close button',
    () => (
      <Panel {...defaultProps} hasCloseButton type={PanelType.smallFixedNear} headerText="Small" />
    ),
    { rtl: true }
  )
  .add(
    'Small fixed right w/ close button',
    () => (
      <Panel
        {...defaultProps}
        hasCloseButton
        type={PanelType.smallFixedFar}
        headerText="Small fixed"
      />
    ),
    { rtl: true }
  )
  .add('Small fluid right', () => (
    <Panel {...defaultProps} type={PanelType.smallFluid} headerText="Small fluid" />
  ))
  .add(
    'Medium right',
    () => <Panel {...defaultProps} type={PanelType.medium} headerText="Medium" />,
    { rtl: true }
  )
  .add('Large right', () => <Panel {...defaultProps} type={PanelType.large} headerText="Large" />)
  .add('Large fixed right', () => (
    <Panel {...defaultProps} type={PanelType.largeFixed} headerText="Large fixed" />
  ))
  .add('Extra large right', () => (
    <Panel {...defaultProps} type={PanelType.extraLarge} headerText="Extra Large" />
  ))
  .add('Custom', () => (
    <Panel {...defaultProps} type={PanelType.custom} headerText="Custom" customWidth="200vw" />
  ))
  .add('Custom anchored left', () => (
    <Panel
      {...defaultProps}
      type={PanelType.customNear}
      headerText="Custom left"
      customWidth="320px"
    />
  ))
  .add('With no navigation', () => (
    <Panel
      {...defaultProps}
      type={PanelType.smallFixedFar}
      headerText="No navigation"
      hasCloseButton={false}
    />
  ));

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
  .add(
    'SearchBox and Right Panel',
    () => (
      <div>
        <SearchBox placeholder="Search" />
        <Panel
          {...defaultProps}
          isOpen={false}
          type={PanelType.medium}
          headerClassName=""
          headerText={'Header'}
          isHiddenOnDismiss
        >
          {null}
        </Panel>
      </div>
    ),
    { rtl: true }
  );
