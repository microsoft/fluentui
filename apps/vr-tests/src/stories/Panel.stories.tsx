import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { DefaultButton, Panel, PanelType, PrimaryButton, SearchBox } from '@fluentui/react';

const defaultProps = {
  isOpen: true,
  children: 'Content goes here',
};

const onRenderFooterContent = () => (
  <div>
    <PrimaryButton>Save</PrimaryButton>
    <DefaultButton>Cancel</DefaultButton>
  </div>
);

storiesOf('Panel', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default')
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory(
    'Small left w/ close button',
    () => (
      <Panel {...defaultProps} hasCloseButton type={PanelType.smallFixedNear} headerText="Small" />
    ),
    { includeRtl: true },
  )
  .addStory(
    'Small fixed right w/ close button',
    () => (
      <Panel
        {...defaultProps}
        hasCloseButton
        type={PanelType.smallFixedFar}
        headerText="Small fixed"
      />
    ),
    { includeRtl: true },
  )
  .addStory('Small fluid right', () => (
    <Panel {...defaultProps} type={PanelType.smallFluid} headerText="Small fluid" />
  ))
  .addStory(
    'Medium right',
    () => <Panel {...defaultProps} type={PanelType.medium} headerText="Medium" />,
    { includeRtl: true },
  )
  .addStory('Large right', () => (
    <Panel {...defaultProps} type={PanelType.large} headerText="Large" />
  ))
  .addStory('Large fixed right', () => (
    <Panel {...defaultProps} type={PanelType.largeFixed} headerText="Large fixed" />
  ))
  .addStory('Extra large right', () => (
    <Panel {...defaultProps} type={PanelType.extraLarge} headerText="Extra Large" />
  ))
  .addStory('Custom', () => (
    <Panel {...defaultProps} type={PanelType.custom} headerText="Custom" customWidth="200vw" />
  ))
  .addStory('Custom anchored left', () => (
    <Panel
      {...defaultProps}
      type={PanelType.customNear}
      headerText="Custom left"
      customWidth="320px"
    />
  ))
  .addStory('With no navigation', () => (
    <Panel
      {...defaultProps}
      type={PanelType.smallFixedFar}
      headerText="No navigation"
      hasCloseButton={false}
    />
  ))
  .addStory('With custom navigation', () => (
    <Panel
      {...defaultProps}
      type={PanelType.smallFixedFar}
      headerText="custom navigation"
      onRenderNavigation={() => <DefaultButton>clickme</DefaultButton>}
    />
  ))
  .addStory('With no header, close button', () => (
    <Panel {...defaultProps} type={PanelType.smallFixedFar} hasCloseButton={true} />
  ))
  .addStory('With footer at the bottom', () => (
    <Panel
      {...defaultProps}
      type={PanelType.smallFixedFar}
      headerText="Footer at bottom"
      onRenderFooterContent={onRenderFooterContent}
      isFooterAtBottom={true}
    />
  ));

storiesOf('Panel', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps().snapshot('default').click('.ms-SearchBox-field').snapshot('click').end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory(
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
    { includeRtl: true },
  );
