export type CliStatus = 'complete' | 'partial' | 'unavailable';

export type CliDiagnosticSeverity = 'info' | 'warning' | 'error';

export interface CliDiagnostic {
  code: string;
  severity: CliDiagnosticSeverity;
  message: string;
  path?: string;
  package?: string;
  hint?: string;
}

export interface CliCoverage {
  status: CliStatus;
  selectedRoots: number;
  metadataRoots: number;
  declarationFallbackRoots: number;
  unavailableRoots: number;
}

export class CliError extends Error {
  public constructor(
    public readonly code: string,
    message: string,
    public readonly exitCode = 1,
    public readonly diagnostics: CliDiagnostic[] = [],
    public readonly data?: unknown,
    public readonly coverage?: CliCoverage,
  ) {
    super(message);
    this.name = 'CliError';
  }
}

export function normalizeDiagnostic(value: unknown, fallbackCode = 'CLI_DIAGNOSTIC'): CliDiagnostic {
  if (!value || typeof value !== 'object') {
    return {
      code: fallbackCode,
      severity: 'warning',
      message: String(value),
    };
  }

  const diagnostic = value as Record<string, unknown>;
  return {
    code: typeof diagnostic.code === 'string' ? diagnostic.code : fallbackCode,
    severity: normalizeSeverity(diagnostic.severity),
    message: typeof diagnostic.message === 'string' ? diagnostic.message : JSON.stringify(value),
    path: typeof diagnostic.path === 'string' ? diagnostic.path : undefined,
    package: typeof diagnostic.package === 'string' ? diagnostic.package : undefined,
    hint: typeof diagnostic.hint === 'string' ? diagnostic.hint : undefined,
  };
}

function normalizeSeverity(value: unknown): CliDiagnosticSeverity {
  return value === 'error' || value === 'info' || value === 'warning' ? value : 'warning';
}
