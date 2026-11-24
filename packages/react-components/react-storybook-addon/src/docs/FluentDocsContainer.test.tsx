import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Source, type DocsContextProps } from '@storybook/addon-docs/blocks';
import { SyntaxHighlighter } from 'storybook/internal/components';
import { Channel } from 'storybook/internal/channels';
import { ensure, ThemeProvider, themes } from 'storybook/theming';
import { webLightTheme } from '@fluentui/react-theme';
import { FluentDocsContainer } from './FluentDocsContainer';
import { isDocsEnabled } from './utils';

jest.mock('./utils', () => ({
  isDocsEnabled: jest.fn(),
}));

describe('FluentDocsContainer', () => {
  const context = { channel: new Channel({}) } as DocsContextProps;
  const code = '<button aria-label="Open menu">Open</button>';
  const tokenColor = (element: HTMLElement) => getComputedStyle(element.querySelector('.token.attr-name')!).color;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([true, false])(
    'preserves independent Source themes in default Docs when Fluent Docs enabled=%s',
    async enabled => {
      jest.mocked(isDocsEnabled).mockReturnValue(enabled);
      const { getByTestId } = render(
        <div>
          <ThemeProvider theme={ensure(themes.light)}>
            <div data-testid="native-dark">
              <Source code={code} language="html" dark format={false} />
            </div>
            <div data-testid="native-light">
              <Source code={code} language="html" dark={false} format={false} />
            </div>
          </ThemeProvider>
          <div id="storybook-docs">
            <FluentDocsContainer context={context}>
              <div data-testid="inherited-light">
                <SyntaxHighlighter language="html" className="docblock-source" format={false}>
                  {code}
                </SyntaxHighlighter>
              </div>
              <div data-testid="independent-dark">
                <Source code={code} language="html" dark format={false} />
              </div>
              <div data-testid="independent-light">
                <Source code={code} language="html" dark={false} format={false} />
              </div>
            </FluentDocsContainer>
          </div>
        </div>,
      );

      await waitFor(() => {
        expect(getByTestId('inherited-light').querySelector('.token.attr-name')).not.toBeNull();
        expect(getByTestId('independent-dark').querySelector('.token.attr-name')).not.toBeNull();
        expect(getByTestId('independent-light').querySelector('.token.attr-name')).not.toBeNull();
      });

      const expectedColor = document.createElement('span');
      expectedColor.style.color = webLightTheme.colorPaletteRedForeground1;
      expect(tokenColor(getByTestId('inherited-light'))).toBe(expectedColor.style.color);
      expect(tokenColor(getByTestId('independent-dark'))).toBe(tokenColor(getByTestId('native-dark')));
      expect(tokenColor(getByTestId('independent-light'))).toBe(tokenColor(getByTestId('native-light')));
      expect(tokenColor(getByTestId('independent-dark'))).not.toBe(tokenColor(getByTestId('inherited-light')));
    },
  );

  it('preserves inherited syntax highlighting for an explicit consumer theme', async () => {
    jest.mocked(isDocsEnabled).mockReturnValue(false);
    const { getByTestId } = render(
      <FluentDocsContainer context={context} theme={themes.dark}>
        <div data-testid="inherited-dark">
          <SyntaxHighlighter language="html" className="docblock-source" format={false}>
            {code}
          </SyntaxHighlighter>
        </div>
        <div data-testid="native-dark">
          <Source code={code} language="html" dark format={false} />
        </div>
      </FluentDocsContainer>,
    );

    await waitFor(() => {
      expect(getByTestId('inherited-dark').querySelector('.token.attr-name')).not.toBeNull();
      expect(getByTestId('native-dark').querySelector('.token.attr-name')).not.toBeNull();
    });
    expect(tokenColor(getByTestId('inherited-dark'))).toBe(tokenColor(getByTestId('native-dark')));
  });
});
