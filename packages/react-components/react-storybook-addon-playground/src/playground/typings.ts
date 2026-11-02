import type * as monacoApi from 'monaco-editor/esm/vs/editor/editor.api';

type Monaco = typeof monacoApi;

// `import … from '…'`, `export … from '…'`, `import '…'`, `import('…')` and `require('…')`
const MODULE_SPECIFIER_REGEX = /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\brequire\s*\(\s*)["']([^"'\n]+)["']/g;

/**
 * Module specifiers referenced by source code. A fast approximation (it also matches text in comments), which is
 * fine for deciding which declarations to prefetch.
 */
export function getImportedModules(source: string): string[] {
  const modules = new Set<string>();
  for (const match of source.matchAll(MODULE_SPECIFIER_REGEX)) {
    modules.add(match[1]);
  }

  return Array.from(modules);
}

/**
 * Fetches a typings file (URL from the Storybook-emitted runtime manifest).
 */
export async function fetchTypings(targetWindow: Window, typingsUrl: string): Promise<Record<string, string>> {
  const response = await targetWindow.fetch(typingsUrl);

  if (!response.ok) {
    throw new Error(`Failed to load type declarations (${response.status} ${response.statusText})`);
  }

  return response.json();
}

/**
 * Adds declaration files to Monaco's TypeScript worker. Adding libraries updates the running worker; files that are
 * already registered with the same content are skipped by Monaco.
 *
 * @returns number of registered declaration files
 */
export function addTypings(monaco: Monaco, typings: Record<string, string>): number {
  const entries = Object.entries(typings);
  const { typescriptDefaults } = monaco.languages.typescript;

  // `addExtraLib` notifies the worker asynchronously & debounced, so adding many files in a row syncs them only once
  entries.forEach(([filePath, content]) => {
    typescriptDefaults.addExtraLib(content, filePath);
  });

  return entries.length;
}

/**
 * Types are available, so type errors become meaningful. Changing diagnostics options restarts the worker, so this
 * runs once.
 */
export function enableSemanticValidation(monaco: Monaco): void {
  const { typescriptDefaults } = monaco.languages.typescript;
  if (typescriptDefaults.getDiagnosticsOptions().noSemanticValidation === false) {
    return;
  }

  typescriptDefaults.setDiagnosticsOptions({
    ...typescriptDefaults.getDiagnosticsOptions(),
    noSemanticValidation: false,
  });
}

export type TypingsStatus = 'loading' | 'ready' | 'error';

/**
 * Fetches each typings file at most once (including concurrent requests) and exposes the aggregate status as an
 * external store for `useSyncExternalStore`.
 */
export class TypingsLoader {
  private readonly requests = new Map<string, Promise<void>>();
  private readonly failed = new Set<string>();
  private readonly listeners = new Set<() => void>();
  private pending = 0;
  private status: TypingsStatus = 'loading';

  public constructor(private readonly monaco: Monaco, private readonly targetWindow: Window) {}

  public load(typingsUrl: string): Promise<void> {
    const existing = this.requests.get(typingsUrl);
    if (existing) {
      return existing;
    }

    this.pending++;
    this.failed.delete(typingsUrl);
    this._update();
    const request = fetchTypings(this.targetWindow, typingsUrl).then(
      typings => {
        addTypings(this.monaco, typings);
        this._settle();
      },
      (error: unknown) => {
        // a later request for the same file retries it (for example after a network hiccup)
        this.requests.delete(typingsUrl);
        this.failed.add(typingsUrl);
        this._settle();
        throw error;
      },
    );
    this.requests.set(typingsUrl, request);

    return request;
  }

  public subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  public getStatus = (): TypingsStatus => this.status;

  private _settle(): void {
    this.pending--;
    this._update();
  }

  private _update(): void {
    const status: TypingsStatus = this.pending > 0 ? 'loading' : this.failed.size > 0 ? 'error' : 'ready';
    if (status !== this.status) {
      this.status = status;
      this.listeners.forEach(listener => listener());
    }
  }
}
