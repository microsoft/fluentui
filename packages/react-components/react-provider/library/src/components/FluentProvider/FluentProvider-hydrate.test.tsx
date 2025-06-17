import { canUseDOM as _canUseDOM, resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';

import { FluentProvider } from './FluentProvider';

jest.mock('@fluentui/react-utilities', () => {
  const utilities = jest.requireActual('@fluentui/react-utilities');

  return {
    ...utilities,
    ...jest.requireActual('../../testing/createUseIdMock').createUseIdMock(),
    canUseDOM: jest.fn().mockImplementation(utilities.canUseDOM),
  };
});

const canUseDOM = _canUseDOM as jest.MockedFunction<typeof _canUseDOM>;

// Heads up!
//
// Tests in this file are specific to hydration scenarios
// They have to be run in DOM as otherwise hydration is not possible

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

const SSR_TARGET_DOCUMENT = null as unknown as undefined;

function renderHTML(element: React.ReactElement) {
  // Mocking defaults to simulate SSR environment
  canUseDOM.mockReturnValueOnce(false);

  const html = renderToStaticMarkup(element);

  // IDs are reset to avoid conflicts between SSR and hydration
  resetIdsForTests();

  return html;
}

describe('FluentProvider (hydration)', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};
  let logErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    logErrorSpy = jest.spyOn(console, 'error').mockImplementation(noop);
    jest.spyOn(console, 'warn').mockImplementation(noop);
  });

  afterEach(() => {
    jest.clearAllMocks();
    resetIdsForTests();
  });

  it('should not emit an error on hydration', () => {
    const htmlFromServer = renderHTML(<FluentProvider targetDocument={SSR_TARGET_DOCUMENT} />);
    const container = document.createElement('div');

    document.body.appendChild(container);
    container.id = 'root';
    container.innerHTML = htmlFromServer;

    React.act(() => {
      hydrateRoot(container, <FluentProvider targetDocument={document} />);
    });

    expect(logErrorSpy).toHaveBeenCalledTimes(0);

    expect(document.head).toMatchInlineSnapshot(`
      <head>
        <style
          data-make-styles-bucket="d"
          data-priority="0"
        />
        <style
          id="fui-FluentProvider1"
        >
          .fui-FluentProvider1 {}
        </style>
      </head>
    `);
    expect(document.body).toMatchInlineSnapshot(`
      <body>
        <div
          id="root"
        >
          <div
            class="fui-FluentProvider fui-FluentProvider1"
            dir="ltr"
          />
        </div>
      </body>
    `);
  });
});
