import * as monaco from '@fluentui/monaco-editor';
import * as React from 'react';
import { CODE_FONT_FAMILY, DEFAULT_WIDTH, DEFAULT_HEIGHT } from './consts';
import type { IEditorProps } from './Editor.types';
import type { IMonacoTextModel } from '../interfaces/index';

/**
 * Language-agnostic wrapper for a Monaco editor instance.
 */
export const Editor: React.FunctionComponent<IEditorProps> = (props: IEditorProps) => {
  const {
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    className,
    code = '',
    language,
    filename,
    onChange,
    debounceTime = 1000,
    ariaLabel,
    editorOptions,
  } = props;

  // Hooks must be called unconditionally, so we have to create a backup ref here even if we
  // immediately throw it away to use the one passed in.
  const backupModelRef = React.useRef<IMonacoTextModel>();
  const modelRef = props.modelRef || backupModelRef;

  // Store the latest onChange and debounceTime in a ref to ensure that we get the latest values
  // (if they change at all, which they ideally shouldn't) without needing to re-create the editor
  const internalState = React.useRef<Pick<IEditorProps, 'onChange' | 'debounceTime'>>();
  internalState.current = { onChange, debounceTime };

  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const model = (modelRef.current = monaco.editor.createModel(
      code,
      language,
      filename ? monaco.Uri.parse(filename) : undefined,
    ));
    const editor = monaco.editor.create(divRef.current!, {
      minimap: { enabled: false },
      fontFamily: CODE_FONT_FAMILY,
      ariaLabel,
      accessibilityHelpUrl: 'https://github.com/Microsoft/monaco-editor/wiki/Monaco-Editor-Accessibility-Guide',
      // add editorOptions default value here (NOT in main destructuring) to avoid re-calling the effect
      ...(editorOptions || {}),
      model,
    });

    // Handle changes (debounced)
    let debounceTimeout: number;
    editor.onDidChangeModelContent(() => {
      // Destructure these locally to get the latest values
      const { debounceTime: currDebounceTime, onChange: currOnChange } = internalState.current!;
      if (!currOnChange) {
        return;
      }

      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      if (currDebounceTime) {
        debounceTimeout = window.setTimeout(() => currOnChange(model.getValue()), currDebounceTime);
      } else {
        currOnChange(model.getValue());
      }
    });

    return () => {
      clearTimeout(debounceTimeout);
      model.dispose();
      editor.dispose();
      modelRef.current = undefined;
    };
  }, [code, language, filename, modelRef, internalState, ariaLabel, editorOptions]);

  return <div ref={divRef} style={{ width, height }} className={className} />;
};
