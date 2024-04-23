import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { CircleRegular, CircleFilled, SquareRegular, SquareFilled } from '@fluentui/react-icons';
import { Rating } from '@fluentui/react-rating';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Rating Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('rest', { cropTo: '.testWrapper' })
        .hover('input')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Neutral Rating with half star', () => <Rating defaultValue={3.5} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Brand Rating with half star', () => <Rating color="brand" defaultValue={3.5} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Marigold Rating with half star', () => <Rating color="marigold" defaultValue={3.5} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  });

storiesOf('Rating Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('rest', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory('Rating size small', () => <Rating size="small" />, {})
  .addStory('Rating size medium', () => <Rating size="medium" />, {})
  .addStory('Rating size large', () => <Rating size="large" />, {})
  .addStory('Rating size extra-large', () => <Rating size="extra-large" />, {});

storiesOf('Rating Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('rest', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory(
    'Rating with custom circle icons',
    () => <Rating iconFilled={CircleFilled} iconOutline={CircleRegular} defaultValue={3.5} />,
    {},
  )
  .addStory(
    'Rating with custom square icons',
    () => <Rating iconFilled={SquareFilled} iconOutline={SquareRegular} defaultValue={3.5} />,
    {},
  );
