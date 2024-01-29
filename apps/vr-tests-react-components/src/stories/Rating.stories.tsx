import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { CircleRegular, CircleFilled, SquareRegular, SquareFilled } from '@fluentui/react-icons';
import { Rating } from '@fluentui/react-rating-preview';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Rating Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('rest', { cropTo: '.testWrapper' })
        .hover('input')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('input')
        .snapshot('active', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Neutral Rating size small no value', () => <Rating size="small" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Neutral Rating size small with value', () => <Rating size="small" defaultValue={3} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Neutral Rating size small filled', () => <Rating size="small" defaultValue={5} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Neutral Rating size medium no value', () => <Rating size="medium" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Neutral Rating size medium with value', () => <Rating size="medium" defaultValue={3} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Neutral Rating size medium filled', () => <Rating size="medium" defaultValue={5} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Neutral Rating size large no value', () => <Rating size="large" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Neutral Rating size large with value', () => <Rating size="large" defaultValue={3} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Neutral Rating size large filled', () => <Rating size="large" defaultValue={5} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Neutral Rating size extra large no value', () => <Rating size="extra-large" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Neutral Rating size extra large with value', () => <Rating size="extra-large" defaultValue={3} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Neutral Rating size extra large filled', () => <Rating size="extra-large" defaultValue={5} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Neutral Rating with custom circle icons',
    () => <Rating iconFilled={<CircleFilled />} iconOutline={<CircleRegular />} defaultValue={3} />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Neutral Rating with custom square icons',
    () => <Rating iconFilled={<SquareFilled />} iconOutline={<SquareRegular />} defaultValue={3} />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('Neutral Rating with half value', () => <Rating defaultValue={2.5} step={0.5} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Brand Rating size small no value', () => <Rating size="small" color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Brand Rating size small with value', () => <Rating size="small" defaultValue={3} color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Brand Rating size small filled', () => <Rating size="small" defaultValue={5} color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Brand Rating size medium no value', () => <Rating size="medium" color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Brand Rating size medium with value', () => <Rating size="medium" defaultValue={3} color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Brand Rating size medium filled', () => <Rating size="medium" defaultValue={5} color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Brand Rating size large no value', () => <Rating size="large" color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Brand Rating size large with value', () => <Rating size="large" defaultValue={3} color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Brand Rating size large filled', () => <Rating size="large" defaultValue={5} color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Brand Rating size extra large no value', () => <Rating size="extra-large" color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Brand Rating size extra large with value',
    () => <Rating size="extra-large" defaultValue={3} color="brand" />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Brand Rating size extra large filled',
    () => <Rating size="extra-large" defaultValue={5} color="brand" />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Brand Rating with custom circle icons',
    () => <Rating iconFilled={<CircleFilled />} iconOutline={<CircleRegular />} color="brand" defaultValue={3} />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Brand Rating with custom square icons',
    () => <Rating iconFilled={<SquareFilled />} iconOutline={<SquareRegular />} color="brand" defaultValue={3} />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('Brand Rating with half value', () => <Rating defaultValue={2.5} step={0.5} color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Marigold Rating size small no value', () => <Rating size="small" color="marigold" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Marigold Rating size small with value', () => <Rating size="small" defaultValue={3} color="marigold" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Marigold Rating size small filled', () => <Rating size="small" defaultValue={5} color="marigold" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Marigold Rating size medium no value', () => <Rating size="medium" color="marigold" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Marigold Rating size medium with value',
    () => <Rating size="medium" defaultValue={3} color="marigold" />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('Marigold Rating size medium filled', () => <Rating size="medium" defaultValue={5} color="marigold" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Marigold Rating size large no value', () => <Rating size="large" color="marigold" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Marigold Rating size large with value', () => <Rating size="large" defaultValue={3} color="marigold" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Marigold Rating size large filled', () => <Rating size="large" defaultValue={5} color="marigold" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Marigold Rating size extra large no value', () => <Rating size="extra-large" color="marigold" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Marigold Rating size extra large with value',
    () => <Rating size="extra-large" defaultValue={3} color="marigold" />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Marigold Rating size extra large filled',
    () => <Rating size="extra-large" defaultValue={5} color="marigold" />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Marigold Rating with custom circle icons',
    () => <Rating iconFilled={<CircleFilled />} iconOutline={<CircleRegular />} color="marigold" defaultValue={3} />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Marigold Rating with custom square icons',
    () => <Rating iconFilled={<SquareFilled />} iconOutline={<SquareRegular />} color="marigold" defaultValue={3} />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('Marigold Rating with half value', () => <Rating defaultValue={2.5} step={0.5} color="marigold" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  });
