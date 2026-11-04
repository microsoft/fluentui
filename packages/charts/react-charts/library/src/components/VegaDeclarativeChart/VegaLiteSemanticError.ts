/** Internal semantic failures: policy follows the code, never the diagnostic wording. */
export class SemanticError extends Error {
  public constructor(
    message: string,
    public readonly code: 'WORKBUDGET' | 'UNSUPPORTED' | 'INVALID' = 'INVALID',
    options?: { preserveMessage?: boolean },
  ) {
    super(options?.preserveMessage ? message : `Vega semantics: ${message.replace(/^Vega semantics: /, '')}`);
  }
}

export const toSemanticError = (error: unknown, message?: string): SemanticError =>
  error instanceof SemanticError
    ? error
    : new SemanticError(
        message ?? (error instanceof Error ? error.message : typeof error === 'string' ? error : 'transform failed'),
      );

/**
 * @deprecated Producers now throw canonical SemanticError instances. Call run directly instead.
 * Retained as a transparent compatibility wrapper; never infer error policy from message text.
 */
export function withLegacyVegaBudgetErrors<T>(run: () => T): T {
  return run();
}
