import * as monaco from 'monaco-editor';
import * as React from 'react';
import { IEditorProps } from './Editor.types';

export const Editor: React.FunctionComponent<IEditorProps> = (props: IEditorProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { width, height, onChange, code, language } = props;
  const style = { width, height };

  React.useEffect(() => {
    const editor = monaco.editor.create(ref.current!, {
      model: monaco.editor.createModel(code, 'typescript', monaco.Uri.parse('file:///main.tsx')),
      value: code,
      language
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      allowNonTsExtensions: true,
      target: monaco.languages.typescript.ScriptTarget.ES5,
      jsx: monaco.languages.typescript.JsxEmit.React,
      alwaysStrict: true,
      jsxFactory: 'React.createElement',
      experimentalDecorators: true,
      preserveConstEnums: true,
      outDir: 'lib',
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      lib: ['es5', 'dom']
    });

    editor.onDidChangeModelContent(() => {
      onChange(editor.getModel()!);
    });

    return () => {
      editor.getModel()!.dispose();
      editor.dispose();
    };
  }, []);

  return <div ref={ref} style={style} />;
};
