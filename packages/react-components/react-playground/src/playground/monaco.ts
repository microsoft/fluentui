/**
 * Minimal Monaco setup: core editor features + TypeScript language support only.
 * This avoids bundling CSS/HTML/JSON language services and their workers.
 */
import 'monaco-editor/esm/vs/editor/editor.all.js';
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution.js';
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution.js';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import { COMPILER_OPTIONS } from './compiler';

type MonacoGlobal = typeof globalThis & { MonacoEnvironment?: monaco.Environment };

(globalThis as MonacoGlobal).MonacoEnvironment = {
  getWorker(_workerId: string, label: string) {
    // `name` doubles as the webpack chunk name, see `webpack.playground.config.js`
    if (label === 'typescript' || label === 'javascript') {
      return new Worker(new URL('monaco-editor/esm/vs/language/typescript/ts.worker.js', import.meta.url), {
        name: 'ts.worker',
      });
    }

    return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url), {
      name: 'editor.worker',
    });
  },
};

monaco.languages.typescript.typescriptDefaults.setCompilerOptions(COMPILER_OPTIONS);
// Type declarations of the dependency allowlist are loaded asynchronously by `registerTypings()` (see `typings.ts`),
// which enables semantic validation once they are available - until then it would only report missing modules.
monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: false,
});
monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

export { monaco };
