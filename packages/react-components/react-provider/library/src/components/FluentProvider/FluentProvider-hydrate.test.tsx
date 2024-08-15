import {
  canUseDOM as _canUseDOM,
  resetIdsForTests,
  useIsomorphicLayoutEffect as _useIsomorphicLayoutEffect,
} from '@fluentui/react-utilities';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';

import { FluentProvider } from './FluentProvider';

jest.mock('@fluentui/react-utilities', () => {
  const utilities = jest.requireActual('@fluentui/react-utilities');

  return {
    ...utilities,
    canUseDOM: jest.fn().mockImplementation(utilities.canUseDOM),
    useIsomorphicLayoutEffect: jest.fn().mockImplementation(utilities.useIsomorphicLayoutEffect),
  };
});

const canUseDOM = _canUseDOM as jest.MockedFunction<typeof _canUseDOM>;
const useIsomorphicLayoutEffect = _useIsomorphicLayoutEffect as jest.MockedFunction<typeof _useIsomorphicLayoutEffect>;

// Heads up!
//
// Tests in this file are specific to hydration scenarios
// They have to be run in DOM as otherwise hydration is not possible

const SSR_TARGET_DOCUMENT = null as unknown as undefined;

function renderHTML(element: React.ReactElement) {
  // Mocking defaults to simulate SSR environment
  canUseDOM.mockReturnValueOnce(false);
  useIsomorphicLayoutEffect.mockImplementationOnce(React.useEffect);

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
  });

  afterEach(() => {
    jest.clearAllMocks();
    resetIdsForTests();
  });

  it('should not emit an error on hydration', () => {
    const container = document.createElement('div');

    document.body.appendChild(container);
    container.innerHTML = renderHTML(<FluentProvider targetDocument={SSR_TARGET_DOCUMENT} />);

    ReactDOM.hydrate(<FluentProvider />, container);
    expect(logErrorSpy).toHaveBeenCalledTimes(0);
  });
});
