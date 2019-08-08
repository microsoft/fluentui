import * as monaco from 'monaco-editor';
import * as React from 'react';
import { IEditorProps } from './Editor.types';

export const Editor: React.FunctionComponent<IEditorProps> = (props: IEditorProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { width, height, onChange, language, code } = props;
  const style = { width, height };

  React.useEffect(() => {
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

    fetch('https://unpkg.com/office-ui-fabric-react/dist/office-ui-fabric-react.d.ts').then(response => {
      response.text().then(fabricTypings => {
        console.log(fabricTypings);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          fabricTypings,
          'node_modules/@types/external/office-ui-fabric-react.d.ts'
        );
      });
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({ noSemanticValidation: true });

    // Creating proxy URL for JSX support since HTML5 does not allow pages loaded on file:// to create web workers
    const model = monaco.editor.createModel(code, 'typescript', monaco.Uri.parse('https://developer.microsoft.com/main.tsx'));

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
