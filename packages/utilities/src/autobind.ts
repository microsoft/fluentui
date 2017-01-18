/**
 * Autobind is a utility for binding methods in a class. This simplifies tagging methods as being "bound" to the this pointer
 * so that they can be used in scenarios that simply require a function callback.
 *
 * @example
 * import { autobind } from '../utilities/autobind';
 *
 * public class Foo {
 *   @autobind
 *   method() {
 *   }
 * }
 */
export function autobind<T extends Function>(target: any, key: string, descriptor: TypedPropertyDescriptor<T>) {
  let fn = descriptor.value;

  return {
    configurable: true,

    get() {
      if (this === fn.prototype) {
        return fn;
      }
      return fn.bind(this);
    },

    set(newValue) {
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable: true,
        value: newValue
      });
    }
  };
}
