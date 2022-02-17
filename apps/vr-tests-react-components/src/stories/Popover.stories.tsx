import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Popover, PopoverTrigger, PopoverSurface, PopoverProps } from '@fluentui/react-popover';

const ExampleContent = () => {
  return (
    <div>
      <h3>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

const positions: NonNullable<PopoverProps['positioning']>[] = [
  'above',
  'above-end',
  'above-start',
  'below',
  'below-end',
  'below-start',
  'before',
  'before-bottom',
  'before-top',
  'after',
  'after-bottom',
  'after-top',
];

const stories = storiesOf('Popover Converged - positioning', module)
  .addDecorator(story => <Screener>{story()}</Screener>)
  .addDecorator(story => <div style={{ position: 'fixed', top: '50%', left: '50%' }}>{story()}</div>);

positions.forEach(position => {
  stories.addStory(
    position as string,
    () => (
      <Popover open positioning={position}>
        <PopoverTrigger>
          <button>Toggle menu</button>
        </PopoverTrigger>

        <PopoverSurface>
          <ExampleContent />
        </PopoverSurface>
      </Popover>
    ),
    { includeRtl: true },
  );
});
