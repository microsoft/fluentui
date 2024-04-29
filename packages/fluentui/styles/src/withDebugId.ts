import { isEnabled as isDebugEnabled } from './debugEnabled';

export const withDebugId =
  process.env.NODE_ENV === 'production'
    ? <T>(data: T, debugId: string): T => data
    : <T>(data: T, debugId: string): T => {
        if (!isDebugEnabled || debugId === undefined) {
          return data;
        }

        if (typeof data === 'object' && data !== null) {
          if (!Object.prototype.hasOwnProperty.call(data, '_debugId')) {
            const copy = { ...data };
            Object.defineProperty(copy, '_debugId', {
              value: debugId,
              writable: false,
              enumerable: false,
            });
            return copy;
          }
        }

        if (typeof data === 'function') {
          return ((...args) => {
            const result = data(...args);
            return withDebugId(result, debugId);
          }) as unknown as T;
        }

        return data;
      };
