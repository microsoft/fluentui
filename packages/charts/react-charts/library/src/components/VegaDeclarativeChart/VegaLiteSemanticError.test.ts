/* eslint-disable @typescript-eslint/no-deprecated -- Explicitly verify the retained compatibility wrapper. */
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

  it('keeps the compatibility wrapper transparent for return values', () => {
    const value = {};
    const run = jest.fn(() => value);
    expect(withLegacyVegaBudgetErrors(run)).toBe(value);
    expect(run).toHaveBeenCalledTimes(1);
  });

  it('can preserve a producer message exactly without changing canonical identity', () => {
    const message = 'Safe expression evaluator: array conversion work limit exceeded';
    const error = new SemanticError(message, 'WORKBUDGET', { preserveMessage: true });
    expect(error.message).toBe(message);
    expect(error.code).toBe('WORKBUDGET');
    expect(toSemanticError(error, 'replacement')).toBe(error);
  });

  it.each([
    new Error('work limit exceeded'),
    Object.assign(new Error('work limit exceeded'), { code: 'WORKBUDGET' }),
    { code: 'WORKBUDGET', message: 'stop' },
    'work budget exceeded',
  ])('does not infer a canonical budget from %j', error => {
    let caught: unknown;
    try {
      withLegacyVegaBudgetErrors(() => {
        throw error;
      });
    } catch (failure) {
      caught = failure;
    }
    expect(caught).toBe(error);
    expect(toSemanticError(error).code).toBe('INVALID');
  });
});
