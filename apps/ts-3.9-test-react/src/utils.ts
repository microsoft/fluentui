import tmp from 'tmp';

// Clean up created files/folders on exit, even after exceptions
// (will not catch SIGINT on windows)
tmp.setGracefulCleanup();

export function createTempDir(prefix: string): string {
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
