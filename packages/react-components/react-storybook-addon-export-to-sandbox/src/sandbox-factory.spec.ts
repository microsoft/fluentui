import { ParametersExtension, StoryContext } from './types';
import { addDemoActionButton } from './sandbox-factory';
describe(`sandbox-factory`, () => {
  describe(`#addDemoActionButton`, () => {
    let submitSpy: ReturnType<typeof jest.fn>;
    beforeEach(() => {
      // https://github.com/jsdom/jsdom/issues/1937
      submitSpy = window.HTMLFormElement.prototype.submit = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    function setup(config: Pick<NonNullable<ParametersExtension['exportToSandbox']>, 'bundler' | 'provider'>) {
      const context = {
        story: 'Showcase',
        componentId: '',
        name: 'Showcase',
        title: 'DefaultTitle',
        kind: '',
        id: 'default',
        originalStoryFn: {
          name: 'DefaultTitle',
        },
        viewMode: 'docs',
        parameters: {
          fullSource: `
          import * as React from 'react';
          import { Text } from '@proj/react-components';

          export const Default = () => <Text>This is an example of the Text component's usage.</Text>;
          `,
          exportToSandbox: {
            ...config,
            requiredDependencies: {},
          },
        },
      } as unknown as StoryContext;
      const canvas = createCanvas(context.id);

      return { canvas, context };

      function createCanvas(id: string) {
        const root = document.createElement('div');
        root.id = 'docs-root';

        const content = `
    <div id="anchor--${id}">
      <div class="docs-story">
        <div class="css-x12m3">
          <button class="docblock-code-toggle">Show Code</button>
        </div>
      </div>
    </div>
  `;

        root.innerHTML = content;

        document.body.appendChild(root);

        return {
          getActionButton: () => document.querySelector('.with-code-sandbox-button') as HTMLButtonElement,
          getActionButtonsContainer: () => document.querySelector('.css-x12m3'),
          cleanup: () => root.remove(),
        };
      }
    }

    it.each([
      {
        bundler: 'cra',
        provider: 'codesandbox-browser',
        expected: `<button class="docblock-code-toggle with-code-sandbox-button">Open in CodeSandbox</button>`,
      },
      {
        bundler: 'cra',
        provider: 'codesandbox-cloud',
        expected: `<button class="docblock-code-toggle with-code-sandbox-button">Open in CodeSandbox</button>`,
      },
      {
        bundler: 'vite',
        provider: 'codesandbox-cloud',
        expected: `<button class="docblock-code-toggle with-code-sandbox-button">Open in CodeSandbox</button>`,
      },
      {
        bundler: 'cra',
        provider: 'stackblitz-cloud',
        expected: `<button class="docblock-code-toggle with-code-sandbox-button">Open in Stackblitz</button>`,
      },
      {
        bundler: 'vite',
        provider: 'stackblitz-cloud',
        expected: `<button class="docblock-code-toggle with-code-sandbox-button">Open in Stackblitz</button>`,
      },
    ] as const)(`should add action button based on configuration ($bundler, $provider)`, ({ expected, ...config }) => {
      const { canvas, context } = setup(config);
      addDemoActionButton(context);

      expect(canvas.getActionButtonsContainer()?.innerHTML).toEqual(expect.stringContaining(expected));

      canvas.cleanup();
    });

    it(`should submit form on click`, () => {
      const { canvas, context } = setup({ bundler: 'cra', provider: 'codesandbox-browser' });
      addDemoActionButton(context);

      const actionButton = canvas.getActionButton();
      actionButton.click();

      expect(submitSpy).toHaveBeenCalledTimes(1);

      canvas.cleanup();
    });
  });
});
