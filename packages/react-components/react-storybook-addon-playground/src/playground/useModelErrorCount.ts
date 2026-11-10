import * as React from 'react';
import type * as monacoApi from 'monaco-editor/esm/vs/editor/editor.api';

type MonacoMarkers = {
  editor?: Pick<typeof monacoApi.editor, 'getModelMarkers' | 'onDidChangeMarkers'>;
  MarkerSeverity?: Pick<typeof monacoApi.MarkerSeverity, 'Error'>;
};

const noop = () => undefined;
const getServerSnapshot = () => 0;

/**
 * Number of error markers (syntax and type errors) Monaco currently reports for provided model.
 */
export function useModelErrorCount(monaco: MonacoMarkers, model: monacoApi.editor.ITextModel | null): number {
  const { editor, MarkerSeverity } = monaco;

  const subscribe = React.useCallback(
    (onChange: () => void) => {
      if (!model || !editor) {
        return noop;
      }

      const uri = model.uri.toString();
      const subscription = editor.onDidChangeMarkers(uris => {
        if (uris.some(changed => changed.toString() === uri)) {
          onChange();
        }
      });
      return () => subscription.dispose();
    },
    [editor, model],
  );

  const getSnapshot = React.useCallback(
    () =>
      model && editor && MarkerSeverity
        ? editor.getModelMarkers({ resource: model.uri }).filter(marker => marker.severity === MarkerSeverity.Error)
            .length
        : 0,
    [MarkerSeverity, editor, model],
  );

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
