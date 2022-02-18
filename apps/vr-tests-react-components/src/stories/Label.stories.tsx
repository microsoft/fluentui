import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Label } from '@fluentui/react-label';

storiesOf('Label Converged', module)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>,
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
  .addStory('Strong', () => <Label strong>I'm a strong label</Label>)
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
