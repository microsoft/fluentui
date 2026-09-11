import type * as monacoApi from 'monaco-editor/esm/vs/editor/editor.api';
import typingsUrl from 'playground-typings';

type Monaco = typeof monacoApi;

/**
 * Loads the type declarations of the dependency allowlist (generated at build time, see
 * `tools/collect-typings.js`) into Monaco's TypeScript worker. Enables IntelliSense for `react`,
 * `@fluentui/react-components`, etc.
 *
 * @returns number of registered declaration files
 */
export async function registerTypings(monaco: Monaco, targetWindow: Window): Promise<number> {
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
