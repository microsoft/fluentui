import { SemanticError, toSemanticError, withLegacyVegaBudgetErrors } from './VegaLiteSemanticError';

describe('internal semantic error policy', () => {
  it.each(['WORKBUDGET', 'UNSUPPORTED', 'INVALID'] as const)('preserves explicit %s regardless of wording', code => {
    for (const message of ['stop', 'unknown work limit exceeded']) {
      const error = new SemanticError(message, code);
      expect(error.code).toBe(code);
      expect(toSemanticError(error, 'replacement')).toBe(error);
      let caught: unknown;
      try {
        withLegacyVegaBudgetErrors(() => {
          throw error;
        });
      } catch (failure) {
        caught = failure;
      }
      expect(caught).toBe(error);
    }
  });

  it.each(['work limit exceeded', 'unknown operation', 'unsupported input'])(
    'defaults untyped %s to INVALID',
    message => {
      expect(toSemanticError(new Error(message))).toMatchObject({ code: 'INVALID' });
      expect(toSemanticError(message)).toMatchObject({ code: 'INVALID' });
    },
  );

  it('adds exactly one semantic prefix and safely handles non-error values', () => {
    expect(toSemanticError(new Error('Vega semantics: invalid input')).message).toBe('Vega semantics: invalid input');
    const toString = jest.fn();
    expect(toSemanticError({ toString }).message).toBe('Vega semantics: transform failed');
    expect(toString).not.toHaveBeenCalled();
  });
});
