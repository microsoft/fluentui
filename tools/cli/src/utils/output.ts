import * as fs from 'node:fs';
import * as path from 'node:path';

import type { CliCoverage, CliDiagnostic, CliStatus } from './diagnostics';

export const CLI_API_VERSION = '1';

export interface CliEnvelope<T> {
  apiVersion: typeof CLI_API_VERSION;
  type: string;
  data: T;
  diagnostics: CliDiagnostic[];
  coverage: CliCoverage;
  status: CliStatus;
}

export interface OutputOptions {
  json?: boolean;
  output?: string;
}

export function createEnvelope<T>(
  type: string,
  data: T,
  diagnostics: CliDiagnostic[],
  coverage: CliCoverage,
  status: CliStatus = coverage.status,
): CliEnvelope<T> {
  const diagnosticKeys = new Set<string>();
  return {
    apiVersion: CLI_API_VERSION,
    type,
    data,
    diagnostics: diagnostics.filter(diagnostic => {
      const key = JSON.stringify([
        diagnostic.code,
        diagnostic.severity,
        diagnostic.message,
        diagnostic.package,
        diagnostic.path,
        diagnostic.hint,
      ]);
      if (diagnosticKeys.has(key)) {
        return false;
      }
      diagnosticKeys.add(key);
      return true;
    }),
    coverage,
    status,
  };
}

export function emitOutput<T>(
  options: OutputOptions,
  envelope: CliEnvelope<T>,
  formatHuman: (value: CliEnvelope<T>) => string,
): void {
  const content = options.json ? `${JSON.stringify(envelope)}\n` : ensureTrailingNewline(formatHuman(envelope));

  if (options.output) {
    const outputPath = path.resolve(options.output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, content, 'utf8');
    return;
  }

  process.stdout.write(content);
}

export function emptyCoverage(status: CliStatus = 'complete'): CliCoverage {
  return {
    status,
    selectedRoots: 0,
    metadataRoots: 0,
    declarationFallbackRoots: 0,
    unavailableRoots: 0,
  };
}

export function formatDiagnostics(diagnostics: readonly CliDiagnostic[]): string {
  return diagnostics
    .map(diagnostic => {
      const context = [diagnostic.package, diagnostic.path].filter(Boolean).join(' ');
      const suffix = diagnostic.hint ? `\n    ${diagnostic.hint}` : '';
      return `- [${diagnostic.severity}] ${diagnostic.code}${context ? ` (${context})` : ''}: ${
        diagnostic.message
      }${suffix}`;
    })
    .join('\n');
}

function ensureTrailingNewline(value: string): string {
  return value.endsWith('\n') ? value : `${value}\n`;
}
