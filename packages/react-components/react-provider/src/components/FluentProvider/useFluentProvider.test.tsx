import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { FluentProvider } from './FluentProvider';
import { useFluentProvider_unstable } from './useFluentProvider';
import type { PartialTheme } from '@fluentui/react-theme';
import { OverridesContextValue_unstable } from '@fluentui/react-shared-contexts';

describe('useFluentProvider_unstable', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};
  let logWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    logWarnSpy = jest.spyOn(console, 'warn').mockImplementation(noop);
  });

  it(`should warn user if no theme was set in parent or child`, () => {
    const Wrapper: React.FC = ({ children }) => <FluentProvider>{children}</FluentProvider>;

    const { result } = renderHook(() => useFluentProvider_unstable({}, React.createRef()), {
      wrapper: Wrapper,
    });

    expect(result.current.theme).toBe(undefined);
    expect(logWarnSpy).toHaveBeenCalledTimes(2);
    expect(logWarnSpy).toHaveBeenCalledWith(expect.stringContaining('FluentProvider: your "theme" is not defined !'));
  });

  it('should merge themes', () => {
    const themeA: PartialTheme = {
      strokeWidthThick: '10px',
      strokeWidthThickest: '30px',
    };
    const themeB: PartialTheme = {
      strokeWidthThick: '20px',
      strokeWidthThin: '20px',
    };

    const Wrapper: React.FC = ({ children }) => <FluentProvider theme={themeA}>{children}</FluentProvider>;

    const { result } = renderHook(() => useFluentProvider_unstable({ theme: themeB }, React.createRef()), {
      wrapper: Wrapper,
    });

    expect(result.current.theme).toMatchInlineSnapshot(`
      Object {
        "strokeWidthThick": "20px",
        "strokeWidthThickest": "30px",
        "strokeWidthThin": "20px",
      }
    `);
  });

  it('should merge overrides', () => {
    const overridesA: OverridesContextValue_unstable = {
      inputDefaultAppearance: 'filled-lighter',
      // currently the overrides object contains a single value, adding one more to test the merging
      customValue: 'shouldNotBeOverridden',
    } as OverridesContextValue_unstable;
    const overridesB: OverridesContextValue_unstable = {
      inputDefaultAppearance: 'filled-darker',
    };

    const Wrapper: React.FC = ({ children }) => (
      <FluentProvider overrides_unstable={overridesA}>{children}</FluentProvider>
    );

    const { result } = renderHook(
      // eslint-disable-next-line @typescript-eslint/naming-convention
      () => useFluentProvider_unstable({ overrides_unstable: overridesB }, React.createRef()),
      {
        wrapper: Wrapper,
      },
    );

    expect(result.current.overrides_unstable).toMatchInlineSnapshot(`
      Object {
        "customValue": "shouldNotBeOverridden",
        "inputDefaultAppearance": "filled-darker",
      }
    `);
  });
});
