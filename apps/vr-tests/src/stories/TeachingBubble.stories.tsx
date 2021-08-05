import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities/index';
import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';
import { DirectionalHint } from '@fluentui/react/lib/Callout';

storiesOf('TeachingBubble', module)
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps().snapshot('default', { cropTo: '.ms-TeachingBubble' }).end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'WideIllustration',
    () => {
      return (
        <TeachingBubble
          illustrationImage={{ src: 'http://via.placeholder.com/364x220' }}
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
    { rtl: true },
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
