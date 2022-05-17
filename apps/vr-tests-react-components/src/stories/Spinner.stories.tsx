import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner, SpinnerProps } from '@fluentui/react-spinner';
import { TestWrapperDecoratorNoAnimation } from '../utilities/TestWrapperDecorator';

storiesOf('Spinner converged', module)
  .addDecorator(TestWrapperDecoratorNoAnimation)
  .addStory(
    'Label',
    () => {
      const positions: SpinnerProps['labelPosition'][] = ['before', 'after', 'above', 'below'];
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 10 }}>
          <h4>Primary</h4>
          {positions.map(position => (
            <Spinner key={position} labelPosition={position} label={`Label ${position}`} />
          ))}
          <h4>Inverted</h4>
          {positions.map(position => (
            <Spinner appearance="inverted" key={position} labelPosition={position} label={`Label ${position}`} />
          ))}
        </div>
      );
    },
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'size',
    () => {
      const sizes: SpinnerProps['size'][] = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large', 'huge'];
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 10 }}>
          <h4>Primary</h4>
          {sizes.map(size => (
            <Spinner key={size} size={size} label={size} />
          ))}
          <h4>Inverted</h4>
          {sizes.map(size => (
            <Spinner appearance="inverted" key={size} size={size} label={size} />
          ))}
        </div>
      );
    },
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
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
