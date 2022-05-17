import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Slider } from '@fluentui/react-slider';

storiesOf('Slider Converged', module)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory(
    'Horizontal',
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 15, width: 400 }}>
        <h5>Default</h5>
        <Slider className="test-class" defaultValue={30} />
        <h5>Disabled</h5>
        <Slider className="test-class" disabled defaultValue={30} />
        <h5>Origin</h5>
        <Slider className="test-class" origin={30} />
        <h5>Origin (min)</h5>
        <Slider className="test-class" min={0} origin={0} />
        <h5>Origin (max)</h5>
        <Slider className="test-class" max={10} origin={10} />
      </div>
    ),
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Vertical',
    () => (
      <div style={{ display: 'flex', gap: 50 }}>
        <div>
          <h5>Default</h5>
          <Slider vertical className="test-class" defaultValue={30} />
        </div>
        <div>
          <h5>Disabled</h5>
          <Slider vertical className="test-class" disabled defaultValue={30} />
        </div>
        <div>
          <h5>Origin</h5>
          <Slider vertical className="test-class" origin={30} />
        </div>
        <div>
          <h5>Origin (min)</h5>
          <Slider vertical className="test-class" min={0} origin={0} />
        </div>
        <div>
          <h5>Origin (max)</h5>
          <Slider vertical className="test-class" max={10} origin={10} />
        </div>
      </div>
    ),
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
