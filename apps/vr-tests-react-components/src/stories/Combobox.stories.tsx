import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { Combobox, Option, OptionGroup } from '@fluentui/react-combobox';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Combobox Converged', module)
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
    <Combobox>
      <Option>text</Option>
    </Combobox>
  ))
  .addStory('Appearance: underline', () => (
    <Combobox appearance="underline">
      <Option>text</Option>
    </Combobox>
  ))
  .addStory('Appearance: filled-darker', () => (
    <div style={{ background: '#00335c', padding: '10px' }}>
      <Combobox appearance="filled-darker">
        <Option>text</Option>
      </Combobox>
    </div>
  ))
  .addStory('Appearance: filled-lighter', () => (
    <div style={{ background: '#00335c', padding: '10px' }}>
      <Combobox appearance="filled-lighter">
        <Option>text</Option>
      </Combobox>
    </div>
  ))
  .addStory('Disabled', () => (
    <Combobox disabled>
      <Option>text</Option>
    </Combobox>
  ))
  .addStory('Disabled with value', () => (
    <Combobox disabled value="text">
      <Option>text</Option>
    </Combobox>
  ))
  .addStory('Invalid: outline', () => (
    <Combobox aria-invalid>
      <Option>text</Option>
    </Combobox>
  ))
  .addStory('Invalid: underline', () => (
    <Combobox aria-invalid appearance="underline">
      <Option>text</Option>
    </Combobox>
  ))
  .addStory('Invalid: filled-darker', () => (
    <div style={{ background: '#00335c', padding: '10px' }}>
      <Combobox aria-invalid appearance="filled-darker">
        <Option>text</Option>
      </Combobox>
    </div>
  ))
  .addStory('Invalid: filled-lighter', () => (
    <div style={{ background: '#00335c', padding: '10px' }}>
      <Combobox aria-invalid appearance="filled-lighter">
        <Option>text</Option>
      </Combobox>
    </div>
  ))
  .addStory('With placeholder', () => (
    <Combobox placeholder="Color">
      <Option>text</Option>
    </Combobox>
  ))
  .addStory('With value', () => (
    <Combobox value="Text text">
      <Option>text</Option>
    </Combobox>
  ))
  .addStory('Size: small', () => (
    <Combobox size="small">
      <Option>text</Option>
    </Combobox>
  ))
  .addStory('Size: large', () => (
    <Combobox size="large">
      <Option>text</Option>
    </Combobox>
  ));

// Option interaction stories
storiesOf('Combobox Converged', module)
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
    <div style={{ paddingBottom: '120px' }}>
      <Combobox open>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>
    </div>
  ))
  .addStory('Open with inlinePopup', () => (
    <div style={{ paddingBottom: '120px' }}>
      <Combobox open inlinePopup>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>
    </div>
  ))
  .addStory('When rendering inline, it should render on top of relatively positioned elements', () => (
    <div style={{ paddingBottom: '120px' }}>
      <Combobox open inlinePopup>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>
      <button style={{ position: 'relative' }}>sample button</button>
    </div>
  ))
  .addStory('Option with long content', () => (
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
  ))
  .addStory('With selection', () => (
    <div style={{ paddingBottom: '120px' }}>
      <Combobox selectedOptions={['Red']} open>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>
    </div>
  ))
  .addStory('With multiselect selection', () => (
    <div style={{ paddingBottom: '120px' }}>
      <Combobox multiselect selectedOptions={['Green', 'Red']} open>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>
    </div>
  ))
  .addStory('Disabled option', () => (
    <div style={{ paddingBottom: '120px' }}>
      <Combobox open>
        <Option disabled>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>
    </div>
  ))
  .addStory('Open with grouped options', () => (
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
  ));
