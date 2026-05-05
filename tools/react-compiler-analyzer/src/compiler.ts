import { extname } from 'node:path';

import { transformAsync } from '@babel/core';
import type { PluginItem } from '@babel/core';

import type { CompilationMode } from './types';

export interface CompilerEvent {
  kind: 'CompileSuccess' | 'CompileError' | 'CompileSkip' | 'PipelineError' | string;
  fnLoc: { start: { line: number; column: number }; end: { line: number; column: number } } | null;
  fnName?: string | null;
  reason?: string;
  detail?: unknown;
  data?: string;
  memoSlots?: number;
  memoBlocks?: number;
  memoValues?: number;
  prunedMemoBlocks?: number;
  prunedMemoValues?: number;
}

interface CompilerDetailLike {
  reason?: string;
  description?: string;
  loc?: {
    start?: { line?: number; column?: number };
  };
}

/**
 * Extract a human-readable reason string from a CompileError detail object.
 * The `detail` can be a CompilerErrorDetail or CompilerDiagnostic from the
 * React Compiler — both carry a `.reason` and optional `.description`.
 * Falls back to `String(detail)` and then to `Error.toString()`.
 */
export function extractDetailReason(detail: unknown): string {
  if (detail === null || detail === undefined) {
    return '';
  }
  // CompilerErrorDetail / CompilerDiagnostic expose .reason + .description
  if (typeof detail === 'object') {
    const compilerDetail = detail as CompilerDetailLike;
    const parts: string[] = [];

    if (typeof compilerDetail.reason === 'string') {
      parts.push(compilerDetail.reason);
    }
    if (typeof compilerDetail.description === 'string') {
      parts.push(compilerDetail.description);
    }
    // Some details nest a loc with line/column info
    if (compilerDetail.loc && typeof compilerDetail.loc === 'object' && compilerDetail.loc.start) {
      const start = compilerDetail.loc.start;
      parts.push(`(${start.line ?? '?'}:${start.column ?? '?'})`);
    }
    if (parts.length > 0) {
      return parts.join(' ');
    }
  }
  return String(detail);
}

// ── Shared compiler invocation ──

export interface CompileOptions {
  compilationMode?: CompilationMode;
  plugins?: PluginItem[];
}

export interface CompileResult {
  events: CompilerEvent[];
  error?: Error;
}

/**
 * Run the React Compiler (via babel transform) on source code and collect events.
 * Returns compiler events for each function in the source.
 */
export async function compileSource(
  source: string,
  filePath: string,
  options: CompileOptions = {},
): Promise<CompileResult> {
  const events: CompilerEvent[] = [];
  const logger = {
    logEvent: (_filename: string | null, event: CompilerEvent) => {
      events.push(event);
    },
  };

  const ext = extname(filePath);
  const isTSX = ext === '.tsx';

  const extraPlugins = options.plugins ?? [];
  const compilerPluginConfig: [string, Record<string, unknown>] = [
    require.resolve('babel-plugin-react-compiler'),
    {
      noEmit: true,
      panicThreshold: 'none',
      ...(options.compilationMode ? { compilationMode: options.compilationMode } : {}),
      logger,
    },
  ];

  try {
    await transformAsync(source, {
      filename: filePath,
      ast: false,
      code: false,
      babelrc: false,
      configFile: false,
      presets: [
        [
          require.resolve('@babel/preset-typescript'),
          {
            isTSX: isTSX || ext === '.ts',
            allExtensions: true,
          },
        ],
      ],
      plugins: [...extraPlugins, compilerPluginConfig],
    });
  } catch (err) {
    return { events, error: err as Error };
  }

  return { events };
}
