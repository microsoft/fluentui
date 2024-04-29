import * as React from 'react';
import { Editor } from '@fluentui/docs-components';

import { JSONTreeElement } from './types';
import { codeToTree } from '../utils/codeToTree';

export type CodeEditorProps = {
  code: string;
  onCodeChange: (code: string, jsonTree: JSONTreeElement) => void;
  onCodeError: (code: string, error: string) => void;
};

export const CodeEditor: React.FunctionComponent<CodeEditorProps> = ({ code, onCodeChange, onCodeError }) => {
  const handleCodeChange = React.useCallback(
    code => {
      try {
        onCodeChange(code, codeToTree(code));
      } catch (e) {
        onCodeError(code, e.message);
      }
    },
    [onCodeChange, onCodeError],
  );

  return <Editor mode="jsx" height="auto" value={code} onChange={handleCodeChange} />;
};
