// ===== test utils =====

export function isVerbose() {
  return process.env.NX_VERBOSE_LOGGING === 'true' || process.argv.includes('--verbose');
}

/**
 * Remove log colors for fail proof string search
 *
 * > copied from https://github.com/nrwl/nx/blob/c400ea3002eba058d4e4ca02b3b5144ace306f15/e2e/utils/log-utils.ts#L42
 */
export function stripConsoleColors(log: string): string {
  return log?.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}
