import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
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

storiesOf('HoverCard', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-HoverCard-host')
        .snapshot('fully expanded with test content', { cropTo: '.ms-Layer' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory(
    'Root',
    () => (
      <HoverCard
        expandingCardProps={expandingCardProps}
        instantOpenOnClick={true}
        styles={{ host: { fontFamily: 'Segoe UI', fontSize: '14px', color: '#333333' } }}
      >
        Hover over me
      </HoverCard>
    ),
    { includeRtl: true },
  );
