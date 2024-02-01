import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CircleRegular, CircleFilled, SquareRegular, SquareFilled } from '@fluentui/react-icons';
import { RatingDisplay } from '@fluentui/react-rating-preview';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('RatingDisplay Converged Size', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addStory('RatingDisplay size small', () => <RatingDisplay size="small" value={3.5} />, {})
  .addStory(
    'RatingDisplay size small with value and count',
    () => <RatingDisplay size="small" value={5} count={1160} />,
    {},
  )
  .addStory('RatingDisplay size medium with value', () => <RatingDisplay size="medium" value={3} />, {})
  .addStory(
    'RatingDisplay size medium with value and count',
    () => <RatingDisplay size="medium" value={5} count={1160} />,
    {},
  )
  .addStory('RatingDisplay size large with value', () => <RatingDisplay size="large" value={3} />, {})
  .addStory(
    'RatingDisplay size large with value and count',
    () => <RatingDisplay size="large" value={5} count={1160} />,
    {},
  )
  .addStory('RatingDisplay size extra large with value', () => <RatingDisplay size="extra-large" value={3} />, {})
  .addStory(
    'RatingDisplay size extra large with value and count',
    () => <RatingDisplay size="extra-large" value={5} count={1160} />,
    {},
  );

storiesOf('RatingDisplay Converged Custom Icons', module)
  .addStory(
    'RatingDisplay with custom circle icons',
    () => <RatingDisplay iconFilled={<CircleFilled />} iconOutline={<CircleRegular />} value={3} />,
    {},
  )
  .addStory(
    'RatingDisplay with custom square icons',
    () => <RatingDisplay iconFilled={<SquareFilled />} iconOutline={<SquareRegular />} value={3} />,
    {},
  );

storiesOf('RatingDisplay Converged Color', module)
  .addStory('Neutral RatingDisplay with half value', () => <RatingDisplay value={2.5} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Brand RatingDisplay with half value', () => <RatingDisplay value={2.5} color="brand" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Marigold RatingDisplay with half value', () => <RatingDisplay value={2.5} color="marigold" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Compact RatingDisplay', () => <RatingDisplay compact value={3} />, {});
