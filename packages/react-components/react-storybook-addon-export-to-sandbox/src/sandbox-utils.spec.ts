import { StoryContext } from './types';
import { prepareData } from './sandbox-utils';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

describe(`sabdbox-utils`, () => {
  const context = {
    story: 'Showcase',
    componentId: '',
    name: 'Showcase',
    title: 'DefaultTitle',
    kind: '',
    id: '',
    originalStoryFn: {
      name: 'DefaultTitle',
    },
    parameters: {
      fullSource: `
          import * as React from 'react';
          import { Text } from '@proj/react-components';

          export const Default = () => <Text>This is an example of the Text component's usage.</Text>;
          `,
      exportToSandbox: {
        bundler: 'vite',
        provider: 'sandbox',
        requiredDependencies: {},
      },
    },
  } as unknown as StoryContext;

  describe(`#prepareData`, () => {
    it(`should throw error when parameters.exportToSandbox is missing`, () => {
      const actual = () => prepareData({ ...context, parameters: {} });

      expect(actual).toThrowErrorMatchingInlineSnapshot(`"exportToSandbox config parameter cannot be empty"`);
    });

    it(`should throw error when parameters.fullsource is missing`, () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(noop);
      const actual = prepareData({ ...context, parameters: { exportToSandbox: context.parameters.exportToSandbox } });

      expect(actual).toBe(null);
      expect(consoleErrorSpy.mock.calls.flat()).toMatchInlineSnapshot(`
        Array [
          "Export to Sandbox Addon: Couldn't find source for story Showcase. Did you install the babel plugin?",
        ]
      `);
    });
    it(`should prepare data from SB context`, () => {
      const actual = prepareData(context);
      expect(actual).toEqual({
        bundler: 'vite',
        dependencies: {
          '@proj/react-components': 'latest',
          react: 'latest',
        },
        description: 'Story demo: DefaultTitle - Showcase',
        provider: 'sandbox',
        storyExportToken: 'DefaultTitle',
        storyFile: context.parameters.fullSource,
        title: 'FluentUI React v9',
      });
    });
  });
});
