import { renderHook } from '@testing-library/react-hooks';
import { PartialTheme } from '@fluentui/react-theme';
import * as React from 'react';

import { ThemeProvider } from './ThemeProvider';
import { useThemeProvider } from './useThemeProvider';

describe('useThemeProvider', () => {
  it('should merge themes', () => {
    const themeA: PartialTheme = {
      global: {
        strokeWidth: { thick: '10px', thickest: '30px' },
      },
    };
    const themeB: PartialTheme = {
      global: {
        strokeWidth: { thick: '20px', thin: '20px' },
      },
    };

    const Wrapper: React.FC = ({ children }) => <ThemeProvider theme={themeA}>{children}</ThemeProvider>;

    const { result } = renderHook(() => useThemeProvider({ theme: themeB }, React.createRef()), {
      wrapper: Wrapper,
    });

    expect(result.current.theme).toMatchInlineSnapshot(`
      Object {
        "global": Object {
          "strokeWidth": Object {
            "thick": "20px",
            "thickest": "30px",
            "thin": "20px",
          },
        },
      }
    `);
  });
});
