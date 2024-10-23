//Copied from @microsoft/fast-foundation

/**
 * Helper for enumerating a type from a const object
 * Example: export type Foo = ValuesOf\<typeof Foo\>
 * @public
 */
export type ValuesOf<T> = T[keyof T];
