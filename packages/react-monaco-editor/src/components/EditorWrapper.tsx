import * as React from 'react';
import { EditorErrorBoundary } from './EditorErrorHandler';
import { TypeScriptSnippet } from './TypeScriptSnippet';
import { EditorLoading } from './EditorLoading';
import { isEditorSupported } from '../utilities/index';
import { DEFAULT_HEIGHT } from './consts';

// This file MUST NOT directly load the main TsxEditor module which depends on Monaco
// (aside from for typing purposes), to avoid pulling it into a bundle.
import * as TsxEditorModule from './TsxEditor';
import type { IEditorWrapperProps } from './EditorWrapper.types';
import type { ITransformedExample } from '../interfaces/index';

const TsxEditorLazy = React.lazy(
  () =>
    // Theoretically we could use import() here, but that pulls things into bundles when using
    // commonjs modules due to the way import is transpiled for commonjs
    // https://github.com/webpack/webpack/issues/5703#issuecomment-357512412
    new Promise<typeof TsxEditorModule>(resolve => require.ensure([], require => resolve(require('./TsxEditor')))),
);

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
    children,
  } = props;

  const [transformResult, setTransformResult] = React.useState<ITransformedExample>({});
  const { component: ExampleComponent } = transformResult;

  // Check if editing should be enabled
  const canEdit = React.useMemo(
    () => isEditorSupported(code, supportedPackages, useEditor),
    [useEditor, code, supportedPackages],
  );

  const onTransformFinished = React.useCallback(
    (result: ITransformedExample) => {
      setTransformResult(result);
      if (onTransformFinishedFromProps) {
        onTransformFinishedFromProps(result);
      }
    },
    [onTransformFinishedFromProps],
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
              supportedPackages={supportedPackages}
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
