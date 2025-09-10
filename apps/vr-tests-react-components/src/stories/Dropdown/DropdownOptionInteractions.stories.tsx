import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Dropdown, Option, OptionGroup } from '@fluentui/react-combobox';
import { Steps, StoryWright } from 'storywright';

import { TestWrapperDecoratorFixedWidth } from '../../utilities';

export default {
  title: 'Dropdown Converged',

  decorators: [
    TestWrapperDecoratorFixedWidth,
    story => (
      <StoryWright
        steps={new Steps()
          .snapshot('default', { cropTo: '.testWrapper' })
          .hover('[role=combobox]')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .keys('input', 'ArrowDown')
          .snapshot('active option', { cropTo: '.testWrapper' })
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} satisfies Meta<typeof Dropdown>;

export const Open = () => (
  <Dropdown open>
    <Option>Red</Option>
    <Option>Green</Option>
    <Option>Blue</Option>
  </Dropdown>
);

export const OpenWithInlinePopup = () => (
  <Dropdown open inlinePopup>
    <Option>Red</Option>
    <Option>Green</Option>
    <Option>Blue</Option>
  </Dropdown>
);
OpenWithInlinePopup.storyName = 'Open with inlinePopup';

export const WhenRenderingInlineItShouldRenderOnTopOfRelativelyPositionedElements = () => (
  <>
    <Dropdown open inlinePopup>
      <Option>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </Dropdown>
    <button style={{ position: 'relative' }}>sample button</button>
  </>
);

WhenRenderingInlineItShouldRenderOnTopOfRelativelyPositionedElements.storyName =
  'When rendering inline, it should render on top of relatively positioned elements';

export const OptionWithLongContent = () => (
  <Dropdown open>
    <Option>
      Blue indigo periwinkle azure sapphire ultramarine teal cerulean navy turquoise cyan cobalt blue indigo periwinkle
      azure sapphire ultramarine teal cerulean navy turquoise cyan cobalt
    </Option>
    <Option>Red</Option>
    <Option>Green</Option>
  </Dropdown>
);
OptionWithLongContent.storyName = 'Option with long content';

export const WithSelection = () => (
  <Dropdown selectedOptions={['Red']} open>
    <Option>Red</Option>
    <Option>Green</Option>
    <Option>Blue</Option>
  </Dropdown>
);
WithSelection.storyName = 'With selection';

export const WithMultiselectSelection = () => (
  <Dropdown multiselect selectedOptions={['Green', 'Red']} open>
    <Option>Red</Option>
    <Option>Green</Option>
    <Option>Blue</Option>
  </Dropdown>
);
WithMultiselectSelection.storyName = 'With multiselect selection';

export const DisabledOption = () => (
  <Dropdown open>
    <Option disabled>Red</Option>
    <Option>Green</Option>
    <Option>Blue</Option>
  </Dropdown>
);
DisabledOption.storyName = 'Disabled option';

export const OpenWithGroupedOptions = () => (
  <Dropdown open>
    <OptionGroup label="Colors">
      <Option>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </OptionGroup>
    <OptionGroup label="Shapes">
      <Option>Circle</Option>
      <Option>Square</Option>
      <Option>Oval</Option>
    </OptionGroup>
  </Dropdown>
);
OpenWithGroupedOptions.storyName = 'Open with grouped options';
