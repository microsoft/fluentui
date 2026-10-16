/**
 * Minimal Monaco setup: TypeScript language service + CSS tokenization.
 * CSS highlighting uses the basic language (no css.worker) so the shell stays small.
 */
import 'monaco-editor/esm/vs/editor/editor.all.js';
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution.js';
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution.js';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import { COMPILER_OPTIONS } from './compiler';

type MonacoGlobal = typeof globalThis & { MonacoEnvironment?: monaco.Environment };

const CANCELED = 'Canceled';

/**
 * Monaco cancels in-flight language feature requests (e.g. occurrence highlighting) when the editor switches models,
 * and some of those promises are never awaited. Such rejections are expected, so keep them out of the error console.
 */
export function isMonacoCancellation(reason: unknown): boolean {
  return reason instanceof Error && reason.name === CANCELED && reason.message === CANCELED;
}

globalThis.addEventListener?.('unhandledrejection', event => {
  if (isMonacoCancellation(event.reason)) {
    event.preventDefault();
  }
});

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
monaco.languages.typescript.typescriptDefaults.addExtraLib(
  `declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
`,
  'file:///playground/css-modules.d.ts',
);
// Type declarations of imported modules are loaded on demand by `TypingsLoader` (see `typings.ts`), which enables
// semantic validation once they are available - until then it would only report missing modules.
monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: false,
});
monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

export { monaco };
