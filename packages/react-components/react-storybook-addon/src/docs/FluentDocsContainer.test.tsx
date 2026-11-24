import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import { DocsContainer, Source, type DocsContextProps } from '@storybook/addon-docs/blocks';
import { SyntaxHighlighter } from 'storybook/internal/components';
import { Channel } from 'storybook/internal/channels';
import { ensure, ThemeProvider, themes } from 'storybook/theming';
import { webLightTheme } from '@fluentui/react-theme';
import { FluentDocsContainer } from './FluentDocsContainer';
import { isDocsEnabled } from './utils';

jest.mock('@storybook/addon-docs/blocks', () => ({
  ...jest.requireActual('@storybook/addon-docs/blocks'),
  DocsContainer: jest.fn(({ children }: { children: React.ReactNode }) => <>{children}</>),
}));

jest.mock('./utils', () => ({
  isDocsEnabled: jest.fn(),
}));

describe('FluentDocsContainer', () => {
  const context = {} as DocsContextProps;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([true, false])('preserves an explicitly configured Docs theme when Fluent Docs enabled=%s', enabled => {
    jest.mocked(isDocsEnabled).mockReturnValue(enabled);
    render(
      <FluentDocsContainer context={context} theme={themes.dark}>
        Documentation
      </FluentDocsContainer>,
    );

    expect(jest.mocked(DocsContainer).mock.calls[0][0].theme).toBe(themes.dark);
  });

  it.each([true, false])(
    'preserves independent Source themes in default Docs when Fluent Docs enabled=%s',
    async enabled => {
      jest.mocked(isDocsEnabled).mockReturnValue(enabled);
      jest.mocked(DocsContainer).mockImplementation(jest.requireActual('@storybook/addon-docs/blocks').DocsContainer);
      const sourceContext = { channel: new Channel({}) } as DocsContextProps;
      const code = '<button aria-label="Open menu">Open</button>';
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
            <FluentDocsContainer context={sourceContext}>
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

      const tokenColor = (id: string) => {
        const token = getByTestId(id).querySelector('.token.attr-name')!;
        return getComputedStyle(token).color;
      };
      const expectedColor = document.createElement('span');
      expectedColor.style.color = webLightTheme.colorPaletteRedForeground1;
      expect(tokenColor('inherited-light')).toBe(expectedColor.style.color);
      expect(tokenColor('independent-dark')).toBe(tokenColor('native-dark'));
      expect(tokenColor('independent-light')).toBe(tokenColor('native-light'));
      expect(tokenColor('independent-dark')).not.toBe(tokenColor('inherited-light'));
    },
  );

  it('preserves inherited syntax highlighting for an explicit consumer theme', async () => {
    jest.mocked(isDocsEnabled).mockReturnValue(false);
    jest.mocked(DocsContainer).mockImplementation(jest.requireActual('@storybook/addon-docs/blocks').DocsContainer);
    const sourceContext = { channel: new Channel({}) } as DocsContextProps;
    const code = '<button aria-label="Open menu">Open</button>';
    const { getByTestId } = render(
      <FluentDocsContainer context={sourceContext} theme={themes.dark}>
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
    expect(getComputedStyle(getByTestId('inherited-dark').querySelector('.token.attr-name')!).color).toBe(
      getComputedStyle(getByTestId('native-dark').querySelector('.token.attr-name')!).color,
    );
  });
});
