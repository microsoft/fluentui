/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Rating, RatingSize } from 'office-ui-fabric-react';

storiesOf('Rating', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('button.ms-Rating-button:nth-of-type(2)')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Root', () => <Rating min={1} max={5} />)
  .addStory('Rated', () => <Rating min={1} max={5} rating={2} />, { rtl: true })
  .addStory('Large', () => <Rating min={1} max={5} size={RatingSize.Large} />)
  .addStory('Disabled', () => <Rating min={1} max={5} disabled />);
