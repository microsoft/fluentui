declare module 'dedent' {
  function dedent(strings: TemplateStringsArray, ...values: unknown[]): string;
  function dedent(value: string): string;

  export = dedent;
}
