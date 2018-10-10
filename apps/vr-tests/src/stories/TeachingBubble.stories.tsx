/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { IImageProps } from 'office-ui-fabric-react/lib/Image';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { DirectionalHint } from 'office-ui-fabric-react/lib/common/DirectionalHint';

// tslint:disable:max-line-length
storiesOf('TeachingBubble', module)
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.ms-TeachingBubble' })
        .end()
      }
    >
      {story()}
    </Screener>
  ))
  .addStory('WideIllustration', () => {
    let exampleImageProps: IImageProps = { src: 'http://placehold.it/364x140' };
    let examplePrimaryButton: IButtonProps = {
      children: 'Got it',
    };
    return <TeachingBubble
      illustrationImage={exampleImageProps}
      calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
      isWide={true}
      hasSmallHeadline={true}
      hasCloseIcon={true}
      primaryButtonProps={examplePrimaryButton}
      headline='Discover what’s trending around you'
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni harum non?
      Modal content
    </TeachingBubble >
  }, { rtl: true })
  .addStory('SmallHeadline', () => {
    let examplePrimaryButton: IButtonProps = {
      children: 'Got it',
    };
    return <TeachingBubble
      hasSmallHeadline={true}
      hasCloseIcon={true}
      primaryButtonProps={examplePrimaryButton}
      headline='Discover what’s trending around you'
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni harum non?
    </TeachingBubble>
  });
