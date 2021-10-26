import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { FluentProvider } from './FluentProvider';
import { useFluentProvider } from './useFluentProvider';
import type { PartialTheme } from '@fluentui/react-theme';

describe('useFluentProvider', () => {
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

    const { result } = renderHook(() => useFluentProvider({ theme: themeB }, React.createRef()), {
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
});
