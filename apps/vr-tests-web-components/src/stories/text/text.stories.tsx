import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { TextDefinition, FluentDesignSystem, colorNeutralBackground6 } from '@fluentui/web-components';

TextDefinition.define(FluentDesignSystem.registry);

export default {
  title: 'Text',
  decorators: [
    (story: () => React.ReactElement) => {
      return (
        <StoryWright steps={new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
          <div className="testWrapper" style={{ width: '322px' }}>
            {story()}
          </div>
        </StoryWright>
      );
    },
  ],
};

export const Default = () =>
  parse(`
  <fluent-text><span>Default</span></fluent-text>
  `);

export const Nowrap = () =>
  parse(`
  <fluent-text nowrap>
    <div style="display: block; width: 320px; border: 1px solid black;">
      This text will not wrap lines when it overflows the container.
    </div>
  </fluent-text>
`);

export const Truncate = () =>
  parse(`
  <fluent-text truncate nowrap>
    <div style="display: block; width: 320px; border: 1px solid black;">
      Setting <code>truncate</code> and <code>nowrap</code> will truncate when it overflows the container.
    </div>
  </fluent-text>
`);

export const Italic = () =>
  parse(`
  <fluent-text italic>
    <span>Italics are emphasized text.</span>
  </fluent-text>
`);

export const Underline = () =>
  parse(`
  <fluent-text underline>
    <span>Underlined text draws the reader's attention to the words.</span>
  </fluent-text>
`);

export const Strikethrough = () =>
  parse(`
  <fluent-text strikethrough>
    <span>Strikethrough text is used to indicate something that is no longer relevant.</span>
  </fluent-text>
`);

export const Block = () =>
  parse(`
  <span>
    <fluent-text style="background: ${colorNeutralBackground6}"
      ><span>Fluent text is inline by default. Setting</span></fluent-text
    >
    <fluent-text style="background: ${colorNeutralBackground6}" block><span>block</span></fluent-text>
    <fluent-text style="background: ${colorNeutralBackground6}"
      ><span>will make it behave as a block element.</span></fluent-text
    >
  </span>
`);

export const Size = () =>
  parse(`
  <div>
    <fluent-text block size="100"><span>100</span></fluent-text>
    <fluent-text block size="200"><span>200</span></fluent-text>
    <fluent-text block size="300"><span>300</span></fluent-text>
    <fluent-text block size="400"><span>400</span></fluent-text>
    <fluent-text block size="500"><span>500</span></fluent-text>
    <fluent-text block size="600"><span>600</span></fluent-text>
    <fluent-text block size="700"><span>700</span></fluent-text>
    <fluent-text block size="800"><span>800</span></fluent-text>
    <fluent-text block size="900"><span>900</span></fluent-text>
    <fluent-text block size="1000"><span>1000</span></fluent-text>
  </div>
`);

export const Weight = () =>
  parse(`
  <div>
    <fluent-text block weight="regular"><span>This text is regular.</span></fluent-text>
    <fluent-text block weight="medium"><span>This text is medium.</span></fluent-text>
    <fluent-text block weight="semibold"><span>This text is semibold.</span></fluent-text>
    <fluent-text block weight="bold"><span>This text is bold.</span></fluent-text>
  </div>
`);

export const Align = () =>
  parse(`
  <div
    style="display: flex; flex-direction: column; gap: 20px; width: 320px; border-left: 1px solid #000; border-right: 1px solid #000;"
  >
    <fluent-text block align="start">
      <span>Start aligned block.</span>
    </fluent-text>
    <fluent-text block align="end">
      <span>End aligned block.</span>
    </fluent-text>
    <fluent-text block align="center">
      <span>Center aligned block.</span>
    </fluent-text>
    <fluent-text block align="justify">
      <span>Justify aligned block text stretches wrapped lines to meet container edges.</span>
    </fluent-text>
  </div>
`);

export const Font = () =>
  parse(`
  <div>
    <fluent-text block font="base"><span>Font base.</span></fluent-text>
    <fluent-text block font="numeric"><span>Font numeric 0123456789.</span></fluent-text>
    <fluent-text block font="monospace"><span>Font monospace.</span></fluent-text>
  </div>
`);
