import * as React from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { getWindow, isIE11, getId } from 'office-ui-fabric-react/lib/Utilities';
import { transformExample } from '../transpiler/exampleTransform';
import { getSetting } from '../utilities/settings';
import { EditorPreview } from './EditorPreview';
import { ITextModel, IEditorProps } from './Editor.types';
import { IEditorWrapperProps, IEditorPreviewProps } from './EditorWrapper.types';
import { EditorError } from './EditorError';
import { TypeScriptSnippet } from './TypeScriptSnippet';

// This file MUST NOT directly load the main Editor module which depends on Monaco.
// It can reference the module for types, but not use it at runtime.
import * as editorModuleType from './Editor';

// Override setTimeout from Node.js which is not actually the one used here
declare function setTimeout(callback: Function, delay: number): number;

export const EditorWrapper: React.FunctionComponent<IEditorWrapperProps> = props => {
  const {
    code,
    isCodeVisible,
    onRenderPreview = _onRenderPreview,
    editorClassName,
    previewClassName,
    height = 500,
    width = 'auto',
    modelRef,
    useEditor,
    children
  } = props;

  const idRef = React.useRef<string>();
  if (!idRef.current) {
    idRef.current = getId('EditorPreview');
  }
  const previewId = idRef.current!;

  const [editorModule, setEditorModule] = React.useState<typeof editorModuleType>();
  const [error, setError] = React.useState<string | string[]>();
  const onChangeRef = React.useRef<IEditorProps['onChange']>();

  // Check if editing should be enabled
  const canEdit = React.useMemo(() => {
    if (typeof useEditor === 'boolean') {
      return useEditor;
    }
    const win = getWindow();
    return (
      !!(win && (win as any).MonacoEnvironment) && // tslint:disable-line:no-any
      getSetting('useEditor') === '1' &&
      !isIE11() &&
      transformExample(code!, previewId).error === undefined
    );
  }, [useEditor, code, previewId]);

  // Load editor modules and Fabric global
  React.useEffect(() => {
    let isDisposed = false;
    let debounceTimeout: number;

    if (!isCodeVisible || !canEdit) {
      return;
    }

    // tslint:disable:no-any
    if (!(window as any).Fabric) {
      import('office-ui-fabric-react').then(Fabric => {
        (window as any).Fabric = Fabric;
      });
    }
    // tslint:enable:no-any

    // Delay load the editor module and the transpiler module (which depend on Monaco).
    // We're loading the editor like this rather than with React.lazy because loading via React.lazy
    // pulled the editor into the main bundle for some reason.
    Promise.all([
      import(/* webpackChunkName: 'tsx-editor-core' */ './Editor'),
      import(/* webpackChunkName: 'tsx-editor-core' */ '../transpiler/transpile')
    ]).then(([_editorModule, transpileModule]) => {
      if (isDisposed) {
        return;
      }

      // Set up transpiling on change
      onChangeRef.current = (model: ITextModel) => {
        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
        }
        debounceTimeout = setTimeout(() => {
          transpileModule.transpile(model).then(output => {
            if (isDisposed) {
              return;
            }
            if (output.outputString !== undefined) {
              setError(transpileModule.evalCode(output.outputString, previewId));
            } else {
              setError(output.error);
            }
          });
        }, 500);
      };

      setEditorModule(_editorModule);
    });

    return () => {
      isDisposed = true;
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [isCodeVisible, canEdit, onChangeRef, previewId]);

  return (
    <div>
      {isCodeVisible && (
        <div className={editorClassName}>
          {canEdit ? (
            editorModule ? (
              // Editing supported -- render editor module
              <editorModule.Editor code={code} onChange={onChangeRef.current!} width={width} height={height} modelRef={modelRef} />
            ) : (
              // Editing supported, but editor not loaded -- render loading spinner
              <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height } }}>
                <Spinner size={SpinnerSize.large} label="Loading editor..." />
              </Stack>
            )
          ) : (
            // Editing not supported
            <TypeScriptSnippet>{code}</TypeScriptSnippet>
          )}
        </div>
      )}

      <EditorError error={error} />

      {onRenderPreview({ className: previewClassName, id: previewId, children }, _onRenderPreview)}
    </div>
  );
};

function _onRenderPreview(props: IEditorPreviewProps): React.ReactNode {
  return <EditorPreview {...props} />;
}
