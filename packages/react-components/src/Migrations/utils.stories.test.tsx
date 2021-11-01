/* eslint-disable react/jsx-key */
import * as React from 'react';
import { Source } from '@storybook/addon-docs';
import { createRenderer } from 'react-test-renderer/shallow';
import { CodeExample } from './utils.stories';

function mockMDXSourceCodeBlock(source: string) {
  return {
    props: {
      children: {
        props: {
          children: source,
        },
      },
    },
  } as JSX.Element;
}

test('renders children', () => {
  const renderer = createRenderer();
  renderer.render(
    <CodeExample>
      <span>Child</span>
    </CodeExample>,
  );
  const result = renderer.getRenderOutput();

  expect(result.props).toEqual({
    children: 'Child',
  });
});

test('renders Markdown source blocks', () => {
  const renderer = createRenderer();
  renderer.render(
    <CodeExample>
      {mockMDXSourceCodeBlock(`\`\`\`js
        function test() {
          console.log("test");
        }
      \`\`\``)}
    </CodeExample>,
  );
  const result = renderer.getRenderOutput();

  expect(result.props).toEqual({
    children: [
      <h3>JavaScript</h3>,
      <Source
        code={`function test() {
          console.log("test");
        }`}
        language="js"
      />,
    ],
  });
});

test('uses JSX for no header JSX source code blocks', () => {
  const renderer = createRenderer();
  renderer.render(
    <CodeExample>
      {mockMDXSourceCodeBlock(`<div>
        <Test title={"Example"} />
      </div>`)}
    </CodeExample>,
  );
  const result = renderer.getRenderOutput();

  expect(result.props).toEqual({
    children: [
      <h3>React</h3>,
      <Source
        code={`<div>
        <Test title={"Example"} />
      </div>`}
        language="jsx"
      />,
    ],
  });
});

test.each([
  ['html', 'HTML'],
  ['css', 'CSS'],
  ['js', 'JavaScript'],
  ['jsx', 'React'],
])('for language %s uses the header %s', (language, expectedHeader) => {
  const renderer = createRenderer();
  renderer.render(
    <CodeExample>
      {mockMDXSourceCodeBlock(`
                \`\`\`${language}
                  Code
                \`\`\`
                `)}
    </CodeExample>,
  );
  const result = renderer.getRenderOutput();

  expect(result.props).toEqual({
    children: [<h3>{expectedHeader}</h3>, <Source code={`Code`} language={language} />],
  });
});

test('overrides the default title', () => {
  const renderer = createRenderer();
  renderer.render(
    <CodeExample title="Custom title">
      {mockMDXSourceCodeBlock(`
                \`\`\`js
                  Code
                \`\`\`
                `)}
    </CodeExample>,
  );
  const result = renderer.getRenderOutput();

  expect(result.props).toEqual({
    children: [<h3>Custom title</h3>, <Source code={`Code`} language="js" />],
  });
});
