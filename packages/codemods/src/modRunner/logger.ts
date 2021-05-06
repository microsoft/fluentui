export interface LogFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): void;
}

export interface Logger {
  log: LogFunction;
  warn: LogFunction;
  error: LogFunction;
}
