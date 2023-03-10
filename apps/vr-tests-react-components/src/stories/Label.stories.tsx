import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { Label } from '@fluentui/react-label';

storiesOf('Label Converged', module)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Root', () => <Label>I'm a label</Label>, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Disabled', () => <Label disabled>I'm a disabled label</Label>, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Required', () => <Label required>I'm a required label</Label>, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Semibold', () => <Label weight="semibold">I'm a semibold label</Label>)
  .addStory('Small', () => <Label size="small">I'm a small label</Label>)
  .addStory('Large', () => <Label size="large">I'm a large label</Label>)
  .addStory('CustomRequired', () => <Label required="**">I'm a label with custom required text</Label>, {
    includeRtl: true,
  })
  .addStory(
    'Multiline',
    () => (
      <div style={{ width: '200px' }}>
        <Label required>Super long label to show overflow into multiple lines</Label>
      </div>
    ),
    { includeRtl: true },
  );
