import * as monaco from '@uifabric/monaco-editor';
import * as React from 'react';
import { IEditorProps, ITextModel } from './Editor.types';
import { codeFontFamily } from './TypeScriptSnippet';

const typescript = monaco.languages.typescript;
const typescriptDefaults = typescript.typescriptDefaults;

const filePrefix = 'file:///';

export const Editor: React.FunctionComponent<IEditorProps> = (props: IEditorProps) => {
  const { width, height, onChange, code } = props;

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
        typescriptDefaults.addExtraLib(fabricTypings, 'file:///node_modules/@types/office-ui-fabric-react/index.d.ts');
      });
    });

    typescriptDefaults.setCompilerOptions({
      allowNonTsExtensions: true,
      target: typescript.ScriptTarget.ES5,
      jsx: typescript.JsxEmit.React,
      jsxFactory: 'React.createElement',
      experimentalDecorators: true,
      preserveConstEnums: true,
      noUnusedLocals: true,
      strictNullChecks: true,
      noImplicitAny: true,
      module: typescript.ModuleKind.ESNext,
      baseUrl: filePrefix
    });

    typescriptDefaults.setDiagnosticsOptions({ noSemanticValidation: true });

    const model = (modelRef.current = monaco.editor.createModel(code, 'typescript', monaco.Uri.parse(filePrefix + 'main.tsx')));

    if (onChange) {
      onChange(model);
    }

    const editor = monaco.editor.create(ref.current!, {
      model: model,
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
  }, [onChange, code, modelRef]);

  return <div ref={ref} style={style} />;
};
