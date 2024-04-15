import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { Dropdown, Option, OptionGroup } from '@fluentui/react-combobox';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Dropdown Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('input')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .focus('input')
        .wait(250) // let focus border animation finish
        .snapshot('focused', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Appearance: outline (default)', () => (
    <Dropdown>
      <Option>text</Option>
    </Dropdown>
  ))
  .addStory('Appearance: underline', () => (
    <Dropdown appearance="underline">
      <Option>text</Option>
    </Dropdown>
  ))
  .addStory('Appearance: filled-darker', () => (
    <div style={{ background: '#00335c', padding: '10px' }}>
      <Dropdown appearance="filled-darker">
        <Option>text</Option>
      </Dropdown>
    </div>
  ))
  .addStory('Appearance: filled-lighter', () => (
    <div style={{ background: '#00335c', padding: '10px' }}>
      <Dropdown appearance="filled-lighter">
        <Option>text</Option>
      </Dropdown>
    </div>
  ))
  .addStory('Disabled', () => (
    <Dropdown disabled>
      <Option>text</Option>
    </Dropdown>
  ))
  .addStory('Disabled with value', () => (
    <Dropdown disabled value="text">
      <Option>text</Option>
    </Dropdown>
  ))
  .addStory('Invalid: outline', () => (
    <Dropdown aria-invalid>
      <Option>text</Option>
    </Dropdown>
  ))
  .addStory('Invalid: underline', () => (
    <Dropdown aria-invalid appearance="underline">
      <Option>text</Option>
    </Dropdown>
  ))
  .addStory('Invalid: filled-darker', () => (
    <div style={{ background: '#00335c', padding: '10px' }}>
      <Dropdown aria-invalid appearance="filled-darker">
        <Option>text</Option>
      </Dropdown>
    </div>
  ))
  .addStory('Invalid: filled-lighter', () => (
    <div style={{ background: '#00335c', padding: '10px' }}>
      <Dropdown aria-invalid appearance="filled-lighter">
        <Option>text</Option>
      </Dropdown>
    </div>
  ))
  .addStory('With placeholder', () => (
    <Dropdown placeholder="Select a Color">
      <Option>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </Dropdown>
  ))
  .addStory('With value', () => (
    <Dropdown value="Text text">
      <Option>text</Option>
    </Dropdown>
  ))
  .addStory('With multiselect value', () => (
    <Dropdown multiselect value="Green, Red" selectedOptions={['Green', 'Red']}>
      <Option>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </Dropdown>
  ))
  .addStory('Size: small', () => (
    <Dropdown size="small">
      <Option>text</Option>
    </Dropdown>
  ))
  .addStory('Size: large', () => (
    <Dropdown size="large">
      <Option>text</Option>
    </Dropdown>
  ));

// Option interaction stories
storiesOf('Dropdown Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('[role=option]')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .keys('input', 'ArrowDown')
        .snapshot('active option', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Open', () => (
    <Dropdown open>
      <Option>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </Dropdown>
  ))
  .addStory('Open with inlinePopup', () => (
    <Dropdown open inlinePopup>
      <Option>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </Dropdown>
  ))
  .addStory('When rendering inline, it should render on top of relatively positioned elements', () => (
    <>
      <Dropdown open inlinePopup>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>
      <button style={{ position: 'relative' }}>sample button</button>
    </>
  ))
  .addStory('Option with long content', () => (
    <Dropdown open>
      <Option>
        Blue indigo periwinkle azure sapphire ultramarine teal cerulean navy turquoise cyan cobalt blue indigo
        periwinkle azure sapphire ultramarine teal cerulean navy turquoise cyan cobalt
      </Option>
      <Option>Red</Option>
      <Option>Green</Option>
    </Dropdown>
  ))
  .addStory('With selection', () => (
    <Dropdown selectedOptions={['Red']} open>
      <Option>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </Dropdown>
  ))
  .addStory('With multiselect selection', () => (
    <Dropdown multiselect selectedOptions={['Green', 'Red']} open>
      <Option>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </Dropdown>
  ))
  .addStory('Disabled option', () => (
    <Dropdown open>
      <Option disabled>Red</Option>
      <Option>Green</Option>
      <Option>Blue</Option>
    </Dropdown>
  ))
  .addStory('Open with grouped options', () => (
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
  ));
