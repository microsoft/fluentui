import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CircleFilled, SquareFilled } from '@fluentui/react-icons';
import { RatingDisplay } from '@fluentui/react-rating';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';
import { Steps, StoryWright } from 'storywright';

storiesOf('RatingDisplay Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('rest', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory('no value', () => <RatingDisplay />)
  .addStory('size small with value and count', () => <RatingDisplay size="small" value={5} count={1160} />)
  .addStory('size medium with value and count', () => <RatingDisplay size="medium" value={5} count={1160} />)
  .addStory('size large with value and count', () => <RatingDisplay size="large" value={5} count={1160} />)
  .addStory('size extra-large with value and count', () => <RatingDisplay size="extra-large" value={5} count={1160} />)
  .addStory('custom circle icons', () => <RatingDisplay icon={CircleFilled} value={3} />)
  .addStory('custom square icons', () => <RatingDisplay icon={SquareFilled} value={3} />)
  .addStory('rounded up', () => <RatingDisplay value={3.8} />)
  .addStory('rounded down', () => <RatingDisplay value={3.7} />)
  .addStory('Neutral with half value', () => <RatingDisplay value={2.5} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Brand with half value', () => <RatingDisplay value={2.5} color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Marigold with half value', () => <RatingDisplay value={2.5} color="marigold" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Compact', () => <RatingDisplay compact value={3} />, {});
