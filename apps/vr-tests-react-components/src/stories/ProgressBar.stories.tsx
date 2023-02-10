import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ProgressBar } from '@fluentui/react-progress';

storiesOf('ProgressBar converged', module)
  .addStory('Indeterminate', () => <ProgressBar />, {
    includeDarkMode: true,
    includeHighContrast: true,
    includeRtl: true,
  })
  .addStory('Indeterminate with thickness large', () => <ProgressBar thickness="large" />)
  .addStory('Determinate', () => <ProgressBar value={0.5} />, {
    includeDarkMode: true,
    includeHighContrast: true,
    includeRtl: true,
  })
  .addStory('Determinate with thickness large', () => <ProgressBar value={0.5} thickness="large" />)
  .addStory('Error', () => <ProgressBar value={0.5} validationState="error" />)
  .addStory('Warning', () => <ProgressBar value={0.5} validationState="warning" />)
  .addStory('Success', () => <ProgressBar value={0.5} validationState="success" />);
