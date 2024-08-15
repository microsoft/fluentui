import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecoratorTall } from '../utilities';
import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';
import { DirectionalHint } from '@fluentui/react/lib/Callout';

export default {
  title: 'TeachingBubble',

  decorators: [
    TestWrapperDecoratorTall,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.ms-TeachingBubble' }).end()),
  ],
};

export const WideIllustration = () => {
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
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis
      aliquam magni harum non? Modal content
    </TeachingBubble>
  );
};

WideIllustration.storyName = 'WideIllustration';

export const WideIllustrationRTL = getStoryVariant(WideIllustration, RTL);

export const SmallHeadline = () => {
  return (
    <TeachingBubble
      hasSmallHeadline={true}
      hasCloseButton={true}
      primaryButtonProps={{
        children: 'Got it',
      }}
      headline="Discover what’s trending around you"
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis
      aliquam magni harum non?
    </TeachingBubble>
  );
};

SmallHeadline.storyName = 'SmallHeadline';
