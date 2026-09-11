import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';

import { defineEditorTheme } from './editorTheme';
import { useEditorStyles } from './Editor.styles';
import { monaco } from './monaco';
import type { ThemeOption } from './themes';

export interface EditorProps {
  /** Initial value. Later changes are applied through {@link EditorProps.value} only when they differ from the model. */
  value: string;
  onChange: (value: string) => void;
  onModelReady: (model: monaco.editor.ITextModel) => void;
  onEditorReady?: (editor: monaco.editor.IStandaloneCodeEditor | null) => void;
  /** Invoked by the "Run" editor action (`CtrlCmd+Enter`, also available from the command palette). */
  onRun?: () => void;
  themeOption: ThemeOption;
  className?: string;
}

// A stable, file-like URI so the TypeScript worker treats the buffer as a `.tsx` module
const MODEL_URI = 'file:///playground/example.tsx';

export const Editor = React.forwardRef<HTMLDivElement, EditorProps>((props, ref) => {
  const { value, onChange, onModelReady, onEditorReady, onRun, themeOption, className } = props;
  const styles = useEditorStyles();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const onRunRef = React.useRef(onRun);
  onRunRef.current = onRun;

  const setContainer = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const uri = monaco.Uri.parse(MODEL_URI);
    const model = monaco.editor.getModel(uri) ?? monaco.editor.createModel(value, 'typescript', uri);

    const editor = monaco.editor.create(container, {
      model,
      theme: defineEditorTheme(monaco, themeOption),
      fontFamily: themeOption.theme.fontFamilyMonospace,
      automaticLayout: true,
      minimap: { enabled: false },
      fontSize: 13,
      tabSize: 2,
      lineNumbersMinChars: 3,
      scrollBeyondLastLine: false,
      smoothScrolling: true,
      wordWrap: 'on',
      fixedOverflowWidgets: true,
      bracketPairColorization: { enabled: true },
    });
    editorRef.current = editor;

    const runAction = editor.addAction({
      id: 'playground.run',
      label: 'Playground: Run',
      // eslint-disable-next-line no-bitwise -- Monaco encodes key chords as bit flags
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: () => onRunRef.current?.(),
    });

    const subscription = model.onDidChangeContent(() => {
      onChangeRef.current(model.getValue());
    });

    onModelReady(model);
    onEditorReady?.(editor);

    return () => {
      subscription.dispose();
      runAction.dispose();
      editor.dispose();
      editorRef.current = null;
      onEditorReady?.(null);
    };
    // The editor instance is created once; value/theme updates are handled by the effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    monaco.editor.setTheme(defineEditorTheme(monaco, themeOption));
    editorRef.current?.updateOptions({ fontFamily: themeOption.theme.fontFamilyMonospace });
  }, [themeOption]);

  React.useEffect(() => {
    const model = editorRef.current?.getModel();
    if (model && model.getValue() !== value) {
      model.setValue(value);
    }
  }, [value]);

  return <div ref={setContainer} className={mergeClasses(styles.root, className)} />;
});

Editor.displayName = 'Editor';
