import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import * as React from 'react';
import { IEditorProps } from './Editor.types';

export const Editor = (props: IEditorProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { width, height, onChange, code, language } = props;
  const style = { width, height };

  React.useEffect(() => {
    const editor = monaco.editor.create(ref.current!, {
      value: code,
      language
    });

    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });

    return () => {
      editor.dispose();
    };
  }, []);

  return <div ref={ref} style={style} />;
};
