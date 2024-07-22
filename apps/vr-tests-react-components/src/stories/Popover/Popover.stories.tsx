import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-popover';

import { withStoryWrightSteps, TestWrapperDecoratorFixedWidth } from '../../utilities';

export default {
  title: 'Popover Converged',
  decorators: [
    TestWrapperDecoratorFixedWidth,
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps().click('#show-popover').snapshot('PopoverSurface focused').end(),
      }),
  ],
} satisfies Meta<typeof Popover>;

export const AvoidScrolling = () => {
  return (
    <Popover trapFocus>
      <PopoverTrigger>
        <button id="show-popover">Show Popover</button>
      </PopoverTrigger>
      <PopoverSurface
        tabIndex={-1}
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '300px',
          maxHeight: '300px',
          overflowY: 'scroll',
        }}
      >
        <span>{sampleText}</span>
        <div>
          <button>close</button>
          <button>accept</button>
        </div>
      </PopoverSurface>
    </Popover>
  );
};
AvoidScrolling.storyName = 'avoid scrolling';

export const WhenRenderingInlineItShouldNotRenderBehindRelativelyPositionedElements = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Popover inline>
      <PopoverTrigger>
        <button id="show-popover">Show Popover</button>
      </PopoverTrigger>
      <PopoverSurface>
        <span>Sample PopoverSurface text</span>
      </PopoverSurface>
    </Popover>
    <input style={{ position: 'relative' }} />
  </div>
);

WhenRenderingInlineItShouldNotRenderBehindRelativelyPositionedElements.storyName =
  'when rendering inline, it should not render behind relatively positioned elements';

const sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
 et dolore magna aliqua. Felis donec et odio pellentesque diam volutpat commodo sed. In pellentesque massa placerat duis
 ultricies lacus sed turpis. Eros donec ac odio tempor. Mattis molestie a iaculis at erat. Aenean euismod elementum nisi
  quis eleifend quam. Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris. Sed euismod nisi porta
  lorem mollis aliquam ut porttitor leo. Lorem ipsum dolor sit amet. Id faucibus nisl tincidunt eget nullam. Fermentum
  posuere urna nec tincidunt praesent semper. Dolor sit amet consectetur adipiscing. Ut enim blandit volutpat maecenas
  volutpat blandit aliquam etiam erat. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed.
  Dignissim convallis aenean et tortor at risus. Tristique senectus et netus et malesuada. Sed blandit libero volutpat
  sed cras ornare arcu dui. Arcu dictum varius duis at consectetur lorem. Montes nascetur ridiculus mus mauris vitae. Ut
   ornare lectus sit amet est placerat in egestas.`;
