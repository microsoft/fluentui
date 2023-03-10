// Type definitions for json-stable-stringify-without-jsonify 1.0.1

declare module 'json-stable-stringify-without-jsonify' {
  function stringify(value: Record<string, any>, options?: Partial<Options>): string;

  interface Options {
    cmp: (a: any, b: any) => any;
    space: number;
    replacer: (key: string, value: any) => any;
  }
  export = stringify;
}
