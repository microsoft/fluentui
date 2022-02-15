import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Switch } from '@fluentui/react-switch';

storiesOf('Switch Converged', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.test-class')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.test-class')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.test-class')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Root (unchecked)', () => <Switch className="test-class" defaultChecked={false} />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Root (checked)', () => <Switch className="test-class" defaultChecked={true} />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Disabled (unchecked)', () => <Switch className="test-class" disabled defaultChecked={false} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Disabled (checked)', () => <Switch className="test-class" disabled defaultChecked={true} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  });
