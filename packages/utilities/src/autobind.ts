/**
 * Autobind is a utility for binding methods in a class. This simplifies tagging methods as being "bound" to the this pointer
 * so that they can be used in scenarios that simply require a function callback.
 */
export function autobind<T extends Function>(target: any, key: string, descriptor: TypedPropertyDescriptor<T>): {
  configurable: boolean;
  get(): T;
  set(newValue: any): void;
} | void {
  let fn = descriptor.value;

  let defining = false;

  return {
    configurable: true,

    get(): T {
      if (defining || (fn && this === fn.prototype) || this.hasOwnProperty(key)) {
        return fn as T;
      }

      // Bind method only once, and update the property to return the bound value from now on
      let fnBound = fn && fn.bind(this);

      defining = true;
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable: true,
        value: fnBound
      });
      defining = false;

      return fnBound;
    },

    set(newValue: any): void {
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable: true,
        value: newValue
      });
    }
  };
}
