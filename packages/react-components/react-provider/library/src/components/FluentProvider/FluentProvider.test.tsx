import { teamsLightTheme } from '@fluentui/react-theme';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import * as React from 'react';

import { FluentProvider } from './FluentProvider';
import { fluentProviderClassNames } from './useFluentProviderStyles.styles';
import { isConformant } from '../../testing/isConformant';

jest.mock('@fluentui/react-utilities', () => ({
  ...jest.requireActual('@fluentui/react-utilities'),
  ...jest.requireActual('../../testing/createUseIdMock').createUseIdMock(),
}));

describe('FluentProvider', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};
  let logErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(noop);
    logErrorSpy = jest.spyOn(console, 'error').mockImplementation(noop);
  });

  isConformant({
    disabledTests: ['component-handles-classname'],
    Component: FluentProvider,
    displayName: 'FluentProvider',
  });

  afterEach(() => {
    resetIdsForTests();
  });

  /**
   * Note: see more visual regression tests for FluentProvider in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(
      <FluentProvider theme={{ colorBrandBackground2: '#fff' }}>Default FluentProvider</FluentProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it(`should emit an error on duplicated IDs`, () => {
    const containerA = document.createElement('div');
    const containerB = document.createElement('div');

    document.body.appendChild(containerA);
    document.body.appendChild(containerB);

    render(<FluentProvider theme={teamsLightTheme} />, { container: containerA });
    expect(document.body.querySelectorAll(`.${fluentProviderClassNames.root}`)).toHaveLength(1);

    // This resets IDs, so the next FluentProvider will have the same IDs as the first one
    resetIdsForTests();

    render(<FluentProvider theme={teamsLightTheme} />, { container: containerB });
    expect(document.body.querySelectorAll(`.${fluentProviderClassNames.root}`)).toHaveLength(2);

    expect(logErrorSpy).toHaveBeenCalledTimes(1);
    expect(logErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('@fluentui/react-provider: There are conflicting ids in your DOM.'),
    );
  });

  it('does not render style element when not in SSR', () => {
    const { container } = render(<FluentProvider theme={teamsLightTheme} />);
    expect(container.querySelector('style')).toBeNull();
  });

  describe('applies "dir" attribute', () => {
    it('ltr', () => {
      const { getByText } = render(<FluentProvider dir="ltr">Test</FluentProvider>);
      const element = getByText('Test');

      expect(element).toHaveAttribute('dir', 'ltr');
      expect(element).toHaveStyle({ textAlign: 'left' });
    });

    it('rtl', () => {
      const { getByText } = render(<FluentProvider dir="rtl">Test</FluentProvider>);
      const element = getByText('Test');

      expect(element).toHaveAttribute('dir', 'rtl');
      expect(element).toHaveStyle({ textAlign: 'right' });
    });
  });
});
