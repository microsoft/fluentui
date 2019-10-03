import * as React from 'react';
import { IEditorWrapperProps } from './EditorWrapper.types';
import { EditorError } from './EditorError';
import { TypeScriptSnippet } from './TypeScriptSnippet';
import { EditorLoading } from './EditorLoading';
import { isEditorSupported } from '../utilities/index';
import { ITransformedExample } from '../interfaces/index';
import { DEFAULT_HEIGHT } from './consts';

// This file MUST NOT directly load the main TsxEditor module which depends on Monaco, to avoid
// pulling it into a bundle. Importing/rendering with React.lazy solves this.
const TsxEditorLazy = React.lazy(() => import('./TsxEditor'));

export const EditorWrapper: React.FunctionComponent<IEditorWrapperProps> = props => {
  const {
    code,
    isCodeVisible,
    previewAs: Preview = EditorPreview,
    editorClassName,
    previewClassName,
    height = DEFAULT_HEIGHT,
    width,
    editorAriaLabel,
    modelRef,
    useEditor,
    supportedPackages,
    children
  } = props;

  const [error, setError] = React.useState<string | string[]>();
  const [ExampleComponent, setExampleComponent] = React.useState<React.ComponentType>();

  // Check if editing should be enabled
  const canEdit = React.useMemo(() => {
    if (typeof useEditor === 'boolean') {
      return useEditor;
    }
    return isEditorSupported(code, supportedPackages);
  }, [useEditor, code, supportedPackages]);

  const onTransformFinished = (result: ITransformedExample) => {
    setError(result.error);
    if (result.component) {
      setExampleComponent(result.component);
    }
    if (props.onTransformFinished) {
      props.onTransformFinished(result);
    }
  };

  return (
    <div>
      {isCodeVisible && (
        <div className={editorClassName}>
          {canEdit ? (
            // Editing supported -- render editor module (or loading spinner)
            <React.Suspense fallback={<EditorLoading height={height} />}>
              <TsxEditorLazy
                editorProps={{ code, width, height, modelRef, ariaLabel: editorAriaLabel }}
                onTransformFinished={onTransformFinished}
              />
            </React.Suspense>
          ) : (
            // Editing not supported
            <TypeScriptSnippet>{code}</TypeScriptSnippet>
          )}
        </div>
      )}

      {isCodeVisible && <EditorError error={error} />}

      <Preview className={previewClassName}>{ExampleComponent ? <ExampleComponent /> : children}</Preview>
    </div>
  );
};

const EditorPreview: React.FunctionComponent<{ className?: string }> = props => {
  return <div className={props.className}>{props.children}</div>;
};
