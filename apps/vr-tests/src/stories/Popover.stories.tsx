import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import { PositioningShorthandValue } from '@fluentui/react-positioning';

const ExampleContent = () => {
  return (
    <div>
      <h3>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

const positions: PositioningShorthandValue[] = [
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

const stories = storiesOf('Popover - positioning', module);

positions.forEach(position => {
  stories.addStory(
    position,
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
