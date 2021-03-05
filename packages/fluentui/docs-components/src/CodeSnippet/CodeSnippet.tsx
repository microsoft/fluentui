import * as Prism from 'prismjs/components/prism-core';
import * as React from 'react';

// Order of PrismJS imports there is sensitive
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';

import { formatCode } from './formatCode';
import { CodeSnippetProps } from './types';
import { CodeSnippetLabel } from './CodeSnippetLabel';

export const CodeSnippet = React.memo<CodeSnippetProps>(props => {
  const { className, copyable = true, fitted, formattable = true, label, mode = 'jsx', value } = props;

  const codeClassName = `language-${mode}`;
  const code = formattable ? formatCode(value, mode) : value;
  const codeRef = React.useRef(null);

  React.useLayoutEffect(() => {
    Prism.highlightElement(codeRef.current);
  });

  return (
    <div
      className={className}
      style={{
        fontSize: '12px',
        position: 'relative',
        ...props.style,
      }}
    >
      <CodeSnippetLabel copyable={copyable} label={label} mode={mode} value={code} />

      <pre style={{ margin: fitted ? '0' : undefined }}>
        <code className={codeClassName} ref={codeRef}>
          {code}
        </code>
      </pre>
    </div>
  );
});
