const own = (value: unknown, key: string): unknown => {
  if (!value || typeof value !== 'object') {
    return undefined;
  }
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  return descriptor && 'value' in descriptor && typeof descriptor.value !== 'function' ? descriptor.value : undefined;
};

/** Parse Vega field paths, not JavaScript. Accessor descriptors and callable values are never read. */
export function readVegaField(row: unknown, field: string): unknown {
  const path: string[] = [];
  let i = 0;
  const token = (): string | undefined => {
    let result = '';
    while (i < field.length && field[i] !== '.' && field[i] !== '[') {
      if (field[i] === '\\') {
        if (++i === field.length) {
          return undefined;
        }
      } else if (field[i] === ']') {
        return undefined;
      }
      result += field[i++];
    }
    return result || undefined;
  };
  if (field[0] !== '[') {
    const first = token();
    if (first === undefined) {
      return undefined;
    }
    path.push(first);
  }
  while (i < field.length) {
    if (field[i] === '.') {
      i++;
      const next = token();
      if (next === undefined) {
        return undefined;
      }
      path.push(next);
    } else if (field[i] === '[') {
      i++;
      while (/\s/.test(field[i] || '') && i < field.length) {
        i++;
      }
      const quote = field[i] === '"' || field[i] === "'" ? field[i++] : undefined;
      let next = '';
      if (quote) {
        while (i < field.length && field[i] !== quote) {
          if (field[i] === '\\' && ++i === field.length) {
            return undefined;
          }
          next += field[i++];
        }
        if (field[i++] !== quote) {
          return undefined;
        }
      } else {
        while (i < field.length && /[0-9]/.test(field[i])) {
          next += field[i++];
        }
        if (!next) {
          return undefined;
        }
      }
      while (/\s/.test(field[i] || '') && i < field.length) {
        i++;
      }
      if (field[i++] !== ']') {
        return undefined;
      }
      path.push(next);
    } else {
      return undefined;
    }
  }
  return path.reduce<unknown>((value, key) => own(value, key), row);
}
