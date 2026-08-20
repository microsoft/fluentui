import type {
  DashboardGridEngineDiagnostic,
  DashboardGridEngineDiagnosticCode,
  DashboardGridEngineError,
} from './DashboardGridEngine.types';

export type DiagnosticReporter = {
  development: boolean;
  onDiagnostic?: (diagnostic: DashboardGridEngineDiagnostic) => void;
  onError?: (error: DashboardGridEngineError) => void;
};

export const createDiagnostic = (
  code: DashboardGridEngineDiagnosticCode,
  message: string,
  options: {
    severity?: 'warning' | 'error';
    recoverable?: boolean;
    itemId?: string;
    details?: Readonly<Record<string, unknown>>;
  } = {},
): DashboardGridEngineDiagnostic =>
  Object.freeze({
    code,
    message,
    severity: options.severity ?? 'warning',
    recoverable: options.recoverable ?? true,
    ...(options.itemId === undefined ? {} : { itemId: options.itemId }),
    ...(options.details === undefined
      ? {}
      : { details: Object.freeze({ ...options.details }) }),
  });

export const reportDiagnostic = (
  reporter: DiagnosticReporter,
  diagnostic: DashboardGridEngineDiagnostic,
  cause?: unknown,
): void => {
  if (diagnostic.severity === 'error') {
    reporter.onError?.(Object.freeze({ diagnostic, ...(cause === undefined ? {} : { cause }) }));
  }

  if (reporter.development) {
    reporter.onDiagnostic?.(diagnostic);
  }
};

export class DashboardGridCollisionCycleError extends Error {
  public constructor(public readonly passes: number) {
    super(`Dashboard grid collision repair exceeded its ${passes}-pass budget.`);
    this.name = 'DashboardGridCollisionCycleError';
  }
}
