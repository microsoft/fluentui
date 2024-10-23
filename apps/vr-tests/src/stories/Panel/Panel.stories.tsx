import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { DefaultButton, Panel, PanelType, PrimaryButton } from '@fluentui/react';

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

export default {
  title: 'Panel',

  decorators: [TestWrapperDecorator, StoryWrightDecorator(new Steps().snapshot('default').end())],
};

export const SmallLeftWCloseButton = () => (
  <Panel {...defaultProps} hasCloseButton type={PanelType.smallFixedNear} headerText="Small" />
);

SmallLeftWCloseButton.storyName = 'Small left w/ close button';

export const SmallLeftWCloseButtonRTL = getStoryVariant(SmallLeftWCloseButton, RTL);

export const SmallFixedRightWCloseButton = () => (
  <Panel {...defaultProps} hasCloseButton type={PanelType.smallFixedFar} headerText="Small fixed" />
);

SmallFixedRightWCloseButton.storyName = 'Small fixed right w/ close button';

export const SmallFixedRightWCloseButtonRTL = getStoryVariant(SmallFixedRightWCloseButton, RTL);

export const SmallFluidRight = () => (
  <Panel {...defaultProps} type={PanelType.smallFluid} headerText="Small fluid" />
);

SmallFluidRight.storyName = 'Small fluid right';

export const MediumRight = () => (
  <Panel {...defaultProps} type={PanelType.medium} headerText="Medium" />
);

MediumRight.storyName = 'Medium right';

export const MediumRightRTL = getStoryVariant(MediumRight, RTL);

export const LargeRight = () => (
  <Panel {...defaultProps} type={PanelType.large} headerText="Large" />
);

LargeRight.storyName = 'Large right';

export const LargeFixedRight = () => (
  <Panel {...defaultProps} type={PanelType.largeFixed} headerText="Large fixed" />
);

LargeFixedRight.storyName = 'Large fixed right';

export const ExtraLargeRight = () => (
  <Panel {...defaultProps} type={PanelType.extraLarge} headerText="Extra Large" />
);

ExtraLargeRight.storyName = 'Extra large right';

export const Custom = () => (
  <Panel {...defaultProps} type={PanelType.custom} headerText="Custom" customWidth="200vw" />
);

export const CustomAnchoredLeft = () => (
  <Panel
    {...defaultProps}
    type={PanelType.customNear}
    headerText="Custom left"
    customWidth="320px"
  />
);

CustomAnchoredLeft.storyName = 'Custom anchored left';

export const WithNoNavigation = () => (
  <Panel
    {...defaultProps}
    type={PanelType.smallFixedFar}
    headerText="No navigation"
    hasCloseButton={false}
  />
);

WithNoNavigation.storyName = 'With no navigation';

export const WithCustomNavigation = () => (
  <Panel
    {...defaultProps}
    type={PanelType.smallFixedFar}
    headerText="custom navigation"
    onRenderNavigation={() => <DefaultButton>clickme</DefaultButton>}
  />
);

WithCustomNavigation.storyName = 'With custom navigation';

export const WithNoHeaderCloseButton = () => (
  <Panel {...defaultProps} type={PanelType.smallFixedFar} hasCloseButton={true} />
);

WithNoHeaderCloseButton.storyName = 'With no header, close button';

export const WithFooterAtTheBottom = () => (
  <Panel
    {...defaultProps}
    type={PanelType.smallFixedFar}
    headerText="Footer at bottom"
    onRenderFooterContent={onRenderFooterContent}
    isFooterAtBottom={true}
  />
);

WithFooterAtTheBottom.storyName = 'With footer at the bottom';
