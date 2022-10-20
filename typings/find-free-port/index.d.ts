// Type definitions for find-free-port 2.0.0

declare module 'find-free-port' {
  function findFreePort(args: [...values: Array<string | number>, cb: (err: unknown, freePort: number) => void]): any;
  function findFreePort(...args: Array<string | number>): Promise<number>;

  export default findFreePort;
}
