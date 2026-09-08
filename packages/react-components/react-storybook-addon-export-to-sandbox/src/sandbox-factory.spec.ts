import { ParametersExtension, StoryContext } from './types';
import { addDemoActionButtons } from './sandbox-factory';
describe(`sandbox-factory`, () => {
  describe(`#addDemoActionButtons`, () => {
    let submitSpy: ReturnType<typeof jest.fn>;
    let windowOpenSpy: jest.SpyInstance;
    beforeEach(() => {
      // https://github.com/jsdom/jsdom/issues/1937
      submitSpy = window.HTMLFormElement.prototype.submit = jest.fn();
      windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(jest.fn());
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
          getNewTabButton: () => document.querySelector('.with-open-in-new-tab-button') as HTMLButtonElement,
          getActionButtonsContainer: () => document.querySelector('.css-x12m3'),
          cleanup: () => root.remove(),
        };
      }
    }

    const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><path d="M11 8.5v3a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1H6"></path><path d="M8.5 1.5H13v4.5"></path><path d="M13 1.5 6.5 8"></path></svg>`;

    describe('open in sandbox button', () => {
      it.each([
        {
          bundler: 'cra',
          provider: 'codesandbox-browser',
          expected: `<button class="docblock-code-toggle with-code-sandbox-button">${svgIcon} Open in CodeSandbox</button>`,
        },
        {
          bundler: 'cra',
          provider: 'codesandbox-cloud',
          expected: `<button class="docblock-code-toggle with-code-sandbox-button">${svgIcon} Open in CodeSandbox</button>`,
        },
        {
          bundler: 'vite',
          provider: 'codesandbox-cloud',
          expected: `<button class="docblock-code-toggle with-code-sandbox-button">${svgIcon} Open in CodeSandbox</button>`,
        },
        {
          bundler: 'cra',
          provider: 'stackblitz-cloud',
          expected: `<button class="docblock-code-toggle with-code-sandbox-button">${svgIcon} Open in Stackblitz</button>`,
        },
        {
          bundler: 'vite',
          provider: 'stackblitz-cloud',
          expected: `<button class="docblock-code-toggle with-code-sandbox-button">${svgIcon} Open in Stackblitz</button>`,
        },
      ] as const)(
        `should add action button based on configuration ($bundler, $provider)`,
        ({ expected, ...config }) => {
          const { canvas, context } = setup(config);
          addDemoActionButtons(context);

          expect(canvas.getActionButtonsContainer()?.innerHTML).toEqual(expect.stringContaining(expected));

          canvas.cleanup();
        },
      );

      it(`should submit form on click`, () => {
        const { canvas, context } = setup({ bundler: 'cra', provider: 'codesandbox-browser' });
        addDemoActionButtons(context);

        const actionButton = canvas.getActionButton();
        actionButton.click();

        expect(submitSpy).toHaveBeenCalledTimes(1);

        canvas.cleanup();
      });
    });

    describe('open in new tab button', () => {
      it(`should add button alongside sandbox button`, () => {
        const { canvas, context } = setup({ bundler: 'vite', provider: 'codesandbox-cloud' });
        addDemoActionButtons(context);

        const newTabButton = canvas.getNewTabButton();
        expect(newTabButton).toBeTruthy();
        expect(newTabButton.textContent).toContain('Open in new tab');
        expect(newTabButton.innerHTML).toContain('<svg');

        canvas.cleanup();
      });

      it(`should have correct classes`, () => {
        const { canvas, context } = setup({ bundler: 'vite', provider: 'codesandbox-cloud' });
        addDemoActionButtons(context);

        const newTabButton = canvas.getNewTabButton();
        expect(newTabButton.classList.contains('with-open-in-new-tab-button')).toBe(true);
        expect(newTabButton.classList.contains('docblock-code-toggle')).toBe(true);
        expect(newTabButton.classList.contains('with-code-sandbox-button')).toBe(false);

        canvas.cleanup();
      });

      it(`should open story iframe URL on click`, () => {
        const { canvas, context } = setup({ bundler: 'vite', provider: 'codesandbox-cloud' });
        addDemoActionButtons(context);

        const newTabButton = canvas.getNewTabButton();
        newTabButton.click();

        expect(windowOpenSpy).toHaveBeenCalledWith('./iframe.html?id=default&viewMode=story', '_blank');

        canvas.cleanup();
      });

      it(`should not render when openInNewTab is false`, () => {
        const { canvas, context } = setup({ bundler: 'vite', provider: 'codesandbox-cloud' });
        context.parameters.openInNewTab = false;
        addDemoActionButtons(context);

        expect(canvas.getNewTabButton()).toBeNull();

        canvas.cleanup();
      });
    });

    describe('button layout', () => {
      it(`should place sandbox button before "Open in new tab" button in DOM order`, () => {
        const { canvas, context } = setup({ bundler: 'vite', provider: 'codesandbox-cloud' });
        addDemoActionButtons(context);

        const container = canvas.getActionButtonsContainer();
        const buttons = container?.querySelectorAll('button');
        const buttonTexts = Array.from(buttons ?? []).map(b => b.textContent);

        // prepend order: new tab first, then sandbox prepended before it
        expect(buttonTexts[0]).toContain('Open in CodeSandbox');
        expect(buttonTexts[1]).toContain('Open in new tab');
        expect(buttonTexts[2]).toBe('Show Code');

        canvas.cleanup();
      });

      it(`should clean up both buttons on re-render`, () => {
        const { canvas, context } = setup({ bundler: 'vite', provider: 'codesandbox-cloud' });

        addDemoActionButtons(context);
        addDemoActionButtons(context);

        const container = canvas.getActionButtonsContainer();
        const sandboxButtons = container?.querySelectorAll('.with-code-sandbox-button');
        const newTabButtons = container?.querySelectorAll('.with-open-in-new-tab-button');

        expect(sandboxButtons).toHaveLength(1);
        expect(newTabButtons).toHaveLength(1);

        canvas.cleanup();
      });

      it(`should only show sandbox button when openInNewTab is false`, () => {
        const { canvas, context } = setup({ bundler: 'vite', provider: 'codesandbox-cloud' });
        context.parameters.openInNewTab = false;
        addDemoActionButtons(context);

        const container = canvas.getActionButtonsContainer();
        const buttons = container?.querySelectorAll('button');

        expect(buttons).toHaveLength(2);
        expect(buttons?.[0].textContent).toContain('Open in CodeSandbox');
        expect(buttons?.[1].textContent).toBe('Show Code');

        canvas.cleanup();
      });
    });
  });
});
