import type * as monacoApi from 'monaco-editor/esm/vs/editor/editor.api';

type Monaco = typeof monacoApi;
type Diagnostic = monacoApi.languages.typescript.Diagnostic;

export const COMPILER_OPTIONS: monacoApi.languages.typescript.CompilerOptions = {
  // numeric enum values, see `monaco.languages.typescript.{JsxEmit,ModuleKind,ScriptTarget}`
  jsx: 4, // JsxEmit.ReactJSX -> emits `require("react/jsx-runtime")`, so stories don't need to import React for JSX
  module: 1, // ModuleKind.CommonJS -> `require()` calls are resolved against the dependency allowlist
  target: 6, // ScriptTarget.ES2019
  esModuleInterop: true,
  allowNonTsExtensions: true,
  allowJs: true,
  strict: false,
  isolatedModules: true,
  noEmitHelpers: false,
};

export interface CompileDiagnostic {
  message: string;
  line?: number;
  column?: number;
}

export interface CompileResult {
  code: string;
  diagnostics: CompileDiagnostic[];
}

function flattenMessage(messageText: Diagnostic['messageText']): string {
  if (typeof messageText === 'string') {
    return messageText;
  }

  const parts: string[] = [messageText.messageText];
  (messageText.next ?? []).forEach(next => parts.push(flattenMessage(next)));

  return parts.join('\n');
}

function toCompileDiagnostic(model: monacoApi.editor.ITextModel, diagnostic: Diagnostic): CompileDiagnostic {
  const result: CompileDiagnostic = { message: flattenMessage(diagnostic.messageText) };

  if (typeof diagnostic.start === 'number') {
    const position = model.getPositionAt(diagnostic.start);
    result.line = position.lineNumber;
    result.column = position.column;
  }

  return result;
}

/**
 * Transpiles the TSX content of provided model to CommonJS. Work happens inside Monaco's TypeScript web worker.
 */
export async function compile(monaco: Monaco, model: monacoApi.editor.ITextModel): Promise<CompileResult> {
  const getWorker = await monaco.languages.typescript.getTypeScriptWorker();
  const worker = await getWorker(model.uri);
  const fileName = model.uri.toString();

  const [syntacticDiagnostics, emitOutput] = await Promise.all([
    worker.getSyntacticDiagnostics(fileName),
    worker.getEmitOutput(fileName),
  ]);

  const diagnostics = syntacticDiagnostics.map(diagnostic => toCompileDiagnostic(model, diagnostic));
  const jsOutput = emitOutput.outputFiles.find(file => file.name.endsWith('.js'));

  return {
    code: jsOutput?.text ?? '',
    diagnostics,
  };
}

export function formatDiagnostics(diagnostics: CompileDiagnostic[]): string {
  return diagnostics
    .map(diagnostic => {
      const location = diagnostic.line ? `(${diagnostic.line},${diagnostic.column}) ` : '';
      return `${location}${diagnostic.message}`;
    })
    .join('\n');
}
