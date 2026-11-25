import * as React from 'react';

export interface IMarkdownPreProps extends React.HTMLAttributes<HTMLPreElement> {
  /**
   * If true, using a code block with language name `renderhtml` will render the contents as HTML.
   * This is to work around markdown-to-jsx's limited support for nested HTML elements.
   *
   * @deprecated **UNSAFE.** The contents of a `renderhtml` block are injected verbatim via
   * `dangerouslySetInnerHTML` with no sanitization, so they can execute arbitrary script in the
   * origin of the hosting application.
   *
   * Only enable this for markdown that is fully authored and reviewed by the application's own
   * developers, such as documentation files bundled at build time. **Never** enable it for markdown
   * that any user, tenant, contributor or remote service can influence, and never for markdown
   * loaded at runtime. If you need to render untrusted markdown, leave this off (the default) or
   * sanitize the HTML yourself before it reaches this component.
   */
  enableRenderHtmlBlock?: boolean;
}

export const MarkdownPre: React.FunctionComponent<IMarkdownPreProps> = props => {
  const { children, enableRenderHtmlBlock, ...rest } = props;

  // markdown-to-jsx will render code blocks as <pre><code>code here</code></pre>.
  // If we're using the code block as a hack to render raw HTML, we need to strip the wrapping <pre>
  // and just render the <code>'s children in a div.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenDisplayName: string | undefined = (children as any)?.type?.displayName;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenProps: React.PropsWithChildren<any> | undefined = (children as any)?.props;
  if (
    enableRenderHtmlBlock &&
    typeof childrenDisplayName === 'string' &&
    childrenDisplayName.indexOf('MarkdownCode') !== -1 &&
    childrenProps?.className === 'lang-renderhtml' &&
    typeof childrenProps?.children === 'string'
  ) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        'Markdown: a `renderhtml` code block was rendered as raw, unsanitized HTML because ' +
          '`enableRenderHtmlBlock` is enabled. This executes any script in the block. Only use this ' +
          'with markdown authored and reviewed by your own developers, never with content that a ' +
          'user or remote service can influence.',
      );
    }
    // eslint-disable-next-line react/no-danger
    return <div dangerouslySetInnerHTML={{ __html: childrenProps.children }} />;
  }

  return <pre {...rest}>{children}</pre>;
};
