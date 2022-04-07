import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner } from '@fluentui/react-spinner';
import { TestWrapperDecoratorNoAnimation } from '../utilities/TestWrapperDecorator';

storiesOf('Spinner converged', module)
  .addDecorator(TestWrapperDecoratorNoAnimation)
  .addStory('Primary', () => <Spinner className="test-class" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Label', () => <Spinner className="test-class" label="Loading" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Primary with Label Before',
    () => <Spinner className="test-class" labelPosition="before" label="Loading" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory(
    'Primary with Label After',
    () => <Spinner className="test-class" labelPosition="after" label="Loading" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory(
    'Primary with Label Above',
    () => <Spinner className="test-class" labelPosition="above" label="Loading" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Primary with Label Below',
    () => <Spinner className="test-class" labelPosition="below" label="Loading" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory('Primary with Size Tiny', () => <Spinner className="test-class" size="tiny" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Extra Small', () => <Spinner className="test-class" size="extra-small" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Small', () => <Spinner className="test-class" size="small" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Medium', () => <Spinner className="test-class" size="medium" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Large', () => <Spinner className="test-class" size="large" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Extra Large', () => <Spinner className="test-class" size="extra-large" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Huge', () => <Spinner className="test-class" size="huge" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Inverted', () => <Spinner className="test-class" appearance="inverted" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Inverted with Label', () => <Spinner className="test-class" appearance="inverted" label="Loading" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Inverted with Label Before',
    () => <Spinner className="test-class" appearance="inverted" labelPosition="before" label="Loading" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Inverted with Label After',
    () => <Spinner className="test-class" appearance="inverted" labelPosition="after" label="Loading" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Inverted with Label Above',
    () => <Spinner className="test-class" appearance="inverted" labelPosition="above" label="Loading" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Inverted with Label Below',
    () => <Spinner className="test-class" appearance="inverted" labelPosition="below" label="Loading" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory('Primary with Size Tiny', () => <Spinner className="test-class" appearance="inverted" size="tiny" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Inverted with Size Extra Small',
    () => <Spinner className="test-class" appearance="inverted" size="extra-small" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory('Inverted with Size Small', () => <Spinner className="test-class" appearance="inverted" size="small" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Inverted with Size Medium', () => <Spinner className="test-class" appearance="inverted" size="medium" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Inverted with Size Large', () => <Spinner className="test-class" appearance="inverted" size="large" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Inverted with Size Extra Large',
    () => <Spinner className="test-class" appearance="inverted" size="extra-large" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory('Inverted with Huge', () => <Spinner className="test-class" appearance="inverted" size="huge" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  });
