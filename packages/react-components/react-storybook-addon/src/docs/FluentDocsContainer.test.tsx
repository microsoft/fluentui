import * as React from 'react';
import { render } from '@testing-library/react';
import { DocsContainer, type DocsContextProps } from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/theming';
import { FluentDocsContainer } from './FluentDocsContainer';
import { isDocsEnabled } from './utils';

jest.mock('@storybook/addon-docs/blocks', () => ({
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
});
