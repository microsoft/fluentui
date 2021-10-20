import * as tmp from 'tmp';
// note: there's nothing gulp-specific about this utility, it just runs commands
import sh from '../gulp/sh';

// Clean up created files/folders on exit, even after exceptions
// (will not catch SIGINT on windows)
tmp.setGracefulCleanup();

export function createTempDir(prefix: string): string {
  // "Unsafe" means delete even if it still has files inside (our desired behavior)
  return tmp.dirSync({ prefix, unsafeCleanup: true }).name;
}

export function log(context: string) {
  return (message: string) => {
    console.log();
    console.log('='.repeat(80));
    console.log(`${context} : ${message}`);
    console.log('='.repeat(80));
  };
}

export async function shEcho(cmd: string, cwd?: string) {
  console.log(`+ cd ${cwd ?? '.'} && ${cmd}`);
  await sh(cmd, cwd);
}
