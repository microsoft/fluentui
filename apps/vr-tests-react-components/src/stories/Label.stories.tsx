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
  .addStory(
    'Variations',
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Label>This is a label</Label>
        <Label disabled>Disabled label</Label>
        <Label required>Required label</Label>
        <Label strong>Strong label</Label>
        <Label size="small">Small label</Label>
        <Label size="large">Large label</Label>
        <Label required="**">With custom required text</Label>
        <div style={{ width: '200px' }}>
          <Label required>Super long label to show overflow into multiple lines</Label>
        </div>
      </div>
    ),
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
