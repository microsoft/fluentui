import type * as monacoApi from 'monaco-editor/esm/vs/editor/editor.api';

type Monaco = typeof monacoApi;

/**
 * Loads type declarations (URL from the Storybook-emitted runtime manifest) into Monaco's TypeScript worker.
 *
 * @returns number of registered declaration files
 */
export async function registerTypings(monaco: Monaco, targetWindow: Window, typingsUrl: string): Promise<number> {
  const response = await targetWindow.fetch(typingsUrl);

  if (!response.ok) {
    throw new Error(`Failed to load type declarations (${response.status} ${response.statusText})`);
  }

  const typings: Record<string, string> = await response.json();
  const entries = Object.entries(typings);

  const { typescriptDefaults } = monaco.languages.typescript;

  // `addExtraLib` notifies the worker asynchronously & debounced, so adding many files in a row restarts it only once
  entries.forEach(([filePath, content]) => {
    typescriptDefaults.addExtraLib(content, filePath);
  });

  // types are available now, so type errors become meaningful
  typescriptDefaults.setDiagnosticsOptions({
    ...typescriptDefaults.getDiagnosticsOptions(),
    noSemanticValidation: false,
  });

  return entries.length;
}
