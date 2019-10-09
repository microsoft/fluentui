import * as React from 'react';
import { IEditorWrapperProps } from './EditorWrapper.types';
import { EditorErrorBoundary } from './EditorErrorHandler';
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
    previewAs: Preview = EditorPreview,
    editorClassName,
    previewProps = {},
    height = DEFAULT_HEIGHT,
    width,
    editorAriaLabel,
    modelRef,
    useEditor,
    supportedPackages,
    onTransformFinished: onTransformFinishedFromProps,
    children
  } = props;

  const [transformResult, setTransformResult] = React.useState<ITransformedExample>({});
  const { component: ExampleComponent } = transformResult;

  // Check if editing should be enabled
  const canEdit = React.useMemo(() => {
    if (typeof useEditor === 'boolean') {
      return useEditor;
    }
    return isEditorSupported(code, supportedPackages);
  }, [useEditor, code, supportedPackages]);

  const onTransformFinished = React.useCallback(
    (result: ITransformedExample) => {
      setTransformResult(result);
      if (props.onTransformFinished) {
        props.onTransformFinished(result);
      }
    },
    [onTransformFinishedFromProps]
  );

  return (
    <div>
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

      <EditorErrorBoundary transformResult={transformResult}>
        <Preview {...previewProps}>{ExampleComponent ? <ExampleComponent /> : children}</Preview>
      </EditorErrorBoundary>
    </div>
  );
};

const EditorPreview: React.FunctionComponent<{}> = props => {
  return <div {...props} />;
};
