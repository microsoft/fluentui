import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecoratorTall } from '../utilities/index';
import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';
import { DirectionalHint } from '@fluentui/react/lib/Callout';

storiesOf('TeachingBubble', module)
  .addDecorator(TestWrapperDecoratorTall)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.ms-TeachingBubble' }).end()}>
      {story()}
    </StoryWright>
  ))
  .addStory(
    'WideIllustration',
    () => {
      return (
        <TeachingBubble
          illustrationImage={{
            src: 'http://fabricweb.azureedge.net/fabric-website/placeholders/364x220.png',
          }}
          calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
          isWide={true}
          hasSmallHeadline={true}
          hasCloseButton={true}
          primaryButtonProps={{ children: 'Got it' }}
          headline="Discover what’s trending around you"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae
          quis aliquam magni harum non? Modal content
        </TeachingBubble>
      );
    },
    { includeRtl: true },
  )
  .addStory('SmallHeadline', () => {
    return (
      <TeachingBubble
        hasSmallHeadline={true}
        hasCloseButton={true}
        primaryButtonProps={{
          children: 'Got it',
        }}
        headline="Discover what’s trending around you"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae
        quis aliquam magni harum non?
      </TeachingBubble>
    );
  });
