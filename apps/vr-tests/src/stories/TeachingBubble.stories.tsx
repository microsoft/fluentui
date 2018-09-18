/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecoratorTall, runStories } from '../utilities';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { IImageProps } from 'office-ui-fabric-react/lib/Image';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { DirectionalHint } from 'office-ui-fabric-react/lib/common/DirectionalHint';

const examplePrimaryButton: IButtonProps = {
  children: 'Got it',
};

const exampleImageProps: IImageProps = { src: 'http://placehold.it/364x140' };

const TeachingBubbleDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default', { cropTo: '.ms-TeachingBubble' })
      .end()
    }
  >
    {story()}
  </Screener>
);

// tslint:disable:max-line-length
const teachingBubbleStories = {
  decorators: [FabricDecoratorTall, TeachingBubbleDecorator],
  stories: {
    'WideIllustration': () => (
      <TeachingBubble
        illustrationImage={exampleImageProps}
        calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
        isWide
        hasSmallHeadline
        hasCloseIcon
        primaryButtonProps={examplePrimaryButton}
        headline='Discover what’s trending around you'
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni harum non?
        Modal content
      </TeachingBubble>
    ),
    'SmallHeadline': () => (
      <TeachingBubble
        hasSmallHeadline
        hasCloseIcon
        primaryButtonProps={examplePrimaryButton}
        headline='Discover what’s trending around you'
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni harum non?
      </TeachingBubble>
    )
  }
};

runStories('TeachingBubble', teachingBubbleStories);
