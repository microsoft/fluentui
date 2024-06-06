import type { PartialTheme } from '@fluentui/react-theme';
import type { OverridesContextValue_unstable } from '@fluentui/react-shared-contexts';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { FluentProvider } from './FluentProvider';
import { useFluentProvider_unstable } from './useFluentProvider';
import { FluentProviderCustomStyleHooks } from './FluentProvider.types';

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
    expect(logWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('@fluentui/react-provider: FluentProvider does not have your "theme" defined.'),
    );
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

  describe('customStyles', () => {
    const customStylesA: FluentProviderCustomStyleHooks = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      useButtonStyles_unstable: () => {
        return 'useButtonStyles_unstable_A';
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      useImageStyles_unstable: () => {
        return 'useImageStyles_unstable_A';
      },
    };

    const customStylesB: FluentProviderCustomStyleHooks = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      useButtonStyles_unstable: () => {
        return 'useButtonStyles_unstable_B';
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      useLinkStyles_unstable: () => {
        return 'useLinkStyles_unstable_B';
      },
    };

    it('keeps functions when custom hooks are not defined', () => {
      const { result } = renderHook(
        // eslint-disable-next-line @typescript-eslint/naming-convention
        () => useFluentProvider_unstable({ customStyleHooks_unstable: customStylesA }, React.createRef()),
      );

      // default is undefined as the selector provides no-op
      expect(result.current.customStyleHooks_unstable.useAvatarStyles_unstable).toBeUndefined();

      expect(result.current.customStyleHooks_unstable.useButtonStyles_unstable).toEqual(
        customStylesA.useButtonStyles_unstable,
      );
      expect(result.current.customStyleHooks_unstable.useImageStyles_unstable).toEqual(
        customStylesA.useImageStyles_unstable,
      );
    });

    it('should merge nested customStyles', () => {
      const { result } = renderHook(
        // eslint-disable-next-line @typescript-eslint/naming-convention
        () => useFluentProvider_unstable({ customStyleHooks_unstable: customStylesB }, React.createRef()),
        {
          wrapper: ({ children }) => (
            <FluentProvider customStyleHooks_unstable={customStylesA}>{children}</FluentProvider>
          ),
        },
      );

      // default is undefined as the selector provides no-op
      expect(result.current.customStyleHooks_unstable.useAvatarStyles_unstable).toBeUndefined();

      // Overrides from outer FluentProvider are preserved
      expect(result.current.customStyleHooks_unstable.useImageStyles_unstable).toEqual(
        customStylesA.useImageStyles_unstable,
      );

      // Overrides from inner FluentProvider win
      expect(result.current.customStyleHooks_unstable.useButtonStyles_unstable).toEqual(
        customStylesB.useButtonStyles_unstable,
      );
      expect(result.current.customStyleHooks_unstable.useLinkStyles_unstable).toEqual(
        customStylesB.useLinkStyles_unstable,
      );
    });
  });
});
