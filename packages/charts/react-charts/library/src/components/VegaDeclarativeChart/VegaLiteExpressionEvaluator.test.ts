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

    it('allows nested and parenthesized safe built-in calls', () => {
      expect(safeEvaluateExpression('round(abs(datum.x))', { x: -3.7 })).toBe(4);
      expect(safeEvaluateExpression('(datum.roundUp ? ceil : floor)(datum.x)', { roundUp: true, x: 3.2 })).toBe(4);
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

  describe('safe data coercion', () => {
    it.each(['count', '__proto__', 'constructor', 'toString', 'valueOf'])(
      'stringifies a null-prototype transform row with an own %s alias',
      field => {
        const datum = Object.create(null);
        Object.defineProperty(datum, field, { value: 2, enumerable: true });

        expect(safeEvaluateExpression('toString(datum)', datum)).toBe('[object Object]');
        expect(safeEvaluateExpression(`length(toString(datum)) + datum['${field}']`, datum)).toBe(17);
      },
    );

    it.each([
      ['null', null, 'null', 0],
      ['undefined', undefined, 'undefined', NaN],
      ['boolean', true, 'true', 1],
      ['number', 42, '42', 42],
      ['numeric string', '42', '42', 42],
      ['empty string', '', '', 0],
      ['record', {}, '[object Object]', NaN],
      ['empty array', [], '', 0],
      ['numeric array', [42], '42', 42],
      ['nullish array', [null, undefined], ',', NaN],
      ['nested array', [1, [2, null, 3], {}], '1,2,,3,[object Object]', NaN],
    ])('converts %s without changing primitive/array semantics', (_name, value, text, number) => {
      expect(safeEvaluateExpression('toString(datum.value)', { value })).toBe(text);
      expect(safeEvaluateExpression('toNumber(datum.value)', { value })).toBe(number);
    });

    it('never reads own or inherited record coercion hooks, including Symbol.toStringTag', () => {
      const hook = jest.fn(() => 42);
      const getter = jest.fn(() => hook);
      const prototype = Object.defineProperties(
        {},
        {
          toString: { get: getter },
          valueOf: { get: getter },
          [Symbol.toPrimitive]: { get: getter },
          [Symbol.toStringTag]: { get: getter },
        },
      );
      const inherited = Object.create(prototype);
      const own = Object.defineProperties({}, Object.getOwnPropertyDescriptors(prototype));

      for (const value of [inherited, own, { toString: hook, valueOf: hook, [Symbol.toPrimitive]: hook }]) {
        expect(safeEvaluateExpression('toString(datum.value)', { value })).toBe('[object Object]');
        expect(safeEvaluateExpression('toNumber(datum.value)', { value })).toBeNaN();
        expect(safeEvaluateExpression('isNaN(datum.value)', { value })).toBe(true);
        expect(safeEvaluateExpression('abs(datum.value)', { value })).toBeNaN();
      }
      expect(hook).not.toHaveBeenCalled();
      expect(getter).not.toHaveBeenCalled();
    });

    it('joins only own array data descriptors, without accessors or inherited items', () => {
      const hook = jest.fn(() => 'unsafe');
      const value: unknown[] = new Array(4);
      value[0] = 1;
      value[3] = [2, null, 3];
      const prototype = Object.create(Array.prototype);
      Object.defineProperty(prototype, '2', { get: hook });
      Object.setPrototypeOf(value, prototype);
      Object.defineProperty(value, '1', { get: hook });
      Object.defineProperty(value, 'toString', { get: hook });
      Object.defineProperty(value, 'join', { get: hook });
      Object.defineProperty(value, Symbol.toPrimitive, { get: hook });

      expect(safeEvaluateExpression('toString(datum.value)', { value })).toBe('1,,,2,,3');
      expect(safeEvaluateExpression('toNumber(datum.value)', { value })).toBeNaN();
      expect(safeEvaluateExpression("datum.value + '!'", { value })).toBe('1,,,2,,3!');
      expect(hook).not.toHaveBeenCalled();
    });

    it('handles cyclic arrays and rejects oversized conversion work', () => {
      const value: unknown[] = [1];
      value.push(value, 2);
      expect(safeEvaluateExpression('toString(datum.value)', { value })).toBe('1,,2');
      expect(() => safeEvaluateExpression('toString(datum.value)', { value: new Array(100001) })).toThrow('work limit');
    });

    it('uses Date intrinsics rather than user-defined conversion methods', () => {
      const value = new Date('2024-01-01T00:00:00Z');
      const time = Date.prototype.getTime.call(value);
      const text = Date.prototype.toString.call(value);
      const hook = jest.fn(() => 'unsafe');
      for (const key of ['toString', 'valueOf', 'getTime', Symbol.toPrimitive, Symbol.toStringTag]) {
        Object.defineProperty(value, key, { get: hook });
      }
      expect(safeEvaluateExpression('toString(datum.value)', { value })).toBe(text);
      expect(safeEvaluateExpression('toNumber(datum.value)', { value })).toBe(time);
      expect(safeEvaluateExpression('datum.value - 1', { value })).toBe(time - 1);
      expect(safeEvaluateExpression("datum.value + '!'", { value })).toBe(`${text}!`);
      expect(safeEvaluateExpression('toNumber(datum.value)', { value: new Date(NaN) })).toBeNaN();
      expect(safeEvaluateExpression('toString(datum.value)', { value: new Date(NaN) })).toBe('Invalid Date');
      expect(hook).not.toHaveBeenCalled();
    });

    it.each(['datum.value', "datum['value']", 'datum.nested.value', 'datum[datum.key]'])(
      'does not invoke an own accessor in %s',
      expression => {
        const getter = jest.fn(() => 42);
        const datum = Object.defineProperty({ key: 'value' }, 'value', { get: getter });
        expect(safeEvaluateExpression(expression, { ...datum, nested: datum })).toBeUndefined();
        expect(safeEvaluateExpression(expression, datum)).toBeUndefined();
        expect(getter).not.toHaveBeenCalled();
      },
    );

    it.each([
      'datum.value + 1',
      '1 + datum.value',
      "datum.value + ''",
      'datum.value - 1',
      'datum.value * 2',
      'datum.value / 2',
      'datum.value % 2',
      '+datum.value',
      '-datum.value',
      'datum.value < 2',
      'datum.value > 2',
      'datum.value <= 2',
      'datum.value >= 2',
      'datum.value == 2',
      'datum.value != 2',
    ])('rejects unsafe object coercion in %s', expression => {
      const hook = jest.fn(() => 2);
      const value = { toString: hook, valueOf: hook, [Symbol.toPrimitive]: hook };
      expect(() => safeEvaluateExpression(expression, { value })).toThrow('object coercion');
      expect(hook).not.toHaveBeenCalled();
    });

    it('preserves non-coercive object identity and null comparisons', () => {
      const value = Object.create(null);
      expect(safeEvaluateExpression('datum.value == datum.value', { value })).toBe(true);
      expect(safeEvaluateExpression('datum.value === datum.value', { value })).toBe(true);
      expect(safeEvaluateExpression('datum.value == null', { value })).toBe(false);
      expect(safeEvaluateExpression('datum.value != null', { value })).toBe(true);
      expect(safeEvaluateExpression('datum.value === 2', { value })).toBe(false);
    });

    it.each([
      'isValid',
      'isDate',
      'isNumber',
      'isString',
      'isBoolean',
      'isArray',
      'isNaN',
      'isFinite',
      'abs',
      'ceil',
      'floor',
      'round',
      'sqrt',
      'log',
      'exp',
      'pow',
      'min',
      'max',
      'length',
      'toNumber',
      'toString',
      'toBoolean',
    ])('rejects function values in every argument position of %s', name => {
      const callback = jest.fn(() => 42);
      for (const expression of [
        `${name}(datum.callback)`,
        `${name}(1, datum.callback)`,
        `${name}(1, 2, datum.callback)`,
        `${name}(abs)`,
        `${name}(1, abs)`,
      ]) {
        expect(() => safeEvaluateExpression(expression, { callback })).toThrow('function values');
      }
      expect(callback).not.toHaveBeenCalled();
    });

    it.each(['toString(datum.value)', 'toNumber(datum.value)', 'abs(datum.value)', 'datum[datum.value]'])(
      'rejects functions nested in array conversion in %s',
      expression => {
        const callback = jest.fn(() => 42);
        expect(() => safeEvaluateExpression(expression, { value: [1, [callback]] })).toThrow('function values');
        expect(callback).not.toHaveBeenCalled();
      },
    );
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

    it('rejects calling a function supplied through an own datum property', () => {
      expect(() => safeEvaluateExpression("datum.constructor('return 1337')()", { constructor: Function })).toThrow(
        'function calls are only allowed for built-in functions',
      );
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

    it.each(['datum.callback()', "datum['callback']()", '(datum.callback)()', '(true ? datum.callback : abs)()'])(
      'rejects a data-supplied function in %s without invoking it',
      expression => {
        const callback = jest.fn(() => 73);

        expect(() => safeEvaluateExpression(expression, { callback })).toThrow(
          'function calls are only allowed for built-in functions',
        );
        expect(callback).not.toHaveBeenCalled();
      },
    );

    it('rejects a data-supplied function with the same name as a safe built-in', () => {
      const abs = jest.fn(() => 73);

      expect(() => safeEvaluateExpression('datum.abs(-1)', { abs })).toThrow(
        'function calls are only allowed for built-in functions',
      );
      expect(abs).not.toHaveBeenCalled();
    });

    it('rejects a constructor materialized as an own data property', () => {
      expect(() => safeEvaluateExpression("datum.callable('return 73')()", { callable: Function })).toThrow(
        'function calls are only allowed for built-in functions',
      );
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
