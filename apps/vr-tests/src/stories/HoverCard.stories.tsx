import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { HoverCard } from '@fluentui/react';

const onRenderCardContent = (item: any) => {
  return (
    <div style={{ padding: '10px' }}>
      <div>Card content goes here.</div>
      <div>Test string passed to cards: {item.test}</div>
    </div>
  );
};

const expandingCardProps = {
  onRenderCompactCard: onRenderCardContent,
  onRenderExpandedCard: onRenderCardContent,
  renderData: { test: 'Hello World!' },
};

export default {
  title: 'HoverCard',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-HoverCard-host')
        .snapshot('fully expanded with test content', { cropTo: '.ms-Layer' })
        .end(),
    ),
  ],
};

export const Root = () => (
  <HoverCard
    expandingCardProps={expandingCardProps}
    instantOpenOnClick={true}
    styles={{ host: { fontFamily: 'Segoe UI', fontSize: '14px', color: '#333333' } }}
  >
    Hover over me
  </HoverCard>
);

export const RootRTL = getStoryVariant(Root, RTL);
