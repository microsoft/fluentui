import * as React from 'react';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { EditorPreview } from './EditorPreview';
import { IEditorWrapperProps, IEditorPreviewProps } from './EditorWrapper.types';
import { EditorError } from './EditorError';
import { TypeScriptSnippet } from './TypeScriptSnippet';
import { EditorLoading } from './EditorLoading';
import { SUPPORTED_PACKAGES } from '../utilities/defaultSupportedPackages';
import { isEditorSupported } from '../utilities/isEditorSupported';

// This file MUST NOT directly load the main TsxEditor module which depends on Monaco, to avoid
// pulling it into a bundle. Importing/rendering with React.lazy solves this.
const TsxEditorLazy = React.lazy(() => import('./TsxEditor'));

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
    supportedPackages = SUPPORTED_PACKAGES,
    children
  } = props;

  const idRef = React.useRef<string>();
  if (!idRef.current) {
    idRef.current = getId('EditorPreview');
  }
  const previewId = idRef.current!;

  const [error, setError] = React.useState<string | string[]>();

  // Check if editing should be enabled
  const canEdit = React.useMemo(() => {
    if (typeof useEditor === 'boolean') {
      return useEditor;
    }
    return isEditorSupported(code, supportedPackages);
  }, [useEditor, code, supportedPackages]);

  return (
    <div>
      {isCodeVisible && (
        <div className={editorClassName}>
          {canEdit ? (
            // Editing supported -- render editor module (or loading spinner)
            <React.Suspense fallback={<EditorLoading height={height} />}>
              <TsxEditorLazy editorProps={{ code, width, height, modelRef }} onTransformFinished={setError} previewId={previewId} />
            </React.Suspense>
          ) : (
            // Editing not supported
            <TypeScriptSnippet>{code}</TypeScriptSnippet>
          )}
        </div>
      )}

      {isCodeVisible && <EditorError error={error} />}

      {onRenderPreview({ className: previewClassName, id: previewId, children }, _onRenderPreview)}
    </div>
  );
};

function _onRenderPreview(props: IEditorPreviewProps): React.ReactNode {
  return <EditorPreview {...props} />;
}
