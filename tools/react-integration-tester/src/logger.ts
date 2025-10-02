import { type Args } from './shared';

export type Logger = {
  log: (...msg: unknown[]) => void;
  info: (...msg: unknown[]) => void;
  warn: (...msg: unknown[]) => void;
  error: (...msg: unknown[]) => void;
  verbose: (...msg: unknown[]) => void;
};

export function createLogger(config: Pick<Args, 'react' | 'verbose'>): Logger {
  const BOLD = '\x1b[1m';
  const RESET = '\x1b[0m';
  const header = `${BOLD}[🧪⚛️ rit / v${config.react}]${RESET}`;
  return {
    log: (...msg: unknown[]) => console.log(header, ...msg),
    info: (...msg: unknown[]) => console.info(header, ...msg),
    warn: (...msg: unknown[]) => console.warn(header, ...msg),
    error: (...msg: unknown[]) => console.error(header, ...msg),
    verbose: (...msg: unknown[]) => {
      if (config.verbose) {
        console.log(header, ...msg);
      }
    },
  };
}
