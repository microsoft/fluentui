/* eslint-disable @typescript-eslint/naming-convention */

import * as React from 'react';
import { render } from '@testing-library/react';

import { CodeExample } from './utils.stories';

// Mock the Source component to verify it receives correct props
const mockSource = jest.fn(({ code, language }: { code: string; language: string }) => (
  <pre data-testid="source" data-language={language}>
    <code>{code}</code>
  </pre>
));

// `Source` wont be available in the test environment, so we need to mock it to test the code output
jest.mock('@storybook/addon-docs', () => ({
  Source: (props: { code: string; language: string }) => mockSource(props),
}));

function mockMDXSourceCodeBlock(source: string) {
  return {
    props: {
      children: {
        props: {
          children: source,
        },
      },
    },
  } as React.ReactElement;
}

beforeEach(() => {
  mockSource.mockClear();
});

test('renders children', () => {
  const { container } = render(
    <CodeExample>
      <span>Child</span>
    </CodeExample>,
  );

  expect(container.textContent).toBe('Child');
});

test('renders Markdown source blocks', () => {
  const { getByRole, getByTestId } = render(
    <CodeExample>
      {mockMDXSourceCodeBlock(`\`\`\`js
        function test() {
          console.log("test");
        }
      \`\`\``)}
    </CodeExample>,
  );

  // Test that CodeExample correctly parses and renders the header
  const heading = getByRole('heading', { level: 3 });
  expect(heading.textContent).toBe('JavaScript');

  // Verify Source component was called with correct props
  expect(mockSource).toHaveBeenCalledWith(
    expect.objectContaining({
      code: `function test() {
          console.log("test");
        }`,
      language: 'jsextra',
    }),
  );

  // Verify Source component rendered correctly
  const sourceElement = getByTestId('source');
  expect(sourceElement.getAttribute('data-language')).toBe('jsextra');
  expect(sourceElement.textContent).toContain('function test()');
});

test('uses JSX for no header JSX source code blocks', () => {
  const { getByRole, getByTestId } = render(
    <CodeExample>
      {mockMDXSourceCodeBlock(`<div>
        <Test title={"Example"} />
      </div>`)}
    </CodeExample>,
  );

  const heading = getByRole('heading', { level: 3 });
  expect(heading.textContent).toBe('React');

  // Verify Source component was called with JSX language
  expect(mockSource).toHaveBeenCalledWith(
    expect.objectContaining({
      code: `<div>
        <Test title={"Example"} />
      </div>`,
      language: 'jsx',
    }),
  );

  const sourceElement = getByTestId('source');
  expect(sourceElement.getAttribute('data-language')).toBe('jsx');
});

test.each([
  ['html', 'HTML'],
  ['css', 'CSS'],
  ['js', 'JavaScript'],
  ['jsx', 'React'],
])('for language %s uses the header %s', (language, expectedHeader) => {
  const { getByRole, getByTestId } = render(
    <CodeExample>
      {mockMDXSourceCodeBlock(`
                \`\`\`${language}
                  Code
                \`\`\`
                `)}
    </CodeExample>,
  );

  const resolvedLanguage = language === 'js' ? 'jsextra' : language;

  const heading = getByRole('heading', { level: 3 });
  expect(heading.textContent).toBe(expectedHeader);

  // Verify Source component was called with correct language
  expect(mockSource).toHaveBeenCalledWith(
    expect.objectContaining({
      code: 'Code',
      language: resolvedLanguage,
    }),
  );

  const sourceElement = getByTestId('source');
  expect(sourceElement.getAttribute('data-language')).toBe(resolvedLanguage);
  expect(sourceElement.textContent).toBe('Code');
});

test('overrides the default title', () => {
  const { getByRole, getByTestId } = render(
    <CodeExample title="Custom title">
      {mockMDXSourceCodeBlock(`
                \`\`\`js
                  Code
                \`\`\`
                `)}
    </CodeExample>,
  );

  const heading = getByRole('heading', { level: 3 });
  expect(heading.textContent).toBe('Custom title');

  // Verify Source component still receives correct code and language
  expect(mockSource).toHaveBeenCalledWith(
    expect.objectContaining({
      code: 'Code',
      language: 'jsextra',
    }),
  );

  const sourceElement = getByTestId('source');
  expect(sourceElement.getAttribute('data-language')).toBe('jsextra');
});
