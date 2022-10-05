import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Progress } from '@fluentui/react-progress';
import { TestWrapperDecoratorNoAnimation } from '../utilities/TestWrapperDecorator';

storiesOf('Progress converged', module)
  .addDecorator(TestWrapperDecoratorNoAnimation)
  .addStory('Indeterminate', () => <Progress className="test-class" />, {
    includeDarkMode: true,
    includeHighContrast: true,
    includeRtl: true,
  })
  .addStory('Indeterminate with thickness medium', () => <Progress className="test-class" thickness="medium" />, {
    includeDarkMode: true,
    includeHighContrast: true,
    includeRtl: true,
  })
  .addStory('Indeterminate with thickness large', () => <Progress className="test-class" thickness="large" />, {
    includeDarkMode: true,
    includeHighContrast: true,
    includeRtl: true,
  })
  .addStory('Determinate', () => <Progress className="test-class" value={0.5} />, {
    includeDarkMode: true,
    includeHighContrast: true,
    includeRtl: true,
  })
  .addStory(
    'Determinate with thickness medium',
    () => <Progress className="test-class" value={0.5} thickness="medium" />,
    {
      includeDarkMode: true,
      includeHighContrast: true,
      includeRtl: true,
    },
  )
  .addStory(
    'Determinate with thickness large',
    () => <Progress className="test-class" value={0.5} thickness="large" />,
    {
      includeDarkMode: true,
      includeHighContrast: true,
      includeRtl: true,
    },
  );
