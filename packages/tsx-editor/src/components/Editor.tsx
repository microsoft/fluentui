import * as monaco from 'monaco-editor';
import * as React from 'react';
import { IEditorProps, ITextModel } from './Editor.types';
import { codeFontFamily } from './TypeScriptSnippet';

export const Editor: React.FunctionComponent<IEditorProps> = (props: IEditorProps) => {
  const { width, height, onChange, language = 'typescript', code } = props;

  // Hooks must be called unconditionally, so we have to create a backup ref here even if we
  // immediately throw it away to use the one passed in.
  const backupModelRef = React.useRef<ITextModel>();
  const modelRef = props.modelRef || backupModelRef;

  const ref = React.useRef<HTMLDivElement>(null);
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

    const model = (modelRef.current = monaco.editor.createModel(code, language, monaco.Uri.parse('file:///main.tsx')));

    if (onChange) {
      onChange(model);
    }

    const editor = monaco.editor.create(ref.current!, {
      model: model,
      value: code,
      language,
      minimap: { enabled: false },
      fontFamily: codeFontFamily
    });

    editor.onDidChangeModelContent(() => {
      if (onChange) {
        onChange(editor.getModel()!);
      }
    });

    return () => {
      editor.getModel()!.dispose();
      editor.dispose();
      modelRef.current = undefined;
    };
  }, [onChange, language, code, modelRef]);

  return <div ref={ref} style={style} />;
};
export default Editor;
