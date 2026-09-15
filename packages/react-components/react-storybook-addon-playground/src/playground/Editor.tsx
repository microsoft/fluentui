import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';

import { defineEditorTheme, EDITOR_FONT_FAMILY } from './editorTheme';
import { useEditorStyles } from './Editor.styles';
import { monaco } from './monaco';
import type { ThemeOption } from './themes';

export const TSX_FILE_PATH = 'example.tsx';
export const TSX_MODEL_URI = 'file:///playground/example.tsx';

export interface EditorFile {
  path: string;
  language: 'typescript' | 'css';
  value: string;
}

export interface EditorProps {
  /** File shown in the editor. Switching `path` attaches a different Monaco model. */
  file: EditorFile;
  /**
   * Every playground file, including inactive tabs. Values are written into their Monaco models so Reset (and
   * other external updates) restore CSS modules that are not currently visible.
   */
  files?: readonly EditorFile[];
  onChange: (value: string) => void;
  /** Called with the TypeScript model used for playground compiles. */
  onModelReady: (model: monaco.editor.ITextModel) => void;
  onEditorReady?: (editor: monaco.editor.IStandaloneCodeEditor | null) => void;
  /** Invoked by the "Run" editor action (`CtrlCmd+Enter`, also available from the command palette). */
  onRun?: () => void;
  themeOption: ThemeOption;
  className?: string;
}

function modelUri(path: string): monaco.Uri {
  const basename = path.replace(/^.*[/\\]/, '') || TSX_FILE_PATH;
  return monaco.Uri.parse(`file:///playground/${basename}`);
}

function getOrCreateModel(file: EditorFile): monaco.editor.ITextModel {
  const uri = modelUri(file.path);
  return monaco.editor.getModel(uri) ?? monaco.editor.createModel(file.value, file.language, uri);
}

function syncModelValue(model: monaco.editor.ITextModel, value: string): void {
  if (model.getValue() !== value) {
    model.setValue(value);
  }
}

export const Editor = React.forwardRef<HTMLDivElement, EditorProps>((props, ref) => {
  const { file, files, onChange, onModelReady, onEditorReady, onRun, themeOption, className } = props;
  const styles = useEditorStyles();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [editor, setEditor] = React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const onRunRef = React.useRef(onRun);
  onRunRef.current = onRun;
  const fileRef = React.useRef(file);
  fileRef.current = file;

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

    const tsxUri = monaco.Uri.parse(TSX_MODEL_URI);
    const initial = fileRef.current;
    const tsxModel =
      monaco.editor.getModel(tsxUri) ??
      monaco.editor.createModel(initial.language === 'typescript' ? initial.value : '', 'typescript', tsxUri);

    const nextEditor = monaco.editor.create(container, {
      model: tsxModel,
      theme: defineEditorTheme(monaco, themeOption),
      fontFamily: EDITOR_FONT_FAMILY,
      fontLigatures: true,
      automaticLayout: true,
      minimap: { enabled: false },
      fontSize: 13,
      lineHeight: 21,
      tabSize: 2,
      lineNumbersMinChars: 3,
      lineDecorationsWidth: 12,
      padding: { top: 14, bottom: 14 },
      scrollBeyondLastLine: false,
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: true,
      renderLineHighlight: 'all',
      wordWrap: 'on',
      fixedOverflowWidgets: true,
      bracketPairColorization: { enabled: true },
      guides: { bracketPairs: 'active' },
      scrollbar: { verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
    });
    editorRef.current = nextEditor;
    setEditor(nextEditor);

    const runAction = nextEditor.addAction({
      id: 'playground.run',
      label: 'Playground: Run',
      // eslint-disable-next-line no-bitwise -- Monaco encodes key chords as bit flags
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: () => onRunRef.current?.(),
    });

    onModelReady(tsxModel);
    onEditorReady?.(nextEditor);

    return () => {
      runAction.dispose();
      nextEditor.dispose();
      editorRef.current = null;
      setEditor(null);
      onEditorReady?.(null);
    };
    // The editor instance is created once; file/theme updates are handled by the effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    monaco.editor.setTheme(defineEditorTheme(monaco, themeOption));
  }, [themeOption]);

  const { path: filePath, language: fileLanguage, value: fileValue } = file;

  React.useEffect(() => {
    if (!editor) {
      return;
    }

    const model = getOrCreateModel({ path: filePath, language: fileLanguage, value: fileRef.current.value });
    syncModelValue(model, fileRef.current.value);
    if (editor.getModel() !== model) {
      editor.setModel(model);
    }

    const subscription = model.onDidChangeContent(() => {
      onChangeRef.current(model.getValue());
    });

    return () => subscription.dispose();
  }, [editor, fileLanguage, filePath]);

  React.useEffect(() => {
    const model = editor?.getModel();
    if (model) {
      syncModelValue(model, fileValue);
    }
  }, [editor, fileValue]);

  React.useEffect(() => {
    if (!editor || !files) {
      return;
    }

    for (const next of files) {
      syncModelValue(getOrCreateModel(next), next.value);
    }
  }, [editor, files]);

  return <div ref={setContainer} className={mergeClasses(styles.root, className)} />;
});

Editor.displayName = 'Editor';
