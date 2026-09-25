declare function legacy(value: string): string;

declare namespace legacy {
  const condition: 'require';

  interface Options {
    uppercase?: boolean;
  }
}

export = legacy;
