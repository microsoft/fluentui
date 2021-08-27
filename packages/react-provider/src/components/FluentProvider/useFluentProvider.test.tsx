import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { FluentProvider } from './FluentProvider';
import { useFluentProvider } from './useFluentProvider';
import type { PartialTheme } from '@fluentui/react-theme';

describe('useFluentProvider', () => {
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

    const Wrapper: React.FC = ({ children }) => <FluentProvider theme={themeA}>{children}</FluentProvider>;

    const { result } = renderHook(() => useFluentProvider({ theme: themeB }, React.createRef()), {
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
