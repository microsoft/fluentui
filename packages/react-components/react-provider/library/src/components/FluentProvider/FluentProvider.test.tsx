import { teamsLightTheme } from '@fluentui/react-theme';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { FluentProvider } from './FluentProvider';
import { fluentProviderClassNames } from './useFluentProviderStyles.styles';
import { isConformant } from '../../testing/isConformant';
import { useFluentProvider_unstable } from './useFluentProvider';

jest.mock('@fluentui/react-utilities', () => ({
  ...jest.requireActual('@fluentui/react-utilities'),
  ...jest.requireActual('../../testing/createUseIdMock').createUseIdMock(),
}));

describe('FluentProvider', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};
  let logErrorSpy: jest.Spied<typeof console.error>;

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

  it('does not override inherited tokens with undefined values in nested providers', () => {
    const { getByText } = render(
      <FluentProvider theme={{ colorBrandBackground: 'red', colorNeutralBackground1: 'blue' }}>
        <FluentProvider theme={{ colorBrandBackground: undefined, colorNeutralBackground1: 'green' }}>
          Nested
        </FluentProvider>
      </FluentProvider>,
    );
    const styleTagId = Array.from(getByText('Nested').classList).find(className => document.getElementById(className));
    const styleTag = document.getElementById(styleTagId!) as HTMLStyleElement;
    const rule = styleTag.sheet!.cssRules[0] as CSSStyleRule;

    expect(rule.cssText).not.toContain('undefined');
    expect(rule.style.getPropertyValue('--colorBrandBackground')).toBe('');
    expect(rule.style.getPropertyValue('--colorNeutralBackground1')).toBe('green');
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

describe('FluentProvider DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <FluentProvider
        applyStylesToPortals={false}
        customStyleHooks_unstable={{}}
        dir="rtl"
        overrides_unstable={{}}
        targetDocument={document}
        theme={teamsLightTheme}
      />,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class', 'dir']);
  });
});

describe('useFluentProvider_unstable', () => {
  it('does not forward provider props to the root slot', () => {
    const { result } = renderHook(() =>
      useFluentProvider_unstable(
        {
          applyStylesToPortals: false,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          customStyleHooks_unstable: {},
          dir: 'rtl',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          overrides_unstable: {},
          targetDocument: document,
          theme: teamsLightTheme,
        },
        React.createRef(),
      ),
    );

    expect(result.current.root).not.toHaveProperty('applyStylesToPortals');
    expect(result.current.root).not.toHaveProperty('customStyleHooks_unstable');
    expect(result.current.root).not.toHaveProperty('overrides_unstable');
    expect(result.current.root).not.toHaveProperty('targetDocument');
    expect(result.current.root).not.toHaveProperty('theme');
    expect(result.current.root.dir).toBe('rtl');
  });
});
