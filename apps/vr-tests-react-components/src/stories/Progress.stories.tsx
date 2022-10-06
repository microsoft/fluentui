import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Progress } from '@fluentui/react-progress';
import { TestWrapperDecoratorNoAnimation } from '../utilities/TestWrapperDecorator';

storiesOf('Progress converged', module)
  .addDecorator(TestWrapperDecoratorNoAnimation)
  .addStory('Indeterminate', () => <Progress />, {
    includeDarkMode: true,
    includeHighContrast: true,
    includeRtl: true,
  })
  .addStory('Indeterminate with thickness large', () => <Progress thickness="large" />)
  .addStory('Determinate', () => <Progress value={0.5} />, {
    includeDarkMode: true,
    includeHighContrast: true,
    includeRtl: true,
  })
  .addStory('Determinate with thickness large', () => <Progress value={0.5} thickness="large" />);
