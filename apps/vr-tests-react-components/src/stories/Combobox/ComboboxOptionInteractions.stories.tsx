import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import type { Meta } from '@storybook/react';
import { Combobox, Option, OptionGroup } from '@fluentui/react-combobox';
import { TestWrapperDecoratorFixedWidth } from '../../utilities';

export default {
  title: 'Combobox Converged',
  component: Combobox,
  decorators: [
    TestWrapperDecoratorFixedWidth,
    story => (
      <StoryWright
        steps={new Steps()
          .snapshot('default', { cropTo: '.testWrapper' })
          .hover('input')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .keys('input', 'ArrowDown')
          .snapshot('active option', { cropTo: '.testWrapper' })
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export const Open = () => (
  <div style={{ paddingBottom: '120px' }}>
    <Combobox open>
      <Option>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </Combobox>
  </div>
);

export const OpenWithInlinePopup = () => (
  <div style={{ paddingBottom: '120px' }}>
    <Combobox open inlinePopup>
      <Option>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </Combobox>
  </div>
);

OpenWithInlinePopup.storyName = 'Open with inlinePopup';

export const WhenRenderingInlineItShouldRenderOnTopOfRelativelyPositionedElements = () => (
  <div style={{ paddingBottom: '120px' }}>
    <Combobox open inlinePopup>
      <Option>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </Combobox>
    <button style={{ position: 'relative' }}>sample button</button>
  </div>
);

WhenRenderingInlineItShouldRenderOnTopOfRelativelyPositionedElements.storyName =
  'When rendering inline, it should render on top of relatively positioned elements';

export const OptionWithLongContent = () => (
  <div style={{ paddingBottom: '240px' }}>
    <Combobox open>
      <Option>
        Blue indigo periwinkle azure sapphire ultramarine teal cerulean navy turquoise cyan cobalt blue indigo
        periwinkle azure sapphire ultramarine teal cerulean navy turquoise cyan cobalt
      </Option>
      <Option>Red</Option>
      <Option>Green</Option>
    </Combobox>
  </div>
);

OptionWithLongContent.storyName = 'Option with long content';

export const WithSelection = () => (
  <div style={{ paddingBottom: '120px' }}>
    <Combobox selectedOptions={['Red']} open>
      <Option>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </Combobox>
  </div>
);

WithSelection.storyName = 'With selection';

export const WithMultiselectSelection = () => (
  <div style={{ paddingBottom: '120px' }}>
    <Combobox multiselect selectedOptions={['Green', 'Red']} open>
      <Option>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </Combobox>
  </div>
);

WithMultiselectSelection.storyName = 'With multiselect selection';

export const DisabledOption = () => (
  <div style={{ paddingBottom: '120px' }}>
    <Combobox open>
      <Option disabled>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </Combobox>
  </div>
);

DisabledOption.storyName = 'Disabled option';

export const OpenWithGroupedOptions = () => (
  <div style={{ paddingBottom: '300px' }}>
    <Combobox open>
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
    </Combobox>
  </div>
);

OpenWithGroupedOptions.storyName = 'Open with grouped options';
