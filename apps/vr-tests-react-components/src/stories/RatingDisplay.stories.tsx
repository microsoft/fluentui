import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CircleRegular, CircleFilled, SquareRegular, SquareFilled } from '@fluentui/react-icons';
import { RatingDisplay } from '@fluentui/react-rating-preview';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('RatingDisplay Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addStory('Neutral RatingDisplay size small with value', () => <RatingDisplay size="small" value={3} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Neutral RatingDisplay size small with value and count',
    () => <RatingDisplay size="small" value={5} count={1160} />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory('Neutral RatingDisplay size medium with value', () => <RatingDisplay size="medium" value={3} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Neutral RatingDisplay size medium with value and count',
    () => <RatingDisplay size="medium" value={5} count={1160} />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory('Neutral RatingDisplay size large with value', () => <RatingDisplay size="large" value={3} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Neutral RatingDisplay size large with value and count',
    () => <RatingDisplay size="large" value={5} count={1160} />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory('Neutral RatingDisplay size extra large with value', () => <RatingDisplay size="extra-large" value={3} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Neutral RatingDisplay size extra large with value and count',
    () => <RatingDisplay size="extra-large" value={5} count={1160} />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Neutral RatingDisplay with custom circle icons',
    () => <RatingDisplay iconFilled={<CircleFilled />} iconOutline={<CircleRegular />} value={3} />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Neutral RatingDisplay with custom square icons',
    () => <RatingDisplay iconFilled={<SquareFilled />} iconOutline={<SquareRegular />} value={3} />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('Neutral RatingDisplay with half value', () => <RatingDisplay value={2.5} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Brand RatingDisplay size small with value', () => <RatingDisplay size="small" value={3} color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Brand RatingDisplay size small with value and count',
    () => <RatingDisplay size="small" value={5} color="brand" count={1160} />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Brand RatingDisplay size medium with value',
    () => <RatingDisplay size="medium" value={3} color="brand" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Brand RatingDisplay size medium with value and count',
    () => <RatingDisplay size="medium" value={5} color="brand" count={1160} />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory('Brand RatingDisplay size large with value', () => <RatingDisplay size="large" value={3} color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Brand RatingDisplay size large with value and count',
    () => <RatingDisplay size="large" value={5} color="brand" count={1160} />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Brand RatingDisplay size extra large with value',
    () => <RatingDisplay size="extra-large" value={3} color="brand" />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Brand RatingDisplay size extra large with value and count',
    () => <RatingDisplay size="extra-large" value={5} color="brand" count={1160} />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Brand RatingDisplay with custom circle icons',
    () => <RatingDisplay iconFilled={<CircleFilled />} iconOutline={<CircleRegular />} color="brand" value={3} />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Brand RatingDisplay with custom square icons',
    () => <RatingDisplay iconFilled={<SquareFilled />} iconOutline={<SquareRegular />} color="brand" value={3} />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('Brand RatingDisplay with half value', () => <RatingDisplay value={2.5} color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Marigold RatingDisplay size small with value',
    () => <RatingDisplay size="small" value={3} color="marigold" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Marigold RatingDisplay size small with value and count',
    () => <RatingDisplay size="small" value={5} color="marigold" count={1160} />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Marigold RatingDisplay size medium with value',
    () => <RatingDisplay size="medium" value={3} color="marigold" />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Marigold RatingDisplay size medium with value and count',
    () => <RatingDisplay size="medium" value={5} color="marigold" count={1160} />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Marigold RatingDisplay size large with value',
    () => <RatingDisplay size="large" value={3} color="marigold" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Marigold RatingDisplay size large with value and count',
    () => <RatingDisplay size="large" value={5} color="marigold" count={1160} />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Marigold RatingDisplay size extra large with value',
    () => <RatingDisplay size="extra-large" value={3} color="marigold" />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Marigold RatingDisplay size extra large with value and count',
    () => <RatingDisplay size="extra-large" value={5} color="marigold" count={1160} />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Marigold RatingDisplay with custom circle icons',
    () => <RatingDisplay iconFilled={<CircleFilled />} iconOutline={<CircleRegular />} color="marigold" value={3} />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Marigold RatingDisplay with custom square icons',
    () => <RatingDisplay iconFilled={<SquareFilled />} iconOutline={<SquareRegular />} color="marigold" value={3} />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('Marigold RatingDisplay with half value', () => <RatingDisplay value={2.5} color="marigold" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Compact Neutral RatingDisplay', () => <RatingDisplay compact value={3} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Compact Brand RatingDisplay', () => <RatingDisplay compact value={3} color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Compact Marigold RatingDisplay', () => <RatingDisplay compact value={3} color="marigold" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  });
