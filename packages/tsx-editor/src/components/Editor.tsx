import * as monaco from 'monaco-editor';
import * as React from 'react';
import { IEditorProps } from './Editor.types';

export const Editor: React.FunctionComponent<IEditorProps> = (props: IEditorProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { width, height, onChange, language, code } = props;
  const style = { width, height };

  React.useEffect(() => {
    // Fetching Fabric typings to allow for intellisense in editor
    fetch('https://unpkg.com/office-ui-fabric-react/dist/office-ui-fabric-react.d.ts').then(response => {
      response.text().then(fabricTypings => {
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          fabricTypings,
          'file:///node_modules/@types/office-ui-fabric-react/index.d.ts'
        );
      });
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
      module: monaco.languages.typescript.ModuleKind.ESNext,
      lib: ['es5', 'dom']
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({ noSemanticValidation: true });

    const model = monaco.editor.createModel(code, 'typescript', monaco.Uri.parse('file:///main.tsx'));

    onChange(model);

    const editor = monaco.editor.create(ref.current!, {
      model: model,
      value: code,
      language,
      minimap: {
        enabled: false
      }
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

export default Editor;
