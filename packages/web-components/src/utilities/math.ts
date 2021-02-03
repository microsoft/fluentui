function performOperation<T>(
  operation: (a: number, b: number) => number,
): (...args: Array<number | ((designSystem: T) => number)>) => (designSystem?: T) => number {
  return (...args: Array<number | ((designSystem: T) => number)>): ((designSystem?: T) => number) => {
    return (designSystem?: T): number => {
      const firstArg: number | ((designSystem: T) => number) = args[0];
      let value: number = typeof firstArg === 'function' ? firstArg(designSystem as any) : firstArg;

      for (let i: number = 1; i < args.length; i++) {
        const currentValue: number | ((designSystem: T) => number) = args[i];
        value = operation(value, typeof currentValue === 'function' ? currentValue(designSystem as any) : currentValue);
      }

      return value;
    };
  };
}

const _add: (
  ...args: Array<number | ((designSystem: any) => number)>
) => (designSystem?: any) => number = performOperation((a: number, b: number): number => a + b);
const _subtract: (
  ...args: Array<number | ((designSystem: any) => number)>
) => (designSystem?: any) => number = performOperation((a: number, b: number): number => a - b);
const _multiply: (
  ...args: Array<number | ((designSystem: any) => number)>
) => (designSystem?: any) => number = performOperation((a: number, b: number): number => a * b);
const _divide: (
  ...args: Array<number | ((designSystem: any) => number)>
) => (designSystem?: any) => number = performOperation((a: number, b: number): number => a / b);
/**
 * Adds numbers or functions that accept a design system and return a number.
 * @internal
 */
export function add<T>(...args: Array<number | ((designSystem: T) => number)>): (designSystem?: T) => number {
  return _add.apply(this, args);
}

/**
 * Subtract numbers or functions that accept a design system and return a number.
 * @internal
 */
export function subtract<T>(...args: Array<number | ((designSystem: T) => number)>): (designSystem?: T) => number {
  return _subtract.apply(this, args);
}

/**
 * Multiplies numbers or functions that accept a design system and return a number.
 * @internal
 */
export function multiply<T>(...args: Array<number | ((designSystem: T) => number)>): (designSystem?: T) => number {
  return _multiply.apply(this, args);
}

/**
 * Divides numbers or functions that accept a design system and return a number.
 * @internal
 */
export function divide<T>(...args: Array<number | ((designSystem: T) => number)>): (designSystem?: T) => number {
  return _divide.apply(this, args);
}
