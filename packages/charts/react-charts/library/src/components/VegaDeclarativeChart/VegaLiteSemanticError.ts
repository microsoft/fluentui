/** Internal semantic failures: policy follows the code, never the diagnostic wording. */
export class SemanticError extends Error {
  public constructor(message: string, public readonly code: 'WORKBUDGET' | 'UNSUPPORTED' | 'INVALID' = 'INVALID') {
    super(`Vega semantics: ${message.replace(/^Vega semantics: /, '')}`);
  }
}

export const toSemanticError = (error: unknown, message?: string): SemanticError =>
  error instanceof SemanticError
    ? error
    : new SemanticError(
        message ?? (error instanceof Error ? error.message : typeof error === 'string' ? error : 'transform failed'),
      );

/** Compatibility bridge ONLY for unowned evaluator/statistics calls that still throw untyped budgets. */
export function withLegacyVegaBudgetErrors<T>(run: () => T): T {
  try {
    return run();
  } catch (error) {
    if (error instanceof Error && !(error instanceof SemanticError) && /limit|work budget/i.test(error.message)) {
      throw new SemanticError(error.message, 'WORKBUDGET');
    }
    throw error;
  }
}
