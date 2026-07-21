export const createSafeRecord = <T>(): Record<string, T> => Object.create(null) as Record<string, T>;
