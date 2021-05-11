const isProxySymbol = '__isProxy__' as const;

/**
 * @internal
 */
export function createCSSVariablesProxy(prefix?: string): unknown {
  // Better to debug with classic function
  function proxyToStr() {
    return `var(--${prefix})`;
  }
  const proxy = new Proxy(proxyToStr, {
    has(_, key) {
      return key === isProxySymbol;
    },
    get(target, key) {
      if (key === 'toString' || key === Symbol.toPrimitive) {
        return target;
      }

      return createCSSVariablesProxy(prefix ? [prefix, key].join('-') : key.toString());
    },
  });
  return proxy;
}

export function isProxy(object: unknown): object is Function {
  return typeof object === 'function' && isProxySymbol in object;
}

/**
 * @internal
 */
export function resolveProxyValues<T>(value: T): T {
  if (isProxy(value)) {
    return (value.toString() as unknown) as T;
  }
  if (Array.isArray(value)) {
    return (value.map(resolveProxyValues) as unknown) as T;
  }
  if (value === null) {
    return value;
  }
  if (typeof value === 'object') {
    const expanded = {} as T;
    // eslint-disable-next-line guard-for-in
    for (const key in value) {
      const internalValue = value[key];
      expanded[key] = resolveProxyValues(internalValue);
    }
    return expanded;
  }
  return value;
}
