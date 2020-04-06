import * as Prism from 'prismjs/components/prism-core';
import * as PropTypes from 'prop-types';
import * as React from 'react';

// Order of PrismJS imports there is sensitive
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';

import { formatCode } from './formatCode';
import { CodeSnippetMode, CodeSnippetProps } from './types';
import CodeSnippetLabel from './CodeSnippetLabel';

const CodeSnippet: React.FunctionComponent<CodeSnippetProps> = props => {
  const { className, fitted, formattable, mode, value } = props;

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
      }}
    >
      <CodeSnippetLabel {...props} value={code} />

      <pre style={{ margin: fitted ? '0' : undefined }}>
        <code className={codeClassName} ref={codeRef}>
          {code}
        </code>
      </pre>
    </div>
  );
};

CodeSnippet.defaultProps = {
  copyable: true,
  formattable: true,
  mode: 'jsx',
};

CodeSnippet.propTypes = {
  className: PropTypes.string,
  copyable: PropTypes.bool,
  fitted: PropTypes.bool,
  formattable: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  mode: PropTypes.oneOf(['bash', 'json', 'js', 'jsx', 'html'] as CodeSnippetMode[]),
  style: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string), PropTypes.object]).isRequired,
};

export default React.memo(CodeSnippet);
