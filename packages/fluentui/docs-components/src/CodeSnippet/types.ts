import * as React from 'react';

export type CodeSnippetMode = 'bash' | 'json' | 'js' | 'jsx' | 'html';
export type CodeSnippetValue = string | string[] | Object;

export type CodeSnippetProps = {
  className?: string;
  copyable?: boolean;
  fitted?: boolean;
  formattable?: boolean;
  label?: React.ReactNode | false;
  mode?: CodeSnippetMode;
  style?: React.CSSProperties;
  value: CodeSnippetValue;
};
