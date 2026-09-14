import * as React from 'react';
import { render } from '@testing-library/react';
import { Markdown } from './Markdown';

// CodeSnippet pulls in react-syntax-highlighter's untranspiled ESM build, which jest can't parse.
jest.mock('../CodeSnippet/index', () => {
  const mockCodeSnippet: React.FunctionComponent<React.PropsWithChildren<{}>> = props => <code>{props.children}</code>;
  return { CodeSnippet: mockCodeSnippet };
});

// Same problem via react-monaco-editor, reached through this barrel.
jest.mock('../../utilities/index2', () => ({
  removeAnchorLink: (url: string) => url.split('#')[0],
}));

const renderHtmlMarkdown = ['```renderhtml', '<div class="injected">raw</div>', '```'].join('\n');

describe('Markdown renderhtml code blocks', () => {
  let warn: jest.SpyInstance;

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    warn.mockRestore();
  });

  it('does not render raw HTML by default', () => {
    const { container } = render(<Markdown>{renderHtmlMarkdown}</Markdown>);

    expect(container.querySelector('.injected')).toBeNull();
    expect(container.textContent).toContain('<div class="injected">raw</div>');
  });

  it('does not render raw HTML when enableRenderHtmlBlock is explicitly false', () => {
    const { container } = render(<Markdown enableRenderHtmlBlock={false}>{renderHtmlMarkdown}</Markdown>);

    expect(container.querySelector('.injected')).toBeNull();
  });

  it('renders raw HTML only when enableRenderHtmlBlock is opted into', () => {
    const { container } = render(<Markdown enableRenderHtmlBlock>{renderHtmlMarkdown}</Markdown>);

    expect(container.querySelector('.injected')).not.toBeNull();
  });

  it('warns when enableRenderHtmlBlock is opted into', () => {
    render(<Markdown enableRenderHtmlBlock>{renderHtmlMarkdown}</Markdown>);

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('enableRenderHtmlBlock'));
  });
});
