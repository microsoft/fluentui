/**
 * Safe expression evaluator for Vega-Lite expressions.
 *
 * Recursive-descent parser that only supports the safe subset of the
 * Vega-Lite expression language:
 *   - Property access: datum.field, datum['field'] (own properties only)
 *   - Arithmetic: +, -, *, /, %
 *   - Comparison: ==, ===, !=, !==, <, >, <=, >=
 *   - Logical: &&, ||, !
 *   - Ternary: condition ? trueVal : falseVal
 *   - Literals: numbers, strings, booleans, null
 *   - Safe built-in functions: isValid, isDate, isNumber, isNaN, isFinite,
 *     abs, ceil, floor, round, sqrt, log, exp, pow, min, max, length,
 *     toNumber, toString, toBoolean
 *   - Constants: PI, E, SQRT2, LN2, LN10, NaN, Infinity
 *
 * Everything else (assignment, arbitrary function calls, global access) is rejected.
 *
 * @see https://vega.github.io/vega/docs/expressions/
 */

// ---------------------------------------------------------------------------
// Token types
// ---------------------------------------------------------------------------
interface Token {
  type: string;
  value: unknown;
  start: number;
}

// ---------------------------------------------------------------------------
// Own-property check — only allow access to properties that exist directly
// on the object (not inherited from the prototype chain). This is an allowlist
// approach: constructor, __proto__, toString, valueOf, etc. are all inherited
// and thus blocked automatically without maintaining a blocklist.
// ---------------------------------------------------------------------------
const hasOwn = (obj: unknown, prop: string): boolean =>
  obj !== null && obj !== undefined && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, prop);

// ---------------------------------------------------------------------------
// Whitelisted built-in functions (mirrors the Vega expression function set)
// ---------------------------------------------------------------------------
const SAFE_FUNCTIONS: Record<string, (...args: unknown[]) => unknown> = {
  isValid: (x: unknown) => x !== null && x !== undefined && (typeof x !== 'number' || !isNaN(x as number)),
  isDate: (x: unknown) => x instanceof Date,
  isNumber: (x: unknown) => typeof x === 'number' && !isNaN(x as number),
  isString: (x: unknown) => typeof x === 'string',
  isBoolean: (x: unknown) => typeof x === 'boolean',
  isArray: (x: unknown) => Array.isArray(x),
  isNaN: (x: unknown) => isNaN(x as number),
  isFinite: (x: unknown) => Number.isFinite(x),
  abs: (x: unknown) => Math.abs(x as number),
  ceil: (x: unknown) => Math.ceil(x as number),
  floor: (x: unknown) => Math.floor(x as number),
  round: (x: unknown) => Math.round(x as number),
  sqrt: (x: unknown) => Math.sqrt(x as number),
  log: (x: unknown) => Math.log(x as number),
  exp: (x: unknown) => Math.exp(x as number),
  pow: (x: unknown, y: unknown) => (x as number) ** (y as number),
  min: (...args: unknown[]) => Math.min(...(args as number[])),
  max: (...args: unknown[]) => Math.max(...(args as number[])),
  length: (x: unknown) => (typeof x === 'string' || Array.isArray(x) ? (x as string | unknown[]).length : 0),
  toNumber: (x: unknown) => Number(x),
  toString: (x: unknown) => String(x),
  toBoolean: (x: unknown) => Boolean(x),
};

// ---------------------------------------------------------------------------
// Whitelisted constants
// ---------------------------------------------------------------------------
const SAFE_CONSTANTS: Record<string, unknown> = {
  PI: Math.PI,
  E: Math.E,
  SQRT2: Math.SQRT2,
  LN2: Math.LN2,
  LN10: Math.LN10,
  NaN,
  Infinity,
};

// Set of all allowed top-level identifiers
const ALLOWED_IDENTIFIERS = new Set(['datum', ...Object.keys(SAFE_FUNCTIONS), ...Object.keys(SAFE_CONSTANTS)]);

// ---------------------------------------------------------------------------
// Tokenizer
// ---------------------------------------------------------------------------
function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < expr.length) {
    // Skip whitespace
    if (/\s/.test(expr[i])) {
      i++;
      continue;
    }

    // Numbers (including decimal and scientific notation)
    if (/[0-9]/.test(expr[i]) || (expr[i] === '.' && i + 1 < expr.length && /[0-9]/.test(expr[i + 1]))) {
      const start = i;
      while (i < expr.length && /[0-9.]/.test(expr[i])) {
        i++;
      }
      if (i < expr.length && (expr[i] === 'e' || expr[i] === 'E')) {
        i++;
        if (i < expr.length && (expr[i] === '+' || expr[i] === '-')) {
          i++;
        }
        while (i < expr.length && /[0-9]/.test(expr[i])) {
          i++;
        }
      }
      tokens.push({ type: 'number', value: parseFloat(expr.slice(start, i)), start });
      continue;
    }

    // Strings (single or double quoted)
    if (expr[i] === '"' || expr[i] === "'") {
      const quote = expr[i];
      const start = i;
      i++;
      let str = '';
      while (i < expr.length && expr[i] !== quote) {
        if (expr[i] === '\\') {
          i++;
          if (i < expr.length) {
            switch (expr[i]) {
              case 'n':
                str += '\n';
                break;
              case 't':
                str += '\t';
                break;
              case '\\':
                str += '\\';
                break;
              case "'":
                str += "'";
                break;
              case '"':
                str += '"';
                break;
              default:
                str += expr[i];
            }
          }
        } else {
          str += expr[i];
        }
        i++;
      }
      if (i < expr.length) {
        i++; // Skip closing quote
      }
      tokens.push({ type: 'string', value: str, start });
      continue;
    }

    // Identifiers and keywords
    if (/[a-zA-Z_$]/.test(expr[i])) {
      const start = i;
      while (i < expr.length && /[a-zA-Z0-9_$]/.test(expr[i])) {
        i++;
      }
      const word = expr.slice(start, i);
      switch (word) {
        case 'true':
          tokens.push({ type: 'boolean', value: true, start });
          break;
        case 'false':
          tokens.push({ type: 'boolean', value: false, start });
          break;
        case 'null':
          tokens.push({ type: 'null', value: null, start });
          break;
        case 'undefined':
          tokens.push({ type: 'null', value: undefined, start });
          break;
        default:
          tokens.push({ type: 'ident', value: word, start });
      }
      continue;
    }

    // Multi-character operators
    const start = i;
    const three = expr.slice(i, i + 3);
    const two = expr.slice(i, i + 2);

    if (three === '===' || three === '!==') {
      tokens.push({ type: three, value: three, start });
      i += 3;
      continue;
    }
    if (two === '==' || two === '!=' || two === '<=' || two === '>=' || two === '&&' || two === '||') {
      tokens.push({ type: two, value: two, start });
      i += 2;
      continue;
    }

    // Single-character operators and punctuation
    const ch = expr[i];
    if ('+-*/%<>!.()[],?:'.includes(ch)) {
      tokens.push({ type: ch, value: ch, start });
      i++;
      continue;
    }

    // Any other character is rejected
    throw new Error(`Safe expression evaluator: unexpected character '${ch}' at position ${i}`);
  }

  tokens.push({ type: 'eof', value: null, start: i });
  return tokens;
}

// ---------------------------------------------------------------------------
// Recursive-descent parser & evaluator
//
// Grammar (precedence low→high):
//   expr           → ternary
//   ternary        → logicalOr ('?' expr ':' expr)?
//   logicalOr      → logicalAnd ('||' logicalAnd)*
//   logicalAnd     → equality ('&&' equality)*
//   equality       → comparison (('=='|'==='|'!='|'!==') comparison)*
//   comparison     → additive (('<'|'>'|'<='|'>=') additive)*
//   additive       → multiplicative (('+'|'-') multiplicative)*
//   multiplicative → unary (('*'|'/'|'%') unary)*
//   unary          → ('!'|'-'|'+') unary | postfix
//   postfix        → primary ('.' ident | '[' expr ']' | '(' args ')')*
//   primary        → number | string | boolean | null | ident | '(' expr ')'
// ---------------------------------------------------------------------------
class ExpressionParser {
  private tokens: Token[];
  private pos: number;
  private context: Record<string, unknown>;

  constructor(tokens: Token[], context: Record<string, unknown>) {
    this.tokens = tokens;
    this.pos = 0;
    this.context = context;
  }

  public parse(): unknown {
    const result = this._parseExpression();
    if (this._peek().type !== 'eof') {
      throw new Error(
        `Safe expression evaluator: unexpected token '${this._peek().type}' at position ${this._peek().start}`,
      );
    }
    return result;
  }

  private _peek(): Token {
    return this.tokens[this.pos];
  }

  private _advance(): Token {
    const token = this.tokens[this.pos];
    this.pos++;
    return token;
  }

  private _expect(type: string): Token {
    const token = this._peek();
    if (token.type !== type) {
      throw new Error(
        `Safe expression evaluator: expected '${type}' but got '${token.type}' at position ${token.start}`,
      );
    }
    return this._advance();
  }

  private _parseExpression(): unknown {
    return this._parseTernary();
  }

  private _parseTernary(): unknown {
    const condition = this._parseOr();
    if (this._peek().type === '?') {
      this._advance();
      const trueVal = this._parseExpression();
      this._expect(':');
      const falseVal = this._parseExpression();
      return condition ? trueVal : falseVal;
    }
    return condition;
  }

  private _parseOr(): unknown {
    let left = this._parseAnd();
    while (this._peek().type === '||') {
      this._advance();
      const right = this._parseAnd();
      left = left || right;
    }
    return left;
  }

  private _parseAnd(): unknown {
    let left = this._parseEquality();
    while (this._peek().type === '&&') {
      this._advance();
      const right = this._parseEquality();
      left = left && right;
    }
    return left;
  }

  private _parseEquality(): unknown {
    let left = this._parseComparison();
    while (['==', '===', '!=', '!=='].includes(this._peek().type)) {
      const op = this._advance().type;
      const right = this._parseComparison();
      switch (op) {
        case '==':
          // eslint-disable-next-line eqeqeq
          left = left == right;
          break;
        case '===':
          left = left === right;
          break;
        case '!=':
          // eslint-disable-next-line eqeqeq
          left = left != right;
          break;
        case '!==':
          left = left !== right;
          break;
      }
    }
    return left;
  }

  private _parseComparison(): unknown {
    let left = this._parseAdditive();
    while (['<', '>', '<=', '>='].includes(this._peek().type)) {
      const op = this._advance().type;
      const right = this._parseAdditive();
      switch (op) {
        case '<':
          left = (left as number) < (right as number);
          break;
        case '>':
          left = (left as number) > (right as number);
          break;
        case '<=':
          left = (left as number) <= (right as number);
          break;
        case '>=':
          left = (left as number) >= (right as number);
          break;
      }
    }
    return left;
  }

  private _parseAdditive(): unknown {
    let left = this._parseMultiplicative();
    while (['+', '-'].includes(this._peek().type)) {
      const op = this._advance().type;
      const right = this._parseMultiplicative();
      if (op === '+') {
        left =
          typeof left === 'string' || typeof right === 'string'
            ? String(left) + String(right)
            : (left as number) + (right as number);
      } else {
        left = (left as number) - (right as number);
      }
    }
    return left;
  }

  private _parseMultiplicative(): unknown {
    let left = this._parseUnary();
    while (['*', '/', '%'].includes(this._peek().type)) {
      const op = this._advance().type;
      const right = this._parseUnary();
      switch (op) {
        case '*':
          left = (left as number) * (right as number);
          break;
        case '/':
          left = (left as number) / (right as number);
          break;
        case '%':
          left = (left as number) % (right as number);
          break;
      }
    }
    return left;
  }

  private _parseUnary(): unknown {
    if (this._peek().type === '!') {
      this._advance();
      return !this._parseUnary();
    }
    if (this._peek().type === '-') {
      this._advance();
      return -(this._parseUnary() as number);
    }
    if (this._peek().type === '+') {
      this._advance();
      return +(this._parseUnary() as number);
    }
    return this._parsePostfix();
  }

  private _parsePostfix(): unknown {
    let value = this._parsePrimary();

    while (true) {
      if (this._peek().type === '.') {
        // Property access: obj.prop — only own properties allowed
        this._advance();
        const prop = this._expect('ident');
        const propName = prop.value as string;

        if (hasOwn(value, propName)) {
          value = (value as Record<string, unknown>)[propName];
        } else {
          value = undefined;
        }
      } else if (this._peek().type === '[') {
        // Bracket access: obj['prop'] or obj[expr] — only own properties allowed
        this._advance();
        const index = this._parseExpression();
        this._expect(']');

        const key = String(index);
        if (hasOwn(value, key)) {
          value = (value as Record<string, unknown>)[key];
        } else {
          value = undefined;
        }
      } else if (this._peek().type === '(') {
        // Function call — only safe built-in functions are callable
        if (typeof value !== 'function') {
          throw new Error('Safe expression evaluator: function calls are only allowed for built-in functions');
        }
        this._advance();
        const args: unknown[] = [];
        if (this._peek().type !== ')') {
          args.push(this._parseExpression());
          while (this._peek().type === ',') {
            this._advance();
            args.push(this._parseExpression());
          }
        }
        this._expect(')');
        value = (value as (...a: unknown[]) => unknown)(...args);
      } else {
        break;
      }
    }

    return value;
  }

  private _parsePrimary(): unknown {
    const token = this._peek();

    switch (token.type) {
      case 'number':
      case 'string':
      case 'boolean':
      case 'null':
        this._advance();
        return token.value;

      case 'ident': {
        const name = token.value as string;
        if (!ALLOWED_IDENTIFIERS.has(name)) {
          throw new Error(`Safe expression evaluator: unknown identifier '${name}'`);
        }
        this._advance();
        if (name === 'datum') {
          return this.context.datum;
        }
        if (name in SAFE_FUNCTIONS) {
          return SAFE_FUNCTIONS[name];
        }
        if (name in SAFE_CONSTANTS) {
          return SAFE_CONSTANTS[name];
        }
        return undefined;
      }

      case '(': {
        this._advance();
        const result = this._parseExpression();
        this._expect(')');
        return result;
      }

      default:
        throw new Error(`Safe expression evaluator: unexpected token '${token.type}' at position ${token.start}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Safely evaluates a Vega-Lite expression string against a datum object.
 *
 * Only allows property access, arithmetic, comparison, logical operators,
 * ternary expressions, literals, and a whitelist of built-in functions.
 * Rejects assignment, arbitrary function calls, and global object access.
 *
 * @param expr - The Vega-Lite expression string to evaluate
 * @param datum - The data row object (accessible as `datum` in the expression)
 * @returns The result of evaluating the expression
 * @throws Error if the expression contains disallowed constructs
 */
export function safeEvaluateExpression(expr: string, datum: Record<string, unknown>): unknown {
  const tokens = tokenize(expr);
  const parser = new ExpressionParser(tokens, { datum });
  return parser.parse();
}
