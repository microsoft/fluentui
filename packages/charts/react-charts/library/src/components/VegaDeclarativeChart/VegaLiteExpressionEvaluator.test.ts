import { safeEvaluateExpression } from './VegaLiteExpressionEvaluator';

describe('VegaLiteExpressionEvaluator', () => {
  // -------------------------------------------------------------------
  // Safe expressions that SHOULD work
  // -------------------------------------------------------------------
  describe('safe expressions', () => {
    it('evaluates simple property access', () => {
      expect(safeEvaluateExpression('datum.x', { x: 42 })).toBe(42);
    });

    it('evaluates bracket property access', () => {
      expect(safeEvaluateExpression("datum['field name']", { 'field name': 'hello' })).toBe('hello');
    });

    it('evaluates nested property access', () => {
      expect(safeEvaluateExpression('datum.a.b', { a: { b: 99 } })).toBe(99);
    });

    it('evaluates arithmetic', () => {
      expect(safeEvaluateExpression('datum.a + datum.b', { a: 3, b: 7 })).toBe(10);
      expect(safeEvaluateExpression('datum.a * 2', { a: 5 })).toBe(10);
      expect(safeEvaluateExpression('datum.a - datum.b', { a: 10, b: 3 })).toBe(7);
      expect(safeEvaluateExpression('datum.a / datum.b', { a: 10, b: 2 })).toBe(5);
      expect(safeEvaluateExpression('datum.a % 3', { a: 7 })).toBe(1);
    });

    it('evaluates comparison operators', () => {
      expect(safeEvaluateExpression('datum.x > 100', { x: 150 })).toBe(true);
      expect(safeEvaluateExpression('datum.x > 100', { x: 50 })).toBe(false);
      expect(safeEvaluateExpression('datum.x < 100', { x: 50 })).toBe(true);
      expect(safeEvaluateExpression('datum.x >= 100', { x: 100 })).toBe(true);
      expect(safeEvaluateExpression('datum.x <= 100', { x: 100 })).toBe(true);
    });

    it('evaluates equality operators', () => {
      expect(safeEvaluateExpression("datum.x === 'A'", { x: 'A' })).toBe(true);
      expect(safeEvaluateExpression("datum.x === 'B'", { x: 'A' })).toBe(false);
      expect(safeEvaluateExpression("datum.x !== 'A'", { x: 'B' })).toBe(true);
      expect(safeEvaluateExpression('datum.x == null', { x: null })).toBe(true);
      expect(safeEvaluateExpression('datum.x != null', { x: 42 })).toBe(true);
    });

    it('evaluates logical operators', () => {
      expect(safeEvaluateExpression('datum.a > 0 && datum.b > 0', { a: 1, b: 2 })).toBe(true);
      expect(safeEvaluateExpression('datum.a > 0 && datum.b > 0', { a: 1, b: -1 })).toBe(false);
      expect(safeEvaluateExpression('datum.a > 0 || datum.b > 0', { a: -1, b: 2 })).toBe(true);
      expect(safeEvaluateExpression('!datum.flag', { flag: false })).toBe(true);
    });

    it('evaluates ternary expressions', () => {
      expect(safeEvaluateExpression("datum.x > 0 ? 'positive' : 'non-positive'", { x: 5 })).toBe('positive');
      expect(safeEvaluateExpression("datum.x > 0 ? 'positive' : 'non-positive'", { x: -1 })).toBe('non-positive');
    });

    it('evaluates string concatenation', () => {
      expect(safeEvaluateExpression("datum.first + ' ' + datum.last", { first: 'John', last: 'Doe' })).toBe('John Doe');
    });

    it('evaluates numeric literals', () => {
      expect(safeEvaluateExpression('42', {})).toBe(42);
      expect(safeEvaluateExpression('3.14', {})).toBe(3.14);
      expect(safeEvaluateExpression('-1', {})).toBe(-1);
    });

    it('evaluates string literals', () => {
      expect(safeEvaluateExpression("'hello'", {})).toBe('hello');
      expect(safeEvaluateExpression('"world"', {})).toBe('world');
    });

    it('evaluates boolean and null literals', () => {
      expect(safeEvaluateExpression('true', {})).toBe(true);
      expect(safeEvaluateExpression('false', {})).toBe(false);
      expect(safeEvaluateExpression('null', {})).toBe(null);
    });

    it('evaluates safe built-in functions', () => {
      expect(safeEvaluateExpression('isValid(datum.x)', { x: 42 })).toBe(true);
      expect(safeEvaluateExpression('isValid(datum.x)', { x: null })).toBe(false);
      expect(safeEvaluateExpression('isNumber(datum.x)', { x: 42 })).toBe(true);
      expect(safeEvaluateExpression('isString(datum.x)', { x: 'hello' })).toBe(true);
      expect(safeEvaluateExpression('abs(datum.x)', { x: -5 })).toBe(5);
      expect(safeEvaluateExpression('floor(datum.x)', { x: 3.7 })).toBe(3);
      expect(safeEvaluateExpression('ceil(datum.x)', { x: 3.2 })).toBe(4);
      expect(safeEvaluateExpression('round(datum.x)', { x: 3.5 })).toBe(4);
      expect(safeEvaluateExpression('pow(datum.x, 2)', { x: 3 })).toBe(9);
      expect(safeEvaluateExpression('min(datum.a, datum.b)', { a: 3, b: 7 })).toBe(3);
      expect(safeEvaluateExpression('max(datum.a, datum.b)', { a: 3, b: 7 })).toBe(7);
    });

    it('evaluates safe constants', () => {
      expect(safeEvaluateExpression('PI', {})).toBe(Math.PI);
      expect(safeEvaluateExpression('E', {})).toBe(Math.E);
    });

    it('evaluates parenthesized expressions', () => {
      expect(safeEvaluateExpression('(datum.a + datum.b) * 2', { a: 3, b: 4 })).toBe(14);
    });

    it('handles unary operators', () => {
      expect(safeEvaluateExpression('+datum.x', { x: '42' })).toBe(42);
      expect(safeEvaluateExpression('-datum.x', { x: 5 })).toBe(-5);
    });

    it('handles undefined property access gracefully', () => {
      expect(safeEvaluateExpression('datum.missing', {})).toBe(undefined);
    });

    it('handles typical Vega-Lite filter expressions', () => {
      const datum = { Horsepower: 150, Year: 2005, Origin: 'USA' };
      expect(safeEvaluateExpression('datum.Horsepower > 100', datum)).toBe(true);
      expect(safeEvaluateExpression('datum.Year > 2000', datum)).toBe(true);
      expect(safeEvaluateExpression("datum.Origin === 'USA'", datum)).toBe(true);
    });

    it('handles typical Vega-Lite calculate expressions', () => {
      const datum = { a: 10, b: 20 };
      expect(safeEvaluateExpression('2 * datum.b', datum)).toBe(40);
      expect(safeEvaluateExpression('datum.a + datum.b', datum)).toBe(30);
    });
  });

  // -------------------------------------------------------------------
  // Malicious expressions that MUST be rejected
  // -------------------------------------------------------------------
  describe('security — rejects malicious expressions', () => {
    it('rejects assignment via globalThis (MSRC PoC)', () => {
      expect(() =>
        safeEvaluateExpression("((globalThis.__msrcFluentUiPoc = 'owned-from-calculate'), 1337)", {}),
      ).toThrow();
    });

    it('rejects plain assignment', () => {
      expect(() => safeEvaluateExpression("x = 'injected'", {})).toThrow();
    });

    it('blocks constructor access — returns undefined, not the real constructor', () => {
      // constructor is inherited (not own property), so access returns undefined
      expect(safeEvaluateExpression('datum.constructor', {})).toBeUndefined();
      // Attempting to call it as a function still throws
      expect(() => safeEvaluateExpression("datum.constructor('return this')()", {})).toThrow();
    });

    it('blocks __proto__ access — returns undefined', () => {
      expect(safeEvaluateExpression('datum.__proto__', {})).toBeUndefined();
    });

    it('blocks prototype access — returns undefined', () => {
      expect(safeEvaluateExpression('datum.prototype', {})).toBeUndefined();
    });

    it('blocks constructor via bracket notation — returns undefined', () => {
      expect(safeEvaluateExpression("datum['constructor']", {})).toBeUndefined();
    });

    it('allows own property named constructor if explicitly in data', () => {
      // If data explicitly has a "constructor" field, it IS accessible (it's just a string, not Function)
      expect(safeEvaluateExpression('datum.constructor', { constructor: 'safe-value' })).toBe('safe-value');
    });

    it('rejects access to window', () => {
      expect(() => safeEvaluateExpression('window.location', {})).toThrow();
    });

    it('rejects access to document', () => {
      expect(() => safeEvaluateExpression('document.cookie', {})).toThrow();
    });

    it('rejects access to globalThis', () => {
      expect(() => safeEvaluateExpression('globalThis', {})).toThrow();
    });

    it('rejects eval', () => {
      expect(() => safeEvaluateExpression("eval('alert(1)')", {})).toThrow();
    });

    it('rejects Function constructor', () => {
      expect(() => safeEvaluateExpression("Function('return this')()", {})).toThrow();
    });

    it('rejects require', () => {
      expect(() => safeEvaluateExpression("require('child_process')", {})).toThrow();
    });

    it('rejects import', () => {
      expect(() => safeEvaluateExpression("import('fs')", {})).toThrow();
    });

    it('rejects process access', () => {
      expect(() => safeEvaluateExpression('process.env', {})).toThrow();
    });

    it('rejects fetch', () => {
      expect(() => safeEvaluateExpression("fetch('https://evil.com')", {})).toThrow();
    });

    it('rejects prototype chain traversal', () => {
      expect(() => safeEvaluateExpression("(0)['constructor']['constructor']('return globalThis')()", {})).toThrow();
    });

    it('rejects calling non-function values', () => {
      expect(() => safeEvaluateExpression('datum.x()', { x: 42 })).toThrow();
    });

    it('rejects template literals (backticks)', () => {
      expect(() => safeEvaluateExpression('`injected`', {})).toThrow();
    });

    it('rejects semicolons (statement separator)', () => {
      expect(() => safeEvaluateExpression("datum.x; alert('xss')", { x: 1 })).toThrow();
    });

    it('rejects curly braces (block statements)', () => {
      expect(() => safeEvaluateExpression("{ alert('xss') }", {})).toThrow();
    });
  });
});
