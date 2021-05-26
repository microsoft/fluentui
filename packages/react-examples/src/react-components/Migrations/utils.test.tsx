import * as React from 'react';
import { Source } from '@storybook/addon-docs/blocks';
import { createRenderer } from 'react-test-renderer/shallow';
import { CodeExample } from './utils';

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
      {
        {
          props: {
            children: {
              props: {
                children: `
                \`\`\`js
                console.log("test");
                \`\`\`
                `,
              },
            },
          },
        } as any
      }
    </CodeExample>,
  );
  const result = renderer.getRenderOutput();

  expect(result.props).toEqual({
    children: [<h3>JavaScript</h3>, <Source code={`console.log("test");`} language="js" />],
  });
});

test('uses JSX for no header JSX source code blocks', () => {
  const renderer = createRenderer();
  renderer.render(
    <CodeExample>
      {
        {
          props: {
            children: {
              props: {
                children: `<Test title={"Example"} />`,
              },
            },
          },
        } as any
      }
    </CodeExample>,
  );
  const result = renderer.getRenderOutput();

  expect(result.props).toEqual({
    children: [<h3>React</h3>, <Source code={`<Test title={\"Example\"} />`} language="jsx" />],
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
      {
        {
          props: {
            children: {
              props: {
                children: `
                \`\`\`${language}
                  Code
                \`\`\`
                `,
              },
            },
          },
        } as any
      }
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
      {
        {
          props: {
            children: {
              props: {
                children: `
                \`\`\`js
                  Code
                \`\`\`
                `,
              },
            },
          },
        } as any
      }
    </CodeExample>,
  );
  const result = renderer.getRenderOutput();

  expect(result.props).toEqual({
    children: [<h3>Custom title</h3>, <Source code={`Code`} language="js" />],
  });
});
