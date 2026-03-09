import { safeEvaluateExpression } from './safeExpressionEvaluator';

describe('safeEvaluateExpression', () => {
  const datum = { x: 10, y: 55, category: 'A', label: 'hello world', nested: { a: 1 }, year: 2020, value: 100 };

  // -- Property access -------------------------------------------------------
  it('reads datum properties via dot notation', () => {
    expect(safeEvaluateExpression('datum.x', datum)).toBe(10);
    expect(safeEvaluateExpression('datum.category', datum)).toBe('A');
  });

  it('reads datum properties via bracket notation', () => {
    expect(safeEvaluateExpression("datum['label']", datum)).toBe('hello world');
  });

  it('reads nested datum properties', () => {
    expect(safeEvaluateExpression('datum.nested.a', datum)).toBe(1);
  });

  // -- Comparisons -----------------------------------------------------------
  it('evaluates > comparison', () => {
    expect(safeEvaluateExpression('datum.y > 30', datum)).toBe(true);
    expect(safeEvaluateExpression('datum.x > 30', datum)).toBe(false);
  });

  it('evaluates === strict equality', () => {
    expect(safeEvaluateExpression("datum.category === 'A'", datum)).toBe(true);
    expect(safeEvaluateExpression("datum.category === 'B'", datum)).toBe(false);
  });

  // -- Logical ---------------------------------------------------------------
  it('evaluates && and ||', () => {
    expect(safeEvaluateExpression('datum.x > 5 && datum.y > 50', datum)).toBe(true);
    expect(safeEvaluateExpression('datum.x > 100 || datum.y > 50', datum)).toBe(true);
  });

  // -- Arithmetic ------------------------------------------------------------
  it('evaluates arithmetic', () => {
    expect(safeEvaluateExpression('datum.x + datum.y', datum)).toBe(65);
    expect(safeEvaluateExpression('datum.x * 2', datum)).toBe(20);
  });

  // -- Ternary ---------------------------------------------------------------
  it('evaluates ternary expression', () => {
    expect(safeEvaluateExpression("datum.x > 5 ? 'big' : 'small'", datum)).toBe('big');
  });

  // -- Realistic Vega-Lite expressions ---------------------------------------
  it('evaluates typical filter expression: datum.y > 30', () => {
    expect(safeEvaluateExpression('datum.y > 30', { y: 28 })).toBe(false);
    expect(safeEvaluateExpression('datum.y > 30', { y: 55 })).toBe(true);
  });

  it('evaluates compound conditional', () => {
    expect(safeEvaluateExpression('datum.year === 2020 && datum.value > 50', datum)).toBe(true);
  });

  // -- Security: rejected patterns -------------------------------------------
  it('rejects unknown identifiers (prevents access to globals)', () => {
    expect(() => safeEvaluateExpression('window', datum)).toThrow(/disallowed identifier/);
    expect(() => safeEvaluateExpression('document', datum)).toThrow(/disallowed identifier/);
    expect(() => safeEvaluateExpression('globalThis', datum)).toThrow(/disallowed identifier/);
    expect(() => safeEvaluateExpression('process', datum)).toThrow(/disallowed identifier/);
    expect(() => safeEvaluateExpression('this', datum)).toThrow(/disallowed identifier/);
  });

  it('rejects function call attempts via disallowed identifiers', () => {
    expect(() => safeEvaluateExpression('alert(1)', datum)).toThrow(/disallowed identifier/);
    expect(() => safeEvaluateExpression('eval("code")', datum)).toThrow(/disallowed identifier/);
    expect(() => safeEvaluateExpression('fetch("url")', datum)).toThrow(/disallowed identifier/);
  });

  it('rejects prototype chain traversal', () => {
    expect(() => safeEvaluateExpression('datum.constructor', datum)).toThrow(/disallowed property/);
    expect(() => safeEvaluateExpression('datum.__proto__', datum)).toThrow(/disallowed property/);
    expect(() => safeEvaluateExpression('datum.prototype', datum)).toThrow(/disallowed property/);
  });

  it('rejects assignment operators', () => {
    expect(() => safeEvaluateExpression('datum.x = 42', datum)).toThrow(/assignment/);
  });

  it('rejects dangerous syntax', () => {
    expect(() => safeEvaluateExpression('`${datum.x}`', datum)).toThrow(/disallowed syntax/);
    expect(() => safeEvaluateExpression('datum.x; datum.y', datum)).toThrow(/disallowed syntax/);
  });

  it('rejects empty expression', () => {
    expect(() => safeEvaluateExpression('', datum)).toThrow();
    expect(() => safeEvaluateExpression('   ', datum)).toThrow();
  });

  // -- String literals containing blocked words should be allowed ------------
  it('allows blocked words inside string literals', () => {
    expect(safeEvaluateExpression("datum.category === 'constructor'", datum)).toBe(false);
    expect(safeEvaluateExpression("datum.category === 'window'", datum)).toBe(false);
  });
});
