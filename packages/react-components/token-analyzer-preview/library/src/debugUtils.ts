/* eslint-disable no-console */
import { performance } from 'perf_hooks';

interface DebugConfig {
  debug: boolean;
  perf: boolean;
}

let config: DebugConfig = {
  debug: false,
  perf: false,
};

export const configure = (options: Partial<DebugConfig>): void => {
  config = { ...config, ...options };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const log = (message: string, ...args: any[]): void => {
  if (config.debug) {
    console.log(`DEBUG: ${message}`, ...args);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const error = (message: string, errorArg: any): void => {
  // Always log errors, but with debug info if enabled
  const prefix = config.debug ? 'DEBUG ERROR: ' : 'ERROR: ';
  console.error(`${prefix}${message}`, errorArg);
};

export const measureAsync = async <T>(name: string, fn: () => Promise<T>): Promise<T> => {
  if (!config.perf) {
    return fn();
  }

  const start = performance.now();
  return fn().finally(() => {
    const end = performance.now();
    console.log(`PERF: ${name} took ${(end - start).toFixed(2)}ms`);
  });
};

export const measure = <T>(name: string, fn: () => T): T => {
  if (!config.perf) {
    return fn();
  }

  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`PERF: ${name} took ${(end - start).toFixed(2)}ms`);
  return result;
};

// Re-export types that consumers might need
export type { DebugConfig };
